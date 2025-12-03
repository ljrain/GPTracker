export interface Meal {
  id: string;
  type: 'meal';
  title: string;
  notes: string;
  photo: string | null;
  timestamp: string;
}

export interface Symptom {
  id: string;
  type: 'symptom';
  score: 1 | 2 | 3 | 4 | 5;
  notes: string;
  timestamp: string;
}

export type TimelineEntry = Meal | Symptom;

export interface AppData {
  entries: TimelineEntry[];
}
