import React from 'react';
import { TimelineEntry } from '../types';
import MealCard from './MealCard';
import SymptomCard from './SymptomCard';
import './Timeline.css';

interface TimelineProps {
  entries: TimelineEntry[];
  onDelete: (id: string) => void;
}

const Timeline: React.FC<TimelineProps> = ({ entries, onDelete }) => {
  if (entries.length === 0) {
    return (
      <div className="timeline-empty">
        <span className="empty-icon">📝</span>
        <h3>No entries yet</h3>
        <p>Start tracking by adding a meal or symptom</p>
      </div>
    );
  }

  return (
    <div className="timeline">
      {entries.map((entry) => {
        if (entry.type === 'meal') {
          return <MealCard key={entry.id} meal={entry} onDelete={onDelete} />;
        } else {
          return <SymptomCard key={entry.id} symptom={entry} onDelete={onDelete} />;
        }
      })}
    </div>
  );
};

export default Timeline;
