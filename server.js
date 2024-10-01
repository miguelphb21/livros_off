const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const db = require('./config/db')

const app = express()

app.use(bodyParser.json())
app.use(cors())


const rotasDeAutenticacao = require('./rotas/rotasDeAutenticacao')
const rotasDosLivros = require('./rotas/rotaDosLivros')
const rotasDosPedidos = require('./rotas/rotaDosPedidos')
const rotaDoCarrinho = require('./rotas/rotaDoCarrinho')

// rotas de Login
app.use('/api/auth', rotasDeAutenticacao)

// rotas de produtos
app.use('/api/livrosoff', rotasDosLivros)

// rotas do carrinho
app.use('/api/livrosoff', rotaDoCarrinho)

// rotas dos pedidos
app.use('/api/livrosoff', rotasDosPedidos)


app.get('/', (req, res)=>[
    res.send('Tudo Certo!')
])

const port = process.env.PORT || 3000;

app.listen(port, (req, res)=>{
    console.log('Servidor conectado na porta ' + port)
})
// npm i express body-parser dotenv cors mysql2 jsonwebtoken bcrypt