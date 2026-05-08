import { useEffect, useRef, useState, useCallback } from 'react';
import { Search, X, TrendingUp } from 'lucide-react';
import MovieCard from './MovieCard';
import { useSearch } from '../hooks/useMovies';
import type { Movie } from '../types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onMovieClick: (movie: Movie) => void;
}

export default function SearchOverlay({ isOpen, onClose, onMovieClick }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { results, loading, query, search } = useSearch();
  const [inputValue, setInputValue] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
      setInputValue('');
      search('');
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, search]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleChange = useCallback((val: string) => {
    setInputValue(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(val), 400);
  }, [search]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] animate-fade-in">
      <div className="absolute inset-0 bg-dark-900/95 backdrop-blur-xl" onClick={onClose} />

      <div className="relative h-full overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
          {/* Search Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-white/40" />
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Search movies... 🔍"
                className="w-full pl-14 pr-6 py-5 rounded-2xl glass-strong text-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-neon-pink/50 transition-all font-body"
              />
            </div>
            <button
              onClick={onClose}
              className="p-4 rounded-2xl glass hover:bg-white/10 transition-all active:scale-90 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Results */}
          {loading && (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-2 border-neon-pink border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="text-center py-16">
              <span className="text-6xl mb-4 block">😅</span>
              <h3 className="font-heading text-2xl font-bold mb-2">No cap, nothing found</h3>
              <p className="text-white/50">Try searching for something else bestie</p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div>
              <p className="text-white/50 text-sm mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-neon-pink" />
                Found {results.length} results for "{query}"
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {results.map((movie, i) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onClick={(m) => { onMovieClick(m); onClose(); }}
                    index={i}
                    size="sm"
                  />
                ))}
              </div>
            </div>
          )}

          {!query && (
            <div className="text-center py-16">
              <span className="text-6xl mb-4 block animate-float">🍿</span>
              <h3 className="font-heading text-2xl font-bold mb-2 gradient-text">
                What are we watching tonight?
              </h3>
              <p className="text-white/50">Start typing to find your next binge sesh</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
