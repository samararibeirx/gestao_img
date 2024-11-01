import path from 'path';
import url from 'url';
import { createImagem, readImagem,deletarImagem } from '../models/ImagemModel.js';
import { updateImagem } from '../models/ImagemModel.js';



const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function criarImagem(req, res) {
    console.log('ImagemController :: Criando Imagem')
    const { descricao } = req.body;
    const { imagem } = req.files;

    if (!descricao || !imagem) {
        res.status(400).json({ message: 'Imagem e descrição são obrigatórios' });

    } else {
        const extensao = path.extname(imagem.name).toLocaleLowerCase();
        const extensoesPermitidas = ['.jpg', '.png', '.jpeg'];

        if (extensoesPermitidas.includes(extensao)) {
            const nomeImg = `${Date.now()}${extensao}`;

            try {

                const [status, resposta] = await createImagem(descricao, nomeImg, imagem);
                res.status(status).json(resposta);

            } catch (error) {
                console.log(error);
                res.status(500).json({ message: 'ImagemController :: Erro' });


            }


        } else {
            res.status(415).json({ message: 'Arquivo invalido!' })
        }
    }
}

export async function mostrarImagens(req, res) {
    console.log('ImagemController :: Mostrando lista de Imagem')

    try {
        const [status, resposta] = await readImagem();
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'ImagemController :: Erro' });
    }
}
export async function editarImagem(req, res) {
    console.log('ImagemController :: Editando lista de Imagem')

    const { id_imagem } = req.params;
    const { descricao } = req.body;
    try {
        const [status, resposta] = await updateImagem(descricao, id_imagem);
        res.status(status).json(resposta);

    } catch (error) {
        console.log(error);
        res.status(500)
    }

}

export async function deletandoImagem(req, res) {
    console.log('ImagemController :: Deletando Imagem')
    console.log(req.params);
    const { id_imagem } =await req.params;

    try {
        const [status, resposta] = await deletarImagem(id_imagem);
        res.status(status).json(resposta);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'ImagemController :: error' })
    }

}


export async function mostrarImagem(req, res) {
    console.log('ImagemController :: Mostrando Imagem')

    const { nomeImg } = req.params;
    const caminho = path.join(__dirname, '..', '..', 'public', 'img', nomeImg);

    console.log(caminho);

    res.sendFile(caminho, (erro) => {
        if (erro) {
            console.log(erro)
            res.status(404).json({ message: 'Imagem não encontrada' })
        }
    });
}