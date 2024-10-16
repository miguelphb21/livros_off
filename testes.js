// const adicionarLivros = (req, res)=>{
//     const {titulo, genero,id_autor} = req.body
//     db.query(
//         `insert into livros (titulo, genero, id_autor) values (?,?,?)`,
//         [titulo, genero, id_autor]
//     , (err, results)=>{
//         if(err){
//             console.error('ERRO AO ADICIONAR ITEM', err)
//             res.status(500).send('erro ao adicionar livro', err)
//             return
//         }
//         res.status(201).send('Livro adicionado com sucesso!')
//     })
// }}

/* 
    {
        "email":"gabrielphb@gmail.com",
        "senha":"kevindvd21"
    }, 
    {
        "email":"miguelphb14@gmail.com",
        "senha":"migueldsds21"
    },
    {
        "email": "matheusmonteiro@gmail.com", 
        "senha": "matheuscarros"
    }
*/   