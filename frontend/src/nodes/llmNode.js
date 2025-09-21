import { Position } from 'reactflow';
import { BaseNode, createHandle } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const handles = [
    createHandle('target', Position.Left, `${id}-system`, { top: `${100/3}%` }),
    createHandle('target', Position.Left, `${id}-prompt`, { top: `${200/3}%` }),
    createHandle('source', Position.Right, `${id}-response`)
  ];

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="LLM" 
      handles={handles}
    >
      <span>This is a LLM.</span>
    </BaseNode>
  );
}
