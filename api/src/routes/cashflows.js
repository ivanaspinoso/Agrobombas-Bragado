var express = require("express");

const { Cashflow } = require("../models/index");

const { validateToken } = require("../utils/token");

var router = express.Router();

const { Op, where } = require("sequelize")

//Obtener todos las movimientos
router.get("/", /* validateToken, */ async (req, res) => {
    try {
        let getAllCashflow = await Cashflow.findAll({
            order: [["date", "ASC"]],
        });
        console.log(getAllCashflow)
        return res.send(getAllCashflow);
    } catch (err) {
        return res.send({
            message: "No se pudieron obtener clientes" + err,
        });
    }
});

//Obtener todos las movimientos de un usuario
router.get("/byuser/:user", /* validateToken, */ async (req, res) => {
    const { user } = req.params
    try {
        let getAllCashflow = await Cashflow.findAll({
            order: [["date", "ASC"]],
            where: {
                user_asoc: user
            }
        });
        console.log(getAllCashflow)
        return res.send(getAllCashflow);
    } catch (err) {
        return res.send({
            message: "No se pudieron obtener clientes" + err,
        });
    }
});

//Obtener todos las movimientos de un usuario
router.get("/bydate/:date", /* validateToken, */ async (req, res) => {
    const { date } = req.params
    try {
        let getAllCashflow = await Cashflow.findAll({
            order: [["date", "ASC"]],
            where: {
                date
            }
        });
        console.log(getAllCashflow)
        return res.send(getAllCashflow);
    } catch (err) {
        return res.send({
            message: "No se pudieron obtener clientes" + err,
        });
    }
});

//Obtener todos las movimientos de un usuario
router.get("/bedate/:date1/:date2", /* validateToken, */ async (req, res) => {
    const { date1, date2 } = req.params
    if (!date1 || date1 === "") {
        return res
            .status(400)
            .json({ message: "Falta ingresar fecha inicial para el movimiento" });
    }
    if (!date2 || date2 === "") {
        return res
            .status(400)
            .json({ message: "Falta ingresar fecha final para el movimiento" });
    }
    if (date1 === date2) {
        return res
            .status(400)
            .json({ message: "Falta inicial y final, no deben ser iguales" });
    }
    try {
        let getAllCashflow = await Cashflow.findAll({
            order: [["date", "ASC"]],
            where: [{"date":  {[Op.between]: [date1, date2]}}
        ]
        });
        console.log(getAllCashflow)
        return res.send(getAllCashflow);
    } catch (err) {
        return res.send({
            message: "No se pudieron obtener clientes" + err,
        });
    }
});

router.post("/add", async (req, res) => {
    // tomo todos los campos del form de registro de usuario
    const {
        date,
        description,
        income,
        outflow,
        vta_asoc,
        user_asoc,
        mov_asoc
    } = req.body;
    // chequeo que estén completos los 3 campos requeridos
    if (!date || date === "") {
        return res
            .status(400)
            .json({ message: "Falta ingresar fecha para el movimiento" });
    }
    if (!user_asoc || user_asoc === 0) {
        return res
            .status(400)
            .json({ message: "Falta ingresar usuario para el movimiento" });
    }
    const objCashflow = {
        date,
        description,
        income,
        outflow,
        vta_asoc,
        user_asoc,
        mov_asoc
    };
    try {
        // envio los datos al modelo sequelize para que los guarde en la database
        let newCashflow = await Cashflow.create(objCashflow);
        // si todo sale bien devuelvo el objeto agregado
        console.log("Objeto de movimiento de caja guardado");
        res
            .status(200)
            .json({ message: "Movimiento generado correctamente", cashflow: newCashflow });
    } catch (error) {
        // en caso de error lo devuelvo al frontend
        console.log(error);
        res.status(500).json({ message: "No se pudo crear el movimiento" + error });
    }
}
)

// Actualizar datos de cliente
router.put("/update", /* validateToken, */ async (req, res) => {
    // tomo todos los campos del form de registro de usuario
    const { id,
        date,
        description,
        income,
        outflow,
        vta_asoc,
        user_asoc,
        mov_asoc } = req.body;
    // console.log(req.body.user);
    // chequeo que estén completos los 3 campos requeridos
    if (!id || id === "") {
        return res.status(400).json({ message: "Falta ingresar id de movimiento" });
    }
    if (!date || date === "") {
        return res
            .status(400)
            .json({ message: "Falta ingresar fecha para el movimiento" });
    }
    if (!user_asoc || user_asoc === 0) {
        return res
            .status(400)
            .json({ message: "Falta ingresar usuario para el movimiento" });
    }
    let existCashflow = await Cashflow.findOne({
        where: {
            id,
        },
    });

    if (!existCashflow)
        return res
            .status(400)
            .json({ message: "No se encontró el movimiento" });
    // console.log("Objeto user modificar usuario creado")
    // armo el objeto

    const objCashflow = {
        id,
        date,
        description,
        income,
        outflow,
        vta_asoc,
        user_asoc,
        mov_asoc
    };

    try {
        // envio los datos al modelo sequelize para que los guarde en la database
        let newCashflow = await Cashflow.update(objCashflow, {
            where: {
                id,
            },
        });
        // si todo sale bien devuelvo el objeto agregado
        // console.log("Objeto de usuario guardado")
        res
            .status(200)
            .json({ message: "Movimiento modificado con éxito", cashflow: objCashflow });
    } catch (error) {
        // en caso de error lo devuelvo al frontend
        // console.log(error)
        res.status(400).json({ message: "No se pudo actualizar movimiento" + error });
    }
});

// Borrar movimiento
router.delete("/delete/:id", /* validateToken, */ async (req, res) => {
    const { id } = req.params;
    console.log(id);
    if (!id) return res.status(400).send({ message: "Debe ingresar movimiento" });


    const existCashflow = await Cashflow.findOne({
        where: {
            id,
        },
    });
    if (existCashflow) {
        try {
            let delCashflow = await Cashflow.destroy({
                where: {
                    id,
                },
            });
            console.log(delCashflow);
            return res
                .status(200)
                .json({ message: "Movimiento eliminado correctamente" });
        } catch (err) {
            return res
                .status(500)
                .json({ message: "No se pudo eliminar el movimiento" + err });
        }
    } else {
        return res.status(400).json({ message: "Movimiento inexistente" });
    }

});


module.exports = router;