export type Series = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  isPro: boolean;
  genres: string[];
  subGenres: string[];
  score: number;
  episodesAmount: number;
  averageEpisodeDurationMinutes: number;
  releaseYear: number;
  isFavorite: boolean;
};

export const defaultSeriesSynopsis = 'When a chance encounter brings two very different lives together, an unexpected connection turns into a story of second chances, brave choices, and a love worth fighting for.';

const episodeDurationsBySeriesId: Record<string, number> = {
  s01: 2, s02: 3, s03: 2, s04: 3, s05: 2,
  s06: 3, s07: 2, s08: 3, s09: 2, s10: 3,
  s11: 2, s12: 3, s13: 2, s14: 3, s15: 2,
  s16: 3, s17: 2, s18: 3, s19: 2, s20: 3,
  s21: 2, s22: 3, s23: 2, s24: 3, s25: 2,
};

export const series: Series[] = [
  { id: 's01', title: 'The Moon’s Promise', description: 'A promise made under the moonlight brings two hearts from different worlds together.', imageUrl: 'https://picsum.photos/id/101/200/300.jpg', isPro: true, genres: ['Romance', 'Drama'], subGenres: ['Trending Romance', 'Second Chance'], score: 4.8, episodesAmount: 68 },
  { id: 's02', title: 'Between Two Worlds', description: 'Between opposing realities, an unlikely love defies fate.', imageUrl: 'https://picsum.photos/id/102/200/300.jpg', isPro: false, genres: ['Romance', 'Fantasy'], subGenres: ['Forbidden Love', 'Fantasy Romance'], score: 4.6, episodesAmount: 54 },
  { id: 's03', title: 'The CEO and the Nanny', description: 'A determined nanny changes the routine and the heart of a reserved CEO.', imageUrl: 'https://picsum.photos/id/103/200/300.jpg', isPro: true, genres: ['Romance', 'Drama'], subGenres: ['Trending Romance', 'Office Romance'], score: 4.5, episodesAmount: 72 },
  { id: 's04', title: 'A Contract of Love', description: 'A convenient deal turns a fake relationship into real love.', imageUrl: 'https://picsum.photos/id/104/200/300.jpg', isPro: false, genres: ['Romance', 'Comedy'], subGenres: ['Fake Dating', 'Office Romance'], score: 4.3, episodesAmount: 48 },
  { id: 's05', title: 'A Heart Ablaze', description: 'An intense passion blossoms amid secrets and difficult choices.', imageUrl: 'https://picsum.photos/id/105/200/300.jpg', isPro: true, genres: ['Romance', 'Drama'], subGenres: ['Forbidden Love', 'Trending Romance'], score: 4.9, episodesAmount: 80 },
  { id: 's06', title: 'The Secret Heiress', description: 'An heiress hides her identity to find out whom she can trust.', imageUrl: 'https://picsum.photos/id/106/200/300.jpg', isPro: false, genres: ['Romance', 'Drama'], subGenres: ['Billionaire Romance', 'Hidden Identity'], score: 4.2, episodesAmount: 60 },
  { id: 's07', title: 'A Winter’s Kiss', description: 'An unexpected encounter warms two hearts during winter.', imageUrl: 'https://picsum.photos/id/107/200/300.jpg', isPro: false, genres: ['Romance', 'Fantasy'], subGenres: ['Fantasy Romance', 'Second Chance'], score: 4.1, episodesAmount: 44 },
  { id: 's08', title: 'My Sweet Revenge', description: 'Betrayed in the past, she plots her revenge and finds a new love.', imageUrl: 'https://picsum.photos/id/108/200/300.jpg', isPro: true, genres: ['Romance', 'Thriller'], subGenres: ['Revenge Romance', 'Trending Romance'], score: 4.7, episodesAmount: 66 },
  { id: 's09', title: 'The CEO’s Secret', description: 'An unexpected secret threatens to change the life of a powerful CEO.', imageUrl: 'https://picsum.photos/id/109/200/300.jpg', isPro: false, genres: ['Romance', 'Drama'], subGenres: ['Billionaire Romance', 'Hidden Identity'], score: 4.4, episodesAmount: 58 },
  { id: 's10', title: 'Love in Silence', description: 'Two strangers learn to understand each other without saying a word.', imageUrl: 'https://picsum.photos/id/110/200/300.jpg', isPro: true, genres: ['Romance', 'Drama'], subGenres: ['Forbidden Love', 'Second Chance'], score: 4.6, episodesAmount: 70 },
  { id: 's11', title: 'The Campus Queen', description: 'On campus, a popular young woman discovers that love breaks the rules.', imageUrl: 'https://picsum.photos/id/111/200/300.jpg', isPro: false, genres: ['Romance', 'Comedy'], subGenres: ['Campus Romance', 'Trending Romance'], score: 4.0, episodesAmount: 42 },
  { id: 's12', title: 'Fate in Paris', description: 'A trip to Paris rekindles feelings that seemed long forgotten.', imageUrl: 'https://picsum.photos/id/112/200/300.jpg', isPro: false, genres: ['Romance', 'Drama'], subGenres: ['Second Chance', 'Trending Romance'], score: 4.3, episodesAmount: 50 },
  { id: 's13', title: 'My Ex’s Wedding', description: 'When she runs into her ex, she must decide whether the past deserves another chance.', imageUrl: 'https://picsum.photos/id/113/200/300.jpg', isPro: true, genres: ['Romance', 'Comedy'], subGenres: ['Second Chance', 'Fake Dating'], score: 4.5, episodesAmount: 62 },
  { id: 's14', title: 'Blood Inheritance', description: 'A powerful family hides truths that could cost them everything.', imageUrl: 'https://picsum.photos/id/114/200/300.jpg', isPro: true, genres: ['Drama', 'Thriller'], subGenres: ['Family Secrets', 'Revenge Romance'], score: 4.8, episodesAmount: 74 },
  { id: 's15', title: 'The Last Witness', description: 'A witness holds the key to a dangerous mystery.', imageUrl: 'https://picsum.photos/id/115/200/300.jpg', isPro: false, genres: ['Thriller', 'Drama'], subGenres: ['Mystery', 'Family Secrets'], score: 4.4, episodesAmount: 38 },
  { id: 's16', title: 'Pact with the Alpha', description: 'A pact with an alpha binds two destinies in a magical kingdom.', imageUrl: 'https://picsum.photos/id/116/200/300.jpg', isPro: true, genres: ['Fantasy', 'Romance'], subGenres: ['Fantasy Romance', 'Forbidden Love'], score: 4.7, episodesAmount: 64 },
  { id: 's17', title: 'The Dragon’s Bride', description: 'An unexpected bride discovers the bond that ties her to a dragon.', imageUrl: 'https://picsum.photos/id/117/200/300.jpg', isPro: false, genres: ['Fantasy', 'Romance'], subGenres: ['Fantasy Romance', 'Trending Romance'], score: 4.2, episodesAmount: 46 },
  { id: 's18', title: 'The Unknown Prince', description: 'A prince with no past fights to reveal his true identity.', imageUrl: 'https://picsum.photos/id/118/200/300.jpg', isPro: true, genres: ['Fantasy', 'Drama'], subGenres: ['Hidden Identity', 'Fantasy Romance'], score: 4.6, episodesAmount: 56 },
  { id: 's19', title: 'Laughing in Love', description: 'An unlikely duo turns disastrous dates into romance.', imageUrl: 'https://picsum.photos/id/119/200/300.jpg', isPro: false, genres: ['Comedy', 'Romance'], subGenres: ['Fake Dating', 'Campus Romance'], score: 4.1, episodesAmount: 40 },
  { id: 's20', title: 'My Mysterious Neighbor', description: 'An enigmatic neighbor sparks curiosity and a dangerous passion.', imageUrl: 'https://picsum.photos/id/120/200/300.jpg', isPro: false, genres: ['Thriller', 'Romance'], subGenres: ['Mystery', 'Forbidden Love'], score: 4.3, episodesAmount: 52 },
  { id: 's21', title: 'An Unlikely Love', description: 'A story that begins by chance could become the love of a lifetime.', imageUrl: 'https://picsum.photos/id/121/200/300.jpg', isPro: true, genres: ['Romance', 'Comedy'], subGenres: ['Trending Romance', 'Fake Dating'], score: 4.8, episodesAmount: 69 },
  { id: 's22', title: 'A Dangerous Deal', description: 'A dangerous deal brings two people with everything to lose closer together.', imageUrl: 'https://picsum.photos/id/122/200/300.jpg', isPro: false, genres: ['Thriller', 'Drama'], subGenres: ['Revenge Romance', 'Mystery'], score: 4.5, episodesAmount: 57 },
  { id: 's23', title: 'Flowers for You', description: 'A tender gesture helps two people start over together.', imageUrl: 'https://picsum.photos/id/123/200/300.jpg', isPro: false, genres: ['Romance', 'Drama'], subGenres: ['Second Chance', 'Campus Romance'], score: 4.0, episodesAmount: 36 },
  { id: 's24', title: 'The Game of Seduction', description: 'A workplace game of seduction becomes difficult to control.', imageUrl: 'https://picsum.photos/id/124/200/300.jpg', isPro: true, genres: ['Romance', 'Drama'], subGenres: ['Office Romance', 'Forbidden Love'], score: 4.7, episodesAmount: 63 },
  { id: 's25', title: 'When the Stars Fall', description: 'When the stars fall, two destinies cross in a magical adventure.', imageUrl: 'https://picsum.photos/id/125/200/300.jpg', isPro: false, genres: ['Fantasy', 'Romance'], subGenres: ['Fantasy Romance', 'Second Chance'], score: 4.4, episodesAmount: 49 },
].map((item) => ({
  ...item,
  description: defaultSeriesSynopsis,
  averageEpisodeDurationMinutes: episodeDurationsBySeriesId[item.id],
  releaseYear: 2020 + (Number(item.id.slice(1)) % 6),
  isFavorite: false,
}));

export const genres = ['All', 'Romance', 'Drama', 'Fantasy', 'Thriller', 'Comedy'];

export const feedSections = [
  { title: 'Romance', gradient: 'linear-gradient(90deg, #64EDF7 0%, #CB64F7 100%)', subGenres: ['Trending Romance', 'Forbidden Love'] },
  { title: 'Popular Micro Dramas', color: '#F5F5F5', subGenres: ['Billionaire Romance', 'Second Chance'] },
  { title: 'More to Love', color: '#F5F5F5', subGenres: ['Fantasy Romance', 'Fake Dating'] },
];
