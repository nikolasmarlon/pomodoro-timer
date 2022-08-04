import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function NewCycleForm() {
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

  // objeto que várias funções para criar o formulário
  // const form = useForm() usar desestruturação para extrair algumas variaveis e funções do retorno do useForm()
  const { register, handleSubmit, watch, reset } = useFormm<NewCycleFormData>({
    resolver: zodResolverr(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em:</label>
      <TaskInput
        list="task-suggestions"
        required
        id="task"
        placeholder="Dê um nome para seu projeto"
        disabled={!!activeCycle}
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
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  )
}
