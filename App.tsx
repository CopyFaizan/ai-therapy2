
import React, { useState, useCallback } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import FeelingInput from './components/FeelingInput';
import ImageGeneration from './components/ImageGeneration';
import Reflection from './components/Reflection';
import SessionHistory from './components/SessionHistory';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Session, AppState } from './types';
import { HistoryIcon } from './constants';

const App: React.FC = () => {
  // FIX: API key is now handled by `process.env.API_KEY` in the service layer.
  // The API key input flow has been removed.
  const [appState, setAppState] = useState<AppState>('welcome');
  const [sessions, setSessions] = useLocalStorage<Session[]>('art-therapy-sessions', []);
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const [currentImageUrl, setCurrentImageUrl] = useState<string>('');

  const handleStart = useCallback(() => {
    setCurrentPrompt('');
    setCurrentImageUrl('');
    setAppState('feeling_input');
  }, []);

  const handleFeelingsSubmit = useCallback((prompt: string) => {
    setCurrentPrompt(prompt);
    setAppState('generating');
  }, []);

  const handleImageGenerated = useCallback((imageUrl: string) => {
    setCurrentImageUrl(imageUrl);
    setAppState('reflection');
  }, []);

  const handleReflectionSave = useCallback((reflection: string) => {
    const newSession: Session = {
      id: new Date().toISOString(),
      prompt: currentPrompt,
      imageUrl: currentImageUrl,
      reflection: reflection,
      timestamp: new Date().getTime(),
    };
    setSessions([newSession, ...sessions]);
    setAppState('history');
  }, [currentImageUrl, currentPrompt, sessions, setSessions]);

  const handleShowHistory = useCallback(() => {
    setAppState('history');
  }, []);

  // FIX: Removed ApiKeyInput component and related logic. The app now renders directly.
  const renderContent = () => {
    switch (appState) {
      case 'welcome':
        return <WelcomeScreen onStart={handleStart} />;
      case 'feeling_input':
        return <FeelingInput onSubmit={handleFeelingsSubmit} />;
      case 'generating':
        // FIX: Removed apiKey and onResetApiKey props as they are no longer needed.
        return <ImageGeneration prompt={currentPrompt} onGenerated={handleImageGenerated} onBack={() => setAppState('feeling_input')} />;
      case 'reflection':
        return <Reflection imageUrl={currentImageUrl} onSave={handleReflectionSave} />;
      case 'history':
        return <SessionHistory sessions={sessions} onNewSession={handleStart} />;
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-gray-800 flex flex-col items-center justify-center p-4 selection:bg-purple-300 selection:text-purple-900">
      {appState !== 'welcome' && appState !== 'history' && (
        <button
          onClick={handleShowHistory}
          className="absolute top-4 right-4 text-gray-600 hover:text-indigo-600 transition-colors p-2 rounded-full bg-white/50 backdrop-blur-sm shadow-md"
          aria-label="View Session History"
        >
          <HistoryIcon className="w-6 h-6" />
        </button>
      )}
      {renderContent()}
    </div>
  );
};

export default App;
