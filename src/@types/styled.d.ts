//arquivo de definição de tipos do typesScript

import 'styled-components'; 

import { defaultTheme } from '../styles/themes/default';

//guarda as propriedades do tema dentro da variável
type ThemeType = typeof defaultTheme

//criando tipagem para o módulo styled-components do npm
declare module 'styled-components' {
    export interface DefaultTheme extends ThemeType {}
}