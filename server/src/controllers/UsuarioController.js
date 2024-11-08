import { readUsuario, showOneUsuario } from "../models/UsuarioModel";


export async function criarUsuario(req, res) {
    console.log('usuarioController :: criarUusario');
    const usuario = req.body;

    if (!usuario.login || !usuario.senha || usuario.funcao) {
        res.status(400).json({ message: 'Login, senha e funcao são obrigatórios' })
    } else {
        try {
            const [status, resposta] = await create
            res.status(status).json(resposta);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Erro ao criar usuario' })
        }

    }
}

export async function mostrarUsuarios(req, res) {
    console.log('usuarioController :: mostrarUusario');

    try {
        const [status, resposta] = await readUsuario();
        res.status(status).json(resposta);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao mostrar usuarios' })
    }
}

export async function mostrarUmUsuario(req, res) {
    console.log('UsuarioController :: mostrarUmUsuario');
    const { id_usuario } = req.params;

    if (!id_usuario) {
        res.staus(400).json({ message: 'id inválido' })

    } else {
        try {
            const [status, resposta] = await showOneUsuario(id_usuario);
            res.status(status).json(resposta);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao mostrar um usuário' })

        }
    }
}