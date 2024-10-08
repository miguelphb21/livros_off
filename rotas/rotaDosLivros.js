const express = require('express')
const router = express.Router()
const livrosControles = require('../controles/livroControle')
const autenticarMiddleware = require('../middlewares/middlewares')

router.get('/', autenticarMiddleware,livrosControles.verLivros)
// ver seu livro especifico pelo id
router.get('/livros/:id', autenticarMiddleware,livrosControles.livroEscolhidoPeloUsuario)

module.exports = router