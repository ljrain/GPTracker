import React, { useState, useRef } from 'react';
import { Meal } from '../types';
import { generateId } from '../dataStore';
import './EntryForm.css';

interface MealFormProps {
  onSubmit: (meal: Meal) => void;
  onCancel: () => void;
}

const MealForm: React.FC<MealFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const meal: Meal = {
      id: generateId(),
      type: 'meal',
      title: title.trim(),
      notes: notes.trim(),
      photo,
      timestamp: new Date().toISOString(),
    };

    onSubmit(meal);
  };

  return (
    <form className="entry-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Log Meal</h2>
      
      <div className="photo-upload" onClick={() => fileInputRef.current?.click()}>
        {photo ? (
          <img src={photo} alt="Meal preview" className="photo-preview" />
        ) : (
          <div className="photo-placeholder">
            <span>📷</span>
            <span>Add Photo</span>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          style={{ display: 'none' }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="meal-title">Meal Title *</label>
        <input
          id="meal-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Breakfast, Lunch, Dinner"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="meal-notes">Notes</label>
        <textarea
          id="meal-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="What did you eat? Any ingredients to note?"
          rows={4}
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-submit" disabled={!title.trim()}>
          Save Meal
        </button>
      </div>
    </form>
  );
};

export default MealForm;
