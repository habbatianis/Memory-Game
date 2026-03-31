export const CardComponents =({card ,onClick}) => {
  return (
    <div className={`card ${card.isFlipped ? 'is-flipped' : ''} ${card.isMached ? 'matched' : ''}`} onClick={() => onClick(card)}>
      {card.isFlipped || card.isMached ? (
        <span className="card-front">{card.value}</span>
      ) : (
        <span className="card-back">?</span>
      )}
    </div> 
    ) }