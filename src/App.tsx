import React, { useState, useEffect } from 'react';
import { TimelineEntry, Meal, Symptom } from './types';
import { loadData, addEntry, deleteEntry } from './dataStore';
import Timeline from './components/Timeline';
import MealForm from './components/MealForm';
import SymptomForm from './components/SymptomForm';
import './App.css';

type View = 'timeline' | 'add-meal' | 'add-symptom';

function App() {
  const [entries, setEntries] = useState<TimelineEntry[]>([]);
  const [currentView, setCurrentView] = useState<View>('timeline');

  useEffect(() => {
    const data = loadData();
    setEntries(data.entries);
  }, []);

  const handleAddMeal = (meal: Meal) => {
    const data = addEntry(meal);
    setEntries(data.entries);
    setCurrentView('timeline');
  };

  const handleAddSymptom = (symptom: Symptom) => {
    const data = addEntry(symptom);
    setEntries(data.entries);
    setCurrentView('timeline');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const data = deleteEntry(id);
      setEntries(data.entries);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'add-meal':
        return (
          <MealForm
            onSubmit={handleAddMeal}
            onCancel={() => setCurrentView('timeline')}
          />
        );
      case 'add-symptom':
        return (
          <SymptomForm
            onSubmit={handleAddSymptom}
            onCancel={() => setCurrentView('timeline')}
          />
        );
      default:
        return <Timeline entries={entries} onDelete={handleDelete} />;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>GPTracker</h1>
      </header>

      <main className="app-main">
        {renderView()}
      </main>

      {currentView === 'timeline' && (
        <nav className="app-nav">
          <button
            className="nav-btn meal-btn"
            onClick={() => setCurrentView('add-meal')}
          >
            <span>🍽️</span>
            <span>Add Meal</span>
          </button>
          <button
            className="nav-btn symptom-btn"
            onClick={() => setCurrentView('add-symptom')}
          >
            <span>😣</span>
            <span>Add Symptom</span>
          </button>
        </nav>
      )}
    </div>
  );
}

export default App;

