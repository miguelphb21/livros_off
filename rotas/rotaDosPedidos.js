const express = require('express')
const router = express.Router()
const livrosControles = require('../controles/pedidosControle.js')
const autenticarMiddleware = require('../middlewares/middlewares')

router.get('/pedidos', livrosControles.verPedido)

module.exports = router