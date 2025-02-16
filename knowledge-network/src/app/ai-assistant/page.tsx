'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { ChatHistory } from '@/components/ai/ChatHistory';
import { ChatInput } from '@/components/ai/ChatInput';
import { ChatWindow } from '@/components/ai/ChatWindow';
import { NotesContext } from '@/components/ai/NotesContext';

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
    <div className="flex h-screen">
      {/* Left sidebar with chat history */}
      <div className="w-64 border-r">
        <ChatHistory messages={messages} />
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
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

      {/* Right sidebar showing relevant notes context */}
      <div className="w-96 border-l">
        <NotesContext 
          activeNotes={activeNotes}
          onNoteClick={(noteId) => {
            // Handle navigation to specific note
          }}
        />
      </div>
    </div>
  );
}