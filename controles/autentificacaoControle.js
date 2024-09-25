const db = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registroDeUsuario = async (req, res) =>{

    // Requerindo do corpo da resposta dadas em JSON

    const {nome, sobrenome, data_de_nascimento, sexo, estado, telefone, email, senha} = req.body

    try{
        const[existingUser] = await db.promise().query('SELECT * FROM clientes WHERE email=?',[email])

        if(existingUser > 0 ){
            return res.status(400).send('Usuario já cadastrado')
        }

        const senhaEncriptografada = await bcrypt.hash(senha , 10)

        await db.promise().query(
            'INSERT INTO clientes (nome, sobrenome, data_de_nascimento, sexo, estado, telefone, email, senha) VALUES (?, ?, ?, ?, ?, ? , ?, ?)',
            [nome, sobrenome, data_de_nascimento, sexo, estado, telefone, email, senhaEncriptografada]
        )
        res.status(201).send('Usuario registrado com sucesso')
    }
    catch(err){
        console.error('Erro ao registrar usuario' + err)
        res.status(500).send('Erro ao registrar usuario')
    }

}

const logarUsuario = async (req, res) => {
    const {email, senha} = req.body
    try {
        const [clientes] = await db.promise().query('SELECT * FROM clientes WHERE email = ?',
        [email]);

        if(clientes.length === 0){
            res.status(500).send('Credenciais inválidas')
        }

        const contaExistente= await bcrypt.compare(senha, clientes[0].senha)

        if(!contaExistente){
            res.status(400).send('Conta inexistente')
        }
        const token = jwt.sign({userId: clientes[0].id}, process.env.JWT_SECRET , {expiresIn:'1h'})

        res.json({token})
    }
    catch(err){
        console.error('Erro ao autenticar usuário'  , err)
        res.status(500).send('Erro ao autenticar usuário')
    }
}

module.exports = {
    registroDeUsuario,
    logarUsuario
}