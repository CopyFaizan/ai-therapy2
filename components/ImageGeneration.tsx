
import React, { useState, useEffect } from 'react';
import Spinner from './common/Spinner';
import { generateArtFromFeelings } from '../services/geminiService';
import Button from './common/Button';

interface ImageGenerationProps {
  prompt: string;
  onGenerated: (imageUrl: string) => void;
  onBack: () => void;
}

const loadingMessages = [
    "Connecting with the digital muse...",
    "Translating your feelings into colors...",
    "The canvas is taking shape...",
    "Patience is part of the creative process...",
    "Art is forming from the ether...",
];

const ImageGeneration: React.FC<ImageGenerationProps> = ({ prompt, onGenerated, onBack }) => {
  const [error, setError] = useState<string | null>(null);
  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => {
        const currentIndex = loadingMessages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const generateImage = async () => {
      if (!prompt) {
        setError("No prompt provided.");
        setIsLoading(false);
        return;
      }
      try {
        // FIX: Removed apiKey argument as it's now handled in the service.
        const imageUrl = await generateArtFromFeelings(prompt);
        onGenerated(imageUrl);
      } catch (e: any) {
        // FIX: Simplified error handling as API key is no longer user-configurable.
        setError(e.message || "An unknown error occurred.");
        setIsLoading(false);
      }
    };
    
    generateImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prompt, onGenerated]);

  return (
    <div className="w-full max-w-xl text-center bg-white/50 backdrop-blur-lg p-8 rounded-2xl shadow-xl animate-fade-in">
      {isLoading && !error && (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Creating Your Art</h2>
          <Spinner />
          <p className="text-gray-600 mt-4 h-6 transition-opacity duration-500">{currentMessage}</p>
        </>
      )}
      {error && (
        <>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Oh no!</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          {/* FIX: Always show "Try Again" on error. */}
          <Button onClick={onBack} variant="secondary">Try Again</Button>
        </>
      )}
    </div>
  );
};

export default ImageGeneration;
