const express = require('express')
const router = express.Router()
const livrosControles = require('../controles/livrosControles')
const controleDeAutenticacao = require('../controles/autentificacaoControle')

// Rotas de Login/Autenticação do usuario

router.post('/registro', controleDeAutenticacao.registroDeUsuario)

router.get('/login', controleDeAutenticacao.logarUsuario)


module.exports = router