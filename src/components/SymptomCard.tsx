import React from 'react';
import { Symptom } from '../types';
import './TimelineCard.css';

interface SymptomCardProps {
  symptom: Symptom;
  onDelete: (id: string) => void;
}

const SymptomCard: React.FC<SymptomCardProps> = ({ symptom, onDelete }) => {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const renderScoreIndicator = (score: number) => {
    const indicators = [];
    for (let i = 1; i <= 5; i++) {
      indicators.push(
        <span
          key={i}
          className={`score-dot ${i <= score ? 'active' : ''}`}
        />
      );
    }
    return indicators;
  };

  const getScoreLabel = (score: number) => {
    const labels = ['Minimal', 'Mild', 'Moderate', 'Severe', 'Extreme'];
    return labels[score - 1];
  };

  return (
    <div className={`timeline-card symptom-card severity-${symptom.score}`}>
      <div className="card-header">
        <span className="card-type">😣 Symptom</span>
        <span className="card-time">{formatDate(symptom.timestamp)}</span>
      </div>
      <div className="card-content">
        <div className="symptom-score">
          <div className="score-label">
            Severity: {getScoreLabel(symptom.score)} ({symptom.score}/5)
          </div>
          <div className="score-indicators">
            {renderScoreIndicator(symptom.score)}
          </div>
        </div>
        {symptom.notes && <p className="card-notes">{symptom.notes}</p>}
      </div>
      <button className="delete-btn" onClick={() => onDelete(symptom.id)}>
        Delete
      </button>
    </div>
  );
};

export default SymptomCard;
