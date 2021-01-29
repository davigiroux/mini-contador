import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const TextoDeBoasVindas = styled.p`
    font-size: 30px;
`;

function Home() {
    return (
        <div>
            <h1>Bem vindo!</h1>
            <p>Esse é um app simples com a finalidade de ajudar você a ter o controle dos seus gastos mensais :D</p>
            <TextoDeBoasVindas>
                Você pode <Link to="/login">logar na sua conta</Link> ou <Link to="/registrar">criar uma conta do zero!</Link>
            </TextoDeBoasVindas>
        </div>
    )
}

export default Home
