import styled from "styled-components";

interface ButtonContainerProps{
    variantColor: 'primary' | 'secondary'| 'danger'| 'success';
}

export const ButtonContainer = styled.button`
    width: 100px;
    height: 40px;
    color: white;
`
