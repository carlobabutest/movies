import { useState, useEffect, useCallback } from 'react';
import { tmdb } from '../api/tmdb';
import { mockTrending, mockPopular, mockNowPlaying, mockTopRated, mockUpcoming, mockGenres } from '../api/mockData';
import type { Movie, MovieDetails } from '../types';

function useApiCall<T>(fetcher: () => Promise<T>, fallback: T) {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetcher()
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          // Keep fallback data
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}

export function useTrending() {
  const { data, loading, error } = useApiCall(
    () => tmdb.getTrending('week').then(r => r.results),
    mockTrending
  );
  return { movies: data, loading, error };
}

export function usePopular() {
  const { data, loading, error } = useApiCall(
    () => tmdb.getPopular().then(r => r.results),
    mockPopular
  );
  return { movies: data, loading, error };
}

export function useNowPlaying() {
  const { data, loading, error } = useApiCall(
    () => tmdb.getNowPlaying().then(r => r.results),
    mockNowPlaying
  );
  return { movies: data, loading, error };
}

export function useTopRated() {
  const { data, loading, error } = useApiCall(
    () => tmdb.getTopRated().then(r => r.results),
    mockTopRated
  );
  return { movies: data, loading, error };
}

export function useUpcoming() {
  const { data, loading, error } = useApiCall(
    () => tmdb.getUpcoming().then(r => r.results),
    mockUpcoming
  );
  return { movies: data, loading, error };
}

export function useGenres() {
  const { data, loading, error } = useApiCall(
    () => tmdb.getGenres().then(r => r.genres),
    mockGenres
  );
  return { genres: data, loading, error };
}

export function useMovieDetails(id: number | null) {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) { setMovie(null); return; }
    let cancelled = false;
    setLoading(true);
    tmdb.getMovieDetails(id)
      .then((result) => { if (!cancelled) setMovie(result); })
      .catch(() => { if (!cancelled) setMovie(null); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  return { movie, loading };
}

export function useSearch() {
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const search = useCallback((q: string) => {
    setQuery(q);
    if (!q.trim()) { setResults([]); return; }
    setLoading(true);
    tmdb.searchMovies(q)
      .then(r => setResults(r.results))
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, []);

  return { results, loading, query, search };
}

export function useGenreMovies(genreId: number | null) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!genreId) { setMovies([]); return; }
    let cancelled = false;
    setLoading(true);
    tmdb.getByGenre(genreId)
      .then(r => { if (!cancelled) setMovies(r.results); })
      .catch(() => { if (!cancelled) setMovies([]); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [genreId]);

  return { movies, loading };
}
