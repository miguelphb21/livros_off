const crypto = require('crypto')
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../services/emailServices.js').sendEmail;

const registroDeUsuario = async (req, res) =>{

    

    const {nome,data_de_nascimento,endereco,sexo,email,senha} = req.body

    try{
        const[existingUser] = await db.promise().query('SELECT * FROM clientes WHERE email=?',[email])
        
        if(existingUser > 0 ){
            return res.status(400).send('Usuario já cadastrado')
        }

        const senhaEncriptografada = await bcrypt.hash(senha , 10)

        await db.promise().query(
            'INSERT INTO clientes ( nome,data_de_nascimento,endereco,sexo,email,senha) VALUES (?,?,?,?,?,?)',
            [nome,data_de_nascimento,endereco, sexo,email, senhaEncriptografada]
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
const requerirNovaSenha  = async (req, res) => {
    const { email } = req.body;

    try {
        const [user] = await db.promise().query('SELECT * FROM clientes WHERE email = ?', [email]);

        if (user.length === 0) {
            return res.status(404).send('Usuário não encontrado');
        }

        const token = crypto.randomBytes(20).toString('hex'); 

        const expireDate = new Date(Date.now() + 3600000); 

        
        await db.promise().query('UPDATE clientes SET reset_password_token = ?, reset_password_expires = ? WHERE email = ?', [token, expireDate, email]);

        const resetLink = `http://localhost:3000/reset-password/${token}`; 
        sendEmail(email, 'Recuperação de Senha', `Por favor, clique no link para redefinir sua senha: ${resetLink}`);

        res.send('E-mail de recuperação de senha enviado');
    } 
    catch (err) {
        console.error('Erro ao solicitar redefinição de senha:', err);
        res.status(500).send('Erro ao solicitar redefinição de senha');
    }
};
  

const resetarSenha = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const [user] = await db.promise().query('SELECT * FROM clientes WHERE reset_password_token = ? AND reset_password_expires > NOW()', [token]);

        if (user.length === 0) {
            return res.status(400).send('Token inválido ou expirado');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10); 

        await db.promise().query('UPDATE clientes SET senha = ?, reset_password_token = NULL, reset_password_expires = NULL WHERE id = ?', [hashedPassword, user[0].id]);

        res.send('Senha redefinida com sucesso');
    } 
    catch (err) {
        console.error('Erro ao redefinir senha:', err);
        res.status(500).send('Erro ao redefinir senha');
    }
};

module.exports = {
    registroDeUsuario,
    logarUsuario,
    requerirNovaSenha,
    resetarSenha
}