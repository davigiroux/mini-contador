import styled from 'styled-components'

const InputGroup = styled.div`
    display: grid;
    grid-template-columns: minmax(auto, 400px);
    gap: 15px;
    justify-items: center;
    justify-self: center;

    & > label {
        font-size: 20px;
        justify-self: left;
    }

    & > input {
        font-size: 20px;
        border: 1px solid #d3d3d3;
        color: #353535;
        width: 95%;
        padding: 8px 10px;

        :focus {
            outline: none;   
        }
    }
`;

export default InputGroup;
