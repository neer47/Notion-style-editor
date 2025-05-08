"use client"; // Marks this as a Client Component (required to use hooks like useState/useNotes)

import React from 'react';
import { Sidebar } from '@/components/sidebar';
import { NoteEditor } from '@/components/note-editor';
import { useNotes } from '@/hooks/useNotes'; // custom hook managing notes state

// Main layout component for the app
export function AppLayout() {
  // Destructure notes state and actions from the useNotes hook
  const { 
    notes, 
    activeNoteId, 
    setActiveNoteId, 
    createNote, 
    updateNoteTitle, 
    updateNoteContent 
  } = useNotes();

  return (
    // Main container with sidebar + editor, filling entire viewport height
    <div className="flex h-screen bg-background">
      {/* Sidebar for listing and managing notes */}
      <Sidebar 
        notes={notes} 
        activeNoteId={activeNoteId} 
        onNoteSelectAction={setActiveNoteId} // called when a note is clicked
        onCreateNoteAction={createNote}     // called when "New Note" is clicked
      />

      {/* Main content area */}
      <main className="flex-1 overflow-hidden">
        {/* If a note is selected and notes exist, show the editor */}
        {activeNoteId && notes.length > 0 ? (
          <NoteEditor 
            key={activeNoteId} // ensures component re-renders when switching notes
            note={notes.find((note) => note.id === activeNoteId)!} // get the active note object
            onUpdateTitleAction={updateNoteTitle}     // updates title on input change
            onUpdateContentAction={updateNoteContent} // autosaves content from TipTap
          />
        ) : (
          // Show empty state UI if no note is selected
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
