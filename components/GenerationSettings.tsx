import React, { useState } from 'react';
import { GenerationSettings as GenerationSettingsType } from '../types';

interface GenerationSettingsProps {
    settings: GenerationSettingsType;
    onChange: (newSettings: Partial<GenerationSettingsType>) => void;
}

export const GenerationSettings: React.FC<GenerationSettingsProps> = ({ settings, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const aspectRatios: GenerationSettingsType['aspectRatio'][] = ['1:1', '9:16', '16:9'];

    return (
        <div className="w-full p-6 glassmorphic rounded-2xl flex flex-col gap-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left"
                aria-expanded={isOpen}
                aria-controls="advanced-settings-panel"
            >
                <h2 className="text-xl font-bold text-text-primary">Advanced Settings</h2>
                <svg
                    className={`w-6 h-6 text-text-secondary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div id="advanced-settings-panel" className="flex flex-col gap-6 mt-4 animate-fade-in">
                    {/* Aspect Ratio */}
                    <div>
                        <label className="block text-md font-semibold text-text-secondary mb-2">Aspect Ratio</label>
                        <div className="flex flex-wrap gap-2">
                            {aspectRatios.map(ratio => (
                                <button
                                    key={ratio}
                                    onClick={() => onChange({ aspectRatio: ratio })}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors outline-none focus:ring-2 focus:ring-cyan-400 ${
                                        settings.aspectRatio === ratio
                                            ? 'bg-cyan-500/20 text-cyan-300'
                                            : 'bg-white/5 text-text-secondary hover:bg-white/10'
                                    }`}
                                >
                                    {ratio}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Style Intensity */}
                    <div>
                        <label htmlFor="style-intensity" className="block text-md font-semibold text-text-secondary mb-2">
                            Style Intensity: <span className="font-bold text-text-primary">{settings.styleIntensity}%</span>
                        </label>
                        <input
                            id="style-intensity"
                            type="range"
                            min="0"
                            max="100"
                            value={settings.styleIntensity}
                            onChange={e => onChange({ styleIntensity: parseInt(e.target.value, 10) })}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer range-lg accent-cyan-500"
                        />
                        <div className="flex justify-between text-xs text-text-secondary mt-1">
                            <span>Subtle</span>
                            <span>Vivid</span>
                        </div>
                    </div>

                    {/* Negative Prompt */}
                    <div>
                         <label htmlFor="negative-prompt" className="block text-md font-semibold text-text-secondary mb-2">
                            Negative Prompt
                        </label>
                        <input
                            id="negative-prompt"
                            type="text"
                            value={settings.negativePrompt}
                            onChange={e => onChange({ negativePrompt: e.target.value })}
                            placeholder="e.g., text, watermarks, blurry, deformed"
                            className="w-full p-3 bg-white/5 border border-slate-300/20 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 placeholder-slate-400/70 text-text-primary"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
