import { Trophy, RotateCcw } from 'lucide-react';
import { formatTime } from '../utils/gameUtils';

interface WinningModalProps {
  moves: number;
  timer: number;
  onRestart: () => void;
}

const WinningModal = ({ moves, timer, onRestart }: WinningModalProps) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-icon">
          <Trophy size={64} />
        </div>

        <h2 className="modal-title">Congratulations!</h2>

        <p className="modal-subtitle">You've completed the game!</p>

        <div className="modal-stats">
          <div className="modal-stat">
            <span className="modal-stat-label">Total Moves</span>
            <span className="modal-stat-value">{moves}</span>
          </div>

          <div className="modal-stat">
            <span className="modal-stat-label">Total Time</span>
            <span className="modal-stat-value">{formatTime(timer)}</span>
          </div>
        </div>

        <button className="restart-button" onClick={onRestart}>
          <RotateCcw size={20} />
          <span>Play Again</span>
        </button>
      </div>
    </div>
  );
};

export default WinningModal;
