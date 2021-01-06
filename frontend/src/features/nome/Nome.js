import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { alterarNome, selecionaNome } from './nomeSlice';

const Nome = () => {
    const nome = useSelector(selecionaNome);
    const dispatch = useDispatch();
    return (
        <div>
            <label>Nome = {nome}</label>
            <input 
                onChange={(e) => dispatch(alterarNome(e.target.value))}
            />
        </div>
    );
}

export default Nome;