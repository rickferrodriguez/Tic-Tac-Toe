import { useState } from 'react'
import { TURNS, WINNER_COMBOS} from './constants.js'
import './App.css'

const Square = ({index, children, isSelected, updateTurn}) => {

  const className = `square ${isSelected ? 'is-selected': ''}`
  const handleClick = () => {
    updateTurn(index)
  }
  return (
  <div 
      onClick={handleClick}
      className={className}>
      {children}
  </div>
  )
}

function App() {
  const [board, setBoard ] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    for(const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      if(
        boardToCheck[a] &&
          boardToCheck[a] ===boardToCheck[b] &&
          boardToCheck[a] ===boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    return null
  }

  const updateTurn = (index) => {
    if(board[index] || winner) return 

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(newWinner)
      console.log(newWinner)
    }
  }


  return (
    <main className="board">
      <section className="game">
        {
          board.map((square, index) => (
            <Square 
              key={index}
              index={index}
              updateTurn={updateTurn}
            >
              {square}
            </Square>
          ))
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
    </main>
  )
}

export default App
