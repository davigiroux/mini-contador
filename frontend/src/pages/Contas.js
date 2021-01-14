import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import FiltroDeReferencia from '../components/FiltroDeReferencia';
import ListaDeContas from '../components/ListaDeContas';
import Fetcher from '../lib/fetcher';
import { formatarParaReal } from '../lib/formatadorDeString';

const apiUrl = "http://localhost:5000/contas";

const TextDestaque = styled.span`
    display: grid;
    grid-auto-flow: column;
    gap: 10px;
    grid-column: 1 /-1;
    color: #39b2d6;
    font-size: 20px;
    justify-content: right;
    margin-bottom: 10px;
`;

function Contas() {
    const [contas, setContas] = useState([]);

    const [filtroDeReferencia, setFiltroDeReferencia] = useState({
        anoReferencia: new Date().getFullYear(),
        mesReferencia: new Date().getMonth()
    })

    const excluirConta = async (id) => {
        const res = await Fetcher.deletar(apiUrl, id);

        if(res)
            Swal.fire('Deu certo!', 'Conta excluída com sucesso', 'success');

        buscarDados();
    }

    const buscarContasDoMesAnterior = () => {
        const mes = filtroDeReferencia.mesReferencia === 0 ? 11 : filtroDeReferencia.mesReferencia - 1;
        const ano = mes === 11 ? filtroDeReferencia.anoReferencia - 1 : filtroDeReferencia.anoReferencia;

        setFiltroDeReferencia({anoReferencia: ano, mesReferencia: mes});
        buscarDados(mes, ano);
    }

    const buscarContasDoProximoMes = () => {
        const mes = filtroDeReferencia.mesReferencia === 11 ? 0 : filtroDeReferencia.mesReferencia + 1;
        const ano = mes === 0 ? filtroDeReferencia.anoReferencia + 1 : filtroDeReferencia.anoReferencia;

        setFiltroDeReferencia({anoReferencia: ano, mesReferencia: mes});
        buscarDados(mes, ano);
    }

    async function buscarDados(mesReferencia = new Date().getMonth(), anoReferencia = new Date().getFullYear()) {
        const dados = await Fetcher.buscar(`${apiUrl}/mesReferencia/${mesReferencia}/anoReferencia/${anoReferencia}`);
        setContas(dados);
    }

    useEffect(() => {
        buscarDados();
    }, []);
    return (
        <div>
            <FiltroDeReferencia filtroDeReferencia={filtroDeReferencia} buscarAnterior={buscarContasDoMesAnterior} buscarProximo={buscarContasDoProximoMes} />
            <TextDestaque>Valor total: <b>{ formatarParaReal(contas.reduce((total, conta) => total + conta.valor, 0))}</b></TextDestaque>
            <ListaDeContas contas={contas} excluirConta={excluirConta} /> 
        </div>
    );
}

export default Contas;