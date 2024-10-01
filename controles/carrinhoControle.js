const db = require ('../config/db.js')

// id_cliente, id_livro, quantidade, forma_de_pagamento, valor_total, data_adicao,

const verCarrinho =  (req, res)=>{
    const id = req.params
     db.promise().query(
        `SELECT * FROM carrinho WHERE id=${id}`,
        (err, results)=>{
            if(err){
                console.error('Erro na requisição:'+ err)
                res.status(400).send('Erro na requisição')
            }
            res.json(results)
        }
    )
}

const mandarParaOCarrinho = (req, res)=>{
    const { id_livro, quantidade, forma_de_pagamento,valor_total, data_adicao} = req.body;
    const {id_cliente} = req.params;

            db.query(
                `INSERT INTO carrinho (id_cliente, id_livro, quantidade, forma_de_pagamento,valor_total, data_adicao) VALUES (?, ?, ?, ?, ?, ?)`,[ id_cliente, id_livro, quantidade, forma_de_pagamento, valor_total,data_adicao],
                (err,results)=>{
                        if(err){
                            console.error('Erro ao adicionar dado')
                            res.status(500).send('Erro ao adicionar ao carrinho '+err)
                            return
                        }
                        res.status(200).send('Produto adicionado com sucesso')
                    }
            )
        
}


module.exports = {
    mandarParaOCarrinho,
    verCarrinho
}