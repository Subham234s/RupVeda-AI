import React, { useState, useRef, useEffect } from 'react';
import { User } from '../services/firebase';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
  user: User;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="text-center p-4 w-full relative">
       <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-cyan-400 to-amber-400 tracking-wider transition-all duration-500 ease-in-out hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(103,232,249,0.5)] cursor-default">
        RupVeda AI
      </h1>
      <p className="mt-2 text-lg text-text-secondary">
        Craft Your Digital Soul.
      </p>

      <div className="absolute top-4 right-4" ref={menuRef}>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-full text-text-secondary hover:bg-white/10 transition-colors"
          aria-label="User menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-64 glassmorphic rounded-lg shadow-xl animate-fade-in z-10 p-2">
            <div className="px-4 py-2 border-b border-slate-300/20">
              <p className="text-sm font-semibold text-text-primary truncate">{user.displayName || 'User'}</p>
              <p className="text-xs text-text-secondary truncate">{user.email}</p>
            </div>
            <ul className="py-1">
              <li>
                <button 
                  onClick={toggleTheme}
                  className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-white/5 rounded-md flex items-center gap-3"
                >
                   {theme === 'dark' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    )}
                  Toggle Theme
                </button>
              </li>
              <li>
                <button
                  onClick={onLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-md flex items-center gap-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};
