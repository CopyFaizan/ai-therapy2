
export type AppState = 'welcome' | 'feeling_input' | 'generating' | 'reflection' | 'history';

export interface Session {
  id: string;
  prompt: string;
  imageUrl: string;
  reflection: string;
  timestamp: number;
}
