import express from 'express';
import { criarImagem, deletandoImagem, editarImagem, mostrarImagem, mostrarImagens } from './controllers/ImagemController.js';
import fileUpload from 'express-fileupload';

const app = express();
const porta = 5000;

app.use(fileUpload());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API Funcionando!')
});
//CRUD imagem
app.get('/public/:nomeImg', mostrarImagem);

app.post('/imagem', criarImagem);
app.get('/Imagem', mostrarImagens);
app.put('/imagem/:id_imagem', editarImagem);
app.delete('/imagem/:id_imagem', deletandoImagem);

app.listen(porta, () => {
    console.log(`API Rodando na porta ${porta}`)
});