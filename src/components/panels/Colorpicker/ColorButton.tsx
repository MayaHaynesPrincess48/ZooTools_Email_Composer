import { memo, useCallback } from 'react';
import styled from 'styled-components';

export type ColorButtonProps = {
  color?: string;
  active?: boolean;
  onColorChange?: (color: string) => void; // eslint-disable-line no-unused-vars
};

const StyledButton = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem;
  border-radius: 0.375rem;
  background-color: ${({ $active }) => ($active ? '#f5f5f5' : 'transparent')};
  &:hover {
    background-color: ${({ $active }) => (!$active ? '#f5f5f5' : '')};
  }
`;

const ColorBubble = styled.div<{ color?: string; $active?: boolean }>`
  width: 1rem;
  height: 1rem;
  border-radius: 9999px;
  background-color: ${({ color }) => color || '#e5e7eb'};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  color: ${({ color }) => color || '#e5e7eb'};
  ring-offset-width: 2px;
  ring-color: currentColor;
  ${({ $active }) => $active && 'box-shadow: 0px 0px 0px 1px currentColor;'}
  &:hover {
    ${({ $active }) => !$active && 'box-shadow: 0px 0px 0px 1px currentColor;'}
  }
`;

export const ColorButton = memo(({ color, active, onColorChange }: ColorButtonProps) => {
  const handleClick = useCallback(() => {
    if (onColorChange) {
      onColorChange(color || '');
    }
  }, [onColorChange, color]);

  return (
    <StyledButton onClick={handleClick} $active={active}>
      <ColorBubble color={color} $active={active} />
    </StyledButton>
  );
});

ColorButton.displayName = 'ColorButton';
