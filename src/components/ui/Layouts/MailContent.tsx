import { EmailComposer } from '@/components/BlockEditor';
import React from 'react';
import styled from 'styled-components';

const MailContentWrapper = styled.div`
  width: 100%;
  padding: 0 48px;
  box-sizing: border-box;
  height: 570px;
  overflow-y: auto;
  margin-top: 50px;
`;

const MailContent = () => {
  return (
    <MailContentWrapper>
      <EmailComposer />
    </MailContentWrapper>
  );
};

export default MailContent;
