# Notion-Style Editor with AI Chat 📝

A modern note-taking application inspired by Notion, featuring a rich text editor and an embedded AI chat for each note. Built with **Next.js**, **TipTap**, **Zustand**, and **Tailwind CSS**, this project offers a seamless user experience with autosave, responsive design, and mock AI responses.

🚀 **Features**

* **Sidebar Navigation**: Create, switch, and delete notes with a collapsible sidebar.
* **Rich Text Editor**: Powered by TipTap, supporting:

  * Text formatting (bold, italic, strikethrough, code).
  * Headings (H1–H6).
  * Bullet and ordered lists.
  * Code blocks and blockquotes.
  * Undo/redo functionality.
* **AI Chat**: Each note has its own chat history with a floating AI assistant:

  * Send prompts and receive mock responses.
  * Messages update in real-time with optimistic UI updates.
* **Autosave**: Note content and chat history are automatically saved to `localStorage`:

  * Saves while typing and when switching notes.
* **Responsive Design**: Clean UI with Tailwind CSS, including light/dark mode support.
* **State Management**: Uses Zustand for efficient global state handling.

📽 **Demo Walkthrough**
Check out this 3-minute video walkthrough showcasing the UI, key features, and code highlights.
[Watch the Demo on Loom](#)

🛠️ **Technologies Used**

* **Framework**: Next.js 14.0.3
* **Editor**: TipTap (`@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-underline`)
* **State Management**: Zustand 5.0.4
* **Styling**: Tailwind CSS 3.3.0 with plugins (`@tailwindcss/typography`, `tailwindcss-animate`)
* **UI Components**: Lucide React 0.294.0 (icons), Radix UI (toasts)
* **Utilities**: Class Variance Authority, Tailwind Merge, Clsx
* **Theming**: Next Themes 0.2.1 (light/dark mode)
* **TypeScript**: For type safety
* **Linting**: ESLint with `eslint-config-next`

📦 **Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/notion-style-editor.git
   cd notion-style-editor
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

🖥️ **Usage**

* **Create a Note**:

  * Click the "New Note" button in the sidebar to create a new note.
  * The app automatically creates a note on first load if none exist.

* **Edit Notes**:

  * Enter a title in the input field at the top.
  * Use the TipTap editor to add rich text content.
  * Format text using the toolbar (bold, headings, lists, etc.).

* **AI Chat**:

  * Click the AI button (bottom-right) to open the chat for the current note.
  * Send a message (e.g., "Summarize my notes") and receive a mock response.
  * Chat history is saved per note and persists across refreshes.

* **Switch Notes**:

  * Use the sidebar to switch between notes. Changes are autosaved when typing and switching.

* **Light/Dark Mode**:

  * Toggle between light and dark modes (if implemented in your UI).

🗂️ **Project Structure**

```
components/:
  AppLayout.tsx        # Main layout with sidebar and editor
  NoteEditor.tsx       # TipTap editor with autosave and AI chat integration
  TipTapMenuBar.tsx    # Toolbar for text formatting
  AIChat.tsx           # Floating chat UI with real-time message updates
  Sidebar.tsx          # Collapsible sidebar for note management

hooks/:
  useNotes.ts          # Zustand store for managing notes, chat history, and autosave

lib/:
  utils.ts             # Utility functions (UUID generation, mock AI responses, Tailwind class helpers)

pages/:
  layout.tsx           # Root layout with theme and global styles
```

🤝 **Contributing**

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature
   ```
3. Make your changes and commit:

   ```bash
   git commit -m "Add your feature"
   ```
4. Push to your branch:

   ```bash
   git push origin feature/your-feature
   ```
5. Open a Pull Request.

📜 **License**
This project is licensed under the MIT License.

🙌 **Acknowledgments**

* **TipTap** for the amazing rich text editor.
* **Zustand** for lightweight state management.
* **Tailwind CSS** for utility-first styling.
* **Lucide React** for beautiful icons.

