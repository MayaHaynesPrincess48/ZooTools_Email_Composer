// ForwardedEditorContent.tsx
import React from 'react';
import { EditorContent, EditorContentProps } from '@tiptap/react';

// Extend the EditorContent component to support ref forwarding
const ForwardedEditorContent = React.forwardRef<HTMLDivElement, EditorContentProps>((props, ref) => {
  return <EditorContent {...props} ref={ref} />;
});

ForwardedEditorContent.displayName = 'ForwardedEditorContent';

export default ForwardedEditorContent;
