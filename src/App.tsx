import { ThemeProvider } from 'styled-components'
import { Button } from './components/Button'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variantColor="primary" />
      <Button variantColor="secondary" />
      <Button variantColor="danger" />
      <Button variantColor="success" />
      <Button />
      asdfasdf
      <GlobalStyle />
    </ThemeProvider>
  )
}
