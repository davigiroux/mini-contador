import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CriarConta from '../../components/CriarConta';
import ListaDeContas from '../../components/ListaDeContas';
import Fetcher from '../../lib/fetcher';

const Div = styled.div`
    text-align: center;
`;

const Titulo = styled.h1`
    color: #39b2d6;
`;

const apiUrl = "http://localhost:5000/contas";

function Contador() {
    const [contas, setContas] = useState([]);

    const addConta = async (conta) => {
        const res = await Fetcher.post(apiUrl, conta);
        buscarDados();
    };

    const excluirConta = async (id) => {
        const res = await Fetcher.delete(apiUrl, id);
        console.log(res);
        buscarDados();
    }

    async function buscarDados() {
        const dados = await Fetcher.get(apiUrl);
        setContas(dados);
    }

    useEffect(() => {
        buscarDados();
    }, []);
    return (
        <Div>
            <Titulo>Adicione uma conta!</Titulo>
            <CriarConta addConta={addConta} />
            <ListaDeContas contas={contas} excluirConta={excluirConta} /> 
        </Div>
    );
}

export default Contador;