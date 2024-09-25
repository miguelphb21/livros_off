const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const db = require('./config/db')

const app = express()

app.use(bodyParser.json())
app.use(cors())


const rotasProdutos = require('./rotas/rotas') 

const rotasDeAutenticacao = require('./rotas/rotasDeAutenticacao')

app.use('/api/produtos', rotasProdutos)
app.use('/api/auth', rotasDeAutenticacao)


app.get('/', (req, res)=>[
    res.send('Tudo Certo!')
])

const port = process.env.PORT || 3000;

app.listen(port, (req, res)=>{
    console.log('Servidor conectado na porta ' + port)
})