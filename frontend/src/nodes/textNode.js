// textNode.js

import { useState, useEffect, useMemo } from 'react';
import { Position } from 'reactflow';
import { BaseNode, createHandle, InputField } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  // Parse variables from text input
  const variables = useMemo(() => {
    const variableRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [];
    let match;
    
    while ((match = variableRegex.exec(currText)) !== null) {
      const variableName = match[1];
      if (!matches.includes(variableName)) {
        matches.push(variableName);
      }
    }
    
    return matches;
  }, [currText]);

  // Create handles based on variables
  const handles = useMemo(() => {
    const sourceHandles = [
      createHandle('source', Position.Right, `${id}-output`)
    ];
    
    const inputHandles = variables.map((variable, index) => 
      createHandle('target', Position.Left, `${id}-${variable}`, {
        top: `${20 + (index * 25)}%`
      })
    );
    
    return [...inputHandles, ...sourceHandles];
  }, [id, variables]);

  // Calculate dynamic dimensions based on text content
  const nodeDimensions = useMemo(() => {
    const lines = currText.split('\n').length;
    const maxLineLength = Math.max(...currText.split('\n').map(line => line.length));
    
    // Base dimensions
    const baseWidth = 240;
    const baseHeight = 120;
    
    // Calculate width based on content (minimum 240px, maximum 400px)
    const calculatedWidth = Math.max(baseWidth, Math.min(400, maxLineLength * 8 + 40));
    
    // Calculate height based on lines (minimum 120px, maximum 300px)
    const calculatedHeight = Math.max(baseHeight, Math.min(300, lines * 20 + 80));
    
    return {
      width: calculatedWidth,
      height: calculatedHeight
    };
  }, [currText]);

  // Update node data when text changes
  useEffect(() => {
    if (data && data.onTextChange) {
      data.onTextChange(currText);
    }
  }, [currText, data]);

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Text" 
      handles={handles}
      style={{
        width: nodeDimensions.width,
        height: nodeDimensions.height,
        backgroundColor: '#f8fafc',
        border: '2px solid var(--gray-300)',
        transition: 'all var(--transition-normal)'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <InputField 
          label="Text Template" 
          value={currText} 
          onChange={(e) => setCurrText(e.target.value)}
          placeholder="Enter text with {{ variables }}"
          multiline={true}
          rows={4}
        />
        
        {/* Variable indicators */}
        {variables.length > 0 && (
          <div style={{
            padding: 'var(--space-2)',
            background: 'var(--primary-50)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--primary-200)',
            fontSize: '0.75rem'
          }}>
            <div style={{ 
              fontWeight: '600', 
              color: 'var(--primary-700)',
              marginBottom: 'var(--space-1)'
            }}>
              Variables ({variables.length}):
            </div>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 'var(--space-1)' 
            }}>
              {variables.map((variable, index) => (
                <span 
                  key={variable}
                  style={{
                    padding: '2px 6px',
                    background: 'var(--primary-100)',
                    color: 'var(--primary-700)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.7rem',
                    fontWeight: '500',
                    border: '1px solid var(--primary-300)'
                  }}
                >
                  {variable}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Preview of parsed text */}
        <div style={{
          padding: 'var(--space-2)',
          background: 'var(--gray-50)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--gray-200)',
          fontSize: '0.75rem',
          color: 'var(--gray-600)'
        }}>
          <div style={{ fontWeight: '600', marginBottom: 'var(--space-1)' }}>
            Preview:
          </div>
          <div style={{ 
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            lineHeight: '1.4'
          }}>
            {currText || 'Enter text to see preview...'}
          </div>
        </div>
      </div>
    </BaseNode>
  );
}
