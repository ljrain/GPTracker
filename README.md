# GPTracker

Gastroparesis Tracker - A meal and symptom tracking app designed for iPhone.

## Features

- **Timeline View**: Social media-style chronological timeline of meals and symptoms
- **Meal Tracking**: Log meals with photos, titles, and notes
- **Symptom Tracking**: Track symptoms with severity scores (1-5) and notes
- **Correlation Analysis**: Easily see what meals preceded symptoms
- **iPhone Optimized**: Designed specifically for iPhone with safe area support
- **Local Storage**: All data is stored locally in JSON format via localStorage

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

Opens the app at [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
```

### Running Tests

```bash
npm test
```

## Usage

1. **Add a Meal**: Tap "Add Meal" to log what you ate, optionally add a photo and notes
2. **Add Symptoms**: Tap "Add Symptom" to log symptoms with a severity score (1-5)
3. **View Timeline**: Scroll through the timeline to see meals and symptoms in chronological order
4. **Delete Entries**: Tap "Delete" on any entry to remove it

## Tech Stack

- React 19 with TypeScript
- Create React App
- CSS3 with CSS Variables
- localStorage for data persistence
