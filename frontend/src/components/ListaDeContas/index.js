import React from 'react';
import styled from 'styled-components';
import { obterMes } from '../../lib/formatadorDeString';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const List = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 50px;

    @media(max-width: 1300px) {
        grid-template-columns: 1fr;
    }
`;

const ListItem = styled.div`
    display: grid;
    grid-template-columns: 1fr 100px;
    gap: 10px;
    padding: 20px;
    text-align: left;
    border-radius: 3px;
    background-color: #f2f2f2;
    align-items: center;
    justify-items: left;
    box-shadow: 14px 16px 16px -16px rgba(0,0,0,0.75);
`;

const Titulo = styled.span`
    font-weight: 600;
    font-size: 25px;
    color: #3090ad;
`;

const Valor = styled.span`
    font-weight: 600;
    font-size: 20px;
    color: #3090ad;
    justify-self: right;
`;

const DataDeReferencia = styled.span`
    color: #8c8c8c;
`;

const AcoesDaTransacao = styled.div`
    width:100%;
    display: grid;
    grid-template-columns: 50px 1fr 30px 30px;
    gap: 20px;
    justify-items: right;
    align-items: center;
    grid-column: 1 / -1;
    border-top: 1px solid #cdcdcd;
    padding-top: 15px;
`;

const BotaoExcluir = styled.button`
    color: #dc0913;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    transition-duration: .3s;
    font-size: 22px; 
    grid-column-start: 4;   

    &:hover {
        color: #ff4c54;
    }
`;

const BotaoEditar = styled.span`
    grid-column-start: 3;  
    a {
        color: #39b2d6;
        background-color: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        transition-duration: .3s;
        font-size: 22px;

        &:hover {
            color: #58d2f7;
        }
    } 
`;

const BotaoPagar = styled.button`
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    transition-duration: .3s;
    font-size: 15px; 
    grid-column-start: 1;   
    position: relative;
    justify-self: left;
    right: -2px;
    font-weight: 600;
    color: #525252;

    &:hover {
        color: #a0a0a0;
    }
`;

const TextoDeAjuda = styled.span`
    font-style: italic;
    font-size: 15px;
`;

function ListaDeContas({ contas, excluirConta, pagarConta }) {

    const classesDeStatusDaConta = ['conta-pendente', 'conta-paga'];

    return (
        <List>
            {contas.length <= 0 
                ? <TextoDeAjuda>Nenhuma conta encontrada.</TextoDeAjuda> 
                : contas.map(c => (
                <ListItem key={c._id} className={classesDeStatusDaConta[c.status]}>
                    <Titulo>
                        {c.descricao}
                    </Titulo>
                    <Valor>
                        R$ {c.valor}
                    </Valor>
                    <DataDeReferencia>
                        {obterMes(c.dataReferencia.mes)}/{c.dataReferencia.ano}
                    </DataDeReferencia>
                    <AcoesDaTransacao>
                        {c.status !== 0 ? '' : (
                            <BotaoPagar onClick={() => pagarConta(c._id)}>
                                PAGAR
                            </BotaoPagar>
                        )}
                        <BotaoEditar>
                            <Link to={`/contas/${c._id}/editar`}>
                                <FontAwesomeIcon icon={faEdit} />
                            </Link>
                        </BotaoEditar>
                        <BotaoExcluir onClick={() => excluirConta(c._id)}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </BotaoExcluir>
                    </AcoesDaTransacao>
                </ListItem>
            ))}    
        </List> 
    );
}

export default ListaDeContas;