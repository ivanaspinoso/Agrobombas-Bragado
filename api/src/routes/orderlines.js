var express = require("express");

const { OrderLine, Product } = require("../models/index");

const { validateToken } = require("../utils/token");

var router = express.Router();

const { Op, where } = require("sequelize")

//Obtener todos las movimientos
router.get("/", /* validateToken, */ async (req, res) => {
    try {
        let getAllOrderlines = await OrderLine.findAll({
            // order: [["fecha", "ASC"]],
            include: [
                {
                  model: Product,
                  required: true,
                },
            ]
        });
        console.log(getAllOrderlines)
        return res.send(getAllOrderlines);
    } catch (err) {
        return res.send({
            message: "No se pudieron obtener lineas de venta" + err,
        });
    }
});

module.exports = router;