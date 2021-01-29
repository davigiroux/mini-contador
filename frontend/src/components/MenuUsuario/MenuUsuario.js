import React, { useState } from 'react'
import styled from 'styled-components'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './MenuUsuario.css';

const ContainerIcone = styled.div`
    display: grid;
    border: 2px solid #f7f5f5;
    border-radius: 50px;
    width: 50px;
    height: 50px;
    margin-right: 30px;
    align-content: center;
    color: #f7f5f5;
    font-size: 25px;
    cursor: pointer;
    transition-duration: .2s;

    &:hover {
        color: #39b2d6;
        background-color: #f7f5f5;
    }
`;

const MenuLista = styled.ul`
    list-style: none;
    position: absolute;
    height: auto;
    width: auto;
    top: 50px;
    right: 30px;
    background-color: #f7f5f5;
    border: 1px solid #c3c3c3;
    border-radius: 3px;
    align-content: center;
    padding: 0;

    & li {
        font-size: 20px;
        color: #616161;
        padding: 15px;
        width: 100px;
        background-color: transparent;
        cursor: pointer;

        &:hover {
            background-color: #f1f1f1;
        }
    }

    & li:nth-child(n + 2) {
        border-top: 1px solid #e1e1e1;
    }

    & .logout{
        color: #d65252;
    }
`;

function MenuUsuario({ nomeDoUsuario, deslogarUsuario }) {
    const inicialDoNome = nomeDoUsuario[0].toUpperCase();
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div>
            <ContainerIcone onClick={() => setShowMenu(!showMenu)}>
                {inicialDoNome}
            </ContainerIcone>
            <MenuLista style={{display: showMenu ? 'block' : 'none'}}>
                <li className="logout" onClick={() => deslogarUsuario()}>
                    <FontAwesomeIcon icon={faSignOutAlt} style={{marginRight: 10}}/>
                    Sair
                </li>
            </MenuLista>
        </div>
    )
}

export default MenuUsuario
