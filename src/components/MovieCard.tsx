import { Star, Play } from 'lucide-react';
import { getImageUrl } from '../api/tmdb';
import type { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  index?: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function MovieCard({ movie, onClick, index = 0, size = 'md' }: MovieCardProps) {
  const poster = getImageUrl(movie.poster_path, 'w342');
  const year = movie.release_date?.split('-')[0] || '';

  const sizeClasses = {
    sm: 'w-32 sm:w-36',
    md: 'w-40 sm:w-44 md:w-48',
    lg: 'w-48 sm:w-56 md:w-64',
  };

  return (
    <div
      className={`flex-shrink-0 ${sizeClasses[size]} group cursor-pointer animate-slide-up`}
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={() => onClick(movie)}
    >
      <div className="relative rounded-2xl overflow-hidden card-hover mb-3">
        {poster ? (
          <img
            src={poster}
            alt={movie.title}
            className="w-full aspect-[2/3] object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full aspect-[2/3] bg-gradient-to-br from-dark-700 to-dark-800 flex items-center justify-center">
            <span className="text-4xl">🎬</span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-neon-pink to-neon-purple flex items-center justify-center shadow-lg shadow-neon-pink/30 scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
              <Play className="w-6 h-6 fill-white text-white ml-0.5" />
            </div>
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <p className="text-xs text-white/70 truncate">{year}</p>
          </div>
        </div>

        {/* Rating Badge */}
        {movie.vote_average > 0 && (
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-lg glass text-xs font-bold">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            {movie.vote_average.toFixed(1)}
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="font-heading font-semibold text-sm text-white/90 truncate group-hover:text-white transition-colors">
        {movie.title}
      </h3>
      <p className="text-xs text-white/40 mt-0.5">{year}</p>
    </div>
  );
}
