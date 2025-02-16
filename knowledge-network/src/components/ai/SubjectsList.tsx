'use client';

import React, { useState } from 'react';
import { Folder, ChevronDown, ChevronRight, FileText, Upload } from 'lucide-react';
import { Subject, Note } from '@/types';

interface SubjectsListProps {
  subjects: Subject[];
  onNoteSelect: (noteId: string) => void;
}

export function SubjectsList({ subjects, onNoteSelect }: SubjectsListProps) {
  const [expandedSubjects, setExpandedSubjects] = useState<Set<string>>(new Set());
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const toggleSubject = (subjectId: string) => {
    const newExpanded = new Set(expandedSubjects);
    if (newExpanded.has(subjectId)) {
      newExpanded.delete(subjectId);
    } else {
      newExpanded.add(subjectId);
    }
    setExpandedSubjects(newExpanded);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">My Courses</h2>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center px-3 py-1 text-sm bg-purple-500 text-white rounded-md hover:bg-purple-600"
          >
            <Upload className="w-4 h-4 mr-1" />
            Upload
          </button>
        </div>
        <div className="space-y-2">
          {subjects.map((subject) => (
            <div key={subject.id} className="mb-4">
              <button
                className="flex items-center w-full p-2 bg-gray-50 hover:bg-gray-100 rounded"
                onClick={() => toggleSubject(subject.id)}
              >
                {expandedSubjects.has(subject.id) ? (
                  <ChevronDown className="w-4 h-4 mr-2" />
                ) : (
                  <ChevronRight className="w-4 h-4 mr-2" />
                )}
                <Folder className="w-5 h-5 mr-2 text-blue-500" />
                <span className="font-medium">{subject.name}</span>
              </button>
              
              {expandedSubjects.has(subject.id) && (
                <div className="ml-6 space-y-1 mt-1">
                  {subject.notes.map((note) => (
                    <button
                      key={note.id}
                      className="flex items-center w-full p-2 hover:bg-gray-100 rounded text-sm"
                      onClick={() => onNoteSelect(note.id)}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      <span>{note.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Upload Files</h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                className="hidden"
                id="file-upload"
                multiple
                onChange={(e) => {
                  // Handle file upload
                  console.log('Files:', e.target.files);
                  setIsUploadModalOpen(false);
                }}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-sm text-gray-600 hover:text-blue-500"
              >
                <span>Drop files here or click to upload</span>
              </label>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 