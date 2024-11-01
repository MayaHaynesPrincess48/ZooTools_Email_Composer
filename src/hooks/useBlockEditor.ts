import { Editor, useEditor } from '@tiptap/react';
import { ExtensionKit } from '@/extensions/extension-kit';
import { useEffect, useState } from 'react';
import { initialContent } from '../lib/data/initialContent';

declare global {
  interface Window {
    editor: Editor | null;
  }
}

export const useBlockEditor = () => {
  // const [initialContent, setInitialContent] = useState<string | null>(null);
  const editor = useEditor(
    {
      autofocus: true,
      onCreate: ({ editor }) => {
        if (editor.isEmpty) {
          editor.commands.setContent(initialContent);
          // editor.commands.setContent(`<react-component>
          //   <p>This is editable. You can create a new component by pressing Mod+Enter.</p>
          // </react-component>`);
        }
      },
      extensions: [...ExtensionKit()],
      editorProps: {
        attributes: {
          autocomplete: 'off',
          autocorrect: 'off',
          autocapitalize: 'off',
          class: 'min-h-full',
        },
      },
      immediatelyRender: false, // Prevents hydration mismatch
    },
    [],
  );

  const characterCount = editor?.storage.characterCount || { characters: () => 0, words: () => 0 };

  useEffect(() => {
    window.editor = editor;
  }, [editor]);

  return { editor, characterCount };
};
