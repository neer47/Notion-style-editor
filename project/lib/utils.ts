import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines Tailwind class names intelligently.
 * - `clsx` handles conditional className logic.
 * - `twMerge` resolves conflicting Tailwind classes.
 *
 * Example:
 * cn("p-2", condition && "bg-blue-500") → "p-2 bg-blue-500"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a pseudo-random UUID (version 4).
 * Used to uniquely identify new notes or entities.
 *
 * Note: For larger apps, prefer using the official `uuid` package.
 */
export function v4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Simulates an AI assistant response to a user prompt.
 * Used for the dummy AI chat in notes. Matches keywords to mock intent.
 *
 * @param prompt The user's message
 * @returns A mock AI response
 */
export const getAIResponse = async (prompt: string): Promise<string> => {
  // Simulate network latency for realism
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const lower = prompt.toLowerCase();

  if (lower.includes('hello') || lower.includes('hi')) {
    return "Hello! I'm your AI assistant. How can I help you with your notes today?";
  } else if (lower.includes('help')) {
    return "I can help you organize your thoughts, draft content, summarize information, or answer questions about your notes. Just let me know what you need!";
  } else if (lower.includes('thank')) {
    return "You're welcome! Feel free to ask if you need anything else.";
  } else {
    return "I'm your AI copilot ready to help with your notes. I can help brainstorm ideas, refine your writing, or answer questions about your content. What would you like assistance with?";
  }
};
