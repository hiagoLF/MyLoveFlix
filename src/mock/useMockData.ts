import { useSyncExternalStore } from 'react';

import { series as initialSeries, type Series } from './mock';

type SeriesUpdate = Partial<Omit<Series, 'id'>>;

let currentSeries = initialSeries;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function publish(nextSeries: Series[]) {
  currentSeries = nextSeries;
  listeners.forEach((listener) => listener());
}

function getSnapshot() {
  return currentSeries;
}

function updateSeries(id: string, updates: SeriesUpdate) {
  publish(currentSeries.map((item) => item.id === id ? { ...item, ...updates } : item));
}

function setFavorite(id: string, isFavorite: boolean) {
  updateSeries(id, { isFavorite });
}

function toggleFavorite(id: string) {
  const item = currentSeries.find((seriesItem) => seriesItem.id === id);
  if (item) setFavorite(id, !item.isFavorite);
}

export function useMockData() {
  const mockSeries = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return {
    series: mockSeries,
    getSeriesById: (id: string) => mockSeries.find((item) => item.id === id),
    updateSeries,
    setFavorite,
    toggleFavorite,
  };
}
