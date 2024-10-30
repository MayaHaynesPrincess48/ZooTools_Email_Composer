import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import styled from "styled-components";
import "./styles.css"

const TabsRoot = styled(Tabs.Root)`
    display: flex;
    flex-direction: column;
`

const TabsList = styled(Tabs.List)`
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 20px;
`

const TabsTrigger = styled(Tabs.Trigger)`
    padding: 22px 0;
    font-size: 18px;
    font-weight: 700;
    color: rgb(136, 136, 136);

    &:hover {
        cursor: pointer;
    }

    &[data-state="active"] {
        color: black;
        box-shadow: inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor;
    }

    &:focus {
        position: relative;
    }
`

const Arrow = styled.span`
    color:  rgb(136, 136, 136);
`

const EmailHeaderTab = () => {
  return (
    <>
      <TabsRoot defaultValue="tab1">
        <TabsList aria-label="Manage your account">
          <TabsTrigger value="tab1">
            1. Write
          </TabsTrigger>
          <Arrow>&gt;</Arrow>
          <TabsTrigger value="tab2">
            2. Send
          </TabsTrigger>
          <Arrow>&gt;</Arrow>
          <TabsTrigger value="tab3">
            3. Analyze
          </TabsTrigger>
        </TabsList>
      </TabsRoot>
    </>
  );
};

export default EmailHeaderTab;
