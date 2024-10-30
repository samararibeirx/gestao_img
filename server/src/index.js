import express from 'express';
import {mostrarImagem} from './controllers/ImagemController.js';
import{FileUpload} from 'express-fileupload'

const app = express();
const porta = 5000;

app.use(FileUpload());


app.get('/',(req,res)=>{
    res.send('API Funcionando!')
});
//CRUD imagem
app.get('/public/:nomeImg', mostrarImagem);
app.post('/Imagem', criarImagem);

app.listen(porta,()=>{
    console.log(`API Rodando na porta ${porta}`)
});