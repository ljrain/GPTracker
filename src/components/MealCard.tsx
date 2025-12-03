import React from 'react';
import { Meal } from '../types';
import './TimelineCard.css';

interface MealCardProps {
  meal: Meal;
  onDelete: (id: string) => void;
}

const MealCard: React.FC<MealCardProps> = ({ meal, onDelete }) => {
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

  return (
    <div className="timeline-card meal-card">
      <div className="card-header">
        <span className="card-type">🍽️ Meal</span>
        <span className="card-time">{formatDate(meal.timestamp)}</span>
      </div>
      {meal.photo && (
        <div className="meal-photo-container">
          <img src={meal.photo} alt={meal.title} className="meal-photo" />
        </div>
      )}
      <div className="card-content">
        <h3 className="meal-title">{meal.title}</h3>
        {meal.notes && <p className="card-notes">{meal.notes}</p>}
      </div>
      <button className="delete-btn" onClick={() => onDelete(meal.id)}>
        Delete
      </button>
    </div>
  );
};

export default MealCard;
