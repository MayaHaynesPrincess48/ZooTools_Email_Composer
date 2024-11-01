import { Icon } from '@/components/ui/Icon';
import { Toolbar } from '@/components/ui/Toolbar';
import { useTextmenuCommands } from './hooks/useTextmenuCommands';
import { useTextmenuStates } from './hooks/useTextmenuStates';
import { BubbleMenu, Editor } from '@tiptap/react';
import { memo } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Surface } from '@/components/ui/Surface';
import { ColorPicker } from '@/components/panels';
import { FontFamilyPicker } from './components/FontFamilyPicker';
import { FontSizePicker } from './components/FontSizePicker';
import { useTextmenuContentTypes } from './hooks/useTextmenuContentTypes';
import { ContentTypePicker } from './components/ContentTypePicker';
import { EditLinkPopover } from './components/EditLinkPopover';
import { HistoryPicker } from './components/HistoryPicker';
// import { MenuButtonImage } from '../../../extensions/Image/MenuButtonImage';

// We memorize the button so each button is not rerendered on every editor state change
const MemoButton = memo(Toolbar.Button);
const MemoColorPicker = memo(ColorPicker);
const MemoFontFamilyPicker = memo(FontFamilyPicker);
const MemoFontSizePicker = memo(FontSizePicker);
const MemoContentTypePicker = memo(ContentTypePicker);

export type TextMenuProps = {
  editor: Editor;
};

export const TextMenu = ({ editor }: TextMenuProps) => {
  const commands = useTextmenuCommands(editor);
  const states = useTextmenuStates(editor);
  const blockOptions = useTextmenuContentTypes(editor);

  // Button configuration
  const buttons = [
    { tooltip: 'Bold', tooltipShortcut: ['Mod', 'B'], onClick: commands.onBold, active: states.isBold, icon: 'Bold' },
    {
      tooltip: 'Italic',
      tooltipShortcut: ['Mod', 'i'],
      onClick: commands.onItalic,
      active: states.isItalic,
      icon: 'Italic',
    },
    {
      tooltip: 'Underline',
      tooltipShortcut: ['Mod', 'U'],
      onClick: commands.onUnderline,
      active: states.isUnderline,
      icon: 'Underline',
    },
    {
      tooltip: 'Strikethrough',
      tooltipShortcut: ['Mod', 'Shift', 'S'],
      onClick: commands.onStrike,
      active: states.isStrike,
      icon: 'Strikethrough',
    },
    // { tooltip: 'Code', tooltipShortcut: ['Mod', 'E'], onClick: commands.onCode, active: states.isCode, icon: 'Code' },
    {
      tooltip: 'Code block',
      tooltipShortcut: ['Mod', 'E'],
      onClick: commands.onCodeBlock,
      active: states.isCodeBlock,
      icon: 'Code',
    },
  ];

  // More options button configuration
  const moreOptionsButtons = [
    {
      tooltip: 'Subscript',
      tooltipShortcut: ['Mod', '.'],
      onClick: commands.onSubscript,
      active: states.isSubscript,
      icon: 'Subscript',
    },
    {
      tooltip: 'Superscript',
      tooltipShortcut: ['Mod', ','],
      onClick: commands.onSuperscript,
      active: states.isSuperscript,
      icon: 'Superscript',
    },
    {
      tooltip: 'Align left',
      tooltipShortcut: ['Shift', 'Mod', 'L'],
      onClick: commands.onAlignLeft,
      active: states.isAlignLeft,
      icon: 'AlignLeft',
    },
    {
      tooltip: 'Align center',
      tooltipShortcut: ['Shift', 'Mod', 'E'],
      onClick: commands.onAlignCenter,
      active: states.isAlignCenter,
      icon: 'AlignCenter',
    },
    {
      tooltip: 'Align right',
      tooltipShortcut: ['Shift', 'Mod', 'R'],
      onClick: commands.onAlignRight,
      active: states.isAlignRight,
      icon: 'AlignRight',
    },
    {
      tooltip: 'Justify',
      tooltipShortcut: ['Shift', 'Mod', 'J'],
      onClick: commands.onAlignJustify,
      active: states.isAlignJustify,
      icon: 'AlignJustify',
    },
  ];

  // Color picker configuration
  const colorPickers = [
    {
      tooltip: 'Highlight text',
      color: states.currentHighlight,
      onChange: commands.onChangeHighlight,
      onClear: commands.onClearHighlight,
    },
    {
      tooltip: 'Text color',
      color: states.currentColor,
      onChange: commands.onChangeColor,
      onClear: commands.onClearColor,
    },
  ];

  return (
    <BubbleMenu
      tippyOptions={{ popperOptions: { placement: 'top-start' } }}
      editor={editor}
      pluginKey="textMenu"
      shouldShow={states.shouldShow}
      updateDelay={100}
      // className="flexCenter"
    >
      <Toolbar.Wrapper>
        <HistoryPicker editor={editor} />
        <MemoContentTypePicker options={blockOptions} />
        <MemoFontFamilyPicker onChange={commands.onSetFont} value={states.currentFont || ''} />
        <MemoFontSizePicker onChange={commands.onSetFontSize} value={states.currentSize || ''} />
        <Toolbar.Divider />

        {/* Map over the main buttons */}
        {buttons.map(({ tooltip, tooltipShortcut, onClick, active, icon }) => (
          <MemoButton
            key={tooltip}
            tooltip={tooltip}
            tooltipShortcut={tooltipShortcut}
            onClick={onClick}
            active={active}
          >
            <Icon name={icon} />
          </MemoButton>
        ))}

        <EditLinkPopover onSetLink={commands.onLink} />

        {/* Map over the color pickers */}
        {colorPickers.map(({ tooltip, color, onChange, onClear }) => (
          <Popover.Root key={tooltip}>
            <Popover.Trigger asChild>
              <MemoButton active={!!color} tooltip={tooltip}>
                <Icon name={tooltip === 'Highlight text' ? 'Highlighter' : 'Palette'} />
              </MemoButton>
            </Popover.Trigger>
            <Popover.Content side="top" sideOffset={8} asChild>
              <Surface style={{ padding: '2px' }}>
                <MemoColorPicker color={color} onChange={onChange} onClear={onClear} />
              </Surface>
            </Popover.Content>
          </Popover.Root>
        ))}

        {/* More Options Popover */}
        <Popover.Root>
          <Popover.Trigger asChild>
            <MemoButton tooltip="More options">
              <Icon name="EllipsisVertical" />
            </MemoButton>
          </Popover.Trigger>
          <Popover.Content side="top" asChild>
            <Toolbar.Wrapper>
              {/* Map over more options buttons */}
              {moreOptionsButtons.map(({ tooltip, tooltipShortcut, onClick, active, icon }) => (
                <MemoButton
                  key={tooltip}
                  tooltip={tooltip}
                  tooltipShortcut={tooltipShortcut}
                  onClick={onClick}
                  active={active}
                >
                  <Icon name={icon} />
                </MemoButton>
              ))}
            </Toolbar.Wrapper>
          </Popover.Content>
        </Popover.Root>
      </Toolbar.Wrapper>
    </BubbleMenu>
  );
};
