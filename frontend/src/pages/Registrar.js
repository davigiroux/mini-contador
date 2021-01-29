import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../api/api.instance';
import Botao from '../components/Compartilhado/Botao/Botao';
import GridDiv from '../components/Compartilhado/GridDiv'
import InputGroup from '../components/Compartilhado/InputGroup'

function Registrar() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmacaoDaSenha, setConfirmacaoDaSenha] = useState("");
    const [nome, setNome] = useState("");
    const history = useHistory();

    const registrar = async () => {

        if(senha !== confirmacaoDaSenha) {
            Swal.fire('Algo deu errado', 'As senhas não são iguais', 'error');
            return;
        }

        try {
            await api.post('autenticacao/registrar', {email, senha, nome});
            Swal.fire('Sucesso!', 'Usuário cadastrado com sucesso, faça o login agora!', 'success').then();
            history.push('/login');
        } catch (error) {
            if(error.response) {
                const {status, message} = error.response.data;
                Swal.fire(`${status} - Algo deu errado...`, message, 'error');
            } else {
                console.log(error);
            }
        }
    }
    
    return (
        <GridDiv>
            <InputGroup>
                <label htmlFor="nome">Nome</label>
                <input 
                    type="text" 
                    name="nome" 
                    id="nome" 
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}/>
            </InputGroup>
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
                <label htmlFor="confirmacaoDaSenha">Confirme a senha</label>
                <input 
                    type="password"
                    name="confirmacaoDaSenha"
                    id="confirmacaoDaSenha"
                    value={confirmacaoDaSenha}
                    onChange={(e) => setConfirmacaoDaSenha(e.target.value)}/>
            </InputGroup>
            <InputGroup>
                <Botao onClick={() => registrar()}>Registrar</Botao>
            </InputGroup>
        </GridDiv>
    )
}

export default Registrar
