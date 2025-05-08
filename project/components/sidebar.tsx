"use client"; // Mark this as a Client Component for useState, etc.

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, File, FileText } from 'lucide-react';
import { Note } from '@/types/note';
import { cn } from '@/lib/utils'; // Utility to conditionally combine class names

// Props expected by Sidebar component
interface SidebarProps {
  notes: Note[];
  activeNoteId: string | null;
  onNoteSelectAction: (id: string) => void;
  onCreateNoteAction: () => void;
}

// Sidebar for displaying and managing notes
export function Sidebar({ 
  notes, 
  activeNoteId, 
  onNoteSelectAction,
  onCreateNoteAction 
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false); // toggles collapse/expand

  return (
    <div 
      className={cn(
        "border-r h-full bg-card flex flex-col transition-all duration-300", 
        collapsed ? "w-[60px]" : "w-[260px]" // adjust width when collapsed
      )}
    >
      {/* Header with title and collapse button */}
      <div className="flex items-center justify-between p-4 border-b">
        {/* Only show title when not collapsed */}
        {!collapsed && (
          <h1 className="font-semibold text-lg">Notes</h1>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-accent"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      {/* Notes List */}
      <div className="flex-1 overflow-y-auto">
        {/* No notes available */}
        {notes.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            {!collapsed && "No notes yet. Create your first note!"}
          </div>
        ) : (
          <ul className="space-y-1 p-2">
            {notes.map((note) => (
              <li key={note.id}>
                <button
                  onClick={() =>  onNoteSelectAction(note.id)} // Selects note
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md flex items-center gap-2 hover:bg-accent/50 transition-colors",
                    activeNoteId === note.id && "bg-accent" // highlight active note
                  )}
                >
                  {/* Show file icon based on whether note has content */}
                  {note.content ? <FileText size={18} /> : <File size={18} />}
                  
                  {/* Show title if not collapsed */}
                  {!collapsed && (
                    <span className="truncate">{note.title || "Untitled"}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Create New Note Button (Bottom) */}
      <div className="border-t p-3">
        <button
          onClick={onCreateNoteAction}
          className={cn(
            "flex items-center justify-center gap-2 w-full rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors py-2",
            collapsed ? "px-2" : "px-4"
          )}
        >
          <Plus size={18} />
          {!collapsed && <span>New Note</span>}
        </button>
      </div>
    </div>
  );
}
