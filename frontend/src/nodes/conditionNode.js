// conditionNode.js - Conditional logic node

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, createHandle, InputField } from './BaseNode';

export const ConditionNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'equals');
  const [value, setValue] = useState(data?.value || '');
  const [trueLabel, setTrueLabel] = useState(data?.trueLabel || 'True');
  const [falseLabel, setFalseLabel] = useState(data?.falseLabel || 'False');

  const handles = [
    createHandle('target', Position.Left, `${id}-input`),
    createHandle('source', Position.Right, `${id}-true`),
    createHandle('source', Position.Right, `${id}-false`, { top: '70%' })
  ];

  const conditionOptions = [
    { value: 'equals', label: 'Equals' },
    { value: 'notEquals', label: 'Not Equals' },
    { value: 'greaterThan', label: 'Greater Than' },
    { value: 'lessThan', label: 'Less Than' },
    { value: 'contains', label: 'Contains' },
    { value: 'isEmpty', label: 'Is Empty' }
  ];

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Condition" 
      handles={handles}
      style={{ backgroundColor: '#f8e8f0' }}
    >
      <InputField 
        label="Condition" 
        value={condition} 
        onChange={(e) => setCondition(e.target.value)} 
        options={conditionOptions}
      />
      {condition !== 'isEmpty' && (
        <InputField 
          label="Value" 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
        />
      )}
      <InputField 
        label="True Label" 
        value={trueLabel} 
        onChange={(e) => setTrueLabel(e.target.value)} 
      />
      <InputField 
        label="False Label" 
        value={falseLabel} 
        onChange={(e) => setFalseLabel(e.target.value)} 
      />
    </BaseNode>
  );
}
