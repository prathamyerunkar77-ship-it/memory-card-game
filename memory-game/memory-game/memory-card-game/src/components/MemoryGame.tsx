import { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import Card from './Card';
import ScorePanel from './ScorePanel';
import WinningModal from './WinningModal';
import { generateCards } from '../utils/gameUtils';
import { GameState } from '../types';

const CARD_EMOJIS = ['🎮', '🎯', '🎲', '🎨', '🎭', '🎪', '🎸', '🎹'];
const TOTAL_PAIRS = CARD_EMOJIS.length;

const MemoryGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    cards: generateCards(CARD_EMOJIS),
    flippedCards: [],
    moves: 0,
    matchedPairs: 0,
    isWon: false,
    timer: 0,
    isTimerRunning: false,
  });

  useEffect(() => {
    let interval: number | undefined;

    if (gameState.isTimerRunning) {
      interval = window.setInterval(() => {
        setGameState((prev) => ({ ...prev, timer: prev.timer + 1 }));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameState.isTimerRunning]);

  useEffect(() => {
    if (gameState.matchedPairs === TOTAL_PAIRS && gameState.matchedPairs > 0) {
      setGameState((prev) => ({ ...prev, isWon: true, isTimerRunning: false }));
    }
  }, [gameState.matchedPairs]);

  const handleCardClick = (id: number) => {
    if (!gameState.isTimerRunning && gameState.moves === 0) {
      setGameState((prev) => ({ ...prev, isTimerRunning: true }));
    }

    setGameState((prev) => {
      const newCards = prev.cards.map((card) =>
        card.id === id ? { ...card, isFlipped: true } : card
      );

      const newFlippedCards = [...prev.flippedCards, id];

      if (newFlippedCards.length === 2) {
        const [firstId, secondId] = newFlippedCards;
        const firstCard = newCards.find((c) => c.id === firstId);
        const secondCard = newCards.find((c) => c.id === secondId);

        if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
          const matchedCards = newCards.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isMatched: true }
              : card
          );

          return {
            ...prev,
            cards: matchedCards,
            flippedCards: [],
            moves: prev.moves + 1,
            matchedPairs: prev.matchedPairs + 1,
          };
        } else {
          setTimeout(() => {
            setGameState((current) => ({
              ...current,
              cards: current.cards.map((card) =>
                card.id === firstId || card.id === secondId
                  ? { ...card, isFlipped: false }
                  : card
              ),
              flippedCards: [],
            }));
          }, 1000);

          return {
            ...prev,
            cards: newCards,
            flippedCards: newFlippedCards,
            moves: prev.moves + 1,
          };
        }
      }

      return {
        ...prev,
        cards: newCards,
        flippedCards: newFlippedCards,
      };
    });
  };

  const handleRestart = () => {
    setGameState({
      cards: generateCards(CARD_EMOJIS),
      flippedCards: [],
      moves: 0,
      matchedPairs: 0,
      isWon: false,
      timer: 0,
      isTimerRunning: false,
    });
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h1 className="game-title">Memory Card Game</h1>
        <button className="restart-btn" onClick={handleRestart}>
          <RotateCcw size={20} />
          <span>Restart</span>
        </button>
      </div>

      <ScorePanel
        moves={gameState.moves}
        matchedPairs={gameState.matchedPairs}
        totalPairs={TOTAL_PAIRS}
        timer={gameState.timer}
      />

      <div className="cards-grid">
        {gameState.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={handleCardClick}
            disabled={gameState.flippedCards.length === 2}
          />
        ))}
      </div>

      {gameState.isWon && (
        <WinningModal
          moves={gameState.moves}
          timer={gameState.timer}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default MemoryGame;
