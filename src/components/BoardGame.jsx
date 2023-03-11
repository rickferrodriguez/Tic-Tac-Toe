import { Square } from './Square.jsx'

export function BoardGame ({ board, updateTurn }) {
  return (
    board.map((square, index) => {
      return (
        <Square
          key={index}
          index={index}
          updateTurn={updateTurn}
        >
          {square}
        </Square>
      )
    })

  )
}
