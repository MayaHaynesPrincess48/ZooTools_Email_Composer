import { icons } from 'lucide-react';
import styled from 'styled-components';
import { memo } from 'react';

export type IconProps = {
  name: keyof typeof icons;
  className?: string;
  strokeWidth?: number;
};

// Define a styled component for icons
const StyledIcon = styled.div<{ strokeWidth: number }>`
  width: 1rem;
  height: 1rem;
  svg {
    stroke-width: ${({ strokeWidth }) => strokeWidth}px;
  }
`;

export const Icon = memo(({ name, className, strokeWidth = 2.5 }: IconProps) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    return null;
  }

  return <StyledIcon as={IconComponent} className={className} strokeWidth={strokeWidth} />;
});

Icon.displayName = 'Icon';
