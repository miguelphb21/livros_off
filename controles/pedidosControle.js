const db = require ('../config/db.js')

const verTodosOsPedidos = (req, res)=>{
    db.query(
        `SELECT 
            clientes.nome, 
            carrinho.valor_total,
            livros.titulo,
            pedidos.pedido_entregue
        FROM 
            clientes
        INNER JOIN carrinho ON clientes.id = carrinho.id_cliente
        INNER JOIN livros ON carrinho.id_livro = livros.id
        INNER JOIN pedidos ON pedidos.pedido_entregue = pedidos.pedido_entregue;`,
        (err, results)=>{
            if(err){
                console.error('Erro ao buscar dados', err)
                res.status(404).send('Erro ao ao buscar dados')
                return 
            }
            res.json(results)
        }
    )
}

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
            
            if (err) {
                console.error('Erro ao ver pedidos', err);
                res.status(500).send('Erro ao buscar pedido');
            } 
            
            const matriz = results
            const pedidosEmRota = []

            function pedidosNaoEntregue(){
                for (let i = 0; i <= matriz.length -1 ; i++){

                    if (matriz[i].pedido_entregue === 0){
                        pedidosEmRota.push(matriz[i])
                    }

                }
                return pedidosEmRota
            }

            res.json(pedidosNaoEntregue())

        }
    );
};

// const verPedido = async (req, res) => {

//     db.query(
        
//         `
//         SELECT 
//             clientes.nome, 
//             carrinho.valor_total,
//             livros.titulo,
//             pedidos.pedido_entregue
//         FROM 
//             clientes
//             INNER JOIN carrinho ON clientes.id = carrinho.id_cliente
//             INNER JOIN livros ON carrinho.id_livro = livros.id
//             INNER JOIN pedidos ON pedidos.pedido_entregue = pedidos.pedido_entregue
//         WHERE clientes.id = ?;
//         `,
//         [req.params.id], // Parâmetro para filtrar por cliente
        
//         (err, results) => {
            
//             if (err) {
//                 console.error('Erro ao ver pedidos', err);
//                 res.status(500).send('Erro ao buscar pedido');
//                 return
//             } 
            
//             const matriz = results
//             const pedidosEmRota = []

//             function pedidosNaoEntregue(){
//                 for (let i = 0; i <= matriz.length -1 ; i++){

//                     if (matriz[i].pedido_entregue === 0){
//                         pedidosEmRota.push(matriz[i])
//                     }
                    
//                 }
//                 return pedidosEmRota
//             }

//             res.json(pedidosNaoEntregue())

//         }
//     );
// };

module.exports = {
    verTodosOsPedidos,
    verPedido
}