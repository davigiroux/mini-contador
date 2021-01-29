import styled from "styled-components";

const Botao = styled.button`
    border: 1px solid #39b2d6;
    background-color: #39b2d6;
    color: #ffffff;
    outline: none;
    font-size: 15px;
    padding: 10px 30px;
    font-weight: 600;
    justify-self: right;
    cursor: pointer;
    transition-duration: .2s;

    &:hover {
        background-color: #39c3e6;
    }
`;

export default Botao;