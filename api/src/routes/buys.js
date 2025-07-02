var express = require("express");

const { Buys, Supplier, User } = require("../models/index");

const { validateToken } = require("../utils/token");
const { where, fn, col, Op, literal } = require("sequelize");
const cashflows = require("../models/cashflows");

var router = express.Router();

//Obtener todos las compras
router.get("/", /* validateToken, */ async (req, res) => {
    try {
        let getAllBuys = await Buys.findAll({
            order: [["fecha", "ASC"]],
            include: [
                {
                    model: User,
                    required: true,
                },
                {
                    model: Supplier,
                    required: true,
                }]
        });
        console.log(getAllBuys)
        return res.send(getAllBuys);
    } catch (err) {
        return res.send({
            message: "No se pudieron obtener compras" + err,
        });
    }
});

//Obtener una compra por id
router.get("/byid/:id", /* validateToken, */ async (req, res) => {
    const { id } = req.params
    try {
        let getAllBuys = await Buys.findByPk(id);
        // console.log(getBuysbyId)
        return res.send(getAllBuys);
    } catch (err) {
        return res.send({
            message: "No se pudieron obtener compras" + err,
        });
    }
});

//Agregando compra
router.post("/add", async (req, res) => {
    // tomo todos los campos del form de registro de usuario
    const {
        fecha,
        provider,
        address,
        cellphone,
        noteclient,
        subtotal,
        total,
        noteadmin,
        user_asoc,
        supp_asoc,
        invoice
    } = req.body;
    // chequeo que estén completos los 3 campos requeridos
    if (!fecha || fecha === "") {
        return res
            .status(400)
            .json({ message: "Falta ingresar fecha para la compra" });
    }
    if (typeof (supp_asoc) !== "number" || supp_asoc < 0) {
        return res
            .status(400)
            .json({ message: "Falta ingresar proveedor para la compra" });
    }
    if (typeof (user_asoc) !== "number" || user_asoc < 0) {
        return res
            .status(400)
            .json({ message: "Falta ingresar usuario que carga la compra" });
    }
    if (!provider || provider === "") {
        return res
            .status(400)
            .json({ message: "Falta ingresar nombre de proveedor para la compra" });
    }
    if (typeof (total) !== "number") {
        return res
            .status(400)
            .json({ message: "Falta ingresar total para la compra" });
    }
    const objBuy = {
        fecha,
        provider,
        address,
        cellphone,
        noteclient,
        subtotal,
        total,
        noteadmin,
        userId: user_asoc,
        supplierId: supp_asoc,
        invoice
    };
    try {
        // envio los datos al modelo sequelize para que los guarde en la database
        let newBuy = await Buys.create(objBuy);
        // si todo sale bien devuelvo el objeto agregado
        console.log("Objeto de compra guardado");
        res
            .status(200)
            .json({ message: "Compra generado correctamente", buy: newBuy });
    } catch (error) {
        // en caso de error lo devuelvo al frontend
        console.log(error);
        res.status(500).json({ message: "No se pudo crear la compra" + error });
    }
}
)

//Agregando compra
router.put("/update", async (req, res) => {
    // tomo todos los campos del form de registro de usuario
    const {
        id,
        fecha,
        provider,
        address,
        cellphone,
        noteclient,
        subtotal,
        total,
        noteadmin,
        user_asoc,
        supp_asoc,
        invoice
    } = req.body;
    // chequeo que estén completos los 3 campos requeridos
    if (typeof (id) !== "number" || id < 0) {
        return res
            .status(400)
            .json({ message: "Falta ingresar id para la compra" });
    }
    if (!fecha || fecha === "") {
        return res
            .status(400)
            .json({ message: "Falta ingresar fecha para la compra" });
    }
    if (typeof (supp_asoc) !== "number" || supp_asoc < 0) {
        return res
            .status(400)
            .json({ message: "Falta ingresar proveedor para la compra" });
    }
    if (typeof (user_asoc) !== "number" || user_asoc < 0) {
        return res
            .status(400)
            .json({ message: "Falta ingresar usuario que carga la compra" });
    }
    if (!provider || provider === "") {
        return res
            .status(400)
            .json({ message: "Falta ingresar nombre de proveedor para la compra" });
    }
    if (typeof (total) !== "number") {
        return res
            .status(400)
            .json({ message: "Falta ingresar total para la compra" });
    }
    const objBuyUpd = {
        fecha,
        provider,
        address,
        cellphone,
        noteclient,
        subtotal,
        total,
        noteadmin,
        userId: user_asoc,
        supplierId: supp_asoc,
        invoice
    };
    try {
        // envio los datos al modelo sequelize para que los guarde en la database
        let updBuy = await Buys.update(objBuyUpd, {
            where: {
                id,
            },
        });

        if (updBuy[0] === 0) {
            // en caso de error lo devuelvo al frontend
            res.status(500).json({ message: "No se pudo encontrar la compra" });
        } else {
            const objBuyUpdated = await Buys.findByPk(id)
            // si todo sale bien devuelvo el objeto agregado
            console.log("Objeto de compra editado");
            res
                .status(200)
                .json({ message: "Compra editada correctamente", buy: objBuyUpdated });

        }
    } catch (error) {
        // en caso de error lo devuelvo al frontend
        console.log(error);
        res.status(500).json({ message: "No se pudo editar la compra" + error });
    }
}
)

// Eliminar compra
router.delete("/delete/:id", /* validateToken, */ async (req, res) => {
    const { id } = req.params;
    console.log("compra a borrar", id);
    if (!id) return res.status(400).send({ message: "Debe ingresar compra a eliminar" });

    const existSale = await Buys.findOne({
        where: {
            id,
        },
    });

    if (existSale) {
        try {

           let delBuy = await Buys.destroy({
                where: {
                    id,
                },
            });
            return res
                .status(200)
                .json({ message: "compra eliminada correctamente" });
        } catch (err) {
            return res
                .status(500)
                .json({ message: "No se pudo eliminar el proveedor" + err });
        }
    } else {
        return res
        .status(500)
        .json({ message: "No se pudo encontrar la compra" });

    }
 });

/* // GET /api/buys/total?supplierid=1&from=2024-01-01&to=2024-12-31
router.get('/total', async (req, res) => {
  try {
    const { supplierid, from, to } = req.query;

    if (!supplierid || !from || !to) {
      return res.status(400).json({ error: 'Faltan parámetros: supplierid, from o to' });
    }

    const filtro = {
      supplierId: supplierid,
      fecha: {
        [Op.between]: [new Date(from), new Date(to)]
      }
    };

    const totalCompras = await Buys.sum('total', { where: filtro });
    const cantidad = await Buys.count({ where: filtro });

    res.json({
      total: totalCompras || 0,
      cantidad
    });
  } catch (error) {
    console.error('Error al obtener datos de compras:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
}); */

router.get('/total', async (req, res) => {
  try {
    const { supplierid, from, to } = req.query;

    if (!supplierid || !from || !to) {
      return res.status(400).json({ error: 'Faltan parámetros' });
    }

    const where = {
      supplierId: supplierid,
      fecha: {
        [Op.between]: [new Date(from), new Date(to)]
      }
    };

    const [total, cantidad, compras] = await Promise.all([
      Buys.sum('total', { where }),
      Buys.count({ where }),
      Buys.findAll({ where, order: [['fecha', 'ASC']] })
    ]);

    res.json({
      total: total || 0,
      cantidad,
      compras
    });
  } catch (error) {
    console.error('Error al obtener datos de compras:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Eliminar varias compras
router.delete("/deletefew", /* validateToken, */ async (req, res) => {
    const { ids } = req.body;
    console.log("compras a borrar", req.body);
    if (!ids) return res.status(400).send({ message: "Debe ingresar compras a eliminar" });
    try {
        let delBuys = await Buys.destroy({ where: { id: ids }})
        return res
        .status(200)
        .json({ message: "compra eliminada correctamente" });
    } catch (err) {
        return res
        .status(500)
        .json({ message: "No se pudo eliminar las compras" + err });
    }

 });


module.exports = router;