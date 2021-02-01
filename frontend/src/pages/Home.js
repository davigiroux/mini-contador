import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ContainerDosBotoes = styled.div`
    display: grid;
    grid-template-columns: minmax(auto, 100px) minmax(auto, 100px);
    align-items: center;
    justify-content: center;
    gap: 15px;

    a {
        background-color: #39b2d6;
        color: #f3f3f3;
        padding: 8px 15px;
    }
`;

function Home() {
    return (
        <div>
            <h1>Bem vindo!</h1>
            <p>Esse é um app simples com a finalidade de ajudar você a ter o controle dos seus gastos mensais :D</p>
            <ContainerDosBotoes>
                <Link to="/login">Logar</Link> 
                <Link to="/registrar">Registrar</Link>
            </ContainerDosBotoes>
        </div>
    )
}

export default Home
