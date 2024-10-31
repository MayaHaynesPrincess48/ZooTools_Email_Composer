import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import * as Separator from '@radix-ui/react-separator';
import { ContactItem, TagItemType, AllContactItem, DropdownListProps } from '@/utils/types';
import { AllContacts, AvatarImage, SelectedAllContact, TagItemComponent, UserAddress } from './ContactItem';

import CreateTagModal from './CreateTagModal';
import { avatar1, avatar2 } from '@/assets';

const ToWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  font-size: 14px;
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  &:focus {
    border: none;
  }
`;

const DropdownList = styled.ul<DropdownListProps>`
  position: absolute;
  top: 30px;
  left: 0;
  width: 305px;
  max-height: 300px;
  padding: 5px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: rgb(250, 250, 250);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  list-style: none;
  margin: 0;
  display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')};
  z-index: 10;
`;

const DropdownItem = styled.li`
  width: 100%;
  display: inline-flex;
  align-items: center;
  padding: 6px 8px;
  cursor: pointer;
  gap: 3px;
  font-size: 14px;
  &:hover {
    background-color: rgb(235, 235, 235);
  }
`;

const ContentTitle = styled.div`
  width: 94%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
`;

const PlusTagButton = styled.button`
  background: #ffffff;
  width: 34px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: 0.5px 0.5px 0.5px 0.5px rgb(200, 200, 200);
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  transition: 0.1s;
  gap: 3px;
  &:hover {
    width: 100px;
    background: linear-gradient(to bottom right, #ffffff, rgb(187, 247, 208));
  }
`;

export const DropdownTagCircle = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  background-color: ${({ color }) => color};
  margin-right: 5px;
  border-radius: 50%;
  border: none;
`;

const StyledSeparator = styled(Separator.Root)`
  background-color: #e5e7eb;
  height: 1px;
  width: 100%;
`;

const ToAddress = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [selectedUsers, setSelectedUsers] = useState<ContactItem[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagItemType[]>([]);
  const [selectedAll, setSelectedAll] = useState<AllContactItem[]>([]);
  const [backspacePressed, setBackspacePressed] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const initialContacts: ContactItem[] = [
    { avatar: avatar1, email: 'bruce.willis@gmail.com' },
    { avatar: avatar2, email: 'arnold.schwarzenegger@gmail.com' },
    { avatar: avatar1, email: 'bruce.willis@gmail.com' },
    { avatar: avatar2, email: 'arnold.schwarzenegger@gmail.com' },
  ];

  const initialTags: TagItemType[] = [
    {
      color: 'rgb(225, 29, 72)',
      tagName: 'Retargeting Ads Summer 2024',
      bgGradient: 'to right, rgba(225, 29, 72, 0.067) 0%, rgba(225, 29, 72, 0.133) 100%',
    },
    {
      color: 'rgb(249, 115, 22)',
      tagName: 'Low Ticket Customers',
      bgGradient: 'to right, rgba(249, 115, 22, 0.067) 0%, rgba(249, 115, 22, 0.133) 100%',
    },
    {
      color: 'rgb(132, 204, 22)',
      tagName: 'Churned Customers',
      bgGradient: 'to right, rgba(132, 204, 22, 0.067) 0%, rgba(132, 204, 22, 0.133) 100%',
    },
    {
      color: 'rgb(6, 182, 212)',
      tagName: 'New Customers',
      bgGradient: 'to right, rgba(6, 182, 212, 0.067) 0%, rgba(6, 182, 212, 0.133) 100%',
    },
    {
      color: 'rgb(251, 191, 36)',
      tagName: 'High Ticket Customers',
      bgGradient: 'to right, rgba(251, 191, 36, 0.067) 0%, rgba(251, 191, 36, 0.133) 100%',
    },
  ];

  const initialAllContacts: AllContactItem[] = [{ title: 'All Contacts', member: 30 }];

  const [contacts, setContacts] = useState(initialContacts);
  const [tags, setTags] = useState(initialTags);
  const [allContacts, setAllContacts] = useState(initialAllContacts);

  const [selectedAllIndex, setSelectedAllIndex] = useState<number | null>(null);
  const [selectedTagIndex, setSelectedTagIndex] = useState<number | null>(null);
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null);

  const handleFocus = () => setIsDropdownVisible(true);

  const dropdownVisible = () => {
    setIsDropdownVisible(true);
    inputRef.current?.focus();
  };

  const handleBackspace = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !inputRef.current?.value) {
      if (selectedTagIndex !== null) {
        setSelectedTags(prevTags => prevTags.filter((_, i) => i !== selectedTagIndex));
        const removedTag = selectedTags[selectedTagIndex];
        setTags(prevItems => [removedTag, ...prevItems]);
        setSelectedTagIndex(null);
      } else if (selectedAllIndex !== null) {
        setSelectedAll(prevAll => prevAll.filter((_, i) => i !== selectedAllIndex));
        const removedAll = selectedAll[selectedAllIndex];
        setAllContacts(prevItems => [removedAll, ...prevItems]);
        setSelectedAllIndex(null);
      } else if (selectedUserIndex !== null) {
        setSelectedUsers(prevUsers => prevUsers.filter((_, i) => i !== selectedUserIndex));
        const removedUser = selectedUsers[selectedUserIndex];
        setContacts(prevItems => [removedUser, ...prevItems]);
        setSelectedUserIndex(null);
      } else if (selectedUsers.length) {
        const removedUser = selectedUsers[selectedUsers.length - 1];
        setSelectedUsers(prevUsers => prevUsers.slice(0, -1));
        setContacts(prevItems => [removedUser, ...prevItems]);
      } else if (selectedTags.length) {
        const removedTag = selectedTags[selectedTags.length - 1];
        setSelectedTags(prevTags => prevTags.slice(0, -1));
        setTags(prevItems => [removedTag, ...prevItems]);
      } else if (selectedAll.length) {
        const removeAll = selectedAll[selectedAll.length - 1];
        setSelectedAll(prevAll => prevAll.slice(0, -1));
        setAllContacts(prevItems => [removeAll, ...prevItems]);
      }
      setBackspacePressed(true);
    }
  };

  const resetBackspace = () => {
    setBackspacePressed(false);
    setSelectedTagIndex(null);
  };

  const selectAll = (index: number) => {
    const all = allContacts[index];
    setSelectedAll(prevAll => [...prevAll, all]);
    setAllContacts(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const handleClickModal = () => {
    setOpenModal(prev => !prev);
  };

  const selectTag = (index: number) => {
    const tag = tags[index];
    setSelectedTags(prevTags => [...prevTags, tag]);
    setTags(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const selectUser = (index: number) => {
    const user = contacts[index];
    setSelectedUsers(prevUsers => [...prevUsers, user]);
    setContacts(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const handleAllClick = (index: number) => {
    setSelectedAllIndex(index);
  };

  const handleTagClick = (index: number) => {
    setSelectedTagIndex(index);
  };

  const handleUserClick = (index: number) => {
    setSelectedUserIndex(index);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div style={{ padding: '16px 48px 8px' }}>
      <ToWrapper onClick={dropdownVisible}>
        <Container ref={dropdownRef}>
          To:
          {selectedAll.map((item, index) => (
            <SelectedAllContact key={index} index={index} handleAllClick={handleAllClick} />
          ))}
          {selectedTags.map((item, index) => (
            <TagItemComponent
              key={index}
              color={item.color}
              tagName={item.tagName}
              bgGradient={item.bgGradient}
              index={index}
              handleTagClick={handleTagClick}
            />
          ))}
          {selectedUsers.map((item, index) => (
            <UserAddress
              key={index}
              avatar={item.avatar}
              email={item.email}
              index={index}
              handleUserClick={handleUserClick}
            />
          ))}
          <div style={{ position: 'relative' }}>
            <StyledInput
              ref={inputRef}
              onFocus={handleFocus}
              onKeyDown={handleBackspace}
              onKeyUp={resetBackspace}
              onChange={resetBackspace}
            />
            <DropdownList $isVisible={isDropdownVisible}>
              {allContacts.map((item, index) => (
                <DropdownItem key={index} onClick={() => selectAll(index)}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginRight: '5px' }}
                  >
                    <path
                      d="M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2ZM7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5ZM9.5 7C9.22386 7 9 7.22386 9 7.5C9 7.77614 9.22386 8 9.5 8C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7ZM11 7.5C11 7.22386 11.2239 7 11.5 7C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5ZM11.5 9C11.2239 9 11 9.22386 11 9.5C11 9.77614 11.2239 10 11.5 10C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9ZM5 9.5C5 9.22386 5.22386 9 5.5 9C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10C5.22386 10 5 9.77614 5 9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9ZM3 11.5C3 11.2239 3.22386 11 3.5 11C3.77614 11 4 11.2239 4 11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5ZM5.5 11C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11ZM7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5ZM9.5 11C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <AllContacts key={index} {...item} />
                </DropdownItem>
              ))}

              <ContentTitle>
                <p>Tags</p>
                <PlusTagButton onClick={handleClickModal} className="plusTagButton">
                  <span className="createTagSpan">CREATE TAG</span>+
                </PlusTagButton>
              </ContentTitle>

              {tags.map((item, index) => (
                <DropdownItem key={index} onClick={() => selectTag(index)}>
                  <DropdownTagCircle color={item.color} />
                  {item.tagName}
                </DropdownItem>
              ))}
              <StyledSeparator />

              <ContentTitle>
                <p>Found Contacts</p>
              </ContentTitle>
              {contacts.map((item, index) => (
                <DropdownItem key={index} onClick={() => selectUser(index)}>
                  <AvatarImage src={item.avatar} alt="User avatar" width={20} height={20} />
                  {item.email}
                </DropdownItem>
              ))}
            </DropdownList>
          </div>
        </Container>
      </ToWrapper>
      <CreateTagModal openModal={openModal} setOpenModal={setOpenModal} tags={tags} setTags={setTags} />
    </div>
  );
};

export default ToAddress;
