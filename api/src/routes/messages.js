const axios = require("axios")

var express = require("express");


const { Messages, Contacts } = require("../models/index");

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

//Obtener todos las mensajes de un usuario
router.get("/byuser/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let getUserMessages = await Messages.findAll({
      order: [["id", "DESC"]],
      include: { 
        model: Contacts,
        where: { userId: id }
       },
    });
    console.log(getUserMessages)
    return res.send(getUserMessages);
  } catch (err) {
    return res.send({
      message: "No se pudieron obtener usuarios \n" + err,
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
    backwa
  } = req.body;


  let objMessage = {
    text,
    inmediate,
    senddate: senddates,
    sendtime: sendtimes,
    contactId: contactid
  };
  if (inmediate) {
    objMessage = {
      ...objMessage,
      sended: true,
    }
  }
  try {
    // envio los datos al modelo sequelize para que los guarde en la database
    const newMessage = await Messages.create(objMessage)
    // console.log(newMessage)
    let getUserMessage = await Messages.findOne({
      // order: [["name", "ASC"]],
      where: {id: newMessage.id },
      include: { 
        model: Contacts,
      }})

    res
      .status(200)
      .json({ message: "Mensaje guardado", mensaje: getUserMessage });
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