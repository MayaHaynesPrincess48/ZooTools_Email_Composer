import { useCallback, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { ColorButton } from './ColorButton';
import { Toolbar } from '../../ui/Toolbar';
import { Icon } from '../../ui/Icon';
import { themeColors } from '@/lib/constants';
import styled from 'styled-components';

export type ColorPickerProps = {
  color?: string;
  onChange?: (color: string) => void;
  onClear?: () => void;
};

const PickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ColorInput = styled.input<{ $backgroundColor: string; $fontColor: string }>`
  padding: 0.5rem;
  color: ${({ $fontColor }) => $fontColor};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border: 1px solid #e0e0e0;
  border-radius: 0.25rem;

  &:focus {
    outline: 1px solid #b0c4de;
    border-color: #b0c4de;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem;
  max-width: 15rem;
`;

export const ColorPicker = ({ color: initialColor = '', onChange, onClear }: ColorPickerProps) => {
  const [color, setColor] = useState(initialColor);
  const [colorInputValue, setColorInputValue] = useState(initialColor);

  // Update color in all components
  const handleColorChange = useCallback(
    (newColor: string) => {
      setColor(newColor);
      setColorInputValue(newColor);
      if (onChange) onChange(newColor);
    },
    [onChange],
  );

  // Handle input changes with hex validation
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newColor = event.target.value;
      setColorInputValue(newColor);

      if (/^#([0-9A-F]{3}){1,2}$/i.test(newColor)) {
        handleColorChange(newColor);
      }
    },
    [handleColorChange],
  );

  const backgroundColor = /^#([0-9A-F]{3}){1,2}$/i.test(colorInputValue) ? colorInputValue : '#ffffff';
  const fontColor = /^#([0-9A-F]{3}){1,2}$/i.test(colorInputValue) ? '#ffffff' : '#000000';

  return (
    <PickerContainer>
      <HexColorPicker color={color} onChange={handleColorChange} />
      <ColorInput
        type="text"
        placeholder="#000000"
        value={colorInputValue}
        onChange={handleInputChange}
        $backgroundColor={backgroundColor}
        $fontColor={fontColor}
      />
      <ButtonsContainer>
        {themeColors.map(currentColor => (
          <ColorButton
            active={currentColor === color}
            color={currentColor}
            key={currentColor}
            onColorChange={handleColorChange}
          />
        ))}
        <Toolbar.Button tooltip="Reset color to default" onClick={onClear}>
          <Icon name="Undo" />
        </Toolbar.Button>
      </ButtonsContainer>
    </PickerContainer>
  );
};
