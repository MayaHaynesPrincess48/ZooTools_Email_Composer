'use client';

import React from 'react';
import styled from 'styled-components';
import 'iframe-resizer/js/iframeResizer.contentWindow';
import Image from 'next/image';
import EmailHeaderTab from '@/components/ui/Layouts/EmailHeaderTab';
import EmailHeaderDropdown from '@/components/ui/Layouts/EmailHeaderDropdown';
import EmailBody from '@/components/ui/Layouts/EmailBody';
import { zootoolsLogo } from '../assets/index';
import './globals.css';

export const runtime = 'edge';

const FullContainer = styled.div`
  min-height: 100vh;
  display: flex;
`;

const LeftComponent = styled.div`
  background-color: rgb(240, 240, 240);
  padding: 22px;
`;

const NewEmailComponent = styled.div`
  width: 320px;
`;

const NewEmailHeader = styled.div`
  width: 100%;
  height: 72px;
  padding: 17px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1px solid rgb(221, 221, 221);
  border-right: 1px solid rgb(221, 221, 221);
`;

const NewEmailTitle = styled.p`
  font-weight: 700;
  font-size: 16px;
`;

const NewEmailButton = styled.button`
  background-color: #2563eb;
  padding: 8px 14px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  color: white;
  transition: 0.1s ease-in-out;
`;

const NewEmailBody = styled.div`
  border-right: 1px solid rgb(221, 221, 221);
  height: calc(100vh - 72px);
`;

const MainEmail = styled.div`
  flex: 1;
`;

const MainHeader = styled.div`
  height: 71px;
  border-bottom: 1px solid rgb(221, 221, 221);
  padding: 0px 32px;
`;

const MainBody = styled.div`
  padding: 16px 32px;
  height: calc(100vh - 72px);
  box-sizing: border-box;
`;

export default function Home() {
  return (
    <>
      <FullContainer>
        <LeftComponent>
          <Image src={zootoolsLogo} alt="logoImg" width={112} height={26.5} />
        </LeftComponent>
        <NewEmailComponent>
          <NewEmailHeader>
            <NewEmailTitle>Marketing Emails</NewEmailTitle>
            <NewEmailButton>New</NewEmailButton>
          </NewEmailHeader>
          <NewEmailBody></NewEmailBody>
        </NewEmailComponent>
        <MainEmail>
          <MainHeader className="flexBetween">
            <EmailHeaderTab />
            <EmailHeaderDropdown />
          </MainHeader>
          <MainBody>
            <EmailBody />
          </MainBody>
        </MainEmail>
      </FullContainer>
    </>
  );
}
