
import React from 'react';
import { HistoryItem } from '../types';

interface HistoryPageProps {
  history: HistoryItem[];
  onDelete: (id: number) => void;
  onReuse: (item: HistoryItem) => void;
  onSave: (imageUrl: string) => void;
  onNavigateToGenerator: () => void;
}

const HistoryCard: React.FC<{ 
    item: HistoryItem; 
    onDelete: (id: number) => void; 
    onReuse: (item: HistoryItem) => void; 
    onSave: (imageUrl: string) => void;
}> = ({ item, onDelete, onReuse, onSave }) => {
  return (
    <div className="glassmorphic rounded-xl p-4 flex flex-col md:flex-row gap-4">
      <img src={item.imageUrl} alt="Generated avatar" className="w-full md:w-40 h-40 object-cover rounded-lg" />
      <div className="flex-1 flex flex-col">
        <div className="flex-grow">
          <p className="text-sm text-text-secondary italic mb-2">"{item.prompt}"</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-secondary mb-2">
            <span><strong>Ratio:</strong> {item.settings.aspectRatio}</span>
            <span><strong>Intensity:</strong> {item.settings.styleIntensity}%</span>
          </div>
           {item.settings.negativePrompt && <p className="text-xs text-text-secondary truncate"><strong>Avoid:</strong> {item.settings.negativePrompt}</p>}
        </div>
        <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-text-secondary">{new Date(item.createdAt).toLocaleString()}</span>
            <div className="flex gap-2">
                <button
                    onClick={() => onSave(item.imageUrl)}
                    title="Save Image"
                    className="p-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
                <button
                    onClick={() => onReuse(item)}
                    title="Reuse Prompt & Settings (with original photo)"
                    className="p-2 bg-cyan-500/10 text-cyan-300 rounded-lg hover:bg-cyan-500/20 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                </button>
                 <button
                    onClick={() => onDelete(item.id)}
                    title="Delete"
                    className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export const HistoryPage: React.FC<HistoryPageProps> = ({ history, onDelete, onReuse, onSave, onNavigateToGenerator }) => {
  return (
    <div className="w-full flex flex-col items-center animate-fade-in text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">
            Generation History
        </h1>
        <p className="mt-2 text-lg text-text-secondary max-w-2xl">
            Review your past creations. Save, or reuse a prompt to experiment further.
        </p>
        
        <div className="w-full mt-12 flex flex-col gap-6">
            {history.length > 0 ? (
                history.map(item => (
                    <HistoryCard 
                      key={item.id} 
                      item={item} 
                      onDelete={onDelete} 
                      onReuse={onReuse} 
                      onSave={onSave}
                    />
                ))
            ) : (
                <div className="glassmorphic rounded-xl p-8 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto opacity-30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                    <h2 className="text-2xl font-bold text-text-primary">Your History is Empty</h2>
                    <p className="mt-2 text-text-secondary">You haven't generated any avatars yet. Let's create something magical!</p>
                    <button
                        onClick={onNavigateToGenerator}
                        className="mt-6 py-3 px-6 text-md font-bold text-white bg-gradient-to-r from-amber-500 to-cyan-500 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300"
                    >
                        Start Creating
                    </button>
                </div>
            )}
        </div>
    </div>
  );
};