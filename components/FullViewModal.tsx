
import React from 'react';

interface FullViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
}

export const FullViewModal: React.FC<FullViewModalProps> = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen || !imageUrl) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" 
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl max-h-[90vh]" 
        onClick={e => e.stopPropagation()}
      >
        <img 
          src={imageUrl} 
          alt="Generated Avatar Full View" 
          className="object-contain w-full h-full max-h-[90vh] rounded-lg shadow-2xl" 
        />
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-slate-800/80 text-white rounded-full h-10 w-10 flex items-center justify-center hover:bg-slate-700/80 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label="Close full view"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};
