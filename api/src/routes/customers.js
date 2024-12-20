var express = require("express");

// requiere bcrypt para asegurar user password

const bcrypt = require("bcrypt");

// Defino el modelo user para utilizarlo en las rutas correspondientes
const { Customer } = require("../models/index");

const router = express.Router();

//Obtener todos las clientes
router.get("/", /* validateToken, */ async (req, res) => {
    try {
        let getAllCustomers = await Customer.findAll({
            order: [["createdAt", "ASC"]],
        });
        console.log(getAllCustomers)
        return res.send(getAllCustomers);
    } catch (err) {
        return res.send({
            message: "No se pudieron obtener clientes" + err,
        });
    }
});

router.post("/add", async (req, res) => {
    // tomo todos los campos del form de registro de usuario
    const {
        name,
        address,
        postal_code,
        city,
        phone,
        cuit,
        email,
        web,
        birthday
    } = req.body;
    // chequeo que estén completos los 3 campos requeridos
    if (!name || name === "") {
        return res
            .status(400)
            .json({ message: "Falta ingresar nombre cliente" });
    }
    const objCust = {
        name,
        address,
        postal_code,
        city,
        phone,
        cuit,
        email,
        web,
        birthday
    };
    try {
        // envio los datos al modelo sequelize para que los guarde en la database
        let newCust = await Customer.create(objCust);
        // si todo sale bien devuelvo el objeto agregado
        console.log("Objeto de cliente guardado");
        res
            .status(200)
            .json({ message: "Cliente generado correctamente", customer: newCust });
    } catch (error) {
        // en caso de error lo devuelvo al frontend
        console.log(error);
        res.status(500).json({ message: "No se pudo crear el cliente" + error });
    }
}
)

// Actualizar datos de cliente
router.put("/update", /* validateToken, */ async (req, res) => {
    // tomo todos los campos del form de registro de usuario
    const { id,
        name,
        address,
        postal_code,
        city,
        phone,
        cuit,
        email,
        web,
        birthday } = req.body;
    // console.log(req.body.user);
    // chequeo que estén completos los 3 campos requeridos
    if (!id || id === "") {
        return res.status(400).json({ message: "Falta ingresar id de usuario" });
    }
    if (!name || name === "") {
        return res
            .status(400)
            .json({ message: "Falta ingresar nombre correspondiente" });
    }
    let existCust = await Customer.findOne({
        where: {
            id,
        },
    });

    if (!existCust)
        return res
            .status(400)
            .json({ message: "No se encontró el cliente" });
    // console.log("Objeto user modificar usuario creado")
    // armo el objeto

    const objCust = {
        name,
        address,
        postal_code,
        city,
        phone,
        cuit,
        email,
        web,
        birthday,
        id
    };

    try {
        // envio los datos al modelo sequelize para que los guarde en la database
        let newCust = await Customer.update(objCust, {
            where: {
                id,
            },
        });
        // si todo sale bien devuelvo el objeto agregado
        // console.log("Objeto de usuario guardado")
        res
            .status(200)
            .json({ message: "Cliente modificado con éxito", user: objCust });
    } catch (error) {
        // en caso de error lo devuelvo al frontend
        // console.log(error)
        res.status(400).json({ message: "No se pudo actualizar cliente" + error });
    }


});

// Borrar cliente
router.delete("/delete/:id", /* validateToken, */ async (req, res) => {
    const { id } = req.params;
    console.log(id);
    if (!id) return res.status(400).send({ message: "Debe ingresar cliente" });
    const existCust = await Customer.findOne({
        where: {
            id,
        },
    });
    if (existCust) {
        try {
            let delCust = await Customer.destroy({
                where: {
                    id,
                },
            });
            console.log(delCust);
            return res
                .status(200)
                .json({ message: "Cliente eliminada correctamente" });
        } catch (err) {
            return res
                .status(500)
                .json({ message: "No se pudo eliminar el cliente" + err });
        }
    } else {
        return res.status(400).json({ message: "Cliente inexistente" });
    }
});


module.exports = router;