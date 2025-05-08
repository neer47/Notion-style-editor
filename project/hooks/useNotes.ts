"use client"; // Required because Zustand runs in the browser and uses localStorage

import { create } from "zustand";
import { persist } from "zustand/middleware"; // Enables saving state in localStorage
import { Note } from "@/types/note";
import { v4 as uuidv4 } from "@/lib/utils";

// Structure for a single chat message
interface ChatMessage {
  role: "user" | "ai";
  content: string;
}

// Zustand state and actions for notes
interface NotesState {
  notes: Note[]; // all notes
  activeNoteId: string | null; // currently selected note ID

  // Actions (functions that mutate state)
  setActiveNoteId: (id: string | null) => void;
  createNote: () => void;
  updateNoteTitle: (id: string, title: string) => void;
  updateNoteContent: (id: string, content: string) => void;
  updateNoteChatHistory: (id: string, message: ChatMessage) => void;
  deleteNote: (id: string) => void;
}

// Zustand store definition
export const useNotes = create<NotesState>()(
  persist( // Automatically saves state to localStorage
    (set, get) => ({
      notes: [], // Initial empty notes array
      activeNoteId: null, // No note selected initially

      // Set the currently active note
      setActiveNoteId: (id) => set({ activeNoteId: id }),

      // Create a new note and set it as active
      createNote: () => {
        const newNote: Note = {
          id: uuidv4(),
          title: "Untitled",
          content: "",
          chatHistory: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const updatedNotes = [newNote, ...get().notes];
        set({ notes: updatedNotes, activeNoteId: newNote.id });
      },

      // Update the title of a note by ID
      updateNoteTitle: (id, title) => {
        set({
          notes: get().notes.map((note) =>
            note.id === id
              ? { ...note, title, updatedAt: new Date().toISOString() }
              : note
          ),
        });
      },

      // Update the content (HTML from TipTap) of a note
      updateNoteContent: (id, content) => {
        set({
          notes: get().notes.map((note) =>
            note.id === id
              ? { ...note, content, updatedAt: new Date().toISOString() }
              : note
          ),
        });
      },

      // Add a new chat message to the note’s chat history
      updateNoteChatHistory: (id, message) => {
        set({
          notes: get().notes.map((note) =>
            note.id === id
              ? {
                  ...note,
                  chatHistory: [...(note.chatHistory || []), message],
                  updatedAt: new Date().toISOString(),
                }
              : note
          ),
        });
      },

      // Delete a note and update active note accordingly
      deleteNote: (id) => {
        const filtered = get().notes.filter((note) => note.id !== id);
        const newActiveId =
          get().activeNoteId === id && filtered.length > 0
            ? filtered[0].id
            : get().activeNoteId === id
            ? null
            : get().activeNoteId;

        set({ notes: filtered, activeNoteId: newActiveId });
      },
    }),
    {
      name: "notion-clone-notes", // Key used in localStorage for persistence
    }
  )
);
