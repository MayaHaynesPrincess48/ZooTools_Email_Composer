import { Icon } from '@/components/ui/Icon';
import { Toolbar } from '@/components/ui/Toolbar';
import { useCallback } from 'react';

export type HistoryPickerProps = {
  editor: any;
};

export const HistoryPicker = ({ editor }: HistoryPickerProps) => {
  if (!editor) return null;

  const canUndo = editor.can().undo();
  const canRedo = editor.can().redo();

  const handleUndo = useCallback(() => {
    if (canUndo) {
      editor.chain().focus().undo().run();
    }
  }, [canUndo, editor]);

  const handleRedo = useCallback(() => {
    if (canRedo) {
      editor.chain().focus().redo().run();
    }
  }, [canRedo, editor]);

  return (
    <>
      <Toolbar.Button
        onClick={handleUndo}
        disabled={!canUndo}
        active={canUndo} // Optionally highlight if can undo
      >
        <Icon name="Undo" className="w-4 h-4" />
      </Toolbar.Button>

      {/* Go Forward Button */}
      <Toolbar.Button
        onClick={handleRedo}
        disabled={!canRedo}
        active={canRedo} // Optionally highlight if can redo
      >
        <Icon name="Redo" className="w-4 h-4" />
      </Toolbar.Button>
    </>
  );
};
