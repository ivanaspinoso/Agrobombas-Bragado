const { Router } = require('express');

// const routesqr = require("../wa/wainit") 
const contactRoutes = require('./contacts')
const configRoutes = require('./configs') 
const messagesRoutes = require('./messages')
const categoriesRoutes = require('./categories')
const usersRoutes = require('./users')

const router = Router();;

router.use('/contacts', contactRoutes)
router.use('/configs', configRoutes) 
router.use('/messages', messagesRoutes)
router.use('/categories', categoriesRoutes)
router.use('/users', usersRoutes)

router.get("/", (req,res) => {
    res.status(200).json({message:"BackEnd for WAPP Message System"})
})

module.exports = router;