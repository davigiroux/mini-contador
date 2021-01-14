import { Link } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import Titulo from '../Compartilhado/Titulo'

const Div = styled.div`
    text-align: left;
    display: grid;
    grid-template-columns: 1fr 150px;
    gap: 20px;
`;

const Input = styled.input`
    font-size: 20px;
    border: 1px solid #d3d3d3;
    color: #353535;
    width: 90%;
    padding: 8px 10px;

    :focus {
        outline: none;   
    }
`;

const Select = styled.select`
    font-size: 20px;
    border: 1px solid #d3d3d3;
    color: #353535;
    width: 94%;
    padding: 8px 10px;

    :focus {
        outline: none;   
    }
`;

const ContainerBotao = styled.div`
    grid-column: 1/-1;
    grid-row-start: 5;
    display: grid;
    grid-template-columns: 1fr 140px 140px;
    align-items: center;
    justify-items: right;
    margin-top: 30px;
`

const BotaoAdd = styled.button`
    border: 1px solid #39b2d6;
    background-color: #39b2d6;
    grid-column-start: 3;
    color: #ffffff;
    outline: none;
    font-size: 15px;
    padding: 10px 30px;
    font-weight: 600;
    float: right;
    cursor: pointer;
    transition-duration: .2s;

    &:hover {
        background-color: #39c3e6;
    }
`;

const LinkParaLista = styled.span`
    grid-column-start: 2;
    a {
        text-decoration: none;
        color: #2c2c2c ;
        font-size: 15px;
        padding: 10px 30px;
        cursor: pointer;
        margin-right: 5px;
        background-color: #e3e3e3;
        border-radius: 3px;
        transition-duration: .2s;

        &:hover {
            background-color: #f2f2f2;
        }
    }
`;

function SalvarConta({ conta, salvarConta, emitirEvento, ehEdicao = false }) {
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    return (
        <Div>
            <Titulo>{ehEdicao ? 'Editar' : 'Adicionar'} uma conta</Titulo>
            <div>
                <label htmlFor="descricao">
                    Descrição
                </label> <br />
                <Input id="descricao" name="descricao" value={conta.descricao} onChange={(e) => emitirEvento({...conta, descricao: e.target.value})} />
            </div>
            <div>
                <label htmlFor="valor">
                    Valor
                </label> <br />
                <Input 
                    id="valor" 
                    name="valor" 
                    value={conta.valor} 
                    onChange={(e) => emitirEvento({...conta, valor: Number(e.target.value)})}
                />
            </div>
            <div>
                <label htmlFor="mesReferencia">
                    Mês de Referência
                </label> <br />
                <Select 
                    id="mesReferencia" 
                    name="mesReferencia" 
                    value={meses[conta.dataReferencia.mes]} 
                    onChange={(e) => emitirEvento({...conta, dataReferencia: { ano: conta.dataReferencia.ano, mes: Number(e.target.value)}})}
                >

                    {meses.map((mes, index) => (<option value={index} key={index}>{mes}</option>))}
                        
                </Select>
            </div>
            <div>
                
                <label htmlFor="anoReferencia">
                    Ano de Referência
                </label> <br />
                <Input 
                    id="anoReferencia" 
                    name="anoReferencia" 
                    value={conta.dataReferencia.ano} 
                    onChange={(e) => emitirEvento({...conta, dataReferencia: { mes: conta.dataReferencia.mes, ano: Number(e.target.value)}})}
                />
            </div>
            <ContainerBotao>
                <LinkParaLista>
                    <Link to="/contas">Contas</Link>
                </LinkParaLista>
                <BotaoAdd onClick={() => salvarConta(conta)}>Salvar</BotaoAdd>
            </ContainerBotao>
        </Div>
    );
}

export default SalvarConta;