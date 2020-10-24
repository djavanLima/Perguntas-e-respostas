const express = require("express");
const app = express();
const bodyparser=require("body-parser");
const connection = require("./database/database");
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
app.use(bodyparser.json());

//rotas

app.get('/',(req, res)=>{

    res.render('index'); 
});

app.get('/perguntar',(req,res)=>{
    res.render('perguntar');
});


app.post('/salvarpergunta',(req,res)=>{

    let titulo=req.body.titulo;
    let descricao= req.body.descricao;

    res.send("formulário recebido!" + ` titulo: ${titulo} descricao:${descricao}`);
});



app.listen(8080,()=>{
    console.log("app running");
});