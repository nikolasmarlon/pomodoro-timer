import styled, {css} from "styled-components";

interface ButtonContainerProps{
    variantColor: 'primary' | 'secondary'| 'danger'| 'success';
}



const buttonVariants = {
    primary:    'purple',
    secondary:  'orange',
    danger:     'red',
    success:    'green'
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
    width: 100px;
    height: 40px;
    
    margin: 0 2px;
    


    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.secundary};

    //sempre usar acento grave
    /*${props => {
        return css `background-color: ${buttonVariants[props.variantColor]}`
    }}*/
`
