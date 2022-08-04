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

import { createContext, useState } from 'react'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

/** Drop Drilling -> Quando temmos muitas Propriedades Apena para comunicação entre componentes
 *
 * Context API -> Perminte compartilharmos iformações entre VARIOS componentes ao mesmo tempo
 */

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCyclesAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

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
  // este estado vai armazenar um array de cycle
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

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

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCyclesAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    // adicionar cycle a listagem de cycles
    /** toda vez que eu estiver alterando um estado, e este novo estado depende
     *  da informação anterior do estado, é bom setar este valor no formado de arroy function
     */
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    // função do react-hook-forma volta campos do form para o valor padrão(obs. ele volta para os valores configurados no dafaultValues)
    reset()
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  // watch obsevar o campo task - usado para habilitar o botão
  const task = watch('task')
  // variavel auxiliar para o botão(melhorar entendimento da funcionalidade)
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCyclesAsFinished,
            amountSecondsPassed,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            {/** form container */}
            <NewCycleForm />
          </FormProvider>

          {/** Countdown */}
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
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
