const express = require('express')
const router = express.Router()
const loginControle = require('../controles/loginControle')

// Rotas de Login/Autenticação do usuario

router.get('/clientes',loginControle.verTodosCLientes)

router.get('/clientes/:id'), loginControle.verCLientesSelecionados

router.post('/registro', loginControle.registroDeUsuario)

router.post('/login', loginControle.logarUsuario)

router.post('/requerir-nova-senha',loginControle.requerirNovaSenha)

router.post('/resetar-senha', loginControle.resetarSenha)

router.patch('/atualizar-conta/:id', loginControle.atualizarLogin)

router.delete('/deletar-conta/:id', loginControle.deletarUsuario)

module.exports = router

