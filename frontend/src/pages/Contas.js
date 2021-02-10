import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import '../estilos/Contas.css';
import FiltroDeReferencia from '../components/FiltroDeReferencia';
import ListaDeContas from '../components/ListaDeContas';
import Fetcher from '../lib/fetcher';
import { formatarParaReal } from '../lib/formatadorDeString';
import { useSelector } from 'react-redux';
import { selecionarUsuarioLogado } from './Login/usuarioLogadoSlice';

const CabecalhoDasContas = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
    gap: 10px;
`;

const OrdenacaoDeContas = styled.span`
    display: grid;
    grid-template-columns: auto minmax(50px, auto) 10px minmax(50px, auto);
    grid-row-start: 2;
    justify-content: left;
    justify-items: left;
`;

const ItemDeOrdenacao = styled.a`
    justify-self: center;
    cursor: pointer;
    color: #39b2d6;
`;

const TextoPago = styled.span`
    display: grid;
    grid-auto-flow: column;
    gap: 10px;
    grid-column-start: 2;
    color: #77ac3b;
    font-size: 20px;
    justify-content: right;
    margin-bottom: 10px;
`;

const TextoPendente = styled.span`
    display: grid;
    grid-auto-flow: column;
    gap: 10px;
    grid-column-start: 2;
    grid-row-start: 2;
    color: #e6cb37;
    font-size: 20px;
    justify-content: right;
    margin-bottom: 10px;
`;

function Contas() {
    const [contas, setContas] = useState([]);
    const [ordenacaoAtiva, setOrdenacaoAtiva] = useState('');
    const usuarioLogado = useSelector(selecionarUsuarioLogado);

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
          
        const res = await Fetcher.delete('contas', id);

        if(res)
            Swal.fire('Deu certo!', 'Conta excluída com sucesso', 'success');

        buscarDados();
    }

    const pagarConta = async (id) => {
        const res = await Fetcher.post(`contas/${id}/pagar`);

        if(res)
            Swal.fire('Deu certo!', 'Conta paga com sucesso', 'success');

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


    async function buscarDados(mesReferencia = filtroDeReferencia.mes || new Date().getMonth(), anoReferencia = filtroDeReferencia.ano || new Date().getFullYear()) {
        const dados = await Fetcher.fetch(`contas/usuario/${usuarioLogado._id}?mesReferencia=${mesReferencia}&anoReferencia=${anoReferencia}`);

        let contasOrdenadas = dados.sort((c1, c2) => c1.status - c2.status);
        setContas(contasOrdenadas);
    }

    useEffect(() => {
        buscarDados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <TextoPago>Valor pago: <b>{ formatarParaReal(contas.filter(c => c.status === 1).reduce((total, conta) => total + conta.valor, 0)) }</b></TextoPago>
                <TextoPendente>Valor pendente: <b>{ formatarParaReal(contas.filter(c => c.status === 0).reduce((total, conta) => total + conta.valor, 0)) }</b></TextoPendente>
            </CabecalhoDasContas>
            <ListaDeContas contas={contas} excluirConta={excluirConta} pagarConta={pagarConta} /> 
        </div>
    );
}

export default Contas;