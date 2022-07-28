import { Play } from 'phosphor-react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  Separator,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form id="formPomodoro" action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em: </label>
          <input required id="task" type="text" />
          <label htmlFor="minutesAmount">durante</label>
          <input required id="minutesAmount" type="number" />
          <span>minutos.</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <button form="formPomodoro">
          <Play size={24} />
          Começar
        </button>
      </form>
    </HomeContainer>
  )
}
