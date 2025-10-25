
import React, { useState } from 'react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
}

const StarIcon: React.FC<{ filled: boolean; onHover: () => void; onClick: () => void; }> = ({ filled, onHover, onClick }) => (
  <svg
    onMouseEnter={onHover}
    onClick={onClick}
    className={`w-8 h-8 cursor-pointer transition-colors ${filled ? 'text-amber-400' : 'text-slate-500 hover:text-amber-300'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(rating, comment);
    setRating(0);
    setComment('');
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 transition-opacity"
      onClick={onClose}
    >
      <div
        className="glassmorphic rounded-2xl p-6 sm:p-8 w-11/12 max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-text-primary mb-2">Rate Your Avatar</h2>
        <p className="text-text-secondary mb-6">Your feedback helps us improve!</p>

        <div className="mb-6">
          <label className="block text-lg font-semibold text-text-primary mb-2">Rating</label>
          <div className="flex items-center space-x-2" onMouseLeave={() => setHoverRating(0)}>
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                filled={(hoverRating || rating) >= star}
                onHover={() => setHoverRating(star)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="feedback-comment" className="block text-lg font-semibold text-text-primary mb-2">
            Feedback (Optional)
          </label>
          <textarea
            id="feedback-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What did you like or dislike?"
            className="w-full h-24 p-3 bg-white/5 border border-slate-300/20 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 placeholder-slate-400/70 text-text-primary"
          />
        </div>
        
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="py-2 px-6 font-semibold text-text-secondary bg-white/5 border border-slate-300/20 rounded-lg hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="py-2 px-6 font-bold text-white bg-gradient-to-r from-amber-500 to-cyan-500 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
