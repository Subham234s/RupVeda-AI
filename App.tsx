
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { ImageUploader } from './components/ImageUploader';
import { PromptGallery } from './components/PromptGallery';
import { HistoryPage } from './components/HistoryPage';
import { ContactPage } from './components/ContactPage';
import { AvatarDisplay } from './components/AvatarDisplay';
import { FeedbackModal } from './components/FeedbackModal';
import { GenerationSettings as GenerationSettingsComponent } from './components/GenerationSettings';
import { FullViewModal } from './components/FullViewModal';
import { AddPromptModal } from './components/AddPromptModal';
import { OnboardingModal } from './components/OnboardingModal';
import { Footer } from './components/Footer';
import { generateAvatar } from './services/geminiService';
import { GenerationSettings, HistoryItem, Prompt } from './types';

type Page = 'generator' | 'prompt-library' | 'history' | 'contact';

const App: React.FC = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [page, setPage] = useState<Page>('generator');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [generatedAvatar, setGeneratedAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState<boolean>(false);
  const [fullViewImageUrl, setFullViewImageUrl] = useState<string | null>(null);
  const [isAddPromptModalOpen, setIsAddPromptModalOpen] = useState<boolean>(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [communityPrompts, setCommunityPrompts] = useState<Prompt[]>([]);
  const [settings, setSettings] = useState<GenerationSettings>({
    aspectRatio: '1:1',
    styleIntensity: 50,
    negativePrompt: '',
  });

  const isMounted = useRef(false);

  // Load all data from localStorage on initial mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) setTheme(savedTheme);

      const savedSettings = localStorage.getItem('generationSettings');
      if (savedSettings) setSettings(JSON.parse(savedSettings));
      
      const savedHistory = localStorage.getItem('generationHistory');
      if(savedHistory) setHistory(JSON.parse(savedHistory));

      const savedCommunityPrompts = localStorage.getItem('communityPrompts');
      if (savedCommunityPrompts) setCommunityPrompts(JSON.parse(savedCommunityPrompts));

      const savedPrompt = localStorage.getItem('generatorPrompt');
      if (savedPrompt) setPrompt(savedPrompt);

      const savedImage = localStorage.getItem('generatorImage');
      if (savedImage) setUploadedImage(savedImage);
      
      const hasOnboarded = localStorage.getItem('hasOnboarded');
      if (!hasOnboarded) {
        setIsOnboardingOpen(true);
      }

    } catch (e) {
      console.error("Failed to load data from localStorage", e);
    }
  }, []);

  // Set isMounted to true after the initial render.
  // This prevents useEffects from writing initial state back to localStorage.
  useEffect(() => {
    isMounted.current = true;
  }, []);

  // --- State Persistence ---
  useEffect(() => {
    if (!isMounted.current) return;
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  useEffect(() => {
    if (!isMounted.current) return;
    localStorage.setItem('generatorPrompt', prompt);
  }, [prompt]);
  
  useEffect(() => {
    if (!isMounted.current) return;
    if (uploadedImage) {
      localStorage.setItem('generatorImage', uploadedImage);
    } else {
      localStorage.removeItem('generatorImage');
    }
  }, [uploadedImage]);

  useEffect(() => {
    if (!isMounted.current) return;
    localStorage.setItem('generationSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (!isMounted.current) return;
    localStorage.setItem('generationHistory', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    if (!isMounted.current) return;
    localStorage.setItem('communityPrompts', JSON.stringify(communityPrompts));
  }, [communityPrompts]);


  const handleSettingsChange = (newSettings: Partial<GenerationSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleImageUpload = (imageBase64: string) => {
    setUploadedImage(imageBase64);
    setGeneratedAvatar(null);
    setError(null);
  };

  const handlePromptSelectFromGallery = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
    setPage('generator');
  };
  
  const handleAddNewPrompt = (newPrompt: Prompt) => {
    setCommunityPrompts(prev => [newPrompt, ...prev]);
    setIsAddPromptModalOpen(false);
  };

  const fileToGenerativePart = (dataUrl: string) => {
    const match = dataUrl.match(/^data:(.+);base64,(.+)$/);
    if (!match || match.length < 3) {
      throw new Error('Invalid data URL format. Could not extract mimeType and data.');
    }
    return {
      mimeType: match[1],
      data: match[2],
    };
  };

  const handleGenerateClick = useCallback(async () => {
    if (!uploadedImage) {
      setError('Please upload an image first.');
      return;
    }
    if (!prompt.trim()) {
      setError('Please enter a prompt or select one from the library.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedAvatar(null);

    try {
      const { mimeType, data } = fileToGenerativePart(uploadedImage);
      const generatedImage = await generateAvatar(prompt, { inlineData: { mimeType, data } }, settings);
      if (generatedImage) {
        const newAvatarUrl = `data:image/jpeg;base64,${generatedImage}`;
        setGeneratedAvatar(newAvatarUrl);

        const newHistoryItem: HistoryItem = {
          id: Date.now(),
          imageUrl: newAvatarUrl,
          prompt,
          settings,
          createdAt: new Date().toISOString(),
        };

        setHistory(prevHistory => [newHistoryItem, ...prevHistory].slice(0, 20));
        
      } else {
        throw new Error('The AI did not return an image. Please try a different prompt.');
      }
    } catch (err) {
      console.error("Avatar Generation Error:", err);
      setError("We couldn't generate your avatar. Please check the suggestions below and try again.");
    } finally {
      setIsLoading(false);
    }
  }, [uploadedImage, prompt, settings]);

  const handleFeedbackSubmit = (rating: number, comment: string) => {
    if (!generatedAvatar) return;

    try {
      const newFeedback = {
        id: Date.now(),
        avatarImage: generatedAvatar.substring(0, 100) + '...',
        rating,
        comment,
        timestamp: new Date().toISOString(),
      };

      const existingFeedback = JSON.parse(localStorage.getItem('avatarFeedback') || '[]');
      existingFeedback.push(newFeedback);
      localStorage.setItem('avatarFeedback', JSON.stringify(existingFeedback));
    } catch (e) {
      console.error("Failed to save feedback to localStorage", e);
    } finally {
      setIsFeedbackModalOpen(false);
    }
  };
  
  const handleSaveUrlAsFile = useCallback((url: string, filename: string) => {
    if (!url) return;
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);
  
  const handleSaveImage = useCallback(() => {
    handleSaveUrlAsFile(generatedAvatar!, `RupVeda-AI-Avatar-${Date.now()}.jpeg`);
  }, [generatedAvatar, handleSaveUrlAsFile]);

  const handleShareImage = useCallback(async () => {
    if (!generatedAvatar) return;
    try {
        const response = await fetch(generatedAvatar);
        const blob = await response.blob();
        const file = new File([blob], `RupVeda-AI-Avatar-${Date.now()}.jpeg`, { type: blob.type });

        if (navigator.share && navigator.canShare({ files: [file] })) {
            await navigator.share({
                title: 'My RupVeda AI Avatar',
                text: 'Check out this cool avatar I created with RupVeda AI!',
                files: [file],
            });
        } else {
            alert('Web Share API is not supported in your browser. You can save the image instead.');
        }
    } catch (error) {
        console.error('Error sharing image:', error);
        setError('Could not share the image. You can try saving it instead.');
    }
  }, [generatedAvatar]);

  const handleReset = () => {
    setUploadedImage(null);
    setPrompt('');
    setGeneratedAvatar(null);
    setIsLoading(false);
    setError(null);
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement | null;
    if (fileInput) {
        fileInput.value = "";
    }
    // localStorage will be cleared by the useEffect hooks
  };

  const handleDeleteHistoryItem = (id: number) => {
    setHistory(prevHistory => prevHistory.filter(item => item.id !== id));
  };

  const handleReuseHistoryItem = (item: HistoryItem) => {
      setPrompt(item.prompt);
      setSettings(item.settings);
      setPage('generator');
  };

  const handleSaveHistoryImage = useCallback((imageUrl: string) => {
    handleSaveUrlAsFile(imageUrl, `RupVeda-AI-History-${Date.now()}.jpeg`);
  }, [handleSaveUrlAsFile]);

  const handleOnboardingComplete = () => {
    setIsOnboardingOpen(false);
    localStorage.setItem('hasOnboarded', 'true');
  };


  return (
    <>
      <div className="min-h-screen w-full bg-background text-text-primary p-4 sm:p-6 lg:p-8 transition-colors duration-300 flex flex-col items-center">
        <div className="container mx-auto max-w-3xl flex flex-col items-center w-full">
          <Header theme={theme} toggleTheme={toggleTheme} />
          <Navbar activePage={page} onNavigate={setPage} />

          {page === 'generator' && (
            <main className="w-full mt-8 flex flex-col items-center gap-8 animate-fade-in">
              <div className="w-full p-6 glassmorphic rounded-2xl text-center">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400 mb-2">
                  Welcome to RupVeda AI
                </h2>
                <p className="text-text-secondary max-w-xl mx-auto">
                  Create stunning, Indian-inspired avatars in three simple steps. 
                  <span className="font-semibold text-text-primary"> Upload</span> a photo,{' '}
                  <span className="font-semibold text-text-primary">describe</span> your vision, and let our AI{' '}
                  <span className="font-semibold text-text-primary">generate</span> a unique masterpiece for you.
                </p>
              </div>

              <div id="step-1" className="w-full p-6 glassmorphic rounded-2xl flex flex-col gap-4 text-center">
                <h2 className="text-xl font-bold text-text-primary">
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400 mr-2">1.</span> 
                  Upload Your Photo
                </h2>
                <ImageUploader onImageUpload={handleImageUpload} uploadedImage={uploadedImage} />
              </div>

              <div id="step-2" className="w-full p-6 glassmorphic rounded-2xl flex flex-col gap-4">
                 <h2 className="text-xl font-bold text-text-primary text-center">
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400 mr-2">2.</span> 
                  Describe Your Vision
                </h2>
                <textarea
                  id="prompt-input"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., A warrior queen in a futuristic city..."
                  className="w-full h-24 p-3 bg-white/5 border border-slate-300/20 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 placeholder-slate-400/70 text-text-primary"
                />
                 <p className="text-center text-sm text-text-secondary">
                    Or, get inspired by our{' '}
                    <button onClick={() => setPage('prompt-library')} className="font-bold text-cyan-400 hover:underline">
                        Prompt Library
                    </button>
                </p>
              </div>
              
              <GenerationSettingsComponent settings={settings} onChange={handleSettingsChange} />

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg w-full animate-fade-in">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="font-bold">Oops! Generation Failed</strong>
                      <p className="text-sm mt-1">{error}</p>
                      <ul className="list-disc list-inside text-left text-sm mt-3 space-y-1 text-red-400/90">
                        <li>Try using a different or more descriptive prompt.</li>
                        <li>Ensure the uploaded image is clear and well-lit.</li>
                        <li>Check your internet connection and try again.</li>
                        <li>If the problem persists, the AI service might be temporarily unavailable.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="w-full max-w-sm flex items-center gap-4">
                <button
                  onClick={handleGenerateClick}
                  disabled={isLoading || !uploadedImage || !prompt}
                  className="flex-grow py-4 px-6 text-xl font-bold text-white bg-gradient-to-r from-amber-500 to-cyan-500 rounded-full shadow-lg hover:scale-105 transform transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-3 ring-2 ring-transparent focus:outline-none focus:ring-cyan-300 hover:shadow-cyan-500/50"
                  >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    'Generate Avatar'
                  )}
                </button>
                {(uploadedImage || generatedAvatar) && (
                   <button 
                      onClick={handleReset} 
                      className="p-4 bg-slate-500/20 text-text-secondary rounded-full shadow-lg hover:bg-slate-500/30 transform transition-all duration-300"
                      aria-label="Reset"
                      title="Reset"
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0120.5 10M20 20l-1.5-1.5A9 9 0 003.5 14" />
                      </svg>
                  </button>
                )}
              </div>
              
              <div id="step-3" className="w-full mt-4">
                  <AvatarDisplay
                      imageUrl={generatedAvatar}
                      isLoading={isLoading}
                      onRate={() => setIsFeedbackModalOpen(true)}
                      onFullView={() => generatedAvatar && setFullViewImageUrl(generatedAvatar)}
                      onSave={handleSaveImage}
                      onShare={handleShareImage}
                  />
              </div>
            </main>
          )}

          {page === 'prompt-library' && (
            <PromptGallery 
                onPromptSelect={handlePromptSelectFromGallery} 
                communityPrompts={communityPrompts}
                onAddNewPrompt={() => setIsAddPromptModalOpen(true)}
                onImageClick={(imageUrl) => setFullViewImageUrl(imageUrl)}
            />
          )}

          {page === 'history' && (
            <HistoryPage 
                history={history}
                onDelete={handleDeleteHistoryItem}
                onReuse={handleReuseHistoryItem}
                onSave={handleSaveHistoryImage}
                onNavigateToGenerator={() => setPage('generator')}
            />
          )}

          {page === 'contact' && (
            <ContactPage />
          )}

          <Footer onNavigate={setPage} />
        </div>
      </div>

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
      />
      <FullViewModal 
        isOpen={!!fullViewImageUrl}
        onClose={() => setFullViewImageUrl(null)}
        imageUrl={fullViewImageUrl}
      />
      <AddPromptModal 
        isOpen={isAddPromptModalOpen}
        onClose={() => setIsAddPromptModalOpen(false)}
        onSubmit={handleAddNewPrompt}
      />
      <OnboardingModal 
        isOpen={isOnboardingOpen}
        onClose={handleOnboardingComplete}
      />
    </>
  );
};

export default App;