import React, { useState, useEffect } from 'react';
import SalvarConta from '../components/SalvarConta';
import Fetcher from '../lib/fetcher';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const apiUrl = "http://localhost:5000/contas";
const stateInicial = {
    descricao: '',
    valor: 0,
    tipo: 0,
    dataReferencia: {
        mes: new Date().getMonth(),
        ano: new Date().getFullYear()
    } 
};

function AdicionarConta() {
    const { contaId } = useParams(); 
    const editarConta = async (conta) => {
        const res = await Fetcher.alterar(apiUrl, contaId, conta);
        if(res)
            Swal.fire('Deu certo!', 'Conta salva com sucesso', 'success');

    };

    const [conta, setConta] = useState(stateInicial);

    const aoDispararEvento = (conta) => {
        setConta(conta);
    }

    async function buscarConta() {
        const dado = await Fetcher.buscar(`${apiUrl}/${contaId}`);
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

export default AdicionarConta;