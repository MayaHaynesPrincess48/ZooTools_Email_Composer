import React from 'react';
import styled from 'styled-components';
import { EmailComposer } from '@/components/BlockEditor';

const MailContentWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 570px;
`;

const MailContent = () => {
  return (
    <MailContentWrapper>
      <EmailComposer />
    </MailContentWrapper>
  );
};

export default MailContent;
