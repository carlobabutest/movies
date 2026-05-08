import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import MovieRow from './components/MovieRow';
import GenreChips from './components/GenreChips';
import MovieModal from './components/MovieModal';
import SearchOverlay from './components/SearchOverlay';
import Footer from './components/Footer';
import { getImageUrl } from './api/tmdb';
import {
  useTrending,
  usePopular,
  useNowPlaying,
  useTopRated,
  useUpcoming,
  useGenres,
  useGenreMovies,
} from './hooks/useMovies';
import type { Movie } from './types';

export default function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  const { movies: trending, loading: trendingLoading } = useTrending();
  const { movies: popular, loading: popularLoading } = usePopular();
  const { movies: nowPlaying, loading: nowPlayingLoading } = useNowPlaying();
  const { movies: topRated, loading: topRatedLoading } = useTopRated();
  const { movies: upcoming, loading: upcomingLoading } = useUpcoming();
  const { genres } = useGenres();
  const { movies: genreMovies, loading: genreLoading } = useGenreMovies(selectedGenre);

  const handleMovieClick = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
  }, []);

  const handleSectionChange = useCallback((section: string) => {
    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-dark-900 text-white font-body bg-noise">
      {/* Ambient Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-neon-pink/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-neon-cyan/3 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        <Navbar
          onSearchOpen={() => setSearchOpen(true)}
          currentSection={currentSection}
          onSectionChange={handleSectionChange}
        />

        {/* Home View */}
        {currentSection === 'home' && (
          <>
            <HeroBanner movies={trending} onMovieClick={handleMovieClick} />

            <div className="-mt-8 relative z-10">
              <MovieRow
                title="Trending This Week"
                emoji="🔥"
                movies={trending}
                loading={trendingLoading}
                onMovieClick={handleMovieClick}
              />

              <MovieRow
                title="Now Playing"
                emoji="🎬"
                movies={nowPlaying}
                loading={nowPlayingLoading}
                onMovieClick={handleMovieClick}
              />

              <MovieRow
                title="Most Popular"
                emoji="💯"
                movies={popular}
                loading={popularLoading}
                onMovieClick={handleMovieClick}
                size="lg"
              />

              <MovieRow
                title="Top Rated"
                emoji="⭐"
                movies={topRated}
                loading={topRatedLoading}
                onMovieClick={handleMovieClick}
              />

              <MovieRow
                title="Coming Soon"
                emoji="🚀"
                movies={upcoming}
                loading={upcomingLoading}
                onMovieClick={handleMovieClick}
              />
            </div>
          </>
        )}

        {/* Trending View */}
        {currentSection === 'trending' && (
          <div className="pt-24 sm:pt-28">
            <SectionHeader
              emoji="🔥"
              title="Trending Right Now"
              subtitle="the movies everyone's talking about rn fr"
            />
            <MovieGrid movies={trending} loading={trendingLoading} onMovieClick={handleMovieClick} />

            <MovieRow
              title="Also Poppin'"
              emoji="💫"
              movies={popular}
              loading={popularLoading}
              onMovieClick={handleMovieClick}
            />
          </div>
        )}

        {/* Genres View */}
        {currentSection === 'genres' && (
          <div className="pt-24 sm:pt-28">
            <SectionHeader
              emoji="🎭"
              title="Find Your Vibe"
              subtitle="pick a genre and let the algorithm cook 🧑‍🍳"
            />
            <GenreChips
              genres={genres}
              selectedGenre={selectedGenre}
              onSelectGenre={setSelectedGenre}
            />
            {selectedGenre && (
              <MovieGrid
                movies={genreMovies}
                loading={genreLoading}
                onMovieClick={handleMovieClick}
              />
            )}
            {!selectedGenre && (
              <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <MovieRow
                  title="Action Bangers"
                  emoji="💥"
                  movies={trending.filter(m => m.genre_ids?.includes(28))}
                  onMovieClick={handleMovieClick}
                />
                <MovieRow
                  title="All Movies"
                  emoji="🎞️"
                  movies={popular}
                  loading={popularLoading}
                  onMovieClick={handleMovieClick}
                  size="lg"
                />
              </div>
            )}
          </div>
        )}

        {/* Top Rated View */}
        {currentSection === 'top' && (
          <div className="pt-24 sm:pt-28">
            <SectionHeader
              emoji="⭐"
              title="Top Rated"
              subtitle="certified bangers that absolutely slap no cap 🏆"
            />
            <MovieGrid movies={topRated} loading={topRatedLoading} onMovieClick={handleMovieClick} />
          </div>
        )}

        {/* Upcoming View */}
        {currentSection === 'upcoming' && (
          <div className="pt-24 sm:pt-28">
            <SectionHeader
              emoji="🚀"
              title="Coming Soon"
              subtitle="upcoming releases we're lowkey obsessed with 👀"
            />
            <MovieGrid movies={upcoming} loading={upcomingLoading} onMovieClick={handleMovieClick} />
          </div>
        )}

        <Footer />
      </div>

      {/* Modals */}
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onMovieClick={handleMovieClick}
      />
      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        onMovieClick={handleMovieClick}
      />
    </div>
  );
}

// Sub-components

function SectionHeader({ emoji, title, subtitle }: { emoji: string; title: string; subtitle: string }) {
  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="flex items-center gap-4 mb-3">
        <span className="text-4xl sm:text-5xl">{emoji}</span>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black gradient-text">
          {title}
        </h1>
      </div>
      <p className="text-white/50 text-lg ml-1">{subtitle}</p>
    </div>
  );
}

function MovieGrid({
  movies,
  loading,
  onMovieClick,
}: {
  movies: Movie[];
  loading: boolean;
  onMovieClick: (m: Movie) => void;
}) {
  if (loading) {
    return (
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i}>
              <div className="w-full aspect-[2/3] rounded-2xl animate-shimmer" />
              <div className="h-4 w-3/4 rounded mt-3 animate-shimmer" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {movies.map((movie, i) => (
          <GridCard key={movie.id} movie={movie} onClick={onMovieClick} index={i} />
        ))}
      </div>
      {movies.length === 0 && (
        <div className="text-center py-16">
          <span className="text-5xl block mb-4">🍿</span>
          <p className="text-white/40 text-lg">No movies found bestie. Try something else!</p>
        </div>
      )}
    </div>
  );
}

function GridCard({
  movie,
  onClick,
  index,
}: {
  movie: Movie;
  onClick: (m: Movie) => void;
  index: number;
}) {
  const poster = getImageUrl(movie.poster_path, 'w342');
  const year = movie.release_date?.split('-')[0] || '';

  return (
    <div
      className="group cursor-pointer animate-slide-up"
      style={{ animationDelay: `${index * 30}ms` }}
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-neon-pink to-neon-purple flex items-center justify-center shadow-lg shadow-neon-pink/30 scale-0 group-hover:scale-100 transition-transform duration-300">
              <span className="text-white text-xl ml-0.5">▶</span>
            </div>
          </div>
        </div>
        {movie.vote_average > 0 && (
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-lg glass text-xs font-bold">
            ⭐ {movie.vote_average.toFixed(1)}
          </div>
        )}
      </div>
      <h3 className="font-heading font-semibold text-sm text-white/90 truncate group-hover:text-white transition-colors">
        {movie.title}
      </h3>
      <p className="text-xs text-white/40 mt-0.5">{year}</p>
    </div>
  );
}
