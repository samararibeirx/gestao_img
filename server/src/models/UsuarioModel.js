import mysql from 'mysql2/promise';
import db from '../conexao.js';

export async function createUsuario(usuario){
    console.log('usuarioModel :: crateUsuario');
    const conexao = mysql.createPool(db);

    const sql = 'INSERT INTO usuarios (login, senha, funcao) VALUES (?,?,?)';

    const params = [
        usuario.login,
        usuario.senha,
        usuario.funcao
    ];

    try{
        const[retorno]= await conexao.query(sql,params);
        return[201, {message: 'Usuário Cadastrado'}]
    }catch(error){
        console.log(error);
        return[500, {message: 'Erro ao cadastrar usuário'}]
    }
    }

    export async function readUsuario(){
        console.log('usuarioModel :: crateUsuario');
        const conexao = mysql.createPool(db);
        
        const sql = 'SELECT * FROM usuarios';

        try{
            const[retorno]= await conexao.query(sql);
            return[200,retorno];
        }catch(error){

            return[500,error]
        }
    }

    export async function showOneUsuario(id_usuario) {
        console.log('usuarioModel :: showUsuario');
        const conexao = mysql.createPool(db);

        const sql = 'SELECT * FROM usuario WHERE id_usuario=?';
        
    }

    export async function findUserByLoginPassword(login, senha) {
        console.log ('Usuario :: findUserByLoginPassword');
        const conexao = mysql.createPool(db);
        
        
    }