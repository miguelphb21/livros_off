const express = require('express')
const router = express.Router()
const loginControle = require('../controles/loginControle')

// Rotas de Login/Autenticação do usuario

router.post('/registro', loginControle.registroDeUsuario)

router.post('/login', loginControle.logarUsuario)

router.post('/requerir-nova-senha',loginControle.requerirNovaSenha)

router.post('/resetar-senha', loginControle.resetarSenha)


module.exports = router