const db = require ('../config/db.js')

const verTodosOsPedidos = (req, res)=>{
    db.query(
        "select * from pedidos"
        ,
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


module.exports = {
    verTodosOsPedidos,
    verPedido
}