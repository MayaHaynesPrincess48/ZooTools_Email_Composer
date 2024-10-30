import React from "react";
import styled from "styled-components";
import Image from "next/image";

const AllContactDiv = styled.div`
    background: linear-gradient(to bottom right, #ffffff, #e5e7eb);
    display: inline-flex;
    padding: 4px 16px 4px 8px;
    justify-content: space-between;
    align-items: center;
    border: 1px solid rgb(212, 212, 216);
    border-radius: 30px;
    cursor: pointer;
    font-size: 12px;
    color: #09090b;
    gap: 5px;
`;

const AddressDiv = styled.button`
  display: inline-flex;
  padding: 2px 8px;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e5e7eb;
  border-radius: 30px;
  cursor: pointer;
  font-size: 15px;
  gap: 5px;
`;

const TagCircle = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${({ color }) => color};
  margin-right: 5px;
  border-radius: 50%;
  border: none;
`;

const AvatarImage = styled(Image)`
  border-radius: 50%;
`;

const SelectedAllContact = (props: any) => {
    return(
        <AllContactDiv
            onClick={() => props.handleAllClick(props.index)}
        >
            <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M4 2C3.44772 2 3 2.44772 3 3V5H5V4H19V20H5V19H3V21C3 21.5523 3.44772 22 4 22H20C20.5523 22 21 21.5523 21 21V3C21 2.44772 20.5523 2 20 2H4ZM9 16C9 14.3431 10.3431 13 12 13C13.6569 13 15 14.3431 15 16H9ZM12 12C10.8954 12 10 11.1046 10 10C10 8.89543 10.8954 8 12 8C13.1046 8 14 8.89543 14 10C14 11.1046 13.1046 12 12 12ZM6 9V7H2V9H6ZM6 11V13H2V11H6ZM6 17V15H2V17H6Z"></path>
        </svg>
        ALL CONTACTS
    </AllContactDiv>
    )
}

const TagItemComponent = (props: any) => {
    return(
        <AddressDiv
            style={{
                border: `1px solid ${props.color}`,
                background: `linear-gradient(${props.bgGradient})`,
            }}
            onClick={() => props.handleTagClick(props.index)}
            >
            <TagCircle color={props.color} />
            {props.tagName}
        </AddressDiv>
    )
}

const UserAddress = (props: any) => {
    return(
        <AddressDiv onClick={() => props.handleUserClick(props.index)}>
            <AvatarImage
                src={props.avatar}
                alt="User avatar"
                width={20}
                height={20}
            />
            <span>{props.email}</span>
        </AddressDiv>
    )
}

const AllContacts = (props: any) => {
    return(
        <>
            {props.title}&nbsp;({props.member}.000)
        </>
    )
}

export { SelectedAllContact, TagItemComponent, UserAddress, AllContacts, AvatarImage };