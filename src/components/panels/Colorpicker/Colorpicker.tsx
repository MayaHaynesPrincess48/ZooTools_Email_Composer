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

const ColorInput = styled.input`
  padding: 0.5rem;
  color: black;
  background-color: white;
  border: 1px solid #e0e0e0; // Neutral border color
  border-radius: 0.25rem; // Rounded corners

  &:focus {
    outline: 1px solid #b0c4de; // Focus outline color
    border-color: #b0c4de; // Focus border color
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem;
  max-width: 15rem;
`;

export const ColorPicker = ({ color, onChange, onClear }: ColorPickerProps) => {
  const [colorInputValue, setColorInputValue] = useState(color || '');

  const handleColorUpdate = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setColorInputValue(event.target.value);
  }, []);

  const handleColorChange = useCallback(() => {
    const isCorrectColor = /^#([0-9A-F]{3}){1,2}$/i.test(colorInputValue);

    if (!isCorrectColor) {
      if (onChange) {
        onChange('');
      }
      return;
    }

    if (onChange) {
      onChange(colorInputValue);
    }
  }, [colorInputValue, onChange]);

  return (
    <PickerContainer>
      <HexColorPicker className="w-full" color={color || ''} onChange={onChange} />
      <ColorInput
        type="text"
        placeholder="#000000"
        value={colorInputValue}
        onChange={handleColorUpdate}
        onBlur={handleColorChange}
      />
      <ButtonsContainer>
        {themeColors.map(currentColor => (
          <ColorButton
            active={currentColor === color}
            color={currentColor}
            key={currentColor}
            onColorChange={onChange}
          />
        ))}
        <Toolbar.Button tooltip="Reset color to default" onClick={onClear}>
          <Icon name="Undo" />
        </Toolbar.Button>
      </ButtonsContainer>
    </PickerContainer>
  );
};
