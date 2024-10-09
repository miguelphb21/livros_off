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

const livroEscolhidoPeloUsuario = (req, res)=>{
    const {id} = req.params
    
    db.query(
        'SELECT * FROM livros WHERE id=?', [id],
        (err, results)=>{
            if (err){
                console.error('erro ao requerer livro')
                res.status(500)('Erro ao requerir livro')
                return
            }
            res.json(results)
        }
    );
}



module.exports = {

    // modficação nos dados dos livros
    verLivros,
    // Mostrar livro preciso
    livroEscolhidoPeloUsuario


    // adicionarLivroNoEstoque,
    // adicionarLivroNaLoja,
    
}