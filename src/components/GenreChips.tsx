import type { Genre } from '../types';

interface GenreChipsProps {
  genres: Genre[];
  selectedGenre: number | null;
  onSelectGenre: (id: number | null) => void;
}

const genreEmojis: Record<number, string> = {
  28: '💥',
  12: '🗺️',
  16: '🎨',
  35: '😂',
  80: '🔪',
  99: '📹',
  18: '🎭',
  10751: '👨‍👩‍👧‍👦',
  14: '🧙',
  36: '📜',
  27: '👻',
  10402: '🎵',
  9648: '🕵️',
  10749: '💕',
  878: '🚀',
  10770: '📺',
  53: '😱',
  10752: '⚔️',
  37: '🤠',
};

const gradientColors = [
  'from-pink-500 to-rose-500',
  'from-purple-500 to-violet-500',
  'from-cyan-500 to-blue-500',
  'from-green-500 to-emerald-500',
  'from-orange-500 to-red-500',
  'from-indigo-500 to-purple-500',
  'from-yellow-500 to-orange-500',
  'from-teal-500 to-cyan-500',
  'from-rose-500 to-pink-500',
  'from-blue-500 to-indigo-500',
  'from-fuchsia-500 to-purple-500',
  'from-amber-500 to-yellow-500',
];

export default function GenreChips({ genres, selectedGenre, onSelectGenre }: GenreChipsProps) {
  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl sm:text-3xl">🎭</span>
          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-white">
            Browse by Vibe
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onSelectGenre(null)}
            className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all active:scale-95 cursor-pointer ${
              selectedGenre === null
                ? 'bg-gradient-to-r from-neon-pink to-neon-purple text-white shadow-lg shadow-neon-pink/30'
                : 'glass text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            ✨ All
          </button>
          {genres.map((genre, i) => (
            <button
              key={genre.id}
              onClick={() => onSelectGenre(genre.id)}
              className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all active:scale-95 cursor-pointer ${
                selectedGenre === genre.id
                  ? `bg-gradient-to-r ${gradientColors[i % gradientColors.length]} text-white shadow-lg`
                  : 'glass text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {genreEmojis[genre.id] || '🎬'} {genre.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
