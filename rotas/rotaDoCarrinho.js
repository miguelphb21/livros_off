const express = require('express')
const router = express.Router()
const middleware = require('../middlewares/middlewares.js')

const carrinhoControle = require('../controles/carrinhoControle.js')

// Adiconar o item para o carrinho
router.get('/vercarrinho/:id', middleware,carrinhoControle.verCarrinho)

router.post('/carrinho/:id_cliente', middleware,carrinhoControle.mandarParaOCarrinho)

module.exports = router