
import React, { useEffect, useState } from 'react'
export const useGameLogice = (cardValues) => {

    const [difficulty, setDifficulty] = useState('moyen');
    const [cards, setCards] = useState([]);
    const [flippedcards, setFlippedcards] = useState([]);
    const [matched, setMatched] = useState([]);
    const [clicks, setClicks] = useState(0);
    const [score, setScore] = useState(0);
    const [moves, setMoves] = useState(0);
    const getDifficultyValues = (level) => {
        let count;
        if (level === 'easy') count = 4;
        if (level === 'moyen') count = 8;
        if (level === 'hard') count = 12;

        const selection = allEmojis.slice(0, count);
        return [...selection, ...selection];
    };

    const getRandomItems = (list, numberToPick) => {
        // 1. Create a copy of the list so we don't change the original one
        const shuffled = [...list];

        // 2. Shuffle the array (Fisher-Yates style)
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        // 3. Take the first 'n' items from the shuffled list
        return shuffled.slice(0, numberToPick);
    };


    const initialthegame = () => {

        if (!difficulty) {
        setCards([]); // Clear cards so they don't show behind the menu
        return;
    }

        const shuffledValues = getRandomItems(cardValues, difficulty === 'easy' ? 4 : difficulty === 'moyen' ? 8 : 10);
        const duplicated = [...shuffledValues, ...shuffledValues];
        const shuffled = duplicated.sort(() => Math.random() - 0.5);
        setTimeout(() => {
            console.log("Shuffled card values:", shuffledValues);
        }, 1000);

        const finalcards = shuffled.map((card, index) => ({ id: index, value: card, isFlipped: true, isMached: false }));
        setCards(finalcards);
        console.log("Initial cards:", finalcards , 'Difficulty:', difficulty);
        setClicks(0);
        setScore(0);
        setMoves(0);
        setMatched([]);
        setFlippedcards([]);
        let timeoutDuration = 3000; // 3 seconds
        difficulty === 'easy' ? timeoutDuration = 3000 : difficulty === 'moyen' ? timeoutDuration = 4000 : timeoutDuration = 6000;
        setTimeout(() => {
            setCards(finalcards.map((card) => ({ ...card, isFlipped: false })));
        }, timeoutDuration);

    }

    useEffect(() => {

        initialthegame();

    }, [difficulty]);

    const handleCardClick = (card) => {
        console.log("Card clicked:", card);
        if (card.isMached || flippedcards.length === 2 || flippedcards.includes(card.id)) {
            return;
        }

        setMoves(moves + 1);
        setClicks(clicks + 1);
        console.log("Clicks:", clicks);
        // if (clicks === 2) {
        //   const loscards = cards.map((c) => ({ ...c, isFlipped: false }));
        //   setClicks(0);
        //   setCards(loscards);
        //   console.log("Resetting cards after 2 clicks:", cards);
        //   return;
        // }


        let newCards = [...cards];
        card.isFlipped ? newCards = cards.map((c) =>
            c.id === card.id ? { ...c, isFlipped: false } : c
        ) : newCards = cards.map((c) =>
            c.id === card.id ? { ...c, isFlipped: true } : c
        );

        console.log("Card clicked:", newCards);
        setCards(newCards);
        const newflippedcards = [...flippedcards, card.id];
        setFlippedcards(newflippedcards);
        if (flippedcards.length === 1) {
            console.log("First card flipped:", newflippedcards[0]);
            const firstCard = cards[newflippedcards[0]];
            console.log("First card details:", firstCard);
            console.log("Current card details:", card);

            setTimeout(() => {
                if (firstCard.value === card.value) {
                    setMatched([...matched, firstCard.id, card.id]);
                    const muchcards = cards.map((c) =>
                        c.id === firstCard.id || c.id === card.id ? { ...c, isMached: true } : c
                    );
                    setCards(muchcards);
                    setScore(score + 1);
                    console.log("Cards matched:", firstCard, card);
                } else {
                    const loscards = cards.map((c) =>
                        c.id === firstCard.id || c.id === card.id ? { ...c, isFlipped: false } : c
                    );
                    setCards(loscards);
                }

                setFlippedcards([]);
            }, 1000);


        };
    }


    return { cards, moves, score, matched, initialthegame, handleCardClick, difficulty, setDifficulty }
}