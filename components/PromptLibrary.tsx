
import React, { useState } from 'react';
import { PROMPT_CATEGORIES } from '../constants';
import { PromptCategory } from '../types';

interface PromptLibraryProps {
  onPromptSelect: (prompt: string) => void;
}

export const PromptLibrary: React.FC<PromptLibraryProps> = ({ onPromptSelect }) => {
  const [activeTab, setActiveTab] = useState(PROMPT_CATEGORIES[0].name);

  const activeCategory = PROMPT_CATEGORIES.find(cat => cat.name === activeTab);

  return (
    <div className="w-full">
      <h3 className="text-md font-semibold text-text-secondary mb-3 text-center">Or get inspired by our library</h3>
      <div className="w-full">
        <div className="flex border-b border-slate-300/20 mb-4 space-x-2 sm:space-x-4 overflow-x-auto pb-2">
          {PROMPT_CATEGORIES.map((category: PromptCategory) => (
            <button
              key={category.name}
              onClick={() => setActiveTab(category.name)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap outline-none focus:ring-2 focus:ring-cyan-400 ${
                activeTab === category.name
                  ? 'bg-cyan-500/20 text-cyan-300 border-b-2 border-cyan-400'
                  : 'text-text-secondary hover:bg-white/5'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          {activeCategory?.prompts.map((prompt) => (
            <button
              key={prompt.title}
              onClick={() => onPromptSelect(prompt.prompt)}
              className="p-3 bg-white/5 rounded-lg text-left hover:bg-white/10 transform hover:scale-105 transition-all duration-200 h-full ring-1 ring-transparent hover:ring-cyan-400"
            >
              <p className="font-semibold text-sm text-text-primary">{prompt.title}</p>
              <p className="text-xs text-text-secondary mt-1 hidden sm:block">{prompt.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
