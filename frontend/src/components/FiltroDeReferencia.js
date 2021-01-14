
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import styled from 'styled-components';
import { obterMes } from '../lib/formatadorDeString';


const Div = styled.div`
    display: grid;
    grid-template-columns: 30px 1fr 30px;
    align-items: center;
    margin-bottom: 20px;
`;

const BotaoEsquerdo = styled.a`
  border: none;
  text-decoration: none;
  cursor: pointer;
  font-size: 30px;
  justify-self: left;
`;

const BotaoDireito = styled.a`
  border: none;
  text-decoration: none;
  cursor: pointer;
  font-size: 30px;
  justify-self: right;
`;

export default function FiltroDeReferencia({ filtroDeReferencia, buscarAnterior, buscarProximo }) {
  return (
    <Div>
        <BotaoEsquerdo onClick={() => buscarAnterior()}>
          <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
        </BotaoEsquerdo>
        <h1>{obterMes(filtroDeReferencia.mesReferencia)} / {filtroDeReferencia.anoReferencia}</h1>
        <BotaoDireito onClick={() => buscarProximo()}>
          <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
        </BotaoDireito>
    </Div>
  );
};