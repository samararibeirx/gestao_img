import path from 'path';
import url from 'url';

const __fileName = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

export async function criarImagem(req,res){
    console.log('ImagemController :: Criando Imagem')
    const {descricao} = req.body;
    const (imagem) = req.files;

    if (!descricao || imagem){
        res.status(400).json({message:'imagem e descrição são obrigatorios'});
    }else{
        const extensao = path.extname(imagem.name).toLocaleLowerCase();
        const extensoesPermitidas = ['.jpg','png','.jpeg'];

        if(){

        }else{
            res.status(415).json({message:'arquivo invalido!'})
        }
    }
}

export async function mostrarImagem(req,res) {
    console.log('ImagemController :: Mostrando Imagem')

    const {nomeImg} = req.params;
    const caminho = path.join(__dirname,'..','..','public','img', nomeImg);

    console.log(caminho);

    res.sendFile(caminho,(erro)=>{
        if(erro){
            console.log(erro)
            res.status(404).json({mensage:'Imagem não encontrada'})
        }
    });

}