"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading"; 
import TipTapMenuBar from "./TipTapMenuBar"
import { useEffect, useState } from "react";
import { Brain } from "lucide-react";
import { AIChat } from "./ai-chat";
import { useNotes } from "@/hooks/use-notes";
import { Note } from "@/types/note";


interface NoteEditorProps {
  note: Note;
  onUpdateTitleAction: (id: string, title: string) => void;
  onUpdateContentAction: (id: string, content: string) => void;
}

export function NoteEditor({
  note,
  onUpdateTitleAction,
  onUpdateContentAction, 
}: NoteEditorProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { updateNoteChatHistory } = useNotes();

  const handleAddMessage = (role: "user" | "ai", content: string) => {
    updateNoteChatHistory(note.id, { role, content });
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, 
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Underline,
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-invert prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 text-white focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onUpdateContentAction(note.id, html); // ✅ Autosave content on change
    },
  });

  // Set content when switching notes
  useEffect(() => {
    if (editor && note.content && editor.getHTML() !== note.content) {
      editor.commands.setContent(note.content);
    }
  }, [editor, note.content]);

  return (
    <div className="relative flex-1 flex flex-col h-full">
      {/* Title Input */}
      <input
        type="text"
        value={note.title || ""}
        onChange={(e) => onUpdateTitleAction(note.id, e.target.value)}
        placeholder="Untitled"
        className="text-2xl font-bold p-5 border-none focus:outline-none bg-transparent"
      />

      {/* Editor and Toolbar */}
      <div className="border rounded-lg overflow-hidden flex-1">
        {editor && <TipTapMenuBar editor={editor} />}
        <EditorContent
          editor={editor}
          className="h-[calc(100%-50px)] overflow-y-auto"
        />
      </div>

      {/* AI Chat Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition"
      >
        <Brain size={24} />
      </button>

      {/* AI Chat Interface */}
      <AIChat
        isOpen={isChatOpen}
        chatHistory={note.chatHistory || []}
        onAddMessageAction={handleAddMessage}
        onCloseAction={() => setIsChatOpen(false)}
      />
    </div>
  );
}
