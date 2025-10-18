
import React from 'react';
import Button from './common/Button';
import { SparklesIcon } from '../constants';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center bg-white/50 backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-lg w-full animate-fade-in">
      <SparklesIcon className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to Art Therapy Muse</h1>
      <p className="text-lg text-gray-600 mb-8">
        A quiet space to explore your feelings through the gentle power of art. Let's create something meaningful together.
      </p>
      <Button onClick={onStart}>
        Begin Session
      </Button>
    </div>
  );
};

export default WelcomeScreen;
