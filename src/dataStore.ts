import { AppData, TimelineEntry } from './types';

const STORAGE_KEY = 'gptracker_data';

export const loadData = (): AppData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
  return { entries: [] };
};

export const saveData = (data: AppData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export const addEntry = (entry: TimelineEntry): AppData => {
  const data = loadData();
  data.entries.push(entry);
  data.entries.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  saveData(data);
  return data;
};

export const deleteEntry = (id: string): AppData => {
  const data = loadData();
  data.entries = data.entries.filter(entry => entry.id !== id);
  saveData(data);
  return data;
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
};
