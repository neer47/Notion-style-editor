"use client";

import React from 'react';
import { Sidebar } from '@/components/sidebar';
import { NoteEditor } from '@/components/note-editor';
import { useNotes } from '@/hooks/useNotes';

export function AppLayout() {
  const { 
    notes, 
    activeNoteId, 
    setActiveNoteId, 
    createNote, 
    updateNoteTitle, 
    updateNoteContent 
  } = useNotes();

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        notes={notes} 
        activeNoteId={activeNoteId} 
        onNoteSelectAction={setActiveNoteId}
        onCreateNoteAction={createNote}
      />
      <main className="flex-1 overflow-hidden">
        {activeNoteId && notes.length > 0 ? (
          <NoteEditor 
            key={activeNoteId}
            note={notes.find((note) => note.id === activeNoteId)!}
            onUpdateTitleAction={updateNoteTitle}
            onUpdateContentAction={updateNoteContent}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">No note selected</h2>
              <p className="mb-4">Select a note from the sidebar or create a new one to get started.</p>
              <button 
                onClick={createNote}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Create a new note
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}