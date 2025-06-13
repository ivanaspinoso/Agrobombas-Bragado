var express = require("express");

const { Sales, Cashflow, Caccounts, User, Customer, OrderLine, Product } = require("../models/index");

const { validateToken } = require("../utils/token");
const { where, fn, col, Op, literal } = require("sequelize");
const cashflows = require("../models/cashflows");

var router = express.Router();

//Obtener todos las ventas
router.get("/", /* validateToken, */ async (req, res) => {
    try {
        let getAllSales = await Sales.findAll({
            order: [["fecha", "ASC"]],
            include: [
                {
                    model: User,
                    required: true,
                },
                {
                    model: Customer,
                    required: true,
                },
                {
                    model: OrderLine,
                    required: true,
                }, 
            ]
        });
        console.log(getAllSales)
        return res.send(getAllSales);
    } catch (err) {
        return res.send({
            message: "No se pudieron obtener ventas" + err,
        });
    }
});

//Obtener una venta por id
router.get("/byid/:id", /* validateToken, */ async (req, res) => {
    const {id} = req.params
    try {
        let getAllSales = await Sales.findAll({
            order: [["fecha", "ASC"]],
            where: {id},
            include: [
                {
                    model: User,
                    required: true,
                },
                {
                    model: Customer,
                    required: true,
                },
                {
                    model: OrderLine,
                    required: true,
                }, 
            ]
        });
         let getAllCaccountsXSale = await Caccounts.findAll({
            where: {vta_asoc: id}
        })
        let getAllCashflowXSale= await Cashflow.findAll({
            where: {vta_asoc: id}
        })
        let ventaObj = {
            venta: getAllSales
        }
        let addCaccounts = {...ventaObj, caccounts: getAllCaccountsXSale}
        let addCashflows = {...addCaccounts, cashflow: getAllCashflowXSale} 
        let objVentaTotal = addCashflows
        // console.log(getSalesbyId)
        return res.send(objVentaTotal);
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
        orderlines,
        client_asoc
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
        noteadmin,
        userId: user_asoc,
        customerId: client_asoc
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
                note: notapaga,
                vta_asoc: newSale.id,
                user_asoc: user_asoc,
                userId: user_asoc,
                saleId: newSale.id
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
            const objCaccount = {
                date: fecha,
                description: "Movimiento Automatico de cuenta por venta " + newSale.id,
                income: resta,
                vta_asoc: newSale.id,
                user_asoc: user_asoc,
                client_asoc,
                userId: user_asoc,
                customerId: client_asoc,
                saleId: newSale.id
            };
            try {
                // envio los datos al modelo sequelize para que los guarde en la database
                let newCaccount = await Caccounts.create(objCaccount);
                // si todo sale bien devuelvo el objeto agregado
                console.log("Objeto de movimiento de cuenta guardado", newCaccount);
                /* res
                    .status(200)
                    .json({ message: "Movimiento generado correctamente", cashflow: newCashflow }); */
            } catch (error) {
                // en caso de error lo devuelvo al frontend
                console.log(error);
                res.status(500).json({ message: "No se pudo crear el movimiento" + error });
            }

        }
        if (orderlines.length > 0) {
            orderlines.map(async (linea) => {
                const objOrderline = {
                    productId: linea.id,
                    article: linea.article,
                    name: linea.name,
                    cost: linea.cost,
                    price: linea.price,
                    quantity: linea.quantity,
                    subtotal: linea.subtotal,
                    saleId: newSale.id
                };
                console.log(objOrderline)
                try {
                    // envio los datos al modelo sequelize para que los guarde en la database
                    let newOrderline = await OrderLine.create(objOrderline);
                    // si todo sale bien devuelvo el objeto agregado
                    console.log("Objeto de linea de venta", newOrderline);
                    /* res
                        .status(200)
                        .json({ message: "Movimiento generado correctamente", cashflow: newCashflow }); */
                } catch (error) {
                    // en caso de error lo devuelvo al frontend
                    console.log(error);
                    res.status(500).json({ message: "No se pudo crear el movimiento" + error });
                }
                console.log("id de producto", linea.id)
                let newProdToStock = await Product.findOne(
                    { where: { id: linea.id } },
                )
                try {
                    let newStock = await Product.update({ stock: newProdToStock.stock - linea.quantity },
                        { where: { id: linea.id } },
                    )
                    // envio los datos al modelo sequelize para que los guarde en la database
                    // let newStock = await OrderLine.findOne(objOrderline);
                    // si todo sale bien devuelvo el objeto agregado
                    console.log("Cambio de stock generado coreectamente", newStock);
                    // res
                    //    .status(200)
                    //    .json({ message: "Movimiento generado correctamente", cashflow: newCashflow });
                } catch (error) {
                    // en caso de error lo devuelvo al frontend
                    // console.log(error);
                    res.status(500).json({ message: "No se pudo cambiar el stock" + error });
                }
            })
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


// Eliminar proveedor
router.delete("/delete/:id", /* validateToken, */ async (req, res) => {
    const { id } = req.params;
    console.log("venta a borrar", id);
    if (!id) return res.status(400).send({ message: "Debe ingresar venta a eliminar" });

    /*     let producSocios = await Supplier.findAll({
            where: { id: id },
            include: { model: Product },
        }).then((s) => {
            if (s[0] && s[0].products.length > 0) {
                return s[0].products.length
            } else return 0
        }); */

    const existSale = await Sales.findOne({
        where: {
            id,
        },
    });

    /*     if (producSocios > 0) {
            return res.status(400).json({ message: "No se puede eliminar, productos asociados" })
        } else {
     */
    if (existSale) {
        try {
            let lineasventa = await OrderLine.findAll({
                where: {
                    saleId: id,
                },
            })
            console.log("lineas de venta",lineasventa.length);
            lineasventa.map(async (linea) => {
                console.log("id de producto", linea.productId)
                let newProdToStock = await Product.findOne(
                    { where: { id: linea.productId } },
                )
                console.log("productos obtenidos", newProdToStock.length);
                try {
                    let newStock = await Product.update({ stock: newProdToStock.stock + linea.quantity },
                        { where: { id: linea.productId } },
                    )
                    // envio los datos al modelo sequelize para que los guarde en la database
                    // let newStock = await OrderLine.findOne(objOrderline);
                    // si todo sale bien devuelvo el objeto agregado
                    console.log("Cambio de stock generado coreectamente", newStock);
                    // res
                    //    .status(200)
                    //    .json({ message: "Movimiento generado correctamente", cashflow: newCashflow });
                } catch (error) {
                    // en caso de error lo devuelvo al frontend
                    // console.log(error);
                    res.status(500).json({ message: "No se pudo cambiar el stock" + error });
                }
            })
            try {
                // envio los datos al modelo sequelize para que los guarde en la database
                let delCaccount = await Caccounts.destroy({
                    where: {
                        vta_asoc: id,
                    },
                });
                // si todo sale bien devuelvo el objeto agregado
                console.log("Objeto de movimiento de cuenta guardado", delCaccount);
                /* res
                    .status(200)
                    .json({ message: "Movimiento generado correctamente", cashflow: newCashflow }); */
            } catch (error) {
                // en caso de error lo devuelvo al frontend
                console.log(error);
                res.status(500).json({ message: "No se pudo crear el movimiento" + error });
            }
            try {
                // envio los datos al modelo sequelize para que los guarde en la database
                let delCashflow = await Cashflow.destroy({
                    where: {
                        vta_asoc: id,
                    },
                });
                // si todo sale bien devuelvo el objeto agregado
                console.log("Objeto de movimiento de cuenta guardado", delCashflow);
                /* res
                    .status(200)
                    .json({ message: "Movimiento generado correctamente", cashflow: newCashflow }); */
            } catch (error) {
                // en caso de error lo devuelvo al frontend
                console.log(error);
                res.status(500).json({ message: "No se pudo crear el movimiento" + error });
            }
            let dellines = await OrderLine.destroy({
                where: {
                    saleId: id,
                },
            });
             let delSale = await Sales.destroy({
                where: {
                    id,
                },
            });
               console.log(lineasventa);
            return res
                .status(200)
                .json({ message: "Venta eliminada correctamente" });
        } catch (err) {
            return res
                .status(500)
                .json({ message: "No se pudo eliminar el proveedor" + err });
        }
/*         } else {
            return res.status(400).json({ message: "Proveedor inexistente" });
        }
 */    }
});

router.get('/products-summary', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'startDate y endDate son requeridos en la query' });
    }

    const productSummary = await OrderLine.findAll({
      attributes: [
        'name',
        [fn('SUM', col('quantity')), 'vendidos'],
        [fn('SUM', col('orderline.subtotal')), 'venta'],
                [fn('SUM', col('cost')), 'costo'],
                        [literal('SUM(orderline.subtotal) - SUM(cost)'), 'ganancia'],
      ],
      include: [{
        model: Sales,
        attributes: [],
        where: {
          fecha: {
            [Op.between]: [startDate, endDate]
          }
        }
      }],
      group: ['name'],
      raw: true
    });

   // 2. Obtener cantidad de ventas en el rango
    const totalSales = await Sales.count({
      where: {
        fecha: {
          [Op.between]: [startDate, endDate]
        }
      }
    });

    // 3. Calcular totales generales
    const totalProducts = productSummary.length;
    let sumSubtotal = 0;
    let sumCost = 0;
    let sumProfit = 0;

    productSummary.forEach(p => {
      sumSubtotal += parseFloat(p.venta);
      sumCost += parseFloat(p.costo);
      sumProfit += parseFloat(p.ganancia);
    });

    const response = {
      summary: {
        requestDate: new Date().toISOString().split('T')[0],
        startDate,
        endDate,
        totalSales,
        totalProducts,
        sumSubtotal: sumSubtotal.toFixed(2),
        sumCost: sumCost.toFixed(2),
        sumProfit: sumProfit.toFixed(2)
      },
      products: productSummary
    };

    res.json(response);

    // res.json(results);
  } catch (error) {
    console.error('Error en /products-summary:', error);
    res.status(500).json({ error: 'Error al generar el resumen de productos' });
  }
});


module.exports = router;