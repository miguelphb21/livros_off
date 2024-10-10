const db = require ('../config/db.js')

// id_cliente, id_livro, quantidade, forma_de_pagamento, valor_total, data_adicao,

const verCarrinho = (req, res)=>{
    const {id} = req.params
     db.query(
        `SELECT * FROM carrinho WHERE id=?`,
        [id],
        (err, results)=>{
            if(err){
                console.error('Erro na requisição:', err)
                res.status(400).send('Erro na requisição')
                return;
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
                            res.status(500).send('Erro ao adicionar ao carrinho '+ err)
                            return
                        }
                        res.status(200).send('Produto adicionado com sucesso')
                    }
            )
}

const atualizarPedidoTodo = (req, res)=>{
    const {id} = req.params
    const {id_livro, quantidade, forma_de_pagamento,valor_total, data_adicao} = req.body
    db.query(
        'UPDATE carrinho SET id_livro =?, quantidade = ?, forma_de_pagamento=?,valor_total=?, data_adicao=?',
        [id_livro, quantidade, forma_de_pagamento,valor_total, data_adicao,id],
        (err,results) => {
            if(err) {
                console.error('Erro ao atualizar transação', err);
                res.status(500).send('Erro ao adicionar transação');
            return;
        }
      
        // verifica se nenhuma linha foi afetada pela consulta
        if(results.affectedRows===0){
            res.status(404).send('Transação não encontrada');
            return;
        }
        res.send('Transação atualizada com sucesso');
      }
    );
}

const fazerUmaAtualizacaoParcial = (req, res) => {
    const {id} = req.params;
    const fields = req.body;
    const query = [];
    const values = [];

    for(const[key,value] of Object.entries(fields)) {
        query.push (`${key} = ?`);
        values.push(value);
    } 

    values.push(id);

    db.query(
        `UPDATE transactions SET ${query.join(',')} WHERE id = ?`,
        values,
        (err,results) => {
        if(err) {
            console.error('Erro ao atualizar transação', err);
            res.status(500).send('Erro ao adicionar transação');
        return;
        }

    // verifica se nenhuma linha foi afetada pela consulta
    if(results.affectedRows===0){
        res.status(404).send('Transação não encontrada');
        return;
    }

    res.send('Transação atualizada com sucesso');
    }
    );
};

const deletarItemDoCarrinho = (req, res)=>{
    const {id} = req.params
    db.query(
        `DELETE FROM carrinho WHERE id=?`,
        [id],
        (err, results)=>{
            if (err){
                console.error('Erro ao deletar tabela', err)
                res.status(500).send('Erro ao Deletar a tabela', err)
                return
            }
            if(results.affectedRows===0){
                res.status(404).send('Transação não encontrada');
                return;
            }
            
            res.send('Item deletado com sucesso!')
        }
    )
}

const concluirCompra = (req, res)=>{
   
}

module.exports = {
    mandarParaOCarrinho,
    verCarrinho,
    atualizarPedidoTodo,
    fazerUmaAtualizacaoParcial,
    deletarItemDoCarrinho
}