
import React, { useState, useRef } from 'react';
import { Prompt } from '../types';

interface AddPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (prompt: Prompt) => void;
}

export const AddPromptModal: React.FC<AddPromptModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [promptText, setPromptText] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPromptText('');
    setImageUrl(null);
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = () => {
    if (!title.trim() || !description.trim() || !promptText.trim() || !imageUrl) {
        setError('All fields and an image are required.');
        return;
    }
    onSubmit({
        title,
        description,
        prompt: promptText,
        imageUrl,
    });
    handleClose();
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 transition-opacity animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="glassmorphic rounded-2xl p-6 sm:p-8 w-11/12 max-w-lg flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-text-primary">Contribute a Prompt</h2>
        <p className="text-text-secondary -mt-2 mb-2">Share your creativity with the community!</p>

        <div className="flex flex-col md:flex-row gap-4">
          <div
            onClick={handleImageClick}
            className="md:w-1/3 w-full h-40 bg-black/10 dark:bg-black/20 border border-slate-300/20 rounded-xl flex items-center justify-center cursor-pointer hover:border-cyan-400 transition-all duration-300 group overflow-hidden"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/jpeg, image/webp"
            />
            {imageUrl ? (
              <img src={imageUrl} alt="Reference preview" className="object-cover h-full w-full" />
            ) : (
              <div className="text-center text-text-secondary p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-1 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <p className="font-semibold text-sm">Upload Image</p>
              </div>
            )}
          </div>
          <div className="flex-grow flex flex-col gap-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Prompt Title"
              className="w-full p-3 bg-white/5 border border-slate-300/20 rounded-lg focus:ring-2 focus:ring-cyan-400 transition-all duration-300 placeholder-slate-400/70 text-text-primary"
            />
             <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short Description"
              className="w-full p-3 bg-white/5 border border-slate-300/20 rounded-lg focus:ring-2 focus:ring-cyan-400 transition-all duration-300 placeholder-slate-400/70 text-text-primary"
            />
          </div>
        </div>

        <textarea
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder="Enter the full prompt text here..."
            className="w-full h-24 p-3 bg-white/5 border border-slate-300/20 rounded-lg focus:ring-2 focus:ring-cyan-400 transition-all duration-300 placeholder-slate-400/70 text-text-primary"
        />
        
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        
        <div className="flex justify-end gap-4 mt-2">
          <button
            onClick={handleClose}
            className="py-2 px-6 font-semibold text-text-secondary bg-white/5 border border-slate-300/20 rounded-lg hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="py-2 px-6 font-bold text-white bg-gradient-to-r from-amber-500 to-cyan-500 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          >
            Submit Prompt
          </button>
        </div>
      </div>
    </div>
  );
};
