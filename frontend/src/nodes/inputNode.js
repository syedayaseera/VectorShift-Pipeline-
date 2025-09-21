import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, createHandle, InputField } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');
  const handles = [
    createHandle('source', Position.Right, `${id}-value`)
  ];
  const typeOptions = [
    { value: 'Text', label: 'Text' },
    { value: 'File', label: 'File' }
  ];

  return (
    <BaseNode 
    id={id} 
    data={data} 
    title="Input" 
    handles={handles}
  >
    <InputField 
      label="Name" 
          value={currName} 
          onChange={(e) => setCurrName(e.target.value)} 
      />
      <InputField 
        label="Type" 
        value={inputType} 
        onChange={(e) => setInputType(e.target.value)} 
        options={typeOptions}
      />
          </BaseNode>
  );
}