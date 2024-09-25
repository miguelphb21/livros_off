const jwt = require('jsonwebtoken')

const autenticarMiddleware = (req, res, next)=>{
    const token = req.header('Authorization').replace('Bearer', '')


    if(!token){
        return res.status(401).send('Acessi negado. Nenhum token fornecido')
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.clientes = decoded
        next()
    }
    catch(err){
        console.error('Acesso negado. Nenhum token fornecido' + err)
        res.status(400).send('Acesso negado. Nenhum token fornecido' + err)
    }
}

module.exports = autenticarMiddleware