// transformerNode.js - Data transformation node

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, createHandle, InputField } from './BaseNode';

export const TransformerNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'uppercase');
  const [customPattern, setCustomPattern] = useState(data?.customPattern || '');

  const handles = [
    createHandle('target', Position.Left, `${id}-input`),
    createHandle('source', Position.Right, `${id}-output`)
  ];

  const transformOptions = [
    { value: 'uppercase', label: 'Uppercase' },
    { value: 'lowercase', label: 'Lowercase' },
    { value: 'titlecase', label: 'Title Case' },
    { value: 'reverse', label: 'Reverse' },
    { value: 'trim', label: 'Trim' },
    { value: 'custom', label: 'Custom Pattern' }
  ];

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Transformer" 
      handles={handles}
      style={{ backgroundColor: '#fff8e8' }}
    >
      <InputField 
        label="Transform Type" 
        value={transformType} 
        onChange={(e) => setTransformType(e.target.value)} 
        options={transformOptions}
      />
      {transformType === 'custom' && (
        <InputField 
          label="Custom Pattern" 
          value={customPattern} 
          onChange={(e) => setCustomPattern(e.target.value)} 
        />
      )}
    </BaseNode>
  );
}
