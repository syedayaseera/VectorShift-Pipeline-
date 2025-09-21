// filterNode.js - Data filtering node

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, createHandle, InputField } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [filterType, setFilterType] = useState(data?.filterType || 'contains');
  const [filterValue, setFilterValue] = useState(data?.filterValue || '');
  const [caseSensitive, setCaseSensitive] = useState(data?.caseSensitive || false);

  const handles = [
    createHandle('target', Position.Left, `${id}-input`),
    createHandle('source', Position.Right, `${id}-filtered`),
    createHandle('source', Position.Right, `${id}-rejected`, { top: '70%' })
  ];

  const filterOptions = [
    { value: 'contains', label: 'Contains' },
    { value: 'startsWith', label: 'Starts With' },
    { value: 'endsWith', label: 'Ends With' },
    { value: 'equals', label: 'Equals' },
    { value: 'regex', label: 'Regex' }
  ];

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Filter" 
      handles={handles}
      style={{ backgroundColor: '#f0f8e8' }}
    >
      <InputField 
        label="Filter Type" 
        value={filterType} 
        onChange={(e) => setFilterType(e.target.value)} 
        options={filterOptions}
      />
      <InputField 
        label="Filter Value" 
        value={filterValue} 
        onChange={(e) => setFilterValue(e.target.value)} 
      />
      <label style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
        <input 
          type="checkbox" 
          checked={caseSensitive} 
          onChange={(e) => setCaseSensitive(e.target.checked)}
          style={{ marginRight: '4px' }}
        />
        Case Sensitive
      </label>
    </BaseNode>
  );
}
