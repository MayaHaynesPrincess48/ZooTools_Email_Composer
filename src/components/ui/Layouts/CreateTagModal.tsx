import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";
import { DropdownTagCircle } from "./ToAddress";
import { TagItemType } from "@/app/utils/types";
import "./styles.css"

const StyledModalBtn = styled.button`
  width: 84px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  border-radius: 5px;
  border: none;
  background-color: #f3f4f6;
  cursor: pointer;
  &:hover {
    background-color: #e5e7eb;
  }
`;

const DialogContent = styled(Dialog.Content)`
    background-color: white;
    border-radius: 1rem;
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
        hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 448px;
    max-height: 85vh;
    padding: 24px;
    box-sizing: border-box;
    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 10;
    &:focus{
        outline: none;
    }
`

const DialogTitle = styled(Dialog.Title)`
    margin: 0;
    font-weight: 700;
    color: #111817;
    font-size: 18px;
    padding-bottom: 16px;
`

const TagModalContent = styled.div`
    padding: 8px 16px;
    background: black;
    border-radius: 5px;
    background: rgb(235, 235, 235);
    display: grid;
    gap: 15px;
`

const TagModalInput = styled.input`
    background-color: rgb(228, 228, 231);
    width: 200px;
    height: 38px;
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    border-radius: 4px;
    padding: 6px 12px;
    box-sizing: border-box;
`

type CreateTagModalProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  tags: TagItemType[];
  setTags: React.Dispatch<React.SetStateAction<TagItemType[]>>;
};

const CreateTagModal = (props: CreateTagModalProps) => {
  const { openModal, setOpenModal, tags, setTags } = props;
  const [data, setData] = useState<TagItemType>({
    color: "",
    tagName: "",
    bgGradient: "",
  });

  function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  const DeleteTag = (index: number) => {
    setTags((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  function getRandomGradient() {
    const baseColor = getRandomColor();
    const rgbMatch = baseColor.match(/\d+/g);
    if (!rgbMatch) {
      throw new Error("Invalid base color");
    }
    const [r, g, b] = rgbMatch.map(Number)

    const alpha1 = 0.067;
    const alpha2 = 0.133;

    return `to right, rgba(${r}, ${g}, ${b}, ${alpha1}) 0%, rgba(${r}, ${g}, ${b}, ${alpha2}) 100%`;
  }

  const tagCreate = () => {
    console.log(getRandomGradient);
    if (data.tagName) {
      const newTag = {
        color: getRandomColor(),
        tagName: data.tagName,
        bgGradient: getRandomGradient(),
      };
      setTags((prevTags) => [...prevTags, newTag]);
      setData({ color: "", tagName: "", bgGradient: "" });
      setOpenModal(false);
    } else {
      alert("Tag name is required.");
    }
  };
  return (
    <>
      <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
        <Dialog.Portal>
          <DialogContent>
            <DialogTitle>Create New Tags</DialogTitle>
            <TagModalContent>
              {tags.map((item: any, index: number) => (
                <div key={index} className="flexBetween">
                  <div className="flexBetween" style={{ gap: "5px" }}>
                    <DropdownTagCircle color={item.color} />
                    {item.tagName}
                  </div>
                  <button
                    onClick={() => DeleteTag(index)}
                    className="flexCenter"
                    style={{
                      width: "30px",
                      height: "23px",
                      borderRadius: "4px",
                      background: "white",
                      cursor: "pointer",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              ))}
            </TagModalContent>

            <div className="flexBetween" style={{ marginTop: "10px" }}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 256 256"
                height="20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M208,56V88a8,8,0,0,1-16,0V64H136V192h24a8,8,0,0,1,0,16H96a8,8,0,0,1,0-16h24V64H64V88a8,8,0,0,1-16,0V56a8,8,0,0,1,8-8H200A8,8,0,0,1,208,56Z"></path>
              </svg>
              <TagModalInput
                id="tagName"
                name="tagName"
                placeholder="New Tag Name"
                onChange={handleChange}
              />
            </div>
            <div className="flexBetween" style={{ marginTop: "32px" }}>
              <Dialog.Close asChild>
                <StyledModalBtn>Cancel</StyledModalBtn>
              </Dialog.Close>
              <Dialog.Close asChild>
                <StyledModalBtn
                  onClick={tagCreate}
                  style={{
                    background: "#DBEAFE",
                    width: "132px",
                    color: "#1E3A8A",
                  }}
                >
                  Create Button
                </StyledModalBtn>
              </Dialog.Close>
            </div>
          </DialogContent>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default CreateTagModal;
