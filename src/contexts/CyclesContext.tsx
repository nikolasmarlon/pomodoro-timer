<<<<<<< HEAD
import { createContext, ReactNode, useState, useReducer, useEffect } from 'react'
import {
  ActionTypes,
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
=======
import { createContext, ReactNode, useState, useReducer } from 'react'
>>>>>>> parent of 3529825 (separando action Types)

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCyclesAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  // este estado vai armazenar um array de cycle
  // const [cycles, setCycles] = useState<Cycle[]>([])

  // useReducer
<<<<<<< HEAD
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  }, ()=>{
    const storageStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1-0-0')

    if (storageStateAsJSON){
      return JSON.parse(storageStateAsJSON)
    }
  }) // useReducer recebe dois parâmetros
=======
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      if (action.type === 'ADD_NEW_CYCLE') {
        return {
          ...state,
          cycles: [...state.cycles, action.payload.newCycle],
          activeCycleId: action.payload.newCycle.id,
        }
      }

      if (action.type === 'INTERRUPT_CURRENT_CYCLE') {
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, interruptedDate: new Date() }
            } else {
              return cycle
            }
          }),
          activeCycleId: null,
        }
      }

      if (action.type === 'MARK_CURRENT_CYCLE_AS_FINISHED') {
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, finishedDate: new Date() }
            } else {
              return cycle
            }
          }),
          activeCycleId: null,
        }
      }

      console.log('fgasdf')
      console.log(state)
      console.log(action)

      return state
    },
    {
      cycles: [],
      activeCycleId: null,
    },
  ) // useReducer recebe dois parâmetros
>>>>>>> parent of 3529825 (separando action Types)
  // Fim useReducer

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1-0-0', stateJSON)
  }, [cyclesState])

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCyclesAsFinished() {
<<<<<<< HEAD
    dispatch(markCurrentCycleAsFinishedAction)
=======
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId,
      },
    })
>>>>>>> parent of 3529825 (separando action Types)

    /** setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    ) */
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

<<<<<<< HEAD
    dispatch(addNewCycleAction(newCycle))
=======
    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      },
    })
>>>>>>> parent of 3529825 (separando action Types)

    // adicionar cycle a listagem de cycles
    /** toda vez que eu estiver alterando um estado, e este novo estado depende
     *  da informação anterior do estado, é bom setar este valor no formado de arroy function
     */
    // setCycles((state) => [...state, newCycle])

    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
<<<<<<< HEAD
    dispatch(interruptCurrentCycleAction)
=======
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId,
      },
    })
>>>>>>> parent of 3529825 (separando action Types)
    /**  setCycles((state) =>
      state.map((cycle) => {aQASA
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    ) */
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCyclesAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
