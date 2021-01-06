import React from 'react';
import styled from 'styled-components';

const List = styled.div`
    padding-top: 50px;
`;

const ListItem = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr 1fr;
    gap: 20px;
    margin: 0 auto;
    text-align: left;
    margin-top: 10px;
`;

const BotaoExcluir = styled.button`
    color: #dc0913;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
`;

function ListaDeContas({ contas, excluirConta }) {
    return (
        <List>
            {contas.map(c => (
                <ListItem key={c._id}>
                    <div>
                        {c.descricao}
                    </div>
                    <div>
                        {c.valor}
                    </div>
                    <div>
                        <BotaoExcluir onClick={() => excluirConta(c._id)}>Excluir</BotaoExcluir>
                    </div>
                </ListItem>
            ))}    
        </List> 
    );
}

export default ListaDeContas;