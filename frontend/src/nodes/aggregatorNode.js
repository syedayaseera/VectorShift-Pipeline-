// aggregatorNode.js - Data aggregation node

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, createHandle, InputField } from './BaseNode';

export const AggregatorNode = ({ id, data }) => {
  const [aggregationType, setAggregationType] = useState(data?.aggregationType || 'sum');
  const [groupBy, setGroupBy] = useState(data?.groupBy || '');
  const [windowSize, setWindowSize] = useState(data?.windowSize || '10');

  const handles = [
    createHandle('target', Position.Left, `${id}-input`),
    createHandle('source', Position.Right, `${id}-aggregated`)
  ];

  const aggregationOptions = [
    { value: 'sum', label: 'Sum' },
    { value: 'average', label: 'Average' },
    { value: 'count', label: 'Count' },
    { value: 'min', label: 'Minimum' },
    { value: 'max', label: 'Maximum' },
    { value: 'median', label: 'Median' },
    { value: 'mode', label: 'Mode' }
  ];

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Aggregator" 
      handles={handles}
      style={{ backgroundColor: '#e8f0f8' }}
    >
      <InputField 
        label="Aggregation Type" 
        value={aggregationType} 
        onChange={(e) => setAggregationType(e.target.value)} 
        options={aggregationOptions}
      />
      <InputField 
        label="Group By" 
        value={groupBy} 
        onChange={(e) => setGroupBy(e.target.value)} 
      />
      <InputField 
        label="Window Size" 
        value={windowSize} 
        onChange={(e) => setWindowSize(e.target.value)} 
        type="number"
      />
    </BaseNode>
  );
}
