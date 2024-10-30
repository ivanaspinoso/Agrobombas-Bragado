var express = require("express");

// Defino el modelo user para utilizarlo en las rutas correspondientes
const { Family, Product } = require("../models/index");

// Defino la validación de token para trabajar con estas rutas

const { validateToken } = require("../utils/token")

var router = express.Router();

router.post("/add", /* validateToken, */ async (req, res) => {
    const { name, description } = req.body;
    console.log(req.body);
    const objCatAdd = {
        name,
        description
    };
    const existCat = await Family.findOne({
        where: {
            name
        },
    });
    if (!existCat) {
        try {
            let newFamily = await Family.create(objCatAdd); // envio los datos al modelo sequelize para que los guarde en la database
            return res.status(200).json(newFamily);
        } catch (err) {
            // en caso de error lo devuelvo al frontend
            return res.send({
                message: "No se pudo guardar la categoría" + err,
            });
        }
    } else {
        return res.status(400).send({ message: "Categoría existente" });
    }
});

router.put("/update", async (req, res) => {
    const { id, name, description } = req.body;
    console.log(req.body);
    if (!name || name === "") {
        return res
            .status(400)
            .json({ error: "Falta ingresar categoría correspondiente" });
    }
    const objCatUpd = {
        id,
        name,
        description
    };
    try {
        const existCat = await Family.findOne({
            where: {
                id
            },
        });
        if (existCat) { // envio los datos al modelo sequelize para que los guarde en la database
            let updCat = await Family.update(objCatUpd, {
                where: {
                    id,
                },
            });
            res.send(objCatUpd); // si todo sale bien devuelvo el objeto agregado
        } else {
            res.send("No se encontró familia")
        }


    } catch (err) {
        // en caso de error lo devuelvo al frontend
        console.log(err);
        res.status(400).json({ error: err });
    }
});

//Obtener todas las categorías
router.get("/", /* validateToken, */ async (req, res) => {
    try {
        let getAllCategories = await Family.findAll({
            order: [["name", "ASC"]],
        });
        return res.send(getAllCategories);
    } catch (err) {
        return res.send({
            message: "No se pudieron obtener las categorías" + err,
        });
    }
});

//Obtener categoría por id
router.get("/:id", validateToken, async (req, res) => {
    const { id } = req.params;
    try {
        let getFamily = await Family.findOne({
            where: {
                id,
            },
        });
        return res.send(getFamily);
    } catch (err) {
        return res.send({
            message: "No se pudo obtener la categoría" + err,
        });
    }
});

// Borrar categoria
router.delete("/delete/:id", /* validateToken, */ async (req, res) => {
    const { id } = req.params;
    console.log(id);
    if (!id) return res.status(400).send({ message: "Debe ingresar categoría" });

    let producSocios = await Family.findAll({
        where: { id: id },
        include: { model: Product },
    }).then((s) => {
        if (s[0] && s[0].products.length > 0) {
            return s[0].products.length
        } else return 0
    });

    const existCat = await Family.findOne({
        where: {
            id,
        },
    });

    if (producSocios > 0) {
        return res.status(400).json({ message: "No se puede eliminar, productos asociados" })
    } else {
        if (existCat) {
            try {
                let delFamily = await Family.destroy({
                    where: {
                        id,
                    },
                });
                console.log(delFamily);
                return res
                    .status(200)
                    .json({ message: "Categoria eliminada correctamente" });
            } catch (err) {
                return res
                    .status(500)
                    .json({ message: "No se pudo eliminar la categoría" + err });
            }
        } else {
            return res.status(400).json({ message: "Categoría inexistente" });
        }
    }
});

module.exports = router;
