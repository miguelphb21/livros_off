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
    const {id_livro} = req.params
    
    
    db.query(
        'SELECT * FROM livros WHERE id=?', [id_livro],
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



const adicionarLivro = async (req, res)=>{

    const {titulo, genero, preco, id_autor, quantidade} = req.body

        db.query(
            `insert into livros (titulo, genero, preco , id_autor) values (?,?,?)`,
            [titulo, genero, id_autor],
            (err,results)=>{
                if(err){
                    console.error('Erro ao adicionar' ,err)
                    res.status(500).send('Erro ao adicionar conta')
                    return
                }
                res.status(201).send('Livro adicionado com sucesso')
            }
        )
        db.query(
            'select * from livros',
            (err,results)=>{
                if(err){
                    console.error('Erro ao ler dado' ,err)
                    res.status(404).send('erro na requisição', err)
                    return
                }
                
                const id_livro = results[results.length-1].id

                db.query(
                    'insert into estoque (id_livro, quantidade) values (?,?)',
                    [id_livro,  quantidade],
                    (err, results)=>{
                        if(err){
                            console.error('erro ao adicionar item' ,err)
                            res.status(500).send('Erro ao adicioanr livro')
                            return
                        }
                        res.send('Tudo certo!Livro adicionado')
                    }
                ) 
            }
        )
}

const atualizarLivro= (req, res) => {
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
        `UPDATE livros SET ${query.join(',')} WHERE id = ?`,
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

const deletarLivro = (req, res)=> {

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
                res.status(404).send('Livro não encontrado');
                return;
            }
            
            res.send('Livro deletado com sucesso!')
        }
    )
}




module.exports = {

    // modficação nos dados dos livros
    verLivros,
    // Mostrar livro preciso
    livroEscolhidoPeloUsuario,
    // adiciona o livro e altera também o estoque
    adicionarLivro,
    atualizarLivro,
    deletarLivro

    
}