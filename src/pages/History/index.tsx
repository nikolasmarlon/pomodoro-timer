import { HistoryContainer, HistoryList } from './styles'

export function History() {
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa 1</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tarefa 2</td>
              <td>10 Minutos</td>
              <td>Há 1 meses</td>
              <td>Concluído</td>
            </tr>
            <tr>
              <td>Tarefa 3</td>
              <td>15 Minutos</td>
              <td>Há 5 meses</td>
              <td>Concluído</td>
            </tr>
            <tr>
              <td>Tarefa 4</td>
              <td>90 Minutos</td>
              <td>Há 4 meses</td>
              <td>Interrompido</td>
            </tr>
            <tr>
              <td>Tarefa 5</td>
              <td>25 Minutos</td>
              <td>Há 2 meses</td>
              <td>Cancelado</td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
