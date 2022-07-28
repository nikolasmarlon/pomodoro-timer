import { Play } from "phosphor-react";

export function Home() {
  return (
    <div>
      <form id="formPomodoro" action="">
        <label htmlFor="task">Vou trabalhar em: </label>
        <input required id="task" type="text" />
        <label htmlFor="minutesAmount">durante</label>
        <input required id="minutesAmount" type="number" />
        <span>minutos.</span>
      </form>
      <div>
        <span>0</span>
        <span>0</span>
        <span>:</span>
        <span>0</span>
        <span>0</span>
      </div>
      <button form="formPomodoro">
        <Play size={24}/>
        Começar
      </button>
    </div>
  )
}
