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
    border-top: 10px solid #39b2d6;
    border-radius: 3px;
    background-color: #f2f2f2;
    align-items: center;
    justify-items: left;
    box-shadow: 14px 16px 16px -16px rgba(0,0,0,0.75);
`;

const Titulo = styled.span`
    font-weight: 600;
    font-size: 25px;
`;

const Valor = styled.span`
    font-weight: 600;
    font-size: 20px;
    color: #39b2d6;
    justify-self: right;
`;

const DataDeReferencia = styled.span`
    color: #8c8c8c;
`;

const AcoesDaTransacao = styled.div`
    width:100%;
    display: grid;
    grid-template-columns: 1fr 20px 20px;
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
    transition-delay: .1s;
    font-size: 22px; 
    grid-column-start: 3;   

    &:hover {
        color: #ff4c54;
    }
`;

const BotaoEditar = styled.span`
    grid-column-start: 2;  
    a {
        color: #39b2d6;
        background-color: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        transition-delay: .1s;
        font-size: 22px;    
        position: relative;
        top: -2px;

        &:hover {
            color: #58d2f7;
        }
    } 
`;

const TextoDeAjuda = styled.span`
    font-style: italic;
    font-size: 15px;
`;

function ListaDeContas({ contas, excluirConta }) {
    return (
        <List>
            {contas.length <= 0 
                ? <TextoDeAjuda>Nenhuma conta encontrada.</TextoDeAjuda> 
                : contas.map(c => (
                <ListItem key={c._id}>
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