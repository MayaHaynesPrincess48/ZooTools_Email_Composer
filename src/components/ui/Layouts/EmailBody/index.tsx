import React, { useState } from 'react';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';
import EmailEditor from './EmailEditor';
import { EditorContext } from '../../../../context/EditorContext';

const TabsRoot = styled(Tabs.Root)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TabsList = styled(Tabs.List)`
  flex-shrink: 0;
  background: #f4f4f5;
  display: flex;
  width: 380px;
  height: 36px;
  padding: 4px;
  box-sizing: border-box;
  border-radius: 5px;
`;

const TabsTrigger = styled(Tabs.Trigger)`
  color: #71717a;
  padding: 4px 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  font-family: Inter;
  &[data-state='active'] {
    background: white;
    border-radius: 5px;
    color: black;
  }
`;

const NewMessageTitle = styled.p`
  color: #71717a;
  margin: 0px;
  font-size: 14px;
  font-family: Inter;
  font-weight: 500;
`;
// const TabsContent = styled(Tabs.Content)`
//     width: 100%;
//     box-shadow: rgba(0, 0, 0, 0.12) 0px 0px 8px 3px;
//     border-radius: 10px;
//     margin-top: 20px;
//     padding: 12px 48px;
//     box-sizing: border-box;
// `

const TabsContent = styled(Tabs.Content)``;

const EmailBody = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [editorContext, setEditorContext] = useState(null);
  const [json, setJson] = useState<Record<string, unknown>>({});
  const [html, setHtml] = useState<string>('');

  return (
    <EditorContext.Provider value={{ editorContext, setEditorContext, json, setJson, html, setHtml }}>
      <TabsRoot defaultValue="tab1" onValueChange={value => setActiveTab(value)}>
        <div className="flexBetween">
          {activeTab === 'tab1' ? <NewMessageTitle>New Message</NewMessageTitle> : <p></p>}
          <TabsList className="TabsList" aria-label="Manage your account">
            <TabsTrigger value="tab1">Editor</TabsTrigger>
            <TabsTrigger value="tab2">Email Preview</TabsTrigger>
            <TabsTrigger value="tab3">Raw HTML</TabsTrigger>
            <TabsTrigger value="tab4">Raw JSON</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="tab1">
          <EmailEditor />
        </TabsContent>
        <TabsContent value="tab2">Email Preview</TabsContent>
        <TabsContent value="tab3">
          Show HTML: <br />
          {html}
        </TabsContent>
        <TabsContent value="tab4">
          Show JSON: <br />
          {JSON.stringify(json, null, 2)}
        </TabsContent>
      </TabsRoot>
    </EditorContext.Provider>
  );
};

export default EmailBody;
