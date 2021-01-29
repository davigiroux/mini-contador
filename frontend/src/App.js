import React from 'react';
import styled from 'styled-components';
import {  BrowserRouter as Router } from "react-router-dom";
import './App.css';
import NavBar from './components/NavBar';
import Roteamento from './routes/Rotas';

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
        <NavBar />
        <Layout>
          <Content>
            <Roteamento />
          </Content>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
