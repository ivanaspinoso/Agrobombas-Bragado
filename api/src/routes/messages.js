const axios = require("axios")

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
    senddates,
    sendtimes,
    sended,
    sendeddate,
    sendedtime,
  } = req.body;


  let objMessage = {
    text,
    inmediate,
    senddates,
    sendtimes,
    sended,
    sendeddate,
    sendedtime,
    contactId: contactid
  };
  if (inmediate) {
    objMessage = {
      ...objMessage,
      sended: true,
      sendeddate: senddates,
      sendedtime: sendtimes
    }
  }
  try {
    // envio los datos al modelo sequelize para que los guarde en la database
    newMessage = await Messages.create(objMessage)
    // console.log(newMessage)
    res
      .status(200)
      .json({ message: "Mensaje guardado", mensaje: newMessage });
    // si todo sale bien devuelvo el objeto agregado
    console.log("Objeto de usuario guardado");
  } catch (err) {
    // errores.push(error)
    return res.send({
      message: "No se pudieron obtener mensajes \n " + err,
    });
    // en caso de error lo devuelvo al frontend
  }
})

module.exports = router;