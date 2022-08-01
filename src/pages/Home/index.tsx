import { Play } from 'phosphor-react'
// hooks acoplam funcionalidades a componentes já existentes - começam com prefixo 'use'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'
import { useState } from 'react'
// Formulário Controlled / Uncontrolled
/** Controlled - Lindar com formulários de forma controlled em alguns momentos pode diminuir aporformance (monitorar estado) */
/** Uncontrolled busca a informação do input somente quando precisarmos dela (monitorar evento) --- usar biblioteca heact-hook-form */
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O tempo não pode ser menor que 5 minutos')
    .max(60, 'O tempo não pode ultrapassar 60 minutos'),
})

//  interface NewCycleFormData {
//    task: string
//  minutesAmount: number
// }

// sempre que for referenciar uma variálvel javaScript dentro do typeScript precisa usar o typeof
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
}

export function Home() {
  // este estado vai armazenar um array de cycle
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  // objeto que várias funções para criar o formulário
  // const form = useForm() usar desestruturação para extrair algumas variaveis e funções do retorno do useForm()
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
    }

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    // adicionar cycle a listagem de cycles
    /** toda vez que eu estiver alterando um estado, e este novo estado depende
     *  da informação anterior do estado, é bom setar este valor no formado de arroy function
     */
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)

    // função do react-hook-forma volta campos do form para o valor padrão(obs. ele volta para os valores configurados no dafaultValues)
    reset()
  }

  // watch obsevar o campo task - usado para habilitar o botão
  const task = watch('task')
  // variavel auxiliar para o botão(melhorar entendimento da funcionalidade)
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em:</label>
          <TaskInput
            list="task-suggestions"
            required
            id="task"
            placeholder="Dê um nome para seu projeto"
            {...register('task')}
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
            {...register('minutesAmount', { valueAsNumber: true })}
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

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
