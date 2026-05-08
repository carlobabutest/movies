import { useEffect } from 'react';
import { X, Play, Star, Clock, Calendar, Globe, Users, ExternalLink } from 'lucide-react';
import { getBackdropUrl, getImageUrl } from '../api/tmdb';
import { useMovieDetails } from '../hooks/useMovies';
import type { Movie } from '../types';
import MovieCard from './MovieCard';

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
  onMovieClick: (movie: Movie) => void;
}

export default function MovieModal({ movie, onClose, onMovieClick }: MovieModalProps) {
  const { movie: details, loading } = useMovieDetails(movie?.id ?? null);

  useEffect(() => {
    if (movie) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [movie]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!movie) return null;

  const backdrop = getBackdropUrl(details?.backdrop_path ?? movie.backdrop_path);
  const poster = getImageUrl(details?.poster_path ?? movie.poster_path, 'w500');
  const title = details?.title ?? movie.title;
  const overview = details?.overview ?? movie.overview;
  const voteAvg = details?.vote_average ?? movie.vote_average;
  const releaseDate = details?.release_date ?? movie.release_date;
  const lang = details?.original_language ?? movie.original_language;
  const year = releaseDate?.split('-')[0] || '';

  const trailer = details?.videos?.results.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  );
  const cast = details?.credits?.cast.slice(0, 12) || [];
  const director = details?.credits?.crew.find((c) => c.job === 'Director');
  const similar = details?.similar?.results.slice(0, 8) || [];
  const genres = details?.genres || [];
  const runtime = details?.runtime || 0;
  const tagline = details?.tagline || '';

  return (
    <div className="fixed inset-0 z-[100] animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div className="relative h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="min-h-full max-w-5xl mx-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[110] p-3 rounded-full glass hover:bg-white/20 transition-all active:scale-90 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Backdrop */}
          <div className="relative w-full h-[50vh] sm:h-[60vh]">
            {backdrop ? (
              <img src={backdrop} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-neon-purple/30 via-dark-800 to-neon-pink/20" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-900/60 to-transparent" />

            {/* Trailer Button */}
            {trailer && (
              <div className="absolute inset-0 flex items-center justify-center">
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-neon-pink to-neon-purple text-white font-bold text-lg hover:shadow-2xl hover:shadow-neon-pink/50 active:scale-95 transition-all"
                >
                  <Play className="w-7 h-7 fill-white" />
                  Play Trailer
                </a>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="relative -mt-32 px-4 sm:px-8 pb-12">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-8">
              {/* Poster */}
              {poster && (
                <div className="flex-shrink-0 w-40 sm:w-48 rounded-2xl overflow-hidden neon-glow shadow-2xl mx-auto sm:mx-0">
                  <img src={poster} alt={title} className="w-full aspect-[2/3] object-cover" />
                </div>
              )}

              {/* Info */}
              <div className="flex-1 pt-4">
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black mb-3 text-shadow-glow">
                  {title}
                </h2>

                {tagline && (
                  <p className="text-neon-cyan/80 italic text-lg mb-4">"{tagline}"</p>
                )}

                {/* Meta Tags */}
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  {voteAvg > 0 && (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-sm font-bold">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      {voteAvg.toFixed(1)}
                    </span>
                  )}
                  {year && (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-sm">
                      <Calendar className="w-4 h-4 text-neon-pink" />
                      {year}
                    </span>
                  )}
                  {runtime > 0 && (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-sm">
                      <Clock className="w-4 h-4 text-neon-cyan" />
                      {Math.floor(runtime / 60)}h {runtime % 60}m
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-sm">
                    <Globe className="w-4 h-4 text-neon-green" />
                    {lang?.toUpperCase()}
                  </span>
                </div>

                {/* Genres */}
                {genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {genres.map((g) => (
                      <span
                        key={g.id}
                        className="px-3 py-1.5 rounded-full bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 border border-neon-pink/20 text-xs font-semibold"
                      >
                        {g.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Director */}
                {director && (
                  <p className="text-sm text-white/60 mb-2">
                    <span className="text-white/40">Directed by</span>{' '}
                    <span className="text-white font-medium">{director.name}</span>
                  </p>
                )}

                {/* Overview */}
                <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                  {overview}
                </p>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mt-6">
                  <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-neon-pink to-neon-purple text-white font-bold hover:shadow-lg hover:shadow-neon-pink/30 active:scale-95 transition-all cursor-pointer">
                    <Play className="w-5 h-5 fill-white" />
                    Watch Now
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 rounded-2xl glass hover:bg-white/10 text-white font-medium transition-all active:scale-95 cursor-pointer">
                    + My List
                  </button>
                  {trailer && (
                    <a
                      href={`https://www.youtube.com/watch?v=${trailer.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-2xl glass hover:bg-white/10 text-white font-medium transition-all active:scale-95"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Trailer
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Cast */}
            {cast.length > 0 && (
              <div className="mb-10">
                <h3 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-neon-cyan" />
                  Cast
                </h3>
                <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                  {cast.map((person) => (
                    <div key={person.id} className="flex-shrink-0 w-24 text-center">
                      <div className="w-20 h-20 mx-auto rounded-full overflow-hidden glass mb-2">
                        {person.profile_path ? (
                          <img
                            src={getImageUrl(person.profile_path, 'w185')}
                            alt={person.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-dark-700 text-2xl">
                            👤
                          </div>
                        )}
                      </div>
                      <p className="text-xs font-medium text-white/90 truncate">{person.name}</p>
                      <p className="text-xs text-white/40 truncate">{person.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Similar Movies */}
            {similar.length > 0 && (
              <div>
                <h3 className="font-heading text-xl font-bold mb-4">
                  🔥 You Might Also Vibe With
                </h3>
                <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                  {similar.map((m, i) => (
                    <MovieCard
                      key={m.id}
                      movie={m}
                      onClick={onMovieClick}
                      index={i}
                      size="sm"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-2 border-neon-pink border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
