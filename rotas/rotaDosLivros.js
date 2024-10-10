const express = require('express')
const router = express.Router()
const livrosControles = require('../controles/livroControle')
const middleware = require('../middlewares/middlewares')

router.get('/livros', middleware,livrosControles.verLivros)
// ver seu livro especifico pelo id
router.get('/livros/:id', middleware,livrosControles.livroEscolhidoPeloUsuario)

module.exports = router