const express = require('express')
const router = express.Router()

const controleDeAutenticacao = require('../controles/autentificacaoControle')

// Rotas de Login/Autenticação do usuario

router.post('/registro', controleDeAutenticacao.registroDeUsuario)

router.post('/login', controleDeAutenticacao.logarUsuario)


module.exports = router