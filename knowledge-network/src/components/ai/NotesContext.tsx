import React from 'react';

interface NotesContextProps {
  activeNotes: string[];
  onNoteClick: (noteId: string) => void;
}

export function NotesContext({ activeNotes, onNoteClick }: NotesContextProps) {
  return (
    <div className="h-full bg-gray-50 p-4">
      <h2 className="text-lg font-semibold mb-4">Related Notes</h2>
      {activeNotes.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No related notes for this conversation yet.
        </p>
      ) : (
        <div className="space-y-4">
          {activeNotes.map((noteId) => (
            <div
              key={noteId}
              onClick={() => onNoteClick(noteId)}
              className="p-4 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium">Note {noteId}</h3>
              {/* Add note preview content here */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 