import { Timer, TrendingUp, Target } from 'lucide-react';
import { formatTime } from '../utils/gameUtils';

interface ScorePanelProps {
  moves: number;
  matchedPairs: number;
  totalPairs: number;
  timer: number;
}

const ScorePanel = ({ moves, matchedPairs, totalPairs, timer }: ScorePanelProps) => {
  return (
    <div className="score-panel">
      <div className="score-item">
        <Timer className="score-icon" size={20} />
        <div className="score-content">
          <span className="score-label">Time</span>
          <span className="score-value">{formatTime(timer)}</span>
        </div>
      </div>

      <div className="score-item">
        <TrendingUp className="score-icon" size={20} />
        <div className="score-content">
          <span className="score-label">Moves</span>
          <span className="score-value">{moves}</span>
        </div>
      </div>

      <div className="score-item">
        <Target className="score-icon" size={20} />
        <div className="score-content">
          <span className="score-label">Pairs</span>
          <span className="score-value">{matchedPairs}/{totalPairs}</span>
        </div>
      </div>
    </div>
  );
};

export default ScorePanel;
