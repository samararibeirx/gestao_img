import express from 'express';
import { criarImagem, deletandoImagem, downloadImagem, editarImagem, mostrarImagens, mostrarUsuario } from './controllers/ImagemController.js';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import { criarUsuario, mostrarUmUsuario } from './controllers/UsuarioController.js';



const app = express();
const porta = 5000;

app.use(fileUpload());
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('API Funcionando!')
});
//CRUD imagem
app.get('/public/:nomeImg', downloadImagem);

app.post('/imagem', criarImagem);
app.get('/Imagem',  mostrarImagens );
app.get('/imagem/:id_imagem', mostrarImagens);
app.put('/imagem/:id_imagem', editarImagem);
app.delete('/imagem/:id_imagem', deletandoImagem);

//CRUD usuario
app.post('/usuario', criarUsuario);
app.get('/usuario', mostrarUsuario);
app.get('/usuario/:id_usuario', mostrarUmUsuario);

app.listen(porta, () => {
    console.log(`API Rodando na porta ${porta}`)
});