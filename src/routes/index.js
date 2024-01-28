const express = require('express');
const router = express.Router();
const userRouter = require('./user.router')
const productRouter = require('./product.router')
const imageRouter = require('./image.router')
const categoryRouter = require('./category.router')
const productCartRouter = require('./productCart.router')
const purchasesRouter = require('./purchase.router')

// colocar las rutas aquí
router.use(userRouter)
router.use(productRouter)
router.use(imageRouter)
router.use(categoryRouter)
router.use(productCartRouter)
router.use(purchasesRouter)

module.exports = router;