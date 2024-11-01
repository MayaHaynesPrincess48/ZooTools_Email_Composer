'use client';

import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { EditorContent } from '@tiptap/react'; // Ensure you're importing the right EditorContent
import { LinkMenu } from '@/components/menus';
import { useBlockEditor } from '@/hooks/useBlockEditor';
import '@/styles/index.css';

import { EditorContext } from '@/context/EditorContext';
import { ColumnsMenu } from '@/extensions/MultiColumn/menus';
import { TableColumnMenu, TableRowMenu } from '@/extensions/Table/menus';
import { ContentItemMenu } from '../menus/ContentItemMenu';
import { MessageHandler } from './components/MessageHandler';
import { TextMenu } from '../menus/TextMenu';

import styled from 'styled-components';
import ImageBlockMenu from '@/extensions/ImageBlock/components/ImageBlockMenu';

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MenuContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  overflow: hidden;
`;

const StyledEditorContent = styled(EditorContent)`
  flex: 1;
  overflow-y: auto;
`;

export const EmailComposer = () => {
  const menuContainerRef = useRef(null);
  const editorRef = useRef(null);

  const { editor, characterCount } = useBlockEditor();

  const providerValue = useMemo(() => ({}), []);

  const editorContextHook = useContext(EditorContext);
  const { setJson, setHtml, setEditorContext } = editorContextHook;

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      const json = editor.getJSON();
      const html = editor.getHTML();
      setJson(json);
      setHtml(html);
    };

    editor.on('update', handleUpdate);

    return () => {
      editor.off('update', handleUpdate);
    };
  }, [editor, setJson, setHtml]);

  if (!editor) {
    return null;
  }

  return (
    <EditorContext.Provider value={providerValue}>
      <Container ref={menuContainerRef}>
        <MenuContainer>
          <StyledEditorContent editor={editor} ref={editorRef} />
          <ContentItemMenu editor={editor} />
          <LinkMenu editor={editor} appendTo={menuContainerRef} />
          <TextMenu editor={editor} />
          <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
          <TableRowMenu editor={editor} appendTo={menuContainerRef} />
          <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
          <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
        </MenuContainer>
      </Container>
      <MessageHandler editor={editor} />
    </EditorContext.Provider>
  );
};
