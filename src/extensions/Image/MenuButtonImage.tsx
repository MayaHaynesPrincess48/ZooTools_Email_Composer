import React, { memo } from 'react';
import { Editor } from '@tiptap/core';
import UploadWidget from '@/components/cloudinary/upload-widget';
import { Toolbar } from '@/components/ui/Toolbar';
import { Icon } from '@/components/ui/Icon';
import { DropdownButton } from '@/components/ui/Dropdown';

interface MenuButtonImageProps {
  editor: Editor | null;
  label?: string;
}

export const MenuButtonImage = ({ editor, label }: MenuButtonImageProps) => {
  return (
    <UploadWidget
      onSuccess={(result, widget) => {
        const url = result.info.url;
        editor.chain().setImage({ src: url }).focus().run();
        widget.close();
      }}
      onError={error => {
        console.error('Image upload failed:', error);
      }}
    >
      {({ open }) =>
        !label ? (
          <Toolbar.Button tooltip="Insert Image" onClick={() => open()} aria-label="Insert Image">
            <Icon name="Image" />
          </Toolbar.Button>
        ) : (
          <DropdownButton onClick={() => open()}>
            <Icon name="Image" />
            &nbsp; {label}
          </DropdownButton>
        )
      }
    </UploadWidget>
  );
};

export default memo(MenuButtonImage, (prevProps, nextProps) => prevProps.editor === nextProps.editor);
