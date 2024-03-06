var express = require("express");

const { Messages } = require("../models/index");

var router = express.Router();

//Obtener todos los mensajes
router.get("/", async (req, res) => {
    try {
      let getAllMessages = await Messages.findAll({
        order: [["senddate", "ASC"]],
      });
/*       let usernames = []
      getAllUserNames.map((user) => {
        usernames.push(user.username)
      })
 */      return res.send(getAllMessages);
    } catch (err) {
      return res.send({
        message: "No se pudieron obtener mensajes \n " + err,
      });
    }
  });

  router.post("/add", async (req, res) => {
    // tomo todos los campos del form de registro de usuario
    const {
      contactid,
      text,
      inmediate,
      senddate,
      sendtime,
      sended,
      sendeddate,
      sendedtime,
    } = req.body;
    let hash = "";
    // chequeo que estén completos los 3 campos requeridos
    if (!text || text === "") {
      return res
        .status(400)
        .json({ message: "Falta ingresar texto correspondiente" });
    } else if (!contactid || contactid === 0) {
        return res
          .status(400)
          .send({ message: "Por favor, ingrese destinatario del mensaje" });
      }
    const objMessage = {
        text,
        inmediate,
        senddate,
        sendtime,
        sended,
        sendeddate,
        sendedtime,
        contactid
      };
    try {
      // envio los datos al modelo sequelize para que los guarde en la database
      let newMessage = await Messages.create(objMessage);

      // si todo sale bien devuelvo el objeto agregado
      console.log("Objeto de usuario guardado");
      res
        .status(200)
        .json({ message: "Mensaje guardado correctamente", mensaje: newMessage });
    } catch (error) {
      // en caso de error lo devuelvo al frontend
      console.log(error);
      res.status(500).json({ message: "No se pudo crear el admin" + error });
    }
  });

  module.exports = router;