const express = require('express')
const router = express.Router()
const livrosControles = require('../controles/livrosControles')
const controleDeAutenticacao = require('../controles/autentificacaoControle')
const autenticarMiddleware = require('../middlewares/middlewares')

router.get('/',autenticarMiddleware,livrosControles.verLivros)
router.post('/adicionarEstoque', autenticarMiddleware,livrosControles.adicionarLivroNoEstoque)



module.exports = router
