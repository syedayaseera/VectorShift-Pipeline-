// outputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, createHandle, InputField } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handles = [
    createHandle('target', Position.Left, `${id}-value`)
  ];

  const typeOptions = [
    { value: 'Text', label: 'Text' },
    { value: 'File', label: 'Image' }
  ];

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Output" 
      handles={handles}
    >
      <InputField 
        label="Name" 
        value={currName} 
        onChange={(e) => setCurrName(e.target.value)} 
      />
      <InputField 
        label="Type" 
        value={outputType} 
        onChange={(e) => setOutputType(e.target.value)} 
        options={typeOptions}
      />
    </BaseNode>
  );
}
