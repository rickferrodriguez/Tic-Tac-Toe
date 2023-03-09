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

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkGameOver = (array) => {
    return array.every(position => position !== null)
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
    } else if(checkGameOver(newBoard)){
      setWinner(false)
    }
  }


  return (
    <main>
      <div className="title-container">
        <h1>Tic Tac Toe</h1>
      </div>
      <section className="board">
        <button onClick={resetGame}>Reset Game</button>
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

        {
          winner !== null && (
            <section className="winner">
              <div className="text">
                <h2>
                  {
                    winner === false 
                      ? 'Ha ocurrido un empate'
                      : 'Ha ganado'
                  }
                </h2>

                <header className="win">
                  {winner && <Square>{winner}</Square>}
                </header>

                <footer>
                  <button onClick={resetGame}>Reset the Game</button>
                </footer>
              </div>
            </section>
          )
        }
      </section>
    </main>
  )
}

export default App
