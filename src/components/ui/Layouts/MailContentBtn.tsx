import React from 'react';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';

const ContentBtnComponent = styled.div`
  width: 100%;
  background: #f5f5f5;
  margin-top: 30px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 10px 20px;
  box-sizing: border-box;
`;

const TabsRoot = styled(Tabs.Root)`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const TabsList = styled(Tabs.List)`
  flex-shrink: 0;
  background: #f4f4f5;
  display: flex;
  padding: 4px;
  box-sizing: border-box;
  border-radius: 5px;
  gap: 15px;
`;

const TabsTrigger = styled(Tabs.Trigger)`
  background-color: #ffffff;
  color: black;
  padding: 8px 16px;
  font-size: 14px;
  font-family: Inter;
  font-weight: 500;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
  &[data-state='active'] {
    background: black;
    color: white !important;
    color: black;
  }
`;

const MailContentBtn = () => {
  return (
    <ContentBtnComponent className="flexEnd">
      <TabsRoot defaultValue="tab1">
        <TabsList aria-label="Manage your account">
          <TabsTrigger value="tab1" className="alignItem" style={{ gap: '5px' }}>
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            Review & send
          </TabsTrigger>
          <TabsTrigger value="tab2" className="alignItem" style={{ gap: '5px' }}>
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            Schedule
          </TabsTrigger>
          <TabsTrigger value="tab3" className="alignItem" style={{ gap: '5px' }}>
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            Test
          </TabsTrigger>
        </TabsList>
      </TabsRoot>
    </ContentBtnComponent>
  );
};

export default MailContentBtn;
