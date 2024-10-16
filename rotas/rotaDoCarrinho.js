const express = require('express')
const router = express.Router()
const middleware = require('../middlewares/middlewares.js')

const carrinhoControle = require('../controles/carrinhoControle.js')

// Adiconar o item para o carrinho
// C
router.get('/carrinho/:id_cliente', middleware, carrinhoControle.verCarrinho)
//R
router.post('/addcarrinho/:id_cliente', middleware, carrinhoControle.addItemNoCarrinho)
//U
router.put('/atualizarcarrinho/:id_carrinho', carrinhoControle.atualizarPedidoTodo)
//U

router.patch('/atualizaritem/:id',carrinhoControle.fazerUmaAtualizacaoParcial)
//D
router.delete('/deletarItem/:id', middleware, carrinhoControle.deletarItemDoCarrinho)

module.exports = router