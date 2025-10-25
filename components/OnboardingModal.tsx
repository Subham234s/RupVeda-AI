
import React, { useState } from 'react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const onboardingSteps = [
    {
        title: "Welcome to RupVeda AI!",
        content: "Let's quickly walk through how you can create your unique, Indian-inspired avatar.",
    },
    {
        title: "Step 1: Upload Your Photo",
        content: "Click the upload area to select a clear photo of yourself. This will be the base for your new avatar.",
    },
    {
        title: "Step 2: Describe Your Vision",
        content: "Write a text prompt describing the style you want. You can also visit our 'Prompt Library' for inspiration!",
    },
    {
        title: "Advanced Settings",
        content: "Expand the 'Advanced Settings' to control aspect ratio, style intensity, and add negative prompts to exclude things you don't want.",
    },
    {
        title: "Step 3: Generate!",
        content: "Hit the 'Generate Avatar' button and watch the AI bring your vision to life. Your creation will appear below.",
    },
    {
        title: "Review Your Creations",
        content: "Use the 'History' tab in the navigation bar to see all your past generations, reuse their prompts, or delete them.",
    },
];


export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < onboardingSteps.length - 1) {
        setStep(step + 1);
    } else {
        onClose();
    }
  };
  
  const handlePrev = () => {
    if (step > 0) {
        setStep(step - 1);
    }
  };

  const currentStep = onboardingSteps[step];
  const isLastStep = step === onboardingSteps.length - 1;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 transition-opacity animate-fade-in"
      onClick={onClose}
    >
      <div
        className="glassmorphic rounded-2xl p-6 sm:p-8 w-11/12 max-w-md flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">
            {currentStep.title}
        </h2>
        
        <p className="text-text-secondary my-4">{currentStep.content}</p>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 my-2">
            {onboardingSteps.map((_, index) => (
                <div 
                    key={index}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${step === index ? 'bg-cyan-400 w-6' : 'bg-slate-600'}`}
                />
            ))}
        </div>
        
        <div className="flex justify-between items-center gap-4 mt-4">
            <button
                onClick={onClose}
                className="py-2 px-6 font-semibold text-text-secondary hover:text-text-primary transition-colors"
            >
                Skip
            </button>
            <div className="flex gap-2">
                {step > 0 && (
                     <button
                        onClick={handlePrev}
                        className="py-2 px-6 font-semibold text-text-secondary bg-white/5 border border-slate-300/20 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        Previous
                    </button>
                )}
                <button
                    onClick={handleNext}
                    className="py-2 px-6 font-bold text-white bg-gradient-to-r from-amber-500 to-cyan-500 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300"
                >
                    {isLastStep ? 'Finish' : 'Next'}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
