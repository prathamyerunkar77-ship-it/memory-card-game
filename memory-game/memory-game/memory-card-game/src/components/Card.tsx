import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  onClick: (id: number) => void;
  disabled: boolean;
}

const Card = ({ card, onClick, disabled }: CardProps) => {
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onClick(card.id);
    }
  };

  return (
    <div
      className={`card-container ${card.isFlipped || card.isMatched ? 'flipped' : ''} ${
        card.isMatched ? 'matched' : ''
      }`}
      onClick={handleClick}
    >
      <div className="card">
        <div className="card-front">
          <div className="card-pattern"></div>
        </div>
        <div className="card-back">
          <span className="card-emoji">{card.emoji}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
