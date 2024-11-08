import React, { useEffect, useState } from 'react'

function GestaoImagem() {
    return(
        <>
        <div>
            <nav className='container'>
                <span>Logo</span>
                <ul>
                    <li></li>
                </ul>

            </nav>
        </div>
        </>
    )
    const [imagens, setImagens] = useState([]);
    useEffect(()=>{
        carregarImagens()
    },[]);
    async function carregarImagens(){
        try{
            const resposta = await fetch('http://localhost:5000/imagem',{
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            if(!resposta){
                throw new Error('Error ao buscar imagem');
            }
            const consulta = await resposta.json();
            setImagens(consulta);
        }catch(error){
            console.log('Erro ao buscar imagens', error)
        }
    }
  return (
    <div>
        <h1>Gestão Imagens</h1>
        <ul>
            {imagens.map((imagem)=>(<li key={imagem.id_imagem}><img src={`http://localhost:5000/public/${imagem.caminho}`} alt={imagem.descricao} />
            </li>
        ))}
        </ul>
    </div>
  )
}

export default GestaoImagem