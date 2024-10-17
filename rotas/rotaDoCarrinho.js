const express = require('express')
const router = express.Router()
const middleware = require('../middlewares/middlewares.js')

const carrinhoControle = require('../controles/carrinhoControle.js')

router.get('/carrinho', middleware, carrinhoControle.verCarrinhos)
// Adiconar o item para o carrinho

router.get('/carrinho/:id_cliente', middleware, carrinhoControle.verCarrinho)

router.post('/addcarrinho/:id_cliente', middleware, carrinhoControle.addItemNoCarrinho)

router.put('/atualizarcarrinho/:id_carrinho', carrinhoControle.atualizarPedidoTodo)


router.patch('/atualizaritem/:id',carrinhoControle.fazerUmaAtualizacaoParcial)

router.delete('/deletar-item/:id', middleware, carrinhoControle.deletarItemDoCarrinho)

module.exports = router