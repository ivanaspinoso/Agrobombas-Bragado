const { Router } = require('express');
// const companyRoutes = require("./company")
const usersRoutes = require('./users')
const familiesRoutes = require('./families')
const productsRoutes = require('./products')
const suppliersRoutes = require('./suppliers')
const customersRoutes = require("./customers")
const cashflowsRoutes = require("./cashflows")
/* 
const brandsRoutes = require("./brands")
const ordersRoutes = require('./orders')
const mpagoRoutes = require('./mercadopago')
const ipRoutes = require('./payips') 
*/
const companyRoutes = require('./companys') 


const router = Router();

router.use('/agb/users', usersRoutes)
router.use('/agb/families', familiesRoutes)
router.use('/agb/products', productsRoutes)
router.use('/agb/suppliers', suppliersRoutes)
router.use('/agb/customers', customersRoutes)
router.use('/agb/cashflows', cashflowsRoutes)
/* 
router.use('/agb/orders', ordersRoutes)
router.use('/agb/mp', mpagoRoutes)
router.use('/agb/payper', ipRoutes) 
*/
router.use('/agb/company', companyRoutes) 

router.get("/agb", (req,res) => {
    res.status(200).json({message:"BackEnd for AGROBOMBAS Bragado - Amadeo Monaco"})
})

module.exports = router;