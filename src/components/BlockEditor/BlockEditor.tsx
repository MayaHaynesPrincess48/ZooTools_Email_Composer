'use client';

import React, { useMemo, useRef } from 'react';
import { EditorContent } from '@tiptap/react'; // Ensure you're importing the right EditorContent
import { LinkMenu } from '@/components/menus';
import { useBlockEditor } from '@/hooks/useBlockEditor';
import '@/styles/index.css';

import { EditorContext } from '@/context/EditorContext';
import ImageBlockMenu from '@/extensions/ImageBlock/components/ImageBlockMenu';
import { ColumnsMenu } from '@/extensions/MultiColumn/menus';
import { TableColumnMenu, TableRowMenu } from '@/extensions/Table/menus';
import { ContentItemMenu } from '../menus/ContentItemMenu';
import { MessageHandler } from './components/MessageHandler';
import { TextMenu } from '../menus/TextMenu';

import styled from 'styled-components';

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

export const EmailComposer = ({ setJson, setHtml }) => {
  const menuContainerRef = useRef(null);
  const editorRef = useRef(null); // Adjust the type if necessary

  const { editor, characterCount } = useBlockEditor();

  const providerValue = useMemo(() => ({}), []);

  if (!editor) {
    return null; // Consider adding a loading state here
  }

  const getJsonContent = () => {
    const jsonContent = editor.getJSON();
    console.log('JSON: ', jsonContent);
    setJson(jsonContent);
  };

  const getHtmlContent = () => {
    const htmlContent = editor.getHTML();
    console.log('HTML: ', htmlContent);
    setHtml(htmlContent);
  };

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
          <button onClick={getJsonContent}>Get JSON</button>
          <button onClick={getHtmlContent}>Get HTML</button>
        </MenuContainer>
      </Container>
      <MessageHandler editor={editor} />
    </EditorContext.Provider>
  );
};
