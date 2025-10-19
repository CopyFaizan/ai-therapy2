import React from 'react';
import Button from './common/Button';
import { SparklesIcon } from '../constants';

interface ApiKeyPromptProps {
  onSelectKey: () => void;
}

const ApiKeyPrompt: React.FC<ApiKeyPromptProps> = ({ onSelectKey }) => {
  return (
    <div className="text-center bg-white/50 backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-lg w-full animate-fade-in">
      <SparklesIcon className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Select Your API Key</h1>
      <p className="text-lg text-gray-600 mb-6">
        To generate images, this app needs access to the Gemini API. Please select an API key to continue.
      </p>
      <Button onClick={onSelectKey}>
        Select API Key
      </Button>
      <p className="text-xs text-gray-500 mt-4">
        Ensure billing is enabled for your project. {' '}
        <a 
            href="https://ai.google.dev/gemini-api/docs/billing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-indigo-600"
        >
            Learn more
        </a>.
      </p>
    </div>
  );
};

export default ApiKeyPrompt;
