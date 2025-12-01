# GPTracker
Gastroparesis Tracker - A web application to track meals and symptoms throughout the day.

## Features

- **Meal Tracking**: Log meals with name and description
- **Symptom Tracking**: Record symptoms with severity levels (low, medium, high)
- **Unified Timeline**: View all entries in chronological order to correlate meals with symptoms
- **Easy Management**: Delete entries with one click

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ljrain/GPTracker.git
cd GPTracker
```

2. Install dependencies:
```bash
npm install
cd client && npm install && cd ..
```

3. Start the development server:
```bash
npm run dev
```

This will start both the API server (port 3001) and the React development server (port 5173).

4. Open your browser to `http://localhost:5173`

## API Endpoints

- `GET /api/meals` - Get all meals
- `POST /api/meals` - Add a new meal
- `DELETE /api/meals/:id` - Delete a meal
- `GET /api/symptoms` - Get all symptoms
- `POST /api/symptoms` - Add a new symptom
- `DELETE /api/symptoms/:id` - Delete a symptom
- `GET /api/timeline` - Get unified timeline of all entries

## Project Structure

```
GPTracker/
├── server/
│   └── index.js      # Express API server
├── client/
│   ├── src/
│   │   ├── App.jsx   # Main React component
│   │   ├── App.css   # Component styles
│   │   └── ...
│   └── ...
└── package.json
```

## License

ISC
