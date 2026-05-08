import type { Movie, Genre } from '../types';

export const mockGenres: Genre[] = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 27, name: 'Horror' },
  { id: 878, name: 'Sci-Fi' },
  { id: 10749, name: 'Romance' },
  { id: 53, name: 'Thriller' },
  { id: 18, name: 'Drama' },
  { id: 14, name: 'Fantasy' },
  { id: 99, name: 'Documentary' },
  { id: 10751, name: 'Family' },
];

const posterPlaceholders = [
  '/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg',
  '/qJ2tW6WMUDux911Ma1ceASj2VVQ.jpg',
  '/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
];

function createMockMovie(id: number, title: string, rating: number, genreIds: number[]): Movie {
  return {
    id,
    title,
    overview: `An incredible ${title.toLowerCase()} experience that will blow your mind. This film takes you on a journey through uncharted territory with stunning visuals and a gripping storyline that keeps you on the edge of your seat.`,
    poster_path: posterPlaceholders[id % 3],
    backdrop_path: posterPlaceholders[id % 3],
    release_date: '2025-0' + ((id % 9) + 1) + '-15',
    vote_average: rating,
    vote_count: 1000 + id * 100,
    genre_ids: genreIds,
    popularity: 500 + id * 50,
    original_language: 'en',
    adult: false,
  };
}

export const mockTrending: Movie[] = [
  createMockMovie(1, 'Neon Horizon', 8.5, [878, 28]),
  createMockMovie(2, 'Digital Dreams', 7.9, [878, 12]),
  createMockMovie(3, 'Midnight Pulse', 8.2, [53, 27]),
  createMockMovie(4, 'Cyber Bloom', 7.6, [878, 14]),
  createMockMovie(5, 'Starlight Express', 8.8, [12, 878]),
  createMockMovie(6, 'Velvet Thunder', 7.4, [28, 53]),
  createMockMovie(7, 'Crystal Echoes', 8.1, [14, 12]),
  createMockMovie(8, 'Nova Rising', 7.7, [28, 878]),
  createMockMovie(9, 'Shadow Protocol', 8.3, [28, 53]),
  createMockMovie(10, 'Aurora Code', 7.8, [878, 18]),
];

export const mockPopular: Movie[] = [
  createMockMovie(11, 'Pixel Paradise', 7.5, [35, 12]),
  createMockMovie(12, 'Quantum Drift', 8.0, [878, 28]),
  createMockMovie(13, 'Ember Crown', 8.4, [14, 18]),
  createMockMovie(14, 'Rogue Signal', 7.3, [53, 28]),
  createMockMovie(15, 'Lunar Tides', 7.9, [10749, 18]),
  createMockMovie(16, 'Blaze Runner', 8.1, [28, 878]),
  createMockMovie(17, 'Frost Kingdom', 7.6, [14, 12]),
  createMockMovie(18, 'Vortex Mind', 8.2, [878, 53]),
  createMockMovie(19, 'Crimson Skies', 7.7, [28, 12]),
  createMockMovie(20, 'Echo Valley', 7.4, [18, 27]),
];

export const mockNowPlaying: Movie[] = [
  createMockMovie(21, 'Prism Break', 8.6, [28, 878]),
  createMockMovie(22, 'Cloud Surfer', 7.8, [12, 35]),
  createMockMovie(23, 'Dark Frequency', 8.0, [27, 53]),
  createMockMovie(24, 'Wild Circuit', 7.5, [28, 35]),
  createMockMovie(25, 'Zenith Point', 8.3, [878, 18]),
  createMockMovie(26, 'Neon Samurai', 8.7, [28, 14]),
  createMockMovie(27, 'Gravity Well', 7.9, [878, 53]),
  createMockMovie(28, 'Iron Petals', 7.2, [18, 10749]),
  createMockMovie(29, 'Byte Storm', 8.1, [28, 878]),
  createMockMovie(30, 'Solar Flare', 7.6, [12, 878]),
];

export const mockTopRated: Movie[] = [
  createMockMovie(31, 'Eternal Canvas', 9.1, [18, 14]),
  createMockMovie(32, 'Whisper Network', 8.9, [53, 18]),
  createMockMovie(33, 'Cosmic Thread', 9.0, [878, 18]),
  createMockMovie(34, 'Heart Algorithm', 8.8, [10749, 878]),
  createMockMovie(35, 'Mirror Realm', 8.7, [14, 12]),
  createMockMovie(36, 'Silent Protocol', 9.2, [53, 28]),
  createMockMovie(37, 'Ocean Binary', 8.6, [878, 12]),
  createMockMovie(38, 'Dream Weaver', 8.9, [14, 18]),
  createMockMovie(39, 'Phantom Circuit', 8.5, [28, 878]),
  createMockMovie(40, 'Golden Algorithm', 9.0, [18, 53]),
];

export const mockUpcoming: Movie[] = [
  createMockMovie(41, 'Void Walker', 0, [878, 28]),
  createMockMovie(42, 'Chrome Heart', 0, [10749, 878]),
  createMockMovie(43, 'Nebula Knights', 0, [14, 28]),
  createMockMovie(44, 'Glass Horizon', 0, [18, 53]),
  createMockMovie(45, 'Pulse Drive', 0, [28, 878]),
  createMockMovie(46, 'Azure Storm', 0, [14, 12]),
  createMockMovie(47, 'Synth Wave', 0, [878, 35]),
  createMockMovie(48, 'Violet Sun', 0, [12, 878]),
  createMockMovie(49, 'Zero Gravity', 0, [878, 28]),
  createMockMovie(50, 'Neon Genesis', 0, [14, 878]),
];
