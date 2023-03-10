export const Square = ({ index, children, isSelected, updateTurn }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`
  const handleClick = () => {
    updateTurn(index)
  }
  return (
    <div
      onClick={handleClick}
      className={className}
    >
      {children}
    </div>
  )
}
