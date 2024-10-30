import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';

export const CodeBlockList = (props: NodeViewProps) => {
  const increase = () => {
    props.updateAttributes({
      count: (props.node.attrs.count || 0) + 1,
    });
  };

  return (
    <NodeViewWrapper className="react-component">
      <label>React Component</label>
      <div className="content">
        <button onClick={increase}>This button has been clicked {props.node.attrs.count || 0} times.</button>
      </div>
    </NodeViewWrapper>
  );
};
