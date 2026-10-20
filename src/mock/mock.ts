export type Series = {
  id: string;
  title: string;
  imageUrl: string;
  isPro: boolean;
  genres: string[];
  subGenres: string[];
  score: number;
  episodesAmount: number;
};

export const series: Series[] = [
  { id: 's01', title: 'A Promessa da Lua', imageUrl: 'https://picsum.photos/id/101/200/300.jpg', isPro: true, genres: ['Romance', 'Drama'], subGenres: ['Trending Romance', 'Second Chance'], score: 4.8, episodesAmount: 68 },
  { id: 's02', title: 'Entre Dois Mundos', imageUrl: 'https://picsum.photos/id/102/200/300.jpg', isPro: false, genres: ['Romance', 'Fantasy'], subGenres: ['Forbidden Love', 'Fantasy Romance'], score: 4.6, episodesAmount: 54 },
  { id: 's03', title: 'O CEO e a Babá', imageUrl: 'https://picsum.photos/id/103/200/300.jpg', isPro: true, genres: ['Romance', 'Drama'], subGenres: ['Trending Romance', 'Office Romance'], score: 4.5, episodesAmount: 72 },
  { id: 's04', title: 'Contrato de Amor', imageUrl: 'https://picsum.photos/id/104/200/300.jpg', isPro: false, genres: ['Romance', 'Comedy'], subGenres: ['Fake Dating', 'Office Romance'], score: 4.3, episodesAmount: 48 },
  { id: 's05', title: 'Coração em Chamas', imageUrl: 'https://picsum.photos/id/105/200/300.jpg', isPro: true, genres: ['Romance', 'Drama'], subGenres: ['Forbidden Love', 'Trending Romance'], score: 4.9, episodesAmount: 80 },
  { id: 's06', title: 'A Herdeira Secreta', imageUrl: 'https://picsum.photos/id/106/200/300.jpg', isPro: false, genres: ['Romance', 'Drama'], subGenres: ['Billionaire Romance', 'Hidden Identity'], score: 4.2, episodesAmount: 60 },
  { id: 's07', title: 'Beijo de Inverno', imageUrl: 'https://picsum.photos/id/107/200/300.jpg', isPro: false, genres: ['Romance', 'Fantasy'], subGenres: ['Fantasy Romance', 'Second Chance'], score: 4.1, episodesAmount: 44 },
  { id: 's08', title: 'Minha Doce Vingança', imageUrl: 'https://picsum.photos/id/108/200/300.jpg', isPro: true, genres: ['Romance', 'Thriller'], subGenres: ['Revenge Romance', 'Trending Romance'], score: 4.7, episodesAmount: 66 },
  { id: 's09', title: 'O Segredo do CEO', imageUrl: 'https://picsum.photos/id/109/200/300.jpg', isPro: false, genres: ['Romance', 'Drama'], subGenres: ['Billionaire Romance', 'Hidden Identity'], score: 4.4, episodesAmount: 58 },
  { id: 's10', title: 'Amor em Silêncio', imageUrl: 'https://picsum.photos/id/110/200/300.jpg', isPro: true, genres: ['Romance', 'Drama'], subGenres: ['Forbidden Love', 'Second Chance'], score: 4.6, episodesAmount: 70 },
  { id: 's11', title: 'A Rainha do Campus', imageUrl: 'https://picsum.photos/id/111/200/300.jpg', isPro: false, genres: ['Romance', 'Comedy'], subGenres: ['Campus Romance', 'Trending Romance'], score: 4.0, episodesAmount: 42 },
  { id: 's12', title: 'Destino em Paris', imageUrl: 'https://picsum.photos/id/112/200/300.jpg', isPro: false, genres: ['Romance', 'Drama'], subGenres: ['Second Chance', 'Trending Romance'], score: 4.3, episodesAmount: 50 },
  { id: 's13', title: 'O Casamento do Meu Ex', imageUrl: 'https://picsum.photos/id/113/200/300.jpg', isPro: true, genres: ['Romance', 'Comedy'], subGenres: ['Second Chance', 'Fake Dating'], score: 4.5, episodesAmount: 62 },
  { id: 's14', title: 'Herança de Sangue', imageUrl: 'https://picsum.photos/id/114/200/300.jpg', isPro: true, genres: ['Drama', 'Thriller'], subGenres: ['Family Secrets', 'Revenge Romance'], score: 4.8, episodesAmount: 74 },
  { id: 's15', title: 'A Última Testemunha', imageUrl: 'https://picsum.photos/id/115/200/300.jpg', isPro: false, genres: ['Thriller', 'Drama'], subGenres: ['Mystery', 'Family Secrets'], score: 4.4, episodesAmount: 38 },
  { id: 's16', title: 'Pacto com o Alfa', imageUrl: 'https://picsum.photos/id/116/200/300.jpg', isPro: true, genres: ['Fantasy', 'Romance'], subGenres: ['Fantasy Romance', 'Forbidden Love'], score: 4.7, episodesAmount: 64 },
  { id: 's17', title: 'A Noiva do Dragão', imageUrl: 'https://picsum.photos/id/117/200/300.jpg', isPro: false, genres: ['Fantasy', 'Romance'], subGenres: ['Fantasy Romance', 'Trending Romance'], score: 4.2, episodesAmount: 46 },
  { id: 's18', title: 'O Príncipe Desconhecido', imageUrl: 'https://picsum.photos/id/118/200/300.jpg', isPro: true, genres: ['Fantasy', 'Drama'], subGenres: ['Hidden Identity', 'Fantasy Romance'], score: 4.6, episodesAmount: 56 },
  { id: 's19', title: 'Rindo de Amor', imageUrl: 'https://picsum.photos/id/119/200/300.jpg', isPro: false, genres: ['Comedy', 'Romance'], subGenres: ['Fake Dating', 'Campus Romance'], score: 4.1, episodesAmount: 40 },
  { id: 's20', title: 'Meu Vizinho Misterioso', imageUrl: 'https://picsum.photos/id/120/200/300.jpg', isPro: false, genres: ['Thriller', 'Romance'], subGenres: ['Mystery', 'Forbidden Love'], score: 4.3, episodesAmount: 52 },
  { id: 's21', title: 'Um Amor Improvável', imageUrl: 'https://picsum.photos/id/121/200/300.jpg', isPro: true, genres: ['Romance', 'Comedy'], subGenres: ['Trending Romance', 'Fake Dating'], score: 4.8, episodesAmount: 69 },
  { id: 's22', title: 'Acordo Perigoso', imageUrl: 'https://picsum.photos/id/122/200/300.jpg', isPro: false, genres: ['Thriller', 'Drama'], subGenres: ['Revenge Romance', 'Mystery'], score: 4.5, episodesAmount: 57 },
  { id: 's23', title: 'Flores para Você', imageUrl: 'https://picsum.photos/id/123/200/300.jpg', isPro: false, genres: ['Romance', 'Drama'], subGenres: ['Second Chance', 'Campus Romance'], score: 4.0, episodesAmount: 36 },
  { id: 's24', title: 'O Jogo da Sedução', imageUrl: 'https://picsum.photos/id/124/200/300.jpg', isPro: true, genres: ['Romance', 'Drama'], subGenres: ['Office Romance', 'Forbidden Love'], score: 4.7, episodesAmount: 63 },
  { id: 's25', title: 'Quando as Estrelas Caem', imageUrl: 'https://picsum.photos/id/125/200/300.jpg', isPro: false, genres: ['Fantasy', 'Romance'], subGenres: ['Fantasy Romance', 'Second Chance'], score: 4.4, episodesAmount: 49 },
];

export const genres = ['All', 'Romance', 'Drama', 'Fantasy', 'Thriller', 'Comedy'];

export const feedSections = [
  { title: 'Romance', subGenres: ['Trending Romance', 'Forbidden Love'] },
  { title: 'Popular Micro Dramas', subGenres: ['Billionaire Romance', 'Second Chance'] },
  { title: 'More to Love', subGenres: ['Fantasy Romance', 'Fake Dating'] },
];
