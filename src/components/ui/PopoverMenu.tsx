import * as Popover from '@radix-ui/react-popover';
import { icons } from 'lucide-react';
import { forwardRef } from 'react';
import styled from 'styled-components';
import { Surface } from './Surface';
import { Toolbar } from './Toolbar';

export const Trigger = Popover.Trigger;
export const Portal = Popover.Portal;

export type MenuProps = {
  children: React.ReactNode;
  trigger: React.ReactNode;
  triggerClassName?: string;
  customTrigger?: boolean;
  isOpen?: boolean;
  onOpenChange?: (state: boolean) => void;
  withPortal?: boolean;
  tooltip?: string;
  isActive?: boolean;
};

const StyledPopoverContent = styled(Popover.Content)`
  min-width: 15rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  max-height: 20rem;
  overflow: auto;
  z-index: 9999;
`;

export const Menu = ({
  customTrigger,
  trigger,
  triggerClassName,
  children,
  isOpen,
  withPortal,
  tooltip,
  onOpenChange,
}: MenuProps) => {
  return (
    <Popover.Root onOpenChange={onOpenChange}>
      {customTrigger ? (
        <Trigger asChild>{trigger}</Trigger>
      ) : (
        <Trigger asChild>
          <Toolbar.Button className={triggerClassName} tooltip={!isOpen ? tooltip : ''}>
            {trigger}
          </Toolbar.Button>
        </Trigger>
      )}
      {withPortal ? (
        <Popover.Portal className="z-9999">
          <StyledPopoverContent asChild sideOffset={8}>
            <Surface>{children}</Surface>
          </StyledPopoverContent>
        </Popover.Portal>
      ) : (
        <StyledPopoverContent asChild sideOffset={8}>
          <Surface>{children}</Surface>
        </StyledPopoverContent>
      )}
    </Popover.Root>
  );
};

Menu.displayName = 'Menu';

export type ItemProps = {
  label: string | React.ReactNode;
  icon?: keyof typeof icons;
  iconComponent?: React.ReactNode;
  close?: boolean;
  disabled?: boolean;
  onClick: () => void;
  isActive?: boolean;
};

const StyledItem = styled.button<ItemProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ isActive, disabled }) => (disabled ? '#9ca3af' : isActive ? '#1f2937' : '#6b7280')};
  text-align: left;
  background-color: ${({ isActive, disabled }) => (isActive && !disabled ? '#f3f4f6' : 'transparent')};
  width: 100%;
  border-radius: 0.25rem;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${({ disabled }) => (!disabled ? '#e5e7eb' : 'transparent')};
    color: ${({ disabled }) => (!disabled ? '#374151' : '')};
  }
`;

export const Item = ({ label, icon, iconComponent, close = true, disabled, onClick, isActive }: ItemProps) => {
  const IconComponent = icon ? icons[icon] : null;
  const IconCustomComponent = iconComponent || null;
  const ItemComponent = close ? Popover.Close : StyledItem;

  return (
    <ItemComponent onClick={onClick} disabled={disabled} isActive={isActive}>
      {IconComponent && <IconComponent className="w-4 h-4" />}
      {IconCustomComponent}
      {label}
    </ItemComponent>
  );
};

export const CategoryTitle = styled.div`
  margin-top: 1rem;
  margin-bottom: 0.375rem;
  font-size: 0.625rem;
  font-weight: 500;
  color: #9ca3af;
  text-transform: uppercase;
  user-select: none;
  padding-left: 0.25rem;
`;

export const Divider = forwardRef<HTMLHRElement>((props, ref) => {
  const StyledDivider = styled.hr`
    margin: 0.25rem 0;
    border-color: #e5e7eb;
  `;

  return <StyledDivider {...props} ref={ref} />;
});

Divider.displayName = 'Divider';
