import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import '../estilos/Contas.css';
import FiltroDeReferencia from '../components/FiltroDeReferencia';
import ListaDeContas from '../components/ListaDeContas';
import Fetcher from '../lib/fetcher';
import { formatarParaReal } from '../lib/formatadorDeString';

const apiUrl = "http://localhost:5000/contas";

const CabecalhoDasContas = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const OrdenacaoDeContas = styled.span`
    display: grid;
    grid-template-columns: auto minmax(50px, auto) 10px minmax(50px, auto);
    justify-content: left;
    justify-items: left;
`;

const ItemDeOrdenacao = styled.a`
    justify-self: center;
    cursor: pointer;

    &:active {
        color: #39b2d6;
    }
`;

const TextDestaque = styled.span`
    display: grid;
    grid-auto-flow: column;
    gap: 10px;
    grid-column-start: 2;
    color: #39b2d6;
    font-size: 20px;
    justify-content: right;
    margin-bottom: 10px;
`;

function Contas() {
    const [contas, setContas] = useState([]);
    const [ordenacaoAtiva, setOrdenacaoAtiva] = useState('');

    const [filtroDeReferencia, setFiltroDeReferencia] = useState({
        anoReferencia: new Date().getFullYear(),
        mesReferencia: new Date().getMonth()
    })

    const excluirConta = async (id) => {

        const resultado = await Swal.fire({
            title: 'Tem certeza que deseja excluir essa conta?',
            text: 'Você não poderá reverter após confirmar',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '39b2d6',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar'
        });

        if(!resultado.isConfirmed)
            return;
          
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

    const ordenarPor = (atributo) => {
        if(atributo === 'valor') {
            const contasOrdenadas = contas.sort((c1, c2) => c2.valor - c1.valor);
            setContas(contasOrdenadas);
        } else if (atributo === 'descricao') {
            const contasOrdenadas = contas.sort((c1, c2) => c1.descricao.toLowerCase() > c2.descricao.toLowerCase() ? 1 : -1);
            setContas(contasOrdenadas);
        }

        setOrdenacaoAtiva(atributo);
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
            <CabecalhoDasContas>
                <OrdenacaoDeContas>
                    Ordenar por:
                    <ItemDeOrdenacao onClick={() => ordenarPor('valor')} className={ordenacaoAtiva === 'valor' ? 'linkAtivo' : ''}>Valor</ItemDeOrdenacao>
                    -
                    <ItemDeOrdenacao onClick={() => ordenarPor('descricao')} className={ordenacaoAtiva === 'descricao' ? 'linkAtivo' : ''}>Descrição</ItemDeOrdenacao>
                </OrdenacaoDeContas>
                <TextDestaque>Valor total: <b>{ formatarParaReal(contas.reduce((total, conta) => total + conta.valor, 0))}</b></TextDestaque>
            </CabecalhoDasContas>
            <ListaDeContas contas={contas} excluirConta={excluirConta} /> 
        </div>
    );
}

export default Contas;