
import ReactDOM from 'react-dom/client'
import React, { useEffect, useState } from 'react'
import './App.css'
import { GameHeader } from './components/gameheder'
import { CardComponents } from './components/card'
import { WinMessage } from './components/winMessage'
import { useGameLogice } from './hooks/useGamelogice'


function App() {

  const cardValues = [
    "🍎",
    "🍌",
    "🍇",
    "🍊",
    "🍓",
    "🥝",
    "🍑",
    "🍒",
    "🍍", // 9 (Added)
    "🥥", // 10 (Added)
    // "🍋", // 11 (Added)
    // "🍉",

  ];



  const { cards, moves, score, matched, initialthegame, handleCardClick, difficulty, setDifficulty } = useGameLogice(cardValues)
  if (!difficulty) {
  
    return (
      <div className="modal">
        <h2>Choose Difficulty</h2>
        <button onClick={() => setDifficulty('easy')}>Easy (8 Cards)</button>
        <button onClick={() => setDifficulty('moyen')}>Medium (16 Cards)</button>
        <button onClick={() => setDifficulty('hard')}>Hard (20 Cards)</button>
      </div>
    );
  }
  console.log("App difficulty:", difficulty);
  return (
    <>
      <div className="App">
        <button onClick={() => {
    setDifficulty(null); // Shows the modal
    // initialthegame();    // Clears the current game board/stats
  }}><svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="settings-icon"
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg></button>
        <GameHeader moves={moves} score={score} onclick={initialthegame} />
        <div className='sizebox'>
        </div>
        {matched.length === cards.length && (
          <WinMessage moves={moves} />
        )}
        <div className='sizebox'>
        </div>

        <div className={`cards-grid ${difficulty === 'easy' ? 'cards-grid' : difficulty === 'moyen' ? 'cards-grid' : 'cards-grid16'}`}>
          {cards.map((card) => (
            <CardComponents card={card} onClick={handleCardClick} />
          ))}
        </div>

      </div>

    </>
  )
}

export default App
