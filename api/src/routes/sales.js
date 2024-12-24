var express = require("express");

const { Sales, Cashflow} = require("../models/index");

const { validateToken } = require("../utils/token");

var router = express.Router();

//Obtener todos las ventas
router.get("/", /* validateToken, */ async (req, res) => {
    try {
        let getAllSales = await Sales.findAll({
            order: [["fecha", "ASC"]],
        });
        console.log(getAllSales)
        return res.send(getAllSales);
    } catch (err) {
        return res.send({
            message: "No se pudieron obtener ventas" + err,
        });
    }
});

//Agregando venta
router.post("/add", async (req, res) => {
    // tomo todos los campos del form de registro de usuario
    const {
        fecha,
        client,
        address,
        cellphone,
        noteclient,
        subtotal,
        total,
        noteadmin,
        paga,
        notapaga,
        resta,
        notaresta,
        user_asoc,
        orderlines
    } = req.body;
    // chequeo que estén completos los 3 campos requeridos
    if (!fecha || fecha === "") {
        return res
            .status(400)
            .json({ message: "Falta ingresar fecha para la venta" });
    }
    if (!client || client === "") {
        return res
            .status(400)
            .json({ message: "Falta ingresar cliente para la venta" });
    }
    if (!orderlines || orderlines.length <= 0) {
        return res
            .status(400)
            .json({ message: "Falta ingresar, al menos, un producto a la venta" });
    }
/*     if (!subtotal || parseFloat(subtotal) < parseFloat(0) ) {
        return res
            .status(400)
            .json({ message: "Falta ingresar subtotal para la venta " + parseFloat(subtotal)});
    } 

    if (!total || total < 0) {
        return res
            .status(400)
            .json({ message: "Falta ingresar total para la venta" });
    }
 */
    const objSale = {
        fecha,
        client,
        address,
        cellphone,
        noteclient,
        subtotal,
        total,
        noteadmin
    };
    try {
        // envio los datos al modelo sequelize para que los guarde en la database
        let newSale = await Sales.create(objSale);
        // si todo sale bien devuelvo el objeto agregado
        console.log("Objeto de venta guardado");
        if (paga > 0) {
            console.log("generar movimiento de caja " + newSale.id)
            const objCashflow = {
                date: fecha,
                description: "Movimiento Automatico de caja por venta " + newSale.id,
                income: paga,
                vta_asoc: newSale.id,
                user_asoc: user_asoc,
            };
            try {
                // envio los datos al modelo sequelize para que los guarde en la database
                let newCashflow = await Cashflow.create(objCashflow);
                // si todo sale bien devuelvo el objeto agregado
                console.log("Objeto de movimiento de caja guardado", newCashflow);
                /* res
                    .status(200)
                    .json({ message: "Movimiento generado correctamente", cashflow: newCashflow }); */
            } catch (error) {
                // en caso de error lo devuelvo al frontend
                console.log(error);
                res.status(500).json({ message: "No se pudo crear el movimiento" + error });
            }
        }
        if (resta > 0) {
            console.log("generar movimiento de cta cte " + newSale.id)

        
        }
        if (orderlines.length > 0) {
        // Generar linea de producto vendido y descontarlo del stock

        }
        res
            .status(200)
            .json({ message: "Venta generado correctamente", sale: newSale });
    } catch (error) {
        // en caso de error lo devuelvo al frontend
        console.log(error);
        res.status(500).json({ message: "No se pudo crear el venta" + error });
    }
}
)



module.exports = router;