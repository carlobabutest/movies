import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import type { Movie } from '../types';

interface MovieRowProps {
  title: string;
  emoji?: string;
  movies: Movie[];
  loading?: boolean;
  onMovieClick: (movie: Movie) => void;
  size?: 'sm' | 'md' | 'lg';
}

export default function MovieRow({ title, emoji, movies, loading, onMovieClick, size = 'md' }: MovieRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative py-6 sm:py-8">
      {/* Header */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {emoji && <span className="text-2xl sm:text-3xl">{emoji}</span>}
            <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-white">
              {title}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-xl glass hover:bg-white/10 transition-all active:scale-90 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-white/60" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-xl glass hover:bg-white/10 transition-all active:scale-90 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 text-white/60" />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Row */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto hide-scrollbar px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto pb-2"
      >
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`flex-shrink-0 ${
                  size === 'sm' ? 'w-32 sm:w-36' : size === 'lg' ? 'w-48 sm:w-56' : 'w-40 sm:w-44'
                }`}
              >
                <div className="w-full aspect-[2/3] rounded-2xl animate-shimmer" />
                <div className="h-4 w-3/4 rounded mt-3 animate-shimmer" />
              </div>
            ))
          : movies.map((movie, i) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={onMovieClick}
                index={i}
                size={size}
              />
            ))}
      </div>
    </section>
  );
}
