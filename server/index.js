const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
const meals = [];
const symptoms = [];

// Meal endpoints
app.get('/api/meals', (req, res) => {
  res.json(meals);
});

app.post('/api/meals', (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Meal name is required' });
  }
  const meal = {
    id: uuidv4(),
    type: 'meal',
    name,
    description: description || '',
    timestamp: new Date().toISOString()
  };
  meals.push(meal);
  res.status(201).json(meal);
});

app.delete('/api/meals/:id', (req, res) => {
  const index = meals.findIndex(m => m.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Meal not found' });
  }
  meals.splice(index, 1);
  res.status(204).send();
});

// Symptom endpoints
app.get('/api/symptoms', (req, res) => {
  res.json(symptoms);
});

app.post('/api/symptoms', (req, res) => {
  const { name, severity, description } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Symptom name is required' });
  }
  const symptom = {
    id: uuidv4(),
    type: 'symptom',
    name,
    severity: severity || 'medium',
    description: description || '',
    timestamp: new Date().toISOString()
  };
  symptoms.push(symptom);
  res.status(201).json(symptom);
});

app.delete('/api/symptoms/:id', (req, res) => {
  const index = symptoms.findIndex(s => s.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Symptom not found' });
  }
  symptoms.splice(index, 1);
  res.status(204).send();
});

// Unified timeline endpoint
app.get('/api/timeline', (req, res) => {
  const timeline = [...meals, ...symptoms].sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );
  res.json(timeline);
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
