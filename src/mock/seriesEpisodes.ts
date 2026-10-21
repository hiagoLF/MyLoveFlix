export type SeriesEpisode = {
  number: number;
  title: string;
  duration: string;
  imageId: number;
  locked: boolean;
};

export const seriesEpisodes: SeriesEpisode[] = [
  { number: 1, title: 'The Promise', duration: '2 min', imageId: 1011, locked: false },
  { number: 2, title: 'A Different World', duration: '3 min', imageId: 1012, locked: false },
  { number: 3, title: 'Unexpected Guests', duration: '2 min', imageId: 1013, locked: false },
  { number: 4, title: 'The Secret', duration: '3 min', imageId: 1014, locked: true },
  { number: 5, title: 'Closer Than Ever', duration: '2 min', imageId: 1015, locked: true },
];
