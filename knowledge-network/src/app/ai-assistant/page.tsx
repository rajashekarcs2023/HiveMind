'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { ChatHistory, ChatInput, ChatWindow, NotesContext, SubjectsList } from '@/components/ai';
import { Subject, Note } from '@/types';
import Split from 'react-split';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  relatedNotes?: string[];
}

export default function AIAssistantPage() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeNotes, setActiveNotes] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch('/api/subjects', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    if (session?.user?.id) {
      fetchSubjects();
    }
  }, [session?.user?.id]);

  const handleSendMessage = async (content: string) => {
    setIsLoading(true);
    try {
      const userMessage: Message = {
        id: crypto.randomUUID(),
        content,
        role: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);

      const response = await fetch('/api/ai/query-notes', {
        method: 'POST',
        body: JSON.stringify({
          query: content,
          userId: session?.user?.id,
          context: {
            recentTopics: session?.user?.recentTopics,
            currentSubject: session?.user?.currentSubject
          }
        })
      });

      const { answer, citedNotes } = await response.json();
      setActiveNotes(citedNotes);

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        content: answer,
        role: 'assistant',
        timestamp: new Date(),
        relatedNotes: citedNotes
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error querying notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Split 
      className="flex h-screen overflow-hidden bg-white"
      sizes={[20, 50, 30]}
      minSize={[200, 400, 250]}
      gutterSize={4}
    >
      {/* Left sidebar */}
      <div className="border-r h-screen overflow-y-auto">
        <SubjectsList 
          subjects={subjects}
          onNoteSelect={(noteId) => {
            // Handle note selection
          }}
        />
      </div>

      {/* Main chat area */}
      <div className="h-screen flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <ChatWindow 
            messages={messages}
            isLoading={isLoading}
          />
        </div>
        <div className="p-4 border-t">
          <ChatInput 
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            placeholder="Ask anything about your notes..."
          />
        </div>
      </div>

      {/* Right sidebar */}
      <div className="border-l h-screen overflow-y-auto">
        <NotesContext 
          activeNotes={activeNotes}
          onNoteClick={(noteId) => {
            // Handle navigation to specific note
          }}
        />
      </div>
    </Split>
  );
}