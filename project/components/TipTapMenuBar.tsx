import { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  CodepenIcon,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";
import { cn } from "@/lib/utils"; // Utility to conditionally join Tailwind class names

// Toolbar for the TipTap rich text editor
const TipTapMenuBar = ({ editor }: { editor: Editor }) => {
  // Define toolbar buttons with their actions, icons, and active state
  const menuItems = [
    // --- Text styles ---
    {
      icon: <Bold size={16} />,
      title: 'Bold',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
      disabled: !editor.can().chain().focus().toggleBold().run(),
    },
    {
      icon: <Italic size={16} />,
      title: 'Italic',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
      disabled: !editor.can().chain().focus().toggleItalic().run(),
    },
    {
      icon: <Strikethrough size={16} />,
      title: 'Strikethrough',
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike'),
      disabled: !editor.can().chain().focus().toggleStrike().run(),
    },
    {
      icon: <Code size={16} />,
      title: 'Code',
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: () => editor.isActive('code'),
      disabled: !editor.can().chain().focus().toggleCode().run(),
    },

    { type: 'divider' }, // UI separator

    // --- Headings ---
    {
      icon: <Heading1 size={16} />,
      title: 'Heading 1',
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive('heading', { level: 1 }),
    },
    {
      icon: <Heading2 size={16} />,
      title: 'Heading 2',
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }),
    },
    {
      icon: <Heading3 size={16} />,
      title: 'Heading 3',
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive('heading', { level: 3 }),
    },

    { type: 'divider' },

    // --- Lists ---
    {
      icon: <List size={16} />,
      title: 'Bullet List',
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
    },
    {
      icon: <ListOrdered size={16} />,
      title: 'Ordered List',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
    },

    { type: 'divider' },

    // --- Block-level elements ---
    {
      icon: <CodepenIcon size={16} />,
      title: 'Code Block',
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive('codeBlock'),
    },
    {
      icon: <Quote size={16} />,
      title: 'Blockquote',
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive('blockquote'),
    },

    { type: 'divider' },

    // --- Undo/Redo ---
    {
      icon: <Undo size={16} />,
      title: 'Undo',
      action: () => editor.chain().focus().undo().run(),
      disabled: !editor.can().chain().focus().undo().run(),
    },
    {
      icon: <Redo size={16} />,
      title: 'Redo',
      action: () => editor.chain().focus().redo().run(),
      disabled: !editor.can().chain().focus().redo().run(),
    },
  ];

  return (
    <div className="border-b p-2 flex items-center space-x-1 overflow-x-auto bg-card">
      {/* Render buttons or dividers */}
      {menuItems.map((item, index) =>
        item.type === 'divider' ? (
          <div key={index} className="w-[1px] h-6 bg-border mx-1" />
        ) : (
          <button
            key={index}
            onClick={item.action}
            disabled={'disabled' in item ? item.disabled : false}
            className={cn(
              "p-2 rounded hover:bg-accent transition-colors",
              // Highlight if the item is active
              'isActive' in item && item.isActive?.() && "bg-accent",
              // Style disabled buttons
              'disabled' in item && item.disabled && "opacity-50 cursor-not-allowed"
            )}
            title={item.title}
            type="button"
          >
            {item.icon}
          </button>
        )
      )}
    </div>
  );
};

export default TipTapMenuBar;
