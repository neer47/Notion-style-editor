import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Simple UUID v4 generator
export function v4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Mock API response function
export const getAIResponse = async (prompt: string): Promise<string> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock responses based on keywords in the prompt
  if (prompt.toLowerCase().includes('hello') || prompt.toLowerCase().includes('hi')) {
    return "Hello! I'm your AI assistant. How can I help you with your notes today?";
  } else if (prompt.toLowerCase().includes('help')) {
    return "I can help you organize your thoughts, draft content, summarize information, or answer questions about your notes. Just let me know what you need!";
  } else if (prompt.toLowerCase().includes('thank')) {
    return "You're welcome! Feel free to ask if you need anything else.";
  } else {
    return "I'm your AI copilot ready to help with your notes. I can help brainstorm ideas, refine your writing, or answer questions about your content. What would you like assistance with?";
  }
};