import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'

import { TURNS } from './constants.js'
import { Square } from './components/Square.jsx'
import { checkWinnerFrom, checkGameOver } from './logic/board.js'
import { resetGameStorage, saveGameToStorage } from './logic/storage/index.js'
import { WinnerModal } from './components/WinnerModal.jsx'
import { BoardGame } from './components/BoardGame.jsx'

function App () {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromLocalStorage = window.localStorage.getItem('turn')
    return turnFromLocalStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  const updateTurn = (index) => {
    if (board[index] || winner) return

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    saveGameToStorage({
      newBoard: { newBoard },
      newTurn: { newTurn }
    })

    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkGameOver(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main>
      <div className='title-container'>
        <h1>Tic-Tac-Toe</h1>
      </div>
      <section className='board'>
        <button onClick={resetGame}>Reset Game</button>
        <section className='game'>
          <BoardGame board={board} updateTurn={updateTurn} />
        </section>

        <section className='turn'>
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>

        <WinnerModal winner={winner} resetGame={resetGame} />
      </section>
    </main>
  )
}

export default App
