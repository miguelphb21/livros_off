const express = require('express')
const router = express.Router()
const middleware = require('../middlewares/middlewares.js')

const carrinhoControle = require('../controles/carrinhoControle.js')

// Adiconar o item para o carrinho
router.get('/carrinho/:id', middleware, carrinhoControle.verCarrinho)

router.post('/addcarrinho/:id', middleware, carrinhoControle.mandarParaOCarrinho)

router.put('/atualizarpedido/:id', carrinhoControle.atualizarPedidoTodo)

router.delete('/deletarItem/:id', middleware, carrinhoControle.deletarItemDoCarrinho)

module.exports = router