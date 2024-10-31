import { memo } from 'react';
import styled from 'styled-components';

export type EditorInfoProps = {
  characters: number;
  words: number;
};

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 1rem;
  margin-right: 1rem;
  text-align: right;
  border-right: 1px solid #e5e7eb; /* border-neutral-200 */

  /* Dark mode styles */
  @media (prefers-color-scheme: dark) {
    border-color: #1f2937; /* border-neutral-800 */
  }
`;

const InfoText = styled.div`
  font-size: 0.75rem; /* text-xs */
  font-weight: 600; /* font-semibold */
  color: #737373; /* text-neutral-500 */

  /* Dark mode styles */
  @media (prefers-color-scheme: dark) {
    color: #a3a3a3; /* text-neutral-400 */
  }
`;

export const EditorInfo = memo(({ characters, words }: EditorInfoProps) => {
  return (
    <InfoContainer>
      <InfoBlock>
        <InfoText>
          {words} {words === 1 ? 'palavra' : 'palavras'}
        </InfoText>
        <InfoText>
          {characters} {characters === 1 ? 'caracter' : 'caracteres'}
        </InfoText>
      </InfoBlock>
    </InfoContainer>
  );
});

EditorInfo.displayName = 'EditorInfo';
