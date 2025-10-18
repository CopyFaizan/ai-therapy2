
import React, { useState } from 'react';
import Button from './common/Button';
import { SparklesIcon } from '../constants';

interface ApiKeyInputProps {
  onKeySubmit: (key: string) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onKeySubmit }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = () => {
    if (apiKey.trim()) {
      onKeySubmit(apiKey.trim());
    }
  };

  return (
    <div className="w-full max-w-md bg-white/50 backdrop-blur-lg p-8 rounded-2xl shadow-xl animate-fade-in">
      <SparklesIcon className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Enter Your API Key</h2>
      <p className="text-center text-gray-600 mb-6">
        To power the art generation, please enter your Google Gemini API key.
      </p>
      <div className="flex flex-col gap-4">
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Your Gemini API Key"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition bg-white/70"
          aria-label="Gemini API Key"
        />
        <Button onClick={handleSubmit} disabled={!apiKey.trim()}>
          Save & Begin Session
        </Button>
      </div>
      <p className="text-center text-xs text-gray-500 mt-4">
        Don't have a key? Get one from{' '}
        <a
          href="https://aistudio.google.com/app/apikey"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline font-semibold"
        >
          Google AI Studio
        </a>.
      </p>
    </div>
  );
};

export default ApiKeyInput;
