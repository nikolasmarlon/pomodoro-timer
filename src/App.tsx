import { ThemeProvider } from 'styled-components'
import { Button } from './components/Button'
import { dark } from './styles/themes/dark'
import { defaultTheme } from './styles/themes/default'


export function App() {
 
  

  return (
    <ThemeProvider theme={dark}>
      <Button variantColor='primary' />
      <Button variantColor='secondary' />
      <Button variantColor='danger'/>
      <Button variantColor='success'/>
      <Button />
    </ThemeProvider>
  )
}

