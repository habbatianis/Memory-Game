export const GameHeader = ({ moves, score,onclick }) => {
  return (
    <div className="game-header">
      <h1>Memory Match</h1>
      <div className="stats">
        <div className="stat-item">
          <span className="stat-label">Moves</span>
          <span className="stat-value">{moves}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">score</span>
          <span className="stat-value">{score}</span>
        </div>
      </div>
      <button className="reset-btn"  onClick={()=>onclick()
      } >New Games</button>
    </div>
  );} 