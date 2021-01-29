import React, { useState } from 'react';
import SalvarConta from '../components/SalvarConta';
import Fetcher from '../lib/fetcher';
import Swal from 'sweetalert2';
import store from '../app/store';

const stateInicial = {
    usuario: store.getState().usuarioLogado._id,
    descricao: '',
    valor: 0,
    dataReferencia: {
        mes: new Date().getMonth(),
        ano: new Date().getFullYear(),
    }
};

function AdicionarConta() {
    const addConta = async (conta) => {
        const res = await Fetcher.post('contas', conta);
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