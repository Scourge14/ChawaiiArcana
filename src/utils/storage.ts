import type { TarotReading } from "../types";

const STORAGE_KEY = "premium-tarot-readings";

export function getSavedReadings(): TarotReading[] {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value ? (JSON.parse(value) as TarotReading[]) : [];
  } catch {
    return [];
  }
}

export function saveReading(reading: TarotReading) {
  try {
    const readings = getSavedReadings();
    const alreadySaved = readings.some((item) => item.id === reading.id);

    if (alreadySaved) {
      return readings;
    }

    const next = [reading, ...readings].slice(0, 20);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  } catch {
    return getSavedReadings();
  }
}

export function clearReadings() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    return;
  }
}
