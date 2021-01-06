import React, {useState, useEffect} from 'react';
import ListaDeContas from '../components/ListaDeContas';
import Fetcher from '../lib/fetcher';

const apiUrl = "http://localhost:5000/contas";

function Contas() {
    const [contas, setContas] = useState([]);

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
        <div>
            <ListaDeContas contas={contas} excluirConta={excluirConta} /> 
        </div>
    );
}

export default Contas;