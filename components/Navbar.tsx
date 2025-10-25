import React from 'react';

type Page = 'generator' | 'prompt-library' | 'history' | 'contact';

interface NavbarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const NavButton: React.FC<{
    isActive: boolean;
    onClick?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
}> = ({ isActive, onClick, disabled, children }) => {
    const baseClasses = "px-3 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-base font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 whitespace-nowrap";
    
    // Theme-aware classes for better light/dark mode contrast
    const activeClasses = "bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 shadow-inner";
    const inactiveClasses = "text-text-secondary hover:bg-slate-900/10 dark:hover:bg-white/5";
    const disabledClasses = "text-text-secondary/50 cursor-not-allowed";
    
    const classes = `${baseClasses} ${
        disabled ? disabledClasses : (isActive ? activeClasses : inactiveClasses)
    }`;

    return (
        <button onClick={onClick} disabled={disabled} className={classes}>
            {children}
        </button>
    );
};


export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate }) => {
  return (
    <nav className="w-full max-w-xl glassmorphic rounded-full p-2 my-6 flex justify-around items-center animate-fade-in">
        <NavButton
            isActive={activePage === 'generator'}
            onClick={() => onNavigate('generator')}
        >
            Generator
        </NavButton>
         <NavButton
            isActive={activePage === 'prompt-library'}
            onClick={() => onNavigate('prompt-library')}
        >
            Prompt Library
        </NavButton>
         <NavButton
            isActive={activePage === 'history'}
            onClick={() => onNavigate('history')}
        >
            History
        </NavButton>
         <NavButton
            isActive={activePage === 'contact'}
            onClick={() => onNavigate('contact')}
        >
            Contact
        </NavButton>
    </nav>
  );
};