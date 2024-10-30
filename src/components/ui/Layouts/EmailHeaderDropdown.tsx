import React from "react";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
    DotFilledIcon,
    CheckIcon,
    ChevronRightIcon,
} from "@radix-ui/react-icons";
import styled from "styled-components";

// Styled Components
const DropdownTrigger = styled(DropdownMenu.Trigger)`
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: transparent;
    border: 1px solid rgb(221, 221, 221);
    cursor: pointer;
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

const DropdownContent = styled(DropdownMenu.Content)`
    position: absolute;
    top: 5px;
    right: -45px;
    width: 224px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 5px;
`;

const DropdownItem = styled(DropdownMenu.Item)`
    padding: 8px 12px;
    cursor: pointer;
    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
        border:none;
    }
`;

const DropdownTitle = styled.div`
    padding: 6px 8px;
    font-size: 14px;
    color: #09090B;
    font-weight: 600;
`
const DropdownHr = styled.hr`
    border: 1px solid rgb(221, 221, 221);
    margin: 4px 0;
`

const EmailHeaderDropdown = () => {
    return (
        <DropdownMenu.Root>
            <DropdownTrigger className="flexCenter">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
            </DropdownTrigger>
            <DropdownMenu.Portal>
                <DropdownContent>
                    <DropdownTitle>
                        Email actions
                    </DropdownTitle>
                    <DropdownHr />
                    <DropdownItem className="alignItem">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
                        <span style={{ marginLeft: 8, fontSize: '14px' }}>Duplicate</span>
                        <span style={{width: "23px", height: "16px", fontSize: '12px', color: '#09090b', marginLeft: '84px'}}>⌘D</span>
                    </DropdownItem>
                    <DropdownItem className="alignItem">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path><path d="m21.854 2.147-10.94 10.939"></path></svg>
                        <span style={{ marginLeft: 8 }}>Send a Test</span>
                        <span style={{width: "23px", height: "16px", fontSize: '12px', color: '#09090b', marginLeft: '58px'}}>⌘T</span>
                    </DropdownItem>
                    <DropdownItem className="alignItem">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
                        <span style={{ marginLeft: 8 }}>Delete</span>
                        <span style={{width: "23px", height: "16px", fontSize: '12px', color: '#09090b', marginLeft: '102px'}}>⌘␡</span>
                    </DropdownItem>
                </DropdownContent>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default EmailHeaderDropdown;