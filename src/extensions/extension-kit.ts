'use client';

import { API } from '@/lib/api';
import {
  BlockquoteFigure,
  CharacterCount,
  Color,
  Document,
  Dropcursor,
  Emoji,
  Figcaption,
  FileHandler,
  Focus,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalRule,
  Link,
  Placeholder,
  Selection,
  SlashCommand,
  StarterKit,
  Subscript,
  Superscript,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TextAlign,
  TextStyle,
  TrailingNode,
  Typography,
  Underline,
  emojiSuggestion,
  Columns,
  Column,
  QuestionBlock,
  VideoLessonBlock,
  Mathematics,
  TaskItem,
  ExtendedImage,
  // ResizeImage,
} from '.';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { History } from '@tiptap/extension-history';
// import { ImageUpload } from './ImageUpload';
import { lowlight } from 'lowlight';

// Import highlight.js languages
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import python from 'highlight.js/lib/languages/python';
import ruby from 'highlight.js/lib/languages/ruby';
import java from 'highlight.js/lib/languages/java';
import { ImageBlock } from './ImageBlock';

// Register languages with lowlight
lowlight.registerLanguage('html', html);
lowlight.registerLanguage('css', css);
lowlight.registerLanguage('javascript', js);
lowlight.registerLanguage('typescript', ts);
lowlight.registerLanguage('python', python);
lowlight.registerLanguage('ruby', ruby);
lowlight.registerLanguage('java', java);

export const ExtensionKit = () => [
  TaskItem,
  Document,
  Columns,
  QuestionBlock,
  VideoLessonBlock,
  Column,
  Selection,
  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6],
  }),
  HorizontalRule,
  StarterKit.configure({
    document: false,
    dropcursor: false,
    heading: false,
    horizontalRule: false,
    blockquote: false,
    history: false, // Disable history in StarterKit
    codeBlock: false,
  }),
  History.configure({
    depth: 100,
    newGroupDelay: 500,
  }),
  CodeBlockLowlight.configure({
    lowlight,
    defaultLanguage: 'javascript', // Set default language
  }),
  TextStyle,
  FontSize,
  FontFamily,
  Color,
  TrailingNode,
  Link.configure({
    openOnClick: false,
  }),
  Highlight.configure({ multicolor: true }),
  Underline,
  CharacterCount.configure({ limit: 50000 }),
  // ImageUpload.configure(),
  ImageBlock,
  ExtendedImage,
  // ResizeImage,
  FileHandler.configure({
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
    onDrop: async (currentEditor, files, pos) => {
      for (const file of files) {
        try {
          const url = await API.uploadImage(file);
          currentEditor.chain().setImageBlockAt({ pos, src: url }).focus().run();
        } catch (error) {
          console.error('Image upload failed:', error);
        }
      }
    },
    onPaste: async (currentEditor, files) => {
      for (const file of files) {
        try {
          const url = await API.uploadImage(file);
          currentEditor.chain().setImageBlockAt({ pos: currentEditor.state.selection.anchor, src: url }).focus().run();
        } catch (error) {
          console.error('Image upload failed:', error);
        }
      }
    },
  }),
  Emoji.configure({
    enableEmoticons: true,
    suggestion: emojiSuggestion,
  }),
  TextAlign.extend({
    addKeyboardShortcuts() {
      return {};
    },
  }).configure({
    types: ['heading', 'paragraph'],
  }),
  Subscript,
  Superscript,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Typography,
  Placeholder.configure({
    includeChildren: true,
    showOnlyCurrent: false,
    placeholder: () => '',
  }),
  SlashCommand,
  Focus,
  Figcaption,
  BlockquoteFigure,
  Dropcursor.configure({
    width: 2,
    class: 'ProseMirror-dropcursor border-black',
  }),
  Mathematics,
];

export default ExtensionKit;
