const db = require ('../config/db.js')


const verPedido = async (req, res) => {
    const {pedido_entregue} = req.body 
    const [id] = await db.promise().query('SELECT * FROM pedido WHERE pedido_entregue', [pedido_entregue]);
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
                console.error(err);
                res.status(500).send('Erro ao buscar pedido');
            } 
            else if(pedido_entregue === 0){
                res.json(results);
            }else{
                res.send('pedido entregue')
            }
        }
    );
};

module.exports = {
    verPedido
}