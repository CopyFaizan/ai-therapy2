
import React, { useState } from 'react';
import Button from './common/Button';

interface FeelingInputProps {
  onSubmit: (prompt: string) => void;
}

const feelingSuggestions = ["Peaceful", "Anxious", "Lost", "Hopeful", "Grateful", "Overwhelmed"];

const FeelingInput: React.FC<FeelingInputProps> = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleSuggestionClick = (suggestion: string) => {
    setText(prev => prev ? `${prev}, ${suggestion.toLowerCase()}` : suggestion);
  };
  
  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text.trim());
    }
  };

  return (
    <div className="w-full max-w-xl bg-white/50 backdrop-blur-lg p-8 rounded-2xl shadow-xl animate-fade-in-up">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">How are you feeling?</h2>
      <p className="text-center text-gray-600 mb-6">There are no right or wrong answers. Describe what's on your mind, or choose a word below to begin.</p>
      <div className="flex flex-wrap gap-2 justify-center mb-6">
          {feelingSuggestions.map(feeling => (
            <button
                key={feeling}
                onClick={() => handleSuggestionClick(feeling)}
                className="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold hover:bg-indigo-200 transition"
            >
                {feeling}
            </button>
          ))}
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="For example: 'a quiet feeling of watching the sunrise' or 'the stress of a busy week'..."
        className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition mb-6 bg-white/70 resize-none"
      />
      <Button onClick={handleSubmit} disabled={!text.trim()}>
        Translate Feelings into Art
      </Button>
    </div>
  );
};

export default FeelingInput;
