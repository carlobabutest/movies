import { useState, useEffect } from 'react';
import { Search, Menu, X, Flame, Sparkles } from 'lucide-react';

interface NavbarProps {
  onSearchOpen: () => void;
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: 'home', label: '🏠 Home' },
  { id: 'trending', label: '🔥 Trending' },
  { id: 'genres', label: '🎭 Genres' },
  { id: 'top', label: '⭐ Top Rated' },
  { id: 'upcoming', label: '🚀 Coming Soon' },
];

export default function Navbar({ onSearchOpen, currentSection, onSectionChange }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-strong shadow-2xl shadow-black/50'
          : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <button
            onClick={() => onSectionChange('home')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="relative">
              <Flame className="w-8 h-8 text-neon-pink group-hover:text-neon-cyan transition-colors" />
              <Sparkles className="w-4 h-4 text-neon-cyan absolute -top-1 -right-1 animate-glow-pulse" />
            </div>
            <span className="font-heading text-2xl sm:text-3xl font-black gradient-text tracking-tight">
              VIBESTREAM
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
                  currentSection === item.id
                    ? 'bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 text-white border border-neon-pink/30'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onSearchOpen}
              className="p-2.5 rounded-xl glass hover:bg-white/10 transition-all group cursor-pointer"
            >
              <Search className="w-5 h-5 text-white/70 group-hover:text-neon-cyan transition-colors" />
            </button>

            <button className="hidden sm:block px-5 py-2.5 rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple text-white text-sm font-bold hover:shadow-lg hover:shadow-neon-pink/30 transition-all active:scale-95 cursor-pointer">
              Sign Up ✨
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-xl glass cursor-pointer"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass-strong animate-slide-up border-t border-white/5">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { onSectionChange(item.id); setMenuOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  currentSection === item.id
                    ? 'bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button className="w-full mt-3 px-5 py-3 rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple text-white text-sm font-bold cursor-pointer">
              Sign Up ✨
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
