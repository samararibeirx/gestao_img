import path from 'path';
import url from 'url';
import mysql from 'mysql2/promise';
import fs from 'fs/promises';
import db from '../conexao.js';


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createImagem(descricao, nomeImg, imagem) {
    const conexao = mysql.createPool(db);
    console.log('ImagemModel :: createImagem');
    const sql = 'INSERT INTO imagem (descricao, caminho) VALUES (?,?);';
    const params = [descricao, nomeImg];

    try {
        await imagem.mv(path.join(__dirname, '..', '..', 'public', 'img', nomeImg));
        const [retorno] = await conexao.query(sql, params);
        return [201, 'Imagem Cadastrada']


    } catch (error) {

        console.log(error);
        return [500, error];

    }
}

export async function readImagem() {
    const conexao = mysql.createPool(db);
    console.log('ImagemModel :: readImagem');
    const sql = 'SELECT *FROM imagem';

    try {
        const [retorno] = await conexao.query(sql);
        return [200, retorno]
    } catch (error) {
        console.log(error);
        return [500, error];
    }
}

export async function updateImagem(descricao, id_imagem) {
    const conexao = mysql.createPool(db);
    const sql = 'UPDATE imagem SET descricao=? WHERE id_imagem = ?';
    const params = [descricao, id_imagem];


    try {
        const [retorno] = await conexao.query(sql, params);

        if (retorno.affectedRows < 1) {
            return [404, { message: 'Imagem não encontrada' }];
        }

        return [200, { message: 'Imagem atualizada' }];
    } catch (error) {

        console.log(error);
        return [500, error];
    }


}

export async function deletarImagem( id_imagem) {
    console.log('ImagemModel :: deletarImagem');
    const conexao = mysql.createPool(db);
    const sql = 'DELETE FROM imagem WHERE id_imagem = ?';
    const params = [ id_imagem];


    try {
        const [retorno] = await conexao.query(sql, params);

        if (retorno.affectedRows < 1) {
            return [404, { message: 'error ao deletar' }];
        }

        return [200, { message: 'Imagem deletada' }];
    } catch (error) {

        console.log(error);
        return [500, error];
    }


}