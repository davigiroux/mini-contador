import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import Botao from '../../components/Compartilhado/Botao/Botao'
import GridDiv from '../../components/Compartilhado/GridDiv'
import InputGroup from '../../components/Compartilhado/InputGroup'
import Fetcher from '../../lib/fetcher'
import { logadoComSucesso } from './usuarioLogadoSlice'

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();

    const logar = async () => {
        try {
            const {token, _id, nome} = await Fetcher.post('autenticacao/login', {email, senha});
            dispatch(logadoComSucesso({token, _id, nome}));
            history.push('/contas');
        } catch (error) {
            const {status, message} = error.response ? error.response.data : error;
            Swal.fire(`${status} - Algo deu errado...`, message, 'error');
        }
    }


    return (
        <GridDiv>
            <InputGroup>
                <label htmlFor="email">Email</label>
                <input 
                    type="text" 
                    name="email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
            </InputGroup>
            <InputGroup>
                <label htmlFor="senha">Senha</label>
                <input 
                    type="password"
                    name="senha"
                    id="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}/>
            </InputGroup>
            <InputGroup>
                <Botao onClick={() => logar()}>Entrar</Botao>
            </InputGroup>
        </GridDiv>
    )
}

export default Login
