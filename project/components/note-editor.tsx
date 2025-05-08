"use client"; // Required for using React hooks like useState, useEffect in this file

import { useEditor, EditorContent } from "@tiptap/react"; // TipTap hooks and components
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading"; 
import TipTapMenuBar from "./TipTapMenuBar";
import { useEffect, useState } from "react";
import { Brain } from "lucide-react";
import { AIChat } from "./ai-chat";
import { useNotes } from "@/hooks/useNotes";
import { Note } from "@/types/note";

// Props accepted by this component
interface NoteEditorProps {
  note: Note; // current active note
  onUpdateTitleAction: (id: string, title: string) => void; // updates the note title
  onUpdateContentAction: (id: string, content: string) => void; // autosaves note content
}

export function NoteEditor({
  note,
  onUpdateTitleAction,
  onUpdateContentAction,
}: NoteEditorProps) {
  const [isChatOpen, setIsChatOpen] = useState(false); // toggle AI chat panel

  const { updateNoteChatHistory } = useNotes(); // add chat message to note history

  // Handler to add a user or AI message to the note
  const handleAddMessage = (role: "user" | "ai", content: string) => {
    updateNoteChatHistory(note.id, { role, content });
  };

  // Initialize TipTap editor with configured extensions
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // we use our own Heading extension
      }),
      Heading.configure({
        levels: [1, 2, 3], // allow H1, H2, H3
      }),
      Underline, // add underline support
    ],
    content: "", // default content will be set from the note
    editorProps: {
      attributes: {
        class:
          "prose prose-invert prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 text-white focus:outline-none", // tailwind typography + dark mode
      },
    },
    // Save editor content to state/storage on every change
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onUpdateContentAction(note.id, html); // autosave content
    },
  });

  // When switching notes, set the editor content to the new note's content
  useEffect(() => {
    if (editor && note.content && editor.getHTML() !== note.content) {
      editor.commands.setContent(note.content);
    }
  }, [editor, note.content]);

  return (
    <div className="relative flex-1 flex flex-col h-full">
      {/* Note Title Input */}
      <input
        type="text"
        value={note.title || ""}
        onChange={(e) => onUpdateTitleAction(note.id, e.target.value)}
        placeholder="Untitled"
        className="text-2xl font-bold p-5 border-none focus:outline-none bg-transparent"
      />

      {/* Editor + Toolbar UI */}
      <div className="border rounded-lg overflow-hidden flex-1">
        {/* Custom TipTap toolbar */}
        {editor && <TipTapMenuBar editor={editor} />}

        {/* Editor content area */}
        <EditorContent
          editor={editor}
          className="h-[calc(100%-50px)] overflow-y-auto"
        />
      </div>

      {/* Floating AI Chat Trigger Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition"
      >
        <Brain size={24} />
      </button>

      {/* AI Chat Window */}
      <AIChat
        isOpen={isChatOpen}
        chatHistory={note.chatHistory || []}
        onAddMessageAction={handleAddMessage}
        onCloseAction={() => setIsChatOpen(false)}
      />
    </div>
  );
}
