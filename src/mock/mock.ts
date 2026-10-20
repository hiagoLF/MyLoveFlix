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
};

export const series: Series[] = [
  { id: 's01', title: 'A Promessa da Lua', description: 'Uma promessa feita sob o luar aproxima dois corações de mundos distintos.', imageUrl: 'https://picsum.photos/id/101/200/300.jpg', isPro: true, genres: ['Romance', 'Drama'], subGenres: ['Trending Romance', 'Second Chance'], score: 4.8, episodesAmount: 68 },
  { id: 's02', title: 'Entre Dois Mundos', description: 'Entre realidades opostas, um amor improvável desafia o destino.', imageUrl: 'https://picsum.photos/id/102/200/300.jpg', isPro: false, genres: ['Romance', 'Fantasy'], subGenres: ['Forbidden Love', 'Fantasy Romance'], score: 4.6, episodesAmount: 54 },
  { id: 's03', title: 'O CEO e a Babá', description: 'Uma babá determinada muda a rotina e o coração de um CEO reservado.', imageUrl: 'https://picsum.photos/id/103/200/300.jpg', isPro: true, genres: ['Romance', 'Drama'], subGenres: ['Trending Romance', 'Office Romance'], score: 4.5, episodesAmount: 72 },
  { id: 's04', title: 'Contrato de Amor', description: 'Um acordo conveniente transforma uma relação de fachada em amor.', imageUrl: 'https://picsum.photos/id/104/200/300.jpg', isPro: false, genres: ['Romance', 'Comedy'], subGenres: ['Fake Dating', 'Office Romance'], score: 4.3, episodesAmount: 48 },
  { id: 's05', title: 'Coração em Chamas', description: 'Uma paixão intensa floresce em meio a segredos e escolhas difíceis.', imageUrl: 'https://picsum.photos/id/105/200/300.jpg', isPro: true, genres: ['Romance', 'Drama'], subGenres: ['Forbidden Love', 'Trending Romance'], score: 4.9, episodesAmount: 80 },
  { id: 's06', title: 'A Herdeira Secreta', description: 'Uma herdeira oculta sua identidade para descobrir em quem pode confiar.', imageUrl: 'https://picsum.photos/id/106/200/300.jpg', isPro: false, genres: ['Romance', 'Drama'], subGenres: ['Billionaire Romance', 'Hidden Identity'], score: 4.2, episodesAmount: 60 },
  { id: 's07', title: 'Beijo de Inverno', description: 'Um encontro inesperado aquece dois corações durante o inverno.', imageUrl: 'https://picsum.photos/id/107/200/300.jpg', isPro: false, genres: ['Romance', 'Fantasy'], subGenres: ['Fantasy Romance', 'Second Chance'], score: 4.1, episodesAmount: 44 },
  { id: 's08', title: 'Minha Doce Vingança', description: 'Traída no passado, ela planeja sua vingança e encontra um novo amor.', imageUrl: 'https://picsum.photos/id/108/200/300.jpg', isPro: true, genres: ['Romance', 'Thriller'], subGenres: ['Revenge Romance', 'Trending Romance'], score: 4.7, episodesAmount: 66 },
  { id: 's09', title: 'O Segredo do CEO', description: 'Um segredo inesperado ameaça mudar a vida de um poderoso CEO.', imageUrl: 'https://picsum.photos/id/109/200/300.jpg', isPro: false, genres: ['Romance', 'Drama'], subGenres: ['Billionaire Romance', 'Hidden Identity'], score: 4.4, episodesAmount: 58 },
  { id: 's10', title: 'Amor em Silêncio', description: 'Dois desconhecidos aprendem a se entender sem dizer uma palavra.', imageUrl: 'https://picsum.photos/id/110/200/300.jpg', isPro: true, genres: ['Romance', 'Drama'], subGenres: ['Forbidden Love', 'Second Chance'], score: 4.6, episodesAmount: 70 },
  { id: 's11', title: 'A Rainha do Campus', description: 'No campus, uma jovem popular descobre que o amor foge às regras.', imageUrl: 'https://picsum.photos/id/111/200/300.jpg', isPro: false, genres: ['Romance', 'Comedy'], subGenres: ['Campus Romance', 'Trending Romance'], score: 4.0, episodesAmount: 42 },
  { id: 's12', title: 'Destino em Paris', description: 'Uma viagem a Paris reacende sentimentos que pareciam esquecidos.', imageUrl: 'https://picsum.photos/id/112/200/300.jpg', isPro: false, genres: ['Romance', 'Drama'], subGenres: ['Second Chance', 'Trending Romance'], score: 4.3, episodesAmount: 50 },
  { id: 's13', title: 'O Casamento do Meu Ex', description: 'Ao reencontrar o ex, ela precisa decidir se o passado merece outra chance.', imageUrl: 'https://picsum.photos/id/113/200/300.jpg', isPro: true, genres: ['Romance', 'Comedy'], subGenres: ['Second Chance', 'Fake Dating'], score: 4.5, episodesAmount: 62 },
  { id: 's14', title: 'Herança de Sangue', description: 'Uma família poderosa esconde verdades que podem custar tudo.', imageUrl: 'https://picsum.photos/id/114/200/300.jpg', isPro: true, genres: ['Drama', 'Thriller'], subGenres: ['Family Secrets', 'Revenge Romance'], score: 4.8, episodesAmount: 74 },
  { id: 's15', title: 'A Última Testemunha', description: 'Uma testemunha guarda a chave de um mistério perigoso.', imageUrl: 'https://picsum.photos/id/115/200/300.jpg', isPro: false, genres: ['Thriller', 'Drama'], subGenres: ['Mystery', 'Family Secrets'], score: 4.4, episodesAmount: 38 },
  { id: 's16', title: 'Pacto com o Alfa', description: 'Um pacto com um alfa une destinos em um reino de magia.', imageUrl: 'https://picsum.photos/id/116/200/300.jpg', isPro: true, genres: ['Fantasy', 'Romance'], subGenres: ['Fantasy Romance', 'Forbidden Love'], score: 4.7, episodesAmount: 64 },
  { id: 's17', title: 'A Noiva do Dragão', description: 'Uma noiva inesperada descobre o vínculo que a liga a um dragão.', imageUrl: 'https://picsum.photos/id/117/200/300.jpg', isPro: false, genres: ['Fantasy', 'Romance'], subGenres: ['Fantasy Romance', 'Trending Romance'], score: 4.2, episodesAmount: 46 },
  { id: 's18', title: 'O Príncipe Desconhecido', description: 'Um príncipe sem passado luta para revelar sua verdadeira identidade.', imageUrl: 'https://picsum.photos/id/118/200/300.jpg', isPro: true, genres: ['Fantasy', 'Drama'], subGenres: ['Hidden Identity', 'Fantasy Romance'], score: 4.6, episodesAmount: 56 },
  { id: 's19', title: 'Rindo de Amor', description: 'Uma dupla improvável transforma encontros desastrosos em romance.', imageUrl: 'https://picsum.photos/id/119/200/300.jpg', isPro: false, genres: ['Comedy', 'Romance'], subGenres: ['Fake Dating', 'Campus Romance'], score: 4.1, episodesAmount: 40 },
  { id: 's20', title: 'Meu Vizinho Misterioso', description: 'Um vizinho enigmático desperta curiosidade e uma paixão arriscada.', imageUrl: 'https://picsum.photos/id/120/200/300.jpg', isPro: false, genres: ['Thriller', 'Romance'], subGenres: ['Mystery', 'Forbidden Love'], score: 4.3, episodesAmount: 52 },
  { id: 's21', title: 'Um Amor Improvável', description: 'Uma história que começa por acaso pode virar o amor de uma vida.', imageUrl: 'https://picsum.photos/id/121/200/300.jpg', isPro: true, genres: ['Romance', 'Comedy'], subGenres: ['Trending Romance', 'Fake Dating'], score: 4.8, episodesAmount: 69 },
  { id: 's22', title: 'Acordo Perigoso', description: 'Um acordo perigoso aproxima duas pessoas com muito a perder.', imageUrl: 'https://picsum.photos/id/122/200/300.jpg', isPro: false, genres: ['Thriller', 'Drama'], subGenres: ['Revenge Romance', 'Mystery'], score: 4.5, episodesAmount: 57 },
  { id: 's23', title: 'Flores para Você', description: 'Um gesto delicado ajuda duas pessoas a recomeçar juntas.', imageUrl: 'https://picsum.photos/id/123/200/300.jpg', isPro: false, genres: ['Romance', 'Drama'], subGenres: ['Second Chance', 'Campus Romance'], score: 4.0, episodesAmount: 36 },
  { id: 's24', title: 'O Jogo da Sedução', description: 'Um jogo de sedução no trabalho se torna difícil de controlar.', imageUrl: 'https://picsum.photos/id/124/200/300.jpg', isPro: true, genres: ['Romance', 'Drama'], subGenres: ['Office Romance', 'Forbidden Love'], score: 4.7, episodesAmount: 63 },
  { id: 's25', title: 'Quando as Estrelas Caem', description: 'Quando estrelas caem, dois destinos se cruzam em uma aventura mágica.', imageUrl: 'https://picsum.photos/id/125/200/300.jpg', isPro: false, genres: ['Fantasy', 'Romance'], subGenres: ['Fantasy Romance', 'Second Chance'], score: 4.4, episodesAmount: 49 },
];

export const genres = ['All', 'Romance', 'Drama', 'Fantasy', 'Thriller', 'Comedy'];

export const feedSections = [
  { title: 'Romance', subGenres: ['Trending Romance', 'Forbidden Love'] },
  { title: 'Popular Micro Dramas', subGenres: ['Billionaire Romance', 'Second Chance'] },
  { title: 'More to Love', subGenres: ['Fantasy Romance', 'Fake Dating'] },
];
