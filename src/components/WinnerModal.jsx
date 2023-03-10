import { Square } from './Square.jsx'
export const WinnerModal = ({ winner, resetGame }) => {
  return (
    winner !== null && (
      <section className='winner'>
        <div className='text'>
          <h2>
            {
              winner === false
                ? 'Ha ocurrido un empate'
                : 'Ha ganado'
            }
          </h2>

          <header className='win'>
            {winner && <Square>{winner}</Square>}
          </header>

          <footer>
            <button onClick={resetGame}>Reset the Game</button>
          </footer>
        </div>
      </section>
    )
  )
}
