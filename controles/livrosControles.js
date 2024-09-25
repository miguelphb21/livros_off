const db = require('../config/db.js')


const verLivros = (req, res) => {
    db.query('SELECT * FROM livros',
    (err, results)=>{
        if(err){
            console.error('Erro ao requerir os livros: ', err)
            res.status(500)('Erro ao requerir o livro')
            return
        }
    res.json(results)
    }
    )
}

const adicionarLivroNoEstoque= (req, res)=>{
    const {} = req.body
    db.query(
        'SELECT * FROM estoque where ',[],
        (err,results)=>{
            if(err){
                console.log('Erro ao adicionar livro:', err)
                res.status(500).send('erro ao requerir livro')
            }

            if(results.length>0){
                res.status(400).send('esse livro já existe')
            }
        
            db.query(
                'INSERT INTO estoque (nome,quantidade,valor_de_custo,data_da_compra) VALUES (?,?,?,?)',
                [],
                (err,results) => {
                    if(err) {
                        console.error('Erro ao adicionar transação', err);
                        res.status(500).send('Erro ao adicionar transação');
                        return;
                    }          
                    res.status(201).send('Transação adicionada com sucesso');
                }
            );
        }
    )
}

const adicionarLivroNaLoja = (req, res)=>{
    db.query(
        
    )
}


module.exports = {

    // modficação nos dados dos livros
    verLivros,
    adicionarLivroNoEstoque,
    adicionarLivroNaLoja



}