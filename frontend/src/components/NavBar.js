import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deslogadoComSucesso, selecionarUsuarioLogado } from '../pages/Login/usuarioLogadoSlice';
import MenuUsuario from './MenuUsuario/MenuUsuario';

function NavBar() {
    const usuarioLogado = useSelector(selecionarUsuarioLogado);
    const dispatch = useDispatch();
    const usuarioEstaLogado = usuarioLogado && usuarioLogado.nome && usuarioLogado.nome.length > 0;

    const deslogarUsuario = () => {
        dispatch(deslogadoComSucesso());
    }

    return (
        <nav className="navbar">
          <span className="logo"><img src="/img/minicontador2.png" alt="Logo Mini Contador"/></span>
          {usuarioEstaLogado 
          ? <div className="navbar-links">
                <Link className="navbar-link" to="/contas/adicionar">Criar Conta</Link>
                <Link className="navbar-link" to="/contas">Histórico</Link>
                <MenuUsuario 
                    className="navbar-link menu-usuario logout" 
                    nomeDoUsuario={usuarioLogado.nome} 
                    deslogarUsuario={deslogarUsuario}/>
            </div> 
          
          : <div className="navbar-links">
                <Link className="navbar-link" to="/registrar">Registrar</Link>
                <Link className="navbar-link login" to="/login">
                    <FontAwesomeIcon icon={faSignInAlt} style={{marginRight: 10}} />
                    Login
                </Link>
            </div>
          }
        </nav>
    )
}

export default NavBar
