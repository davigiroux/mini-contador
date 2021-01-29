import React, { useState } from 'react';
import SalvarConta from '../components/SalvarConta';
import Fetcher from '../lib/fetcher';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { selecionarUsuarioLogado } from './Login/usuarioLogadoSlice';

const stateInicial = {
    descricao: '',
    valor: 0,
    dataReferencia: {
        mes: new Date().getMonth(),
        ano: new Date().getFullYear(),
    }
};

function AdicionarConta() {
    const usuarioLogado = useSelector(selecionarUsuarioLogado);

    const addConta = async (conta) => {
        const res = await Fetcher.post('contas', {...conta, usuario: usuarioLogado._id});
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