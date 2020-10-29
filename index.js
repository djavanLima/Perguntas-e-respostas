const express = require("express");
const app = express();
const bodyparser=require("body-parser");
const connection = require("./database/database");
const perguntaRepository = require("./model/Pergunta");
const respostaRepository = require('./model/Resposta');

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
   perguntaRepository.findAll({raw:true,order:[
       ['id','DESC']// ORDENAÇÃO POR ID E DECRESCENTE
   ] }).then(perguntas=>{

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

    respostaRepository.create({
        titulo:titulo,
        descricao:descricao
    }).then(()=>{   //redireciona o usuario para a tela inicial, caso seja true
        res.redirect("/");
    });
});


//redireciona para a pagina sobre a perguna em questão

app.get('/pergunta/:id',(req,res)=>{
    var id = req.params.id;
    perguntaRepository.findOne({
        where:{id:id}// condição para selecionar por id, entretanto, posso selecionar por qualquer coisa
    }).then(pergunta=>{
        if(pergunta!= undefined)// pergunta encontrada
        {

            respostaRepository.findAll({
                where:{perguntaId: pergunta.id}
            }).then(respostas =>{

                res.render('pergunta',{
                    pergunta:pergunta,
                    respostas:respostas
                });

            } );


            
        }else
        {//não encontrado
            res.redirect('/'); //redireciona
        }
    });

});



app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    respostaRepository.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId);
    })
});



app.listen(8080,()=>{
    console.log("app running");
});