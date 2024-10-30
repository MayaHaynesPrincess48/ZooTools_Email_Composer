import { useEffect } from 'react';
import type { Editor } from '@tiptap/react';

export const MessageHandler = ({ editor }: { editor: Editor }) => {
  useEffect(() => {
    const messageHandler = event => {
      if (event) {
        const messageReceived = event.data;

        const { action, data } = messageReceived;

        if (action === 'askContent') {
          window.parent.postMessage(editor.getJSON(), '*');
        }

        if (action === 'setValue') {
          editor.commands.setContent(data);
        }
      }
    };

    window.addEventListener('message', messageHandler);

    return () => {
      window.removeEventListener('message', messageHandler);
    };
  });

  return <div></div>;
};
