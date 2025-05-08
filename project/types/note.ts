export interface Note {
  id: string;
  title: string;
  content: string;
  chatHistory: Array<{ role: 'user' | 'ai'; content: string }>;
  createdAt: string;
  updatedAt: string;
}