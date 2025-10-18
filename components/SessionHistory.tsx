
import React, { useState } from 'react';
import type { Session } from '../types';
import Button from './common/Button';

interface SessionHistoryProps {
  sessions: Session[];
  onNewSession: () => void;
}

const SessionHistory: React.FC<SessionHistoryProps> = ({ sessions, onNewSession }) => {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  if (selectedSession) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in" onClick={() => setSelectedSession(null)}>
        <div className="bg-white/90 p-8 rounded-2xl shadow-2xl max-w-4xl w-full flex flex-col md:flex-row gap-8" onClick={(e) => e.stopPropagation()}>
          <div className="md:w-1/2">
            <img src={selectedSession.imageUrl} alt="Generated art" className="rounded-lg shadow-lg w-full aspect-square object-cover" />
          </div>
          <div className="md:w-1/2 flex flex-col">
             <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Session from {new Date(selectedSession.timestamp).toLocaleDateString()}</h3>
            <div className="mb-4">
                <h4 className="font-bold text-lg text-gray-800">Your Feelings</h4>
                <p className="text-gray-600 italic bg-gray-100 p-3 rounded-md">"{selectedSession.prompt}"</p>
            </div>
             <div className="flex-grow">
                <h4 className="font-bold text-lg text-gray-800">Your Reflection</h4>
                <p className="text-gray-600 bg-gray-100 p-3 rounded-md h-full">{selectedSession.reflection}</p>
            </div>
            <button onClick={() => setSelectedSession(null)} className="mt-4 text-indigo-600 font-semibold hover:underline">Close</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Your Journey</h2>
        <p className="text-gray-600 mt-2">A gallery of your past reflections and creations.</p>
        <Button onClick={onNewSession} className="mt-4">
          Start a New Session
        </Button>
      </div>
      {sessions.length === 0 ? (
        <div className="text-center bg-white/50 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
          <p className="text-gray-600">You haven't saved any sessions yet. Start a new session to begin your artistic journey.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sessions.map(session => (
            <div
              key={session.id}
              className="group cursor-pointer aspect-square bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl"
              onClick={() => setSelectedSession(session)}
            >
              <img src={session.imageUrl} alt="Thumbnail of generated art" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                <p className="text-white text-center text-sm font-semibold">{new Date(session.timestamp).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SessionHistory;
