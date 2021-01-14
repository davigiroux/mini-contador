import React, { useState } from 'react';
import SalvarConta from '../components/SalvarConta';
import Fetcher from '../lib/fetcher';
import Swal from 'sweetalert2';

const stateInicial = {
    descricao: '',
    valor: 0,
    dataReferencia: {
        mes: new Date().getMonth(),
        ano: new Date().getFullYear(),
    }
};

const apiUrl = "http://localhost:5000/contas";
function AdicionarConta() {
    const addConta = async (conta) => {
        const res = await Fetcher.post(apiUrl, conta);
        if(res)
            Swal.fire('Deu certo!', 'Conta salva com sucesso', 'success');

        setConta(stateInicial);
    };

    const [conta, setConta] = useState(stateInicial);

    const aoDispararEvento = (conta) => {
        setConta(conta);
    }

    return (
        <SalvarConta salvarConta={addConta} emitirEvento={aoDispararEvento} conta={conta} />
    );
}

export default AdicionarConta;