import React, { useState } from 'react';
import { Symptom } from '../types';
import { generateId } from '../dataStore';
import './EntryForm.css';

interface SymptomFormProps {
  onSubmit: (symptom: Symptom) => void;
  onCancel: () => void;
}

const SymptomForm: React.FC<SymptomFormProps> = ({ onSubmit, onCancel }) => {
  const [score, setScore] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [notes, setNotes] = useState('');

  const scoreLabels = ['Minimal', 'Mild', 'Moderate', 'Severe', 'Extreme'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const symptom: Symptom = {
      id: generateId(),
      type: 'symptom',
      score,
      notes: notes.trim(),
      timestamp: new Date().toISOString(),
    };

    onSubmit(symptom);
  };

  return (
    <form className="entry-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Log Symptoms</h2>

      <div className="form-group">
        <label>Symptom Severity</label>
        <div className="score-selector">
          {([1, 2, 3, 4, 5] as const).map((value) => (
            <button
              key={value}
              type="button"
              className={`score-btn score-${value} ${score === value ? 'active' : ''}`}
              onClick={() => setScore(value)}
            >
              {value}
            </button>
          ))}
        </div>
        <div className="score-description">
          {scoreLabels[score - 1]}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="symptom-notes">Notes</label>
        <textarea
          id="symptom-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Describe your symptoms: nausea, bloating, pain, etc."
          rows={4}
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-submit">
          Save Symptoms
        </button>
      </div>
    </form>
  );
};

export default SymptomForm;
