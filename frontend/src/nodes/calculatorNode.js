// calculatorNode.js - Mathematical operations node

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, createHandle, InputField } from './BaseNode';

export const CalculatorNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');
  const [value, setValue] = useState(data?.value || '0');

  const handles = [
    createHandle('target', Position.Left, `${id}-input`),
    createHandle('source', Position.Right, `${id}-result`)
  ];

  const operationOptions = [
    { value: 'add', label: 'Add' },
    { value: 'subtract', label: 'Subtract' },
    { value: 'multiply', label: 'Multiply' },
    { value: 'divide', label: 'Divide' },
    { value: 'power', label: 'Power' }
  ];

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Calculator" 
      handles={handles}
      style={{ backgroundColor: '#e8f4fd' }}
    >
      <InputField 
        label="Operation" 
        value={operation} 
        onChange={(e) => setOperation(e.target.value)} 
        options={operationOptions}
      />
      <InputField 
        label="Value" 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
        type="number"
      />
    </BaseNode>
  );
}
