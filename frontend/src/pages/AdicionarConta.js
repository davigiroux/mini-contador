import React from 'react';
import CriarConta from '../components/CriarConta';
import Fetcher from '../lib/fetcher';

const apiUrl = "http://localhost:5000/contas";
function AdicionarConta() {
    const addConta = async (conta) => {
        const res = await Fetcher.post(apiUrl, conta);
    };

    return (
        <CriarConta addConta={addConta} />
    );
}

export default AdicionarConta;