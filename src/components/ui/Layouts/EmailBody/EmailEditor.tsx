import React from 'react';
import styled from 'styled-components';
import ToAddress from '../ToAddress';
import MailContent from '../MailContent';
import MailContentBtn from '../MailContentBtn';

// Styled Components
const EditorComponent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 0px 8px 3px;
  border-radius: 10px;
  margin-top: 20px;
  padding-top: 12px;
  gap: 1rem;
`;

const EmailEditor = () => {
  return (
    <EditorComponent>
      <ToAddress />
      <MailContent />
      <MailContentBtn />
    </EditorComponent>
  );
};

export default EmailEditor;
