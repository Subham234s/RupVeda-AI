import React from 'react';

interface AvatarDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  onRate?: () => void;
  onFullView?: () => void;
  onSave?: () => void;
  onShare?: () => void;
}

const ActionButton: React.FC<{ onClick?: () => void; icon: React.ReactNode; text: string; }> = ({ onClick, icon, text }) => (
    <button
        onClick={onClick}
        className="w-full py-3 px-2 text-sm font-semibold bg-cyan-500/10 text-cyan-300 rounded-lg shadow-md hover:bg-cyan-500/20 transform transition-all duration-300 flex items-center justify-center gap-2 border border-cyan-500/30"
    >
        {icon}
        {text}
    </button>
);


const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-text-secondary">
        <svg viewBox="0 0 200 200" className="h-40 w-40">
            <defs>
                <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--accent-turquoise)" strokeOpacity="0.1" strokeWidth="1"/>
                </pattern>
            </defs>
            <rect width="200" height="200" className="ai-loader-grid" />
            
            {/* Construction Lines */}
            <path d="M 50 50 L 150 50 L 150 150 L 50 150 Z" fill="none" stroke="var(--accent-turquoise)" strokeWidth="1" className="ai-loader-line" style={{ animationDelay: '0s' }} />
            <path d="M 50 50 L 150 150" fill="none" stroke="var(--accent-turquoise)" strokeWidth="1" className="ai-loader-line" style={{ animationDelay: '0.5s' }} />
            <path d="M 150 50 L 50 150" fill="none" stroke="var(--accent-turquoise)" strokeWidth="1" className="ai-loader-line" style={{ animationDelay: '1s' }} />
            <circle cx="100" cy="100" r="50" fill="none" stroke="var(--accent-turquoise)" strokeWidth="1" className="ai-loader-line" style={{ animationDelay: '1.5s' }} />

            {/* Pulsating Core */}
            <circle cx="100" cy="100" r="15" fill="var(--accent-saffron)" className="ai-loader-core" />
            <circle cx="100" cy="100" r="15" fill="var(--accent-saffron)" stroke="var(--accent-saffron)" strokeWidth="4" strokeOpacity="0.3" className="ai-loader-core" style={{ animationDuration: '2s' }}/>

            {/* Scanline */}
            <rect x="0" y="0" width="200" height="4" fill="var(--accent-turquoise)" fillOpacity="0.4" className="ai-loader-scanline" />
        </svg>
        <p className="mt-4 text-lg font-semibold">Crafting your vision...</p>
        <p className="text-sm">The AI is weaving its magic.</p>
    </div>
);


const Placeholder: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-text-secondary p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 opacity-30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
        <h3 className="text-xl font-bold text-text-primary">Your Masterpiece Awaits</h3>
        <p className="mt-2">Your generated avatar will appear here once created.</p>
    </div>
);


export const AvatarDisplay: React.FC<AvatarDisplayProps> = ({ imageUrl, isLoading, onRate, onFullView, onSave, onShare }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
        <div className="w-full aspect-square glassmorphic rounded-2xl flex items-center justify-center overflow-hidden">
        {isLoading ? (
            <LoadingSpinner />
        ) : imageUrl ? (
            <img src={imageUrl} alt="Generated Avatar" className="object-contain h-full w-full" />
        ) : (
            <Placeholder />
        )}
        </div>
        {imageUrl && !isLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <ActionButton 
                    onClick={onFullView} 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" transform="rotate(45 10 10)" /></svg>}
                    text="Full View" 
                />
                 <ActionButton 
                    onClick={onSave} 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>} 
                    text="Save" 
                />
                 <ActionButton 
                    onClick={onShare} 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" /></svg>} 
                    text="Share" 
                />
                 <ActionButton 
                    onClick={onRate} 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>} 
                    text="Rate" 
                />
            </div>
        )}
    </div>
  );
};