import type { Movie, MovieDetails, ApiResponse, Genre } from '../types';

const API_KEY = 'b0PAPuQqhwEJF1jSVv7MMNDlSDHHNZ9j';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p';

export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return '';
  return `${IMAGE_BASE}/${size}${path}`;
};

export const getBackdropUrl = (path: string | null): string => {
  if (!path) return '';
  return `${IMAGE_BASE}/original${path}`;
};

async function fetchTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const searchParams = new URLSearchParams({ api_key: API_KEY, ...params });
  const response = await fetch(`${BASE_URL}${endpoint}?${searchParams}`);
  if (!response.ok) throw new Error(`TMDB API error: ${response.status}`);
  return response.json();
}

export const tmdb = {
  getTrending: (timeWindow: 'day' | 'week' = 'week') =>
    fetchTMDB<ApiResponse<Movie>>(`/trending/movie/${timeWindow}`),

  getPopular: (page: number = 1) =>
    fetchTMDB<ApiResponse<Movie>>('/movie/popular', { page: String(page) }),

  getTopRated: (page: number = 1) =>
    fetchTMDB<ApiResponse<Movie>>('/movie/top_rated', { page: String(page) }),

  getNowPlaying: (page: number = 1) =>
    fetchTMDB<ApiResponse<Movie>>('/movie/now_playing', { page: String(page) }),

  getUpcoming: (page: number = 1) =>
    fetchTMDB<ApiResponse<Movie>>('/movie/upcoming', { page: String(page) }),

  getMovieDetails: (id: number) =>
    fetchTMDB<MovieDetails>(`/movie/${id}`, { append_to_response: 'videos,credits,similar' }),

  searchMovies: (query: string, page: number = 1) =>
    fetchTMDB<ApiResponse<Movie>>('/search/movie', { query, page: String(page) }),

  getGenres: () =>
    fetchTMDB<{ genres: Genre[] }>('/genre/movie/list'),

  getByGenre: (genreId: number, page: number = 1) =>
    fetchTMDB<ApiResponse<Movie>>('/discover/movie', {
      with_genres: String(genreId),
      sort_by: 'popularity.desc',
      page: String(page),
    }),
};
