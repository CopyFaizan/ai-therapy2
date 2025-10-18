
import React, { useState } from 'react';
import Button from './common/Button';

interface ReflectionProps {
  imageUrl: string;
  onSave: (reflection: string) => void;
}

const Reflection: React.FC<ReflectionProps> = ({ imageUrl, onSave }) => {
  const [reflection, setReflection] = useState('');

  const handleSave = () => {
    onSave(reflection.trim() || "No reflection written.");
  };

  return (
    <div className="w-full max-w-4xl bg-white/50 backdrop-blur-lg p-8 rounded-2xl shadow-xl flex flex-col lg:flex-row gap-8 animate-fade-in-up">
      <div className="flex-1 flex flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Art</h2>
        <p className="text-gray-600 mb-4">Take a moment with this image. What do you see? How does it make you feel?</p>
        <div className="w-full aspect-square rounded-lg overflow-hidden shadow-lg">
          <img src={imageUrl} alt="AI generated art based on user feelings" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Reflection</h2>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Write down any thoughts, feelings, or memories that come to mind. There's no pressure to write a lot."
          className="w-full flex-grow p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition mb-6 bg-white/70 resize-none"
        />
        <Button onClick={handleSave}>
          Save Session
        </Button>
      </div>
    </div>
  );
};

export default Reflection;
