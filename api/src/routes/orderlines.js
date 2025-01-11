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


// Eliminar orderlines from Administrrator
router.delete("/delete/:id", /* validateToken, */ async (req, res) => {
    const { id } = req.params;
    console.log("proveedor a eliminar ", id);
    if (!id) return res.status(400).send({ message: "Debe ingresar proveedor" });


    /*     let productSocios = await Product.findAll({
          where: { prov_code: id },
        })
      
        console.log("Productos asociados al vendedor",productSocios.length)
     */
    const existOL = await OrderLine.findOne({
        where: {
            id,
        },
    });

    if (existOL) {
        try {
            let delOL = await OrderLine.destroy({
                where: {
                    id,
                },
            });
            console.log(delOL);
            return res
                .status(200)
                .json({ message: "OL eliminado correctamente" });
        } catch (err) {
            return res
                .status(500)
                .json({ message: "OL se pudo eliminar el proveedor" + err });
        }
    } else {
        return res.status(400).json({ message: "OrderLine inexistente" });
    }
});

module.exports = router;