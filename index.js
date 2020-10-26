const express = require("express");
const app = express();
const bodyparser=require("body-parser");
const connection = require("./database/database");
const perguntaRepository = require("./model/Pergunta")
//Database
    connection
        .authenticate()
        .then( ()=>{
            console.log("Conexão feita com banco de dados!")
        }).catch(msgErro=>{
                console.log(msgErro);
        });

//para que se use o ejs como view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

//bodypoarser
app.use(bodyparser.urlencoded({extended:false}));
//recebe dados json 
app.use(bodyparser.json());

//rotas

app.get('/',(req, res)=>{
   perguntaRepository.findAll({raw:true}).then(perguntas=>{

        res.render('index',{
            perguntas:perguntas
        });

   });
   
});

app.get('/perguntar',(req,res)=>{
    res.render('perguntar');
});

//recebe dados do formulario
app.post('/salvarpergunta',(req,res)=>{

    let titulo=req.body.titulo;
    let descricao= req.body.descricao;

    perguntaRepository.create({
        titulo:titulo,
        descricao:descricao
    }).then(()=>{   //redireciona o usuario para a tela inicial, caso seja true
        res.redirect("/");
    });
});



app.listen(8080,()=>{
    console.log("app running");
});