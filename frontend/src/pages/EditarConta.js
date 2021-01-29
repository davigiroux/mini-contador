import React, { useState, useEffect } from 'react';
import SalvarConta from '../components/SalvarConta';
import Fetcher from '../lib/fetcher';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selecionarUsuarioLogado } from './Login/usuarioLogadoSlice';

const stateInicial = {
    descricao: '',
    valor: 0,
    tipo: 0,
    dataReferencia: {
        mes: new Date().getMonth(),
        ano: new Date().getFullYear()
    } 
};

function EditarConta() {
    const { contaId } = useParams(); 
    
    const usuarioLogado = useSelector(selecionarUsuarioLogado);
    const editarConta = async (conta) => {
        const res = await Fetcher.update('contas', contaId, {...conta, usuario: usuarioLogado._id});
        if(res)
            Swal.fire('Deu certo!', 'Conta salva com sucesso', 'success');

    };

    const [conta, setConta] = useState(stateInicial);

    const aoDispararEvento = (conta) => {
        setConta(conta);
    }

    async function buscarConta() {
        const dado = await Fetcher.fetch(`contas/${contaId}`);
        setConta(dado);
    }

    useEffect(() => {
        buscarConta();
        // eslint-disable-next-line
    }, []);

    return (
        <SalvarConta salvarConta={editarConta} emitirEvento={aoDispararEvento} conta={conta} ehEdicao />
    );
}

export default EditarConta;