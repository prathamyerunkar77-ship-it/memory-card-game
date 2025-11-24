export interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: Card[];
  flippedCards: number[];
  moves: number;
  matchedPairs: number;
  isWon: boolean;
  timer: number;
  isTimerRunning: boolean;
}
