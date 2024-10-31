import styled from 'styled-components';
import { EditorInfo } from './EditorInfo';

export type EditorHeaderProps = {
  characters: number;
  words: number;
};

// Styled Component for the header container
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  padding: 0.5rem 1.5rem 0.5rem 1.5rem; /* equivalent to py-2, pl-6, pr-3 */
  color: black;
  background-color: white;
  border-bottom: 1px solid #e5e7eb; /* border-neutral-200 */

  /* Dark mode styles */
  @media (prefers-color-scheme: dark) {
    color: white;
    background-color: black;
    border-color: #1f2937; /* border-neutral-800 */
  }
`;

export const EditorHeader = ({ characters, words }: EditorHeaderProps) => {
  return (
    <HeaderContainer>
      <EditorInfo characters={characters} words={words} />
    </HeaderContainer>
  );
};
