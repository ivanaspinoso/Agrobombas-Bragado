var express = require("express");

const { Receipts } = require("../models/index");

var router = express.Router();

//Obtener todos los recibidos
router.get("/", async (req, res) => {
    try {
        let getAllReceipts = await Receipts.findAll({
            order: [["createdAt", "DESC"]],
        });
  /*       let usernames = []
        getAllUserNames.map((user) => {
          usernames.push(user.username)
        })
   */      return res.send(getAllReceipts);
    } catch (err) {
        return res.send({
            message: "No se pudieron obtener mensajes recibidos \n " + err,
        });
    }
});

//Obtener todos los recibidos
router.get("/byuser/:id", async (req, res) => {
    const { id } = req.params
    try {
        let getAllReceipts = await Receipts.findAll({
            order: [["createdAt", "DESC"]],
            where: { userId: id }
        });
  /*       let usernames = []
        getAllUserNames.map((user) => {
          usernames.push(user.username)
        })
   */      return res.send(getAllReceipts);
    } catch (err) {
        return res.send({
            message: "No se pudieron obtener mensajes recibidos \n " + err,
        });
    }
});

router.post("/add", async (req, res) => {
    const { text, number, userid, type } = req.body
    console.log(req.body)
    const objReceipt = {
        type,
        text,
        numwa: number,
        userId: userid
    }
    try {
        let newReceipt = await Receipts.create(objReceipt);
        res
            .status(200)
            .json({ message: "Recebido correctamente", receipt: newReceipt });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "No se pudo guardar mensaje" + error });
    }
})

// Borrar mensaje
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id);
    if (!id) return res.status(400).send({ message: "Debe ingresar mensaje" });

    const existMess = await Receipts.findOne({
        where: {
            id,
        },
    });

    if (existMess) {
        try {
            let delMessage = await Receipts.destroy({
                where: {
                    id,
                },
            });
            console.log(delMessage);
            return res
                .status(200)
                .json({ message: "Mensaje recibido eliminado correctamente" });
        } catch (err) {
            return res
                .status(500)
                .json({ message: "No se pudo eliminar el mensaje recibido" + err });
        }
    }
});



module.exports = router;