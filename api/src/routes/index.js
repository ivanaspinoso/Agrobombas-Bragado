const { Router } = require('express');

 
const contactRoutes = require('./contacts')
const configRoutes = require('./configs') 
const messagesRoutes = require('./messages')
/*
const brandsRoutes = require("./brands")
const productsRoutes = require('./products')
const ordersRoutes = require('./orders')
const mpagoRoutes = require('./mercadopago')
const ipRoutes = require('./payips')
*/

const router = Router();;

router.use('/contacts', contactRoutes)
router.use('/', configRoutes) 
router.use('/messages', messagesRoutes)
/*
router.use('/s2k/brands', brandsRoutes)
router.use('/s2k/products', productsRoutes)
router.use('/s2k/orders', ordersRoutes)
router.use('/s2k/mp', mpagoRoutes)
router.use('/s2k/payper', ipRoutes)
*/

router.get("/", (req,res) => {
    res.status(200).json({message:"BackEnd for WAPP Message System"})
})

module.exports = router;