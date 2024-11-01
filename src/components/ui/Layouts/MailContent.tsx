import React from 'react';
import styled from 'styled-components';
import { EmailComposer } from '@/components/BlockEditor';

const MailContentWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 570px;
`;

interface MailContentProps {
  setJson: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  setHtml: React.Dispatch<React.SetStateAction<string>>;
}

const MailContent: React.FC<MailContentProps> = ({ setJson, setHtml }) => {
  return (
    <MailContentWrapper>
      <EmailComposer setJson={setJson} setHtml={setHtml} />
    </MailContentWrapper>
  );
};

export default MailContent;
