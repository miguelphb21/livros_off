const db = require ('../config/db.js')

// id_cliente, id_livro, quantidade, forma_de_pagamento, valor_total, data_adicao,

const verCarrinho = (req, res)=>{
    const {id_cliente} = req.params
     db.query(
            `SELECT 
            carrinho.id,
            clientes.nome, 
            livros.titulo, 
            carrinho.quantidade, 
            livros.preco * carrinho.quantidade AS valor_total,
            carrinho.data_criacao
            FROM clientes
            INNER JOIN carrinho  ON clientes.id = carrinho.id_cliente
            left JOIN livros ON livros.id = carrinho.id_livro
            where clientes.id= ?` ,
        [id_cliente],
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

const addItemNoCarrinho = (req, res)=>{
    const dataAtual = new Date()
    const {id_cliente} = req.params  
    const {id_livro, quantidade} = req.body
    const data_criacao = `${dataAtual.getFullYear()}${dataAtual.getMonth() + 1}${dataAtual.getDate()}`
    db.query(
        `insert into carrinho (id_cliente, id_livro, data_criacao, quantidade) values (?,?,?,?)`,
        [id_cliente, id_livro,data_criacao, quantidade],
        (err, results)=>{
            if (err){
                console.error('Erro ao adicionar item', err)
                res.status(500).send('erro ao adicionar item')
                return;
            }
            res.status(201).send('Item adicionado com sucesso')
        }
    )
   
}

const atualizarPedidoTodo = (req, res)=>{
    const dataAtual = new Date()
    const {id_carrinho} = req.params
    const {id_cliente,id_livro ,quantidade} = req.body 
    const data_criacao = `${dataAtual.getFullYear()}${dataAtual.getMonth() + 1}${dataAtual.getDate()}`
        
    db.query(
        'UPDATE carrinho SET id_cliente=?, id_livro=?, data_criacao=?,quantidade=? WHERE id=?',
        [id_cliente, id_livro,data_criacao , quantidade, id_carrinho],
        (err,results)=>{
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

            res.send('Atualizado com sucesso')
        }
    )

}

const fazerUmaAtualizacaoParcial = (req, res) => {
    const {id} = req.params;
    const campos = req.body;
    const query = [];
    const values = [];

    for(const[key,value] of Object.entries(campos)) {
        query.push (`${key} = ?`);
        values.push(value);
    } 

    values.push(id);

    db.query(
        `UPDATE carrinho SET ${query.join(',')} WHERE id = ?`,
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



module.exports = {
    addItemNoCarrinho,
    verCarrinho,
    atualizarPedidoTodo,
    fazerUmaAtualizacaoParcial,
    deletarItemDoCarrinho
}