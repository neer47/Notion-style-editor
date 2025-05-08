// ai-chat.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal, X } from 'lucide-react';
import { getAIResponse } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface AIChatProps {
  isOpen: boolean;
  chatHistory: Array<{ role: 'user' | 'ai'; content: string }>;
  onAddMessageAction: (role: 'user' | 'ai', content: string) => void;
  onCloseAction: () => void;
}

export function AIChat({ isOpen, chatHistory, onAddMessageAction, onCloseAction }: AIChatProps) {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [localMessages, setLocalMessages] = useState<Array<{ role: 'user' | 'ai'; content: string }>>(chatHistory);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync local messages with chatHistory prop
  useEffect(() => {
    setLocalMessages(chatHistory);
  }, [chatHistory]);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [localMessages]);

  // Handle sending message
  const handleSendMessage = async () => {
    if (!prompt.trim() || isLoading) return;
    
    // Add user message optimistically
    const userMessage = { role: 'user' as const, content: prompt };
    setLocalMessages((prev) => [...prev, userMessage]);
    onAddMessageAction('user', prompt);
    
    // Clear input
    setPrompt('');
    
    // Show loading state
    setIsLoading(true);
    
    try {
      // Get AI response (mock API)
      const response = await getAIResponse(prompt);
      
      // Add AI response optimistically
      const aiMessage = { role: 'ai' as const, content: response };
      setLocalMessages((prev) => [...prev, aiMessage]);
      onAddMessageAction('ai', response);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = { role: 'ai' as const, content: 'Sorry, I encountered an error. Please try again.' };
      setLocalMessages((prev) => [...prev, errorMessage]);
      onAddMessageAction('ai', 'Sorry, I encountered an error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div 
      className={cn(
        "absolute bottom-0 right-6 w-[380px] max-w-[calc(100vw-80px)] bg-card border rounded-t-lg shadow-lg transition-all duration-300 flex flex-col overflow-hidden",
        isOpen ? "h-[400px] opacity-100" : "h-0 opacity-0 pointer-events-none"
      )}
    >
      {/* Chat header */}
      <div className="flex items-center justify-between p-3 border-b">
        <div className="font-medium">AI Assistant</div>
        <button 
          onClick={onCloseAction}
          className="p-1 rounded-md hover:bg-accent"
        >
          <X size={18} />
        </button>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {localMessages.length === 0 ? (
          <div className="text-center text-muted-foreground py-4">
            <p>Ask me anything about your notes!</p>
          </div>
        ) : (
          localMessages.map((message, index) => (
            <div 
              key={index} 
              className={cn(
                "max-w-[80%] p-3 rounded-lg break-words",
                message.role === 'user' 
                  ? "ml-auto bg-primary text-primary-foreground rounded-tr-none" 
                  : "bg-accent text-accent-foreground rounded-tl-none"
              )}
            >
              {message.content}
            </div>
          ))
        )}
        {isLoading && (
          <div className="bg-accent text-accent-foreground p-3 rounded-lg rounded-tl-none max-w-[80%] animate-pulse">
            Thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat input */}
      <div className="p-3 border-t">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask a question..."
            className="flex-1 p-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!prompt.trim() || isLoading}
            className="p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <SendHorizontal size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}