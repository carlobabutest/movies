import { useState, useEffect } from 'react';
import { Play, Info, Star, Clock, TrendingUp } from 'lucide-react';
import { getBackdropUrl, getImageUrl } from '../api/tmdb';
import type { Movie } from '../types';

interface HeroBannerProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

export default function HeroBanner({ movies, onMovieClick }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featured = movies.slice(0, 5);
  const movie = featured[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % featured.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featured.length]);

  if (!movie) return null;

  const year = movie.release_date?.split('-')[0] || '';
  const backdrop = getBackdropUrl(movie.backdrop_path);
  const poster = getImageUrl(movie.poster_path, 'w342');

  return (
    <div className="relative w-full h-[85vh] sm:h-[90vh] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {backdrop ? (
          <img
            src={backdrop}
            alt=""
            className="w-full h-full object-cover transition-opacity duration-1000"
            key={movie.id}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-neon-purple/30 via-dark-900 to-neon-pink/20" />
        )}
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-dark-900/50" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark-900 to-transparent" />
      </div>

      {/* Floating Decorations */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-neon-pink/10 rounded-full blur-[100px] animate-glow-pulse" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-neon-cyan/10 rounded-full blur-[80px] animate-glow-pulse" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative h-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16 pt-20">
          {/* Text Content */}
          <div className="flex-1 max-w-2xl animate-slide-up">
            {/* Tags */}
            <div className="flex items-center gap-3 mb-5">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-neon-pink to-neon-purple text-xs font-bold uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5" />
                Trending Now
              </span>
              <span className="flex items-center gap-1 px-3 py-1.5 rounded-full glass text-xs font-medium">
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                {movie.vote_average.toFixed(1)}
              </span>
              {year && (
                <span className="flex items-center gap-1 px-3 py-1.5 rounded-full glass text-xs font-medium">
                  <Clock className="w-3.5 h-3.5 text-neon-cyan" />
                  {year}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] mb-5 text-shadow-glow">
              {movie.title}
            </h1>

            {/* Overview */}
            <p className="text-base sm:text-lg text-white/60 leading-relaxed mb-8 line-clamp-3">
              {movie.overview}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onMovieClick(movie)}
                className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-neon-pink to-neon-purple text-white font-bold text-lg hover:shadow-2xl hover:shadow-neon-pink/40 active:scale-95 transition-all cursor-pointer"
              >
                <Play className="w-6 h-6 fill-white" />
                Watch Now
              </button>
              <button
                onClick={() => onMovieClick(movie)}
                className="flex items-center gap-2.5 px-8 py-4 rounded-2xl glass hover:bg-white/10 text-white font-bold text-lg transition-all active:scale-95 cursor-pointer"
              >
                <Info className="w-6 h-6" />
                More Info
              </button>
            </div>
          </div>

          {/* Poster Card (Desktop) */}
          {poster && (
            <div className="hidden lg:block flex-shrink-0 animate-float">
              <div
                className="relative w-64 xl:w-72 rounded-3xl overflow-hidden neon-glow cursor-pointer card-hover"
                onClick={() => onMovieClick(movie)}
              >
                <img src={poster} alt={movie.title} className="w-full aspect-[2/3] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-neon-green animate-glow-pulse" />
                    <span className="text-xs font-medium text-white/80">Streaming Now</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {featured.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
              i === currentIndex
                ? 'w-10 bg-gradient-to-r from-neon-pink to-neon-cyan'
                : 'w-4 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
