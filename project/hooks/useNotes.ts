"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Note } from "@/types/note";
import { v4 as uuidv4 } from "@/lib/utils";

interface ChatMessage {
  role: "user" | "ai";
  content: string;
}

interface NotesState {
  notes: Note[];
  activeNoteId: string | null;
  setActiveNoteId: (id: string | null) => void;
  createNote: () => void;
  updateNoteTitle: (id: string, title: string) => void;
  updateNoteContent: (id: string, content: string) => void;
  updateNoteChatHistory: (id: string, message: ChatMessage) => void;
  deleteNote: (id: string) => void;
}

export const useNotes = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [],
      activeNoteId: null,

      setActiveNoteId: (id) => set({ activeNoteId: id }),

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

      updateNoteTitle: (id, title) => {
        set({
          notes: get().notes.map((note) =>
            note.id === id
              ? { ...note, title, updatedAt: new Date().toISOString() }
              : note
          ),
        });
      },

      updateNoteContent: (id, content) => {
        set({
          notes: get().notes.map((note) =>
            note.id === id
              ? { ...note, content, updatedAt: new Date().toISOString() }
              : note
          ),
        });
      },

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
      name: "notion-clone-notes", // Key in localStorage
    }
  )
);
