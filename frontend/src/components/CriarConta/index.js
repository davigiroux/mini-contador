import React, { useState } from 'react';
import styled from 'styled-components';

const Div = styled.div`
    grid-column-start: 2;
    text-align: left;
`;

const Input = styled.input`
    font-size: 20px;
    border: 1px solid #d3d3d3;
    padding: 8px 10px;
    color: #353535;
    width: 100%;
    margin-bottom: 15px;
    margin-top: 10px;

    :focus {
        outline: none;   
    }
`;

const BotaoAdd = styled.button`
    border: 1px solid #39b2d6;
    background-color: #39b2d6;
    color: #ffffff;
    outline: none;
    font-size: 15px;
    padding: 10px 30px;
    margin-top: 30px;
    font-weight: 600;
    float: right;
`;

function CriarConta({ addConta }) {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState(0);

    return (
        <Div>
                <div>
                    <label htmlFor="descricao">
                        Descrição
                    </label> <br />
                    <Input id="descricao" name="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="valor">
                        Valor
                    </label> <br />
                    <Input id="valor" name="valor" value={valor} onChange={(e) => setValor(e.target.value)}/>
                </div>
                <div>
                    <BotaoAdd onClick={() => addConta({descricao, valor: Number(valor)})}>Adicionar</BotaoAdd>
                </div>
        </Div>
    );
}

export default CriarConta;