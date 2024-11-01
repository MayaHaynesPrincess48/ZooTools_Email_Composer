import { Icon } from '@/components/ui/Icon';
import { Toolbar } from '@/components/ui/Toolbar';
import DragHandle from '@tiptap-pro/extension-drag-handle-react';
import { Editor } from '@tiptap/react';

import * as Popover from '@radix-ui/react-popover';
import { Surface } from '@/components/ui/Surface';
import { DropdownButton } from '@/components/ui/Dropdown';
import useContentItemActions from './hooks/useContentItemActions';
import { useData } from './hooks/useData';
import { useEffect, useState } from 'react';

export type ContentItemMenuProps = {
  editor: Editor;
};

export const ContentItemMenu = ({ editor }: ContentItemMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const data = useData();
  const actions = useContentItemActions(editor, data.currentNode, data.currentNodePos);

  const actionItems = [
    {
      icon: 'RemoveFormatting',
      label: 'Clear Formatting',
      onClick: actions.resetTextFormatting,
    },
    {
      icon: 'Clipboard',
      label: 'Copy',
      onClick: actions.copyNodeToClipboard,
    },
    {
      icon: 'Copy',
      label: 'Duplicate',
      onClick: actions.duplicateNode,
    },
    {
      icon: 'Trash2',
      label: 'Remove',
      onClick: actions.deleteNode,
      className:
        'text-red-500 bg-red-500 dark:text-red-500 hover:bg-red-500 dark:hover:text-red-500 dark:hover:bg-red-500 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-20',
    },
  ];

  useEffect(() => {
    editor.commands.setMeta('lockDragHandle', menuOpen);
  }, [editor, menuOpen]);

  return (
    <DragHandle
      pluginKey="ContentItemMenu"
      editor={editor}
      onNodeChange={data.handleNodeChange}
      tippyOptions={{
        offset: [-2, 16],
        zIndex: 99,
      }}
      className="flex mr-[-10px]"
    >
      <div className="flex items-center gap-0.5 dragHandler">
        <Toolbar.Button onClick={actions.handleAdd} buttonSize="smaller">
          <Icon name="Plus" />
        </Toolbar.Button>
        <Popover.Root open={menuOpen} onOpenChange={setMenuOpen}>
          <Popover.Trigger asChild>
            <Toolbar.Button buttonSize="smaller">
              <Icon name="GripVertical" />
            </Toolbar.Button>
          </Popover.Trigger>
          <Popover.Content side="bottom" align="start" sideOffset={8}>
            <Surface className="p-2 flex flex-col min-w-[16rem]">
              {actionItems.map((item, index) => (
                <Popover.Close key={index}>
                  <DropdownButton onClick={item.onClick} className={item.className}>
                    <Icon name={item.icon} />
                    {item.label}
                  </DropdownButton>
                </Popover.Close>
              ))}
              <Toolbar.Divider horizontal />
            </Surface>
          </Popover.Content>
        </Popover.Root>
      </div>
    </DragHandle>
  );
};
