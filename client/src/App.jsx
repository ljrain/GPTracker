import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [timeline, setTimeline] = useState([])
  const [mealName, setMealName] = useState('')
  const [mealDescription, setMealDescription] = useState('')
  const [symptomName, setSymptomName] = useState('')
  const [symptomSeverity, setSymptomSeverity] = useState('medium')
  const [symptomDescription, setSymptomDescription] = useState('')
  const [activeTab, setActiveTab] = useState('timeline')
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    const abortController = new AbortController()
    fetch('/api/timeline', { signal: abortController.signal })
      .then(response => response.json())
      .then(data => setTimeline(data))
      .catch(error => {
        if (error.name !== 'AbortError') {
          console.error('Error fetching timeline:', error)
        }
      })
    return () => {
      abortController.abort()
    }
  }, [refreshKey])

  const refreshTimeline = () => {
    setRefreshKey(prev => prev + 1)
  }

  const handleAddMeal = async (e) => {
    e.preventDefault()
    if (!mealName.trim()) return
    try {
      const response = await fetch('/api/meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: mealName, description: mealDescription })
      })
      if (response.ok) {
        setMealName('')
        setMealDescription('')
        refreshTimeline()
      }
    } catch (error) {
      console.error('Error adding meal:', error)
    }
  }

  const handleAddSymptom = async (e) => {
    e.preventDefault()
    if (!symptomName.trim()) return
    try {
      const response = await fetch('/api/symptoms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: symptomName, 
          severity: symptomSeverity, 
          description: symptomDescription 
        })
      })
      if (response.ok) {
        setSymptomName('')
        setSymptomSeverity('medium')
        setSymptomDescription('')
        refreshTimeline()
      }
    } catch (error) {
      console.error('Error adding symptom:', error)
    }
  }

  const handleDelete = async (item) => {
    try {
      const endpoint = item.type === 'meal' ? '/api/meals' : '/api/symptoms'
      const response = await fetch(`${endpoint}/${item.id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        refreshTimeline()
      }
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString()
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'low': return '#4caf50'
      case 'medium': return '#ff9800'
      case 'high': return '#f44336'
      default: return '#ff9800'
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🍽️ GPTracker</h1>
        <p>Track your meals and symptoms</p>
      </header>

      <nav className="tabs">
        <button 
          className={activeTab === 'timeline' ? 'active' : ''} 
          onClick={() => setActiveTab('timeline')}
        >
          📋 Timeline
        </button>
        <button 
          className={activeTab === 'meal' ? 'active' : ''} 
          onClick={() => setActiveTab('meal')}
        >
          🍽️ Add Meal
        </button>
        <button 
          className={activeTab === 'symptom' ? 'active' : ''} 
          onClick={() => setActiveTab('symptom')}
        >
          🩺 Add Symptom
        </button>
      </nav>

      <main className="content">
        {activeTab === 'meal' && (
          <form className="form" onSubmit={handleAddMeal}>
            <h2>Add a Meal</h2>
            <input
              type="text"
              placeholder="Meal name"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              required
            />
            <textarea
              placeholder="Description (optional)"
              value={mealDescription}
              onChange={(e) => setMealDescription(e.target.value)}
            />
            <button type="submit">Add Meal</button>
          </form>
        )}

        {activeTab === 'symptom' && (
          <form className="form" onSubmit={handleAddSymptom}>
            <h2>Log a Symptom</h2>
            <input
              type="text"
              placeholder="Symptom name"
              value={symptomName}
              onChange={(e) => setSymptomName(e.target.value)}
              required
            />
            <select
              value={symptomSeverity}
              onChange={(e) => setSymptomSeverity(e.target.value)}
            >
              <option value="low">Low Severity</option>
              <option value="medium">Medium Severity</option>
              <option value="high">High Severity</option>
            </select>
            <textarea
              placeholder="Description (optional)"
              value={symptomDescription}
              onChange={(e) => setSymptomDescription(e.target.value)}
            />
            <button type="submit">Log Symptom</button>
          </form>
        )}

        {activeTab === 'timeline' && (
          <div className="timeline">
            <h2>Timeline</h2>
            {timeline.length === 0 ? (
              <p className="empty-message">No entries yet. Add a meal or symptom to get started!</p>
            ) : (
              <ul className="timeline-list">
                {timeline.map((item) => (
                  <li key={item.id} className={`timeline-item ${item.type}`}>
                    <div className="timeline-icon">
                      {item.type === 'meal' ? '🍽️' : '🩺'}
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <span className="timeline-name">{item.name}</span>
                        {item.type === 'symptom' && (
                          <span 
                            className="severity-badge"
                            style={{ backgroundColor: getSeverityColor(item.severity) }}
                          >
                            {item.severity}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="timeline-description">{item.description}</p>
                      )}
                      <span className="timeline-time">{formatTime(item.timestamp)}</span>
                    </div>
                    <button 
                      className="delete-btn" 
                      onClick={() => handleDelete(item)}
                      aria-label="Delete item"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
