import { Play } from 'phosphor-react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'
// Formulário Controlled / Uncontrolled
/** Controlled - Lindar com formulários de forma controlled em alguns momentos pode diminuir aporformance (monitorar estado) */
/** Uncontrolled busca a informação do input somente quando precisarmos dela (monitorar evento) --- usar biblioteca heact-hook-form */

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em:</label>
          <TaskInput
            list="task-suggestions"
            required
            id="task"
            placeholder="Dê um nome para seu projeto"
          />

          <datalist id="task-suggestions">
            <option value="Projeto 11"></option>
            <option value="Projeto 12"></option>
            <option value="Projeto 13"></option>
            <option value="Projeto 14"></option>
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            required
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
          />
          <span>minutos.</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
