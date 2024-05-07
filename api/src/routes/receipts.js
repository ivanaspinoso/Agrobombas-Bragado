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


module.exports = router;