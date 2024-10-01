const db = require ('../config/db.js')

const verPedido = async (req,res) =>{
    const {id} = req.params
    await db.promisse().query(
        `SELECT * FROM pedidos where id=${id}`,
        (err, response)=>{
            if(err){
                console.error('Erro na requisição: '+ err)
                res.status(400)('Erro na requisição')
                return
            }
            res.json(response)
        }
    )
}

module.exports = {
    verPedido
}