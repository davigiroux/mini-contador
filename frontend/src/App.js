import React from 'react';
import styled from 'styled-components';
import Contas from './pages/Contas';
import AdicionarConta from './pages/AdicionarConta';
import EditarConta from './pages/EditarConta';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 20px;
  padding-top: 50px;

  @media(max-width: 1000px) {
    grid-template-columns: 20px 1fr 20px;
  }
`;

const Content = styled.div`
  grid-column-start: 2;
`;

function App() {

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <span className="logo">MiniContador</span>
          <Link className="navbar-link link1" to="/contas/adicionar">Adicionar Conta</Link>
          <Link className="navbar-link link2" to="/contas">Histórico</Link>
        </nav>
        <Layout>
          <Content>
            <Switch>
              <Route path="/contas/adicionar">
                <AdicionarConta />
              </Route>
              <Route exact path="/contas">
                <Contas />
              </Route>
              <Route path={`/contas/:contaId/editar`}>
                <EditarConta />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
