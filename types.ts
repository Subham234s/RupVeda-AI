
export interface Prompt {
  title: string;
  description: string;
  prompt: string;
  imageUrl?: string;
}

export interface PromptCategory {
  name: string;
  prompts: Prompt[];
}

export interface GenerationSettings {
  aspectRatio: '1:1' | '9:16' | '16:9';
  styleIntensity: number;
  negativePrompt: string;
}

export interface HistoryItem {
  id: number;
  imageUrl: string;
  prompt: string;
  settings: GenerationSettings;
  createdAt: string;
}
