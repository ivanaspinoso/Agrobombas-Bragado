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

//Obtener todos los mensajes a enviar
router.post("/tosend", async (req, res) => {
  const {userid, datesend, timesend} = req.body
  try {
    let getAllMessages = await Messages.findAll({
      include: { 
       },
       where: { 
        senddate: {
          [Op.gte]: datesend,                             // >= 6
        },
        sendtime: timesend,
        userId: userid 
      },
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
    contacts,
    text,
    inmediate,
    senddates,
    sendtimes,
    sended,
    backwa,
    contactid
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
  } else {
    objMessage = {
      ...objMessage,
      sended: false,
    }
  }
  try {
    // envio los datos al modelo sequelize para que los guarde en la database
    const newMessage = await Messages.create(objMessage)
    // console.log(newMessage)
    console.log(contacts)
    // await newMessage.setContacts(contacts);

     let getMessageContact = await Messages.findOne({
      // order: [["name", "ASC"]],
      where: {id: newMessage.id },
      include: { 
        model: Contacts,
      }})

    res
      .status(200)
      .json({ message: "Mensaje guardado", mensaje: getMessageContact });
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

router.put("/result", async (req, res) => {
  const { id, result } = req.body;
  console.log(req.body);
  if (!result || result === "") {
    return res
      .status(400)
      .json({ error: "Falta ingresar resultado correspondiente" });
  } else if (!id || id <=0 ) {
    return res
      .status(400)
      .json({ error: "Ingresar id de mensaje" });
  }
  const objMessUpd = {
    id,
    result,
  };
  try {
    // envio los datos al modelo sequelize para que los guarde en la database
    let updMess = await Messages.update(objMessUpd, {
      where: {
        id,
      },
    });
    // si todo sale bien devuelvo el objeto agregado
    console.log("Mensaje modificado");
    res.send(updMess);
  } catch (err) {
    // en caso de error lo devuelvo al frontend
    console.log(err);
    res.status(400).json({ error: err });
  }
});


module.exports = router;