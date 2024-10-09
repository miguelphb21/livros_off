const express = require('express')
const router = express.Router()
const livrosControles = require('../controles/pedidosControle.js')
const Middleware = require('../middlewares/middlewares')

router.get('/pedidos/:id', Middleware, livrosControles.verPedido)

module.exports = router