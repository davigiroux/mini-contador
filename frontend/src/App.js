import React from 'react';
import styled from 'styled-components';
import Contador from './pages/Contador';
import Contas from './pages/Contas';
import AdicionarConta from './pages/AdicionarConta';
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
`;

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <span className="logo">MiniContador</span>
          <Link className="navbar-link link1" to="/adicionar-conta">Adicionar Conta</Link>
          <Link className="navbar-link link2" to="/contas">Contas</Link>
        </nav>
        <Layout>
          <Switch>
            <Route path="/adicionar-conta">
              <AdicionarConta />
            </Route>
            <Route path="/contas">
              <Contas />
            </Route>
          </Switch>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
