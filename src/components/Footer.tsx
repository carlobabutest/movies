import { Flame, Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative mt-16 border-t border-white/5">
      {/* Gradient Top Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-pink to-transparent" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-6 h-6 text-neon-pink" />
              <Sparkles className="w-3 h-3 text-neon-cyan" />
              <span className="font-heading text-xl font-black gradient-text">VIBESTREAM</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed">
              Your go-to spot for movies that hit different. No cap, we've got the best content fr fr. 🔥
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-4 text-white/70">Navigate 🗺️</h4>
            <ul className="space-y-2.5">
              {['Home', 'Trending', 'Top Rated', 'Coming Soon'].map((item) => (
                <li key={item}>
                  <span className="text-sm text-white/40 hover:text-neon-pink transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm mb-4 text-white/70">Genres 🎭</h4>
            <ul className="space-y-2.5">
              {['Action', 'Comedy', 'Horror', 'Sci-Fi'].map((item) => (
                <li key={item}>
                  <span className="text-sm text-white/40 hover:text-neon-cyan transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm mb-4 text-white/70">Socials 📱</h4>
            <ul className="space-y-2.5">
              {['TikTok', 'Instagram', 'Twitter/X', 'Discord'].map((item) => (
                <li key={item}>
                  <span className="text-sm text-white/40 hover:text-neon-green transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30 flex items-center gap-1.5">
            Made with <Heart className="w-3 h-3 text-neon-pink fill-neon-pink" /> by Gen Z devs
          </p>
          <p className="text-xs text-white/30">
            © 2025 VIBESTREAM — It's giving cinema ✨
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/30 hover:text-white/50 cursor-pointer">Privacy</span>
            <span className="text-xs text-white/30 hover:text-white/50 cursor-pointer">Terms</span>
            <span className="text-xs text-white/30 hover:text-white/50 cursor-pointer">Help</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
