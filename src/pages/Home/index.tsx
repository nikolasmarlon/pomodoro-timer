import { HandPalm, Play } from 'phosphor-react'
// hooks acoplam funcionalidades a componentes já existentes - começam com prefixo 'use'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

import { useContext } from 'react'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { CyclesContext } from '../../contexts/CyclesContext'

/** Drop Drilling -> Quando temmos muitas Propriedades Apena para comunicação entre componentes
 *
 * Context API -> Perminte compartilharmos iformações entre VARIOS componentes ao mesmo tempo
 */

// Formulário Controlled / Uncontrolled
/** Controlled - Lindar com formulários de forma controlled em alguns momentos pode diminuir aporformance (monitorar estado) */
/** Uncontrolled busca a informação do input somente quando precisarmos dela (monitorar evento) --- usar biblioteca heact-hook-form */
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O tempo não pode ser menor que 5 minutos')
    .max(60, 'O tempo não pode ultrapassar 60 minutos'),
})

//  interface NewCycleFormData {
//    task: string
//  minutesAmount: number
// }

// sempre que for referenciar uma variálvel javaScript dentro do typeScript precisa usar o typeof
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)

  // objeto que várias funções para criar o formulário
  // const form = useForm() usar desestruturação para extrair algumas variaveis e funções do retorno do useForm()
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  // watch obsevar o campo task - usado para habilitar o botão
  const task = watch('task')
  // variavel auxiliar para o botão(melhorar entendimento da funcionalidade)
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          {/** form container */}
          <NewCycleForm />
        </FormProvider>

        {/** Countdown */}
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
