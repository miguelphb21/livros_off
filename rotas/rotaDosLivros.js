const express = require('express')
const router = express.Router()
const livrosControles = require('../controles/livroControle')
const middleware = require('../middlewares/middlewares')

router.get('/livros', middleware,livrosControles.verLivros)
// ver seu livro especifico pelo id
router.get('/livros/:id_livro', middleware,livrosControles.livroEscolhidoPeloUsuario)

router.post('/adicionar-livro',livrosControles.adicionarLivro)

router.patch('/atualizar-livro/:id',livrosControles.atualizarLivro)

router.delete('/deletar-livro/:id', livrosControles.deletarLivro)


module.exports = router