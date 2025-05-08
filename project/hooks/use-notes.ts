"use client";

import { useState, useEffect } from 'react';
import { Note } from '@/types/note';
import { v4 as uuidv4 } from '@/lib/utils';

// Local storage key
const STORAGE_KEY = 'notion-clone-notes';

export function useNotes() {
  // State for notes and active note
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  // Load notes from local storage on initial render and create a new note if none exist
  useEffect(() => {
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    if (savedNotes) {
      try {
        const parsedNotes = JSON.parse(savedNotes) as Note[];
        setNotes(parsedNotes);
        // Set the first note as active if there are notes
        if (parsedNotes.length > 0 && !activeNoteId) {
          setActiveNoteId(parsedNotes[0].id);
        }
      } catch (e) {
        console.error('Failed to parse saved notes:', e);
      }
    }
  }, []); // Empty dependency array for initial load only

  // Save notes to local storage whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }
  }, [notes]);

  // Create a new note
  const createNote = () => {
    const newNote: Note = {
      id: uuidv4(),
      title: 'Untitled',
      content: '',
      chatHistory: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setNotes((prev) => [newNote, ...prev]);
    setActiveNoteId(newNote.id);
  };

  // Update note title
  const updateNoteTitle = (id: string, title: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, title, updatedAt: new Date().toISOString() }
          : note
      )
    );
  };

  // Update note content
  const updateNoteContent = (id: string, content: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, content, updatedAt: new Date().toISOString() }
          : note
      )
    );
  };

  // Append a single message to chat history
  const updateNoteChatHistory = (id: string, message: { role: 'user' | 'ai'; content: string }) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              chatHistory: [...(note.chatHistory || []), message],
              updatedAt: new Date().toISOString(),
            }
          : note
      )
    );
  };

  // Delete a note
  const deleteNote = (id: string) => {
    setNotes((prev) => {
      const updatedNotes = prev.filter((note) => note.id !== id);
      // If the deleted note was active, set the first remaining note as active
      if (activeNoteId === id) {
        setActiveNoteId(updatedNotes.length > 0 ? updatedNotes[0].id : null);
      }
      return updatedNotes;
    });
  };

  return {
    notes,
    activeNoteId,
    setActiveNoteId,
    createNote,
    updateNoteTitle,
    updateNoteContent,
    updateNoteChatHistory,
    deleteNote,
  };
}