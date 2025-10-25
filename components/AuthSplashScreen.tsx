import React from 'react';

export const AuthSplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center transition-colors duration-300 z-50">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-cyan-400 to-amber-400 tracking-wider animate-pulse">
          RupVeda AI
        </h1>
        <p className="mt-2 text-lg text-text-secondary">
          Initializing session...
        </p>
      </div>
    </div>
  );
};
