
import React, { useState } from 'react';
import { PROMPT_CATEGORIES } from '../constants';
import { PromptCategory, Prompt } from '../types';

interface PromptCardProps {
  prompt: Prompt;
  onPromptSelect: (prompt: string) => void;
  onImageClick: (imageUrl: string) => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, onPromptSelect, onImageClick }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt.prompt);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div
            className="glassmorphic rounded-xl p-4 flex flex-col text-left h-full group"
        >
            {prompt.imageUrl && (
                <div 
                    className="w-full h-40 overflow-hidden rounded-lg mb-4 cursor-pointer relative"
                    onClick={() => onImageClick(prompt.imageUrl!)}
                >
                    <img 
                        src={prompt.imageUrl} 
                        alt={prompt.title} 
                        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-lg font-bold text-white">View Image</p>
                    </div>
                </div>
            )}
            <h3 className="text-lg font-bold text-text-primary">{prompt.title}</h3>
            <p className="text-sm text-text-secondary mt-1">{prompt.description}</p>
            
            <div className="mt-4 bg-black/20 p-3 rounded-lg flex-grow flex flex-col">
                <p className="text-xs font-semibold text-text-secondary mb-1 uppercase tracking-wider">Prompt</p>
                <p className="text-sm text-text-primary/90 font-mono flex-grow overflow-y-auto max-h-24">
                    {prompt.prompt}
                </p>
            </div>
            
            <div className="w-full mt-4 grid grid-cols-2 gap-2">
                 <button
                    onClick={handleCopy}
                    className="py-3 px-2 text-md font-bold text-white bg-slate-500/20 rounded-lg shadow-lg hover:bg-slate-500/30 transform transition-all duration-300 ring-2 ring-transparent focus:outline-none focus:ring-slate-400"
                >
                    {isCopied ? 'Copied!' : 'Copy'}
                </button>
                <button
                    onClick={() => onPromptSelect(prompt.prompt)}
                    className="py-3 px-2 text-md font-bold text-white bg-gradient-to-r from-amber-500/80 to-cyan-500/80 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 ring-2 ring-transparent focus:outline-none focus:ring-cyan-300 hover:shadow-cyan-500/50"
                >
                    Use Prompt
                </button>
            </div>
        </div>
    );
};

interface PromptGalleryProps {
  onPromptSelect: (prompt: string) => void;
  communityPrompts: Prompt[];
  onAddNewPrompt: () => void;
  onImageClick: (imageUrl: string) => void;
}

export const PromptGallery: React.FC<PromptGalleryProps> = ({ onPromptSelect, communityPrompts, onAddNewPrompt, onImageClick }) => {
  return (
    <div className="w-full flex flex-col items-center animate-fade-in text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">
            Prompt Library
        </h1>
        <p className="mt-2 text-lg text-text-secondary max-w-2xl">
            Discover creative styles, or contribute your own. Click any prompt to start generating your unique avatar.
        </p>
        
        <div className="w-full mt-8">
            <button
                onClick={onAddNewPrompt}
                className="py-3 px-8 text-md font-bold text-white bg-gradient-to-r from-cyan-500 to-amber-500 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 ring-2 ring-transparent focus:outline-none focus:ring-amber-300 hover:shadow-amber-500/50"
            >
                + Add Your Own Prompt
            </button>
        </div>
        
        <div className="w-full mt-12 flex flex-col gap-12">
            {communityPrompts.length > 0 && (
                 <section key="community" className="w-full">
                    <h2 className="text-2xl sm:text-3xl font-bold text-text-primary border-b-2 border-cyan-500/30 pb-2 mb-6">
                        Community Prompts
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {communityPrompts.map((prompt, index) => (
                           <PromptCard 
                                key={`community-${index}-${prompt.title}`} 
                                prompt={prompt} 
                                onPromptSelect={onPromptSelect} 
                                onImageClick={onImageClick}
                            />
                        ))}
                    </div>
                </section>
            )}

            {PROMPT_CATEGORIES.map((category: PromptCategory) => (
                <section key={category.name} className="w-full">
                    <h2 className="text-2xl sm:text-3xl font-bold text-text-primary border-b-2 border-cyan-500/30 pb-2 mb-6">
                        {category.name}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.prompts.map((prompt) => (
                           <PromptCard 
                                key={`${category.name}-${prompt.title}`} 
                                prompt={prompt} 
                                onPromptSelect={onPromptSelect} 
                                onImageClick={onImageClick}
                            />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    </div>
  );
};
