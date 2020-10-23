const express = require("express");
const app = express();

//para que se use o ejs como view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/',(req, res)=>{

    res.render('index'); 
});

app.get('/perguntar',(req,res)=>{
    res.render('perguntar');
});


app.get('/salvarpergunta');



app.listen(8080,()=>{
    console.log("app running");
});