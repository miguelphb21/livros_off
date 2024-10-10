const db = require ('../config/db.js')


const verPedido = async (req, res) => {

    db.query(
        
        `
        SELECT 
            clientes.nome, 
            carrinho.valor_total,
            livros.titulo,
            pedidos.pedido_entregue
        FROM 
            clientes
            INNER JOIN carrinho ON clientes.id = carrinho.id_cliente
            INNER JOIN livros ON carrinho.id_livro = livros.id
            INNER JOIN pedidos ON pedidos.pedido_entregue = pedidos.pedido_entregue
        WHERE clientes.id = ?;
        `,
        [req.params.id], // Parâmetro para filtrar por cliente
        
        (err, results) => {
            const {pedido_entregue} = req.body
            if (err) {
                console.error('Erro ao ver pedidos', err);
                res.status(500).send('Erro ao buscar pedido');
            } 

            const matriz = results
            
            const pedidosNaoEntregue = matriz.map((valor)=>{
                if (valor.pedido_entregue === 0){
                    matriz.push(valor)
                }
                return matriz
            })
            res.json(pedidosNaoEntregue)


        }
    );
};

module.exports = {
    verPedido
}