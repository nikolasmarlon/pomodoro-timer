import { ButtonContainer } from "./Button.styles";

interface ButtonProps{
    variantColor?: 'primary' | 'secondary'| 'danger'| 'success';
}


export function Button({color = 'primary'}: ButtonProps){
    return (
        <ButtonContainer variantColor={color}>Enviar</ButtonContainer>
    )
}