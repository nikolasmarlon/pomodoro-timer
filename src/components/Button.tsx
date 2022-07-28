import { ButtonContainer } from './Button.styles'

interface ButtonProps {
  variantColor?: 'primary' | 'secondary' | 'danger' | 'success'
}

export function Button({ variantColor = 'primary' }: ButtonProps) {
  return <ButtonContainer variantColor={variantColor}>Enviar</ButtonContainer>
}
