// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    const nodeCategories = [
        {
            title: 'Data Flow',
            description: 'Input and output operations',
            nodes: [
                { type: 'customInput', label: 'Input', icon: '📥' },
                { type: 'customOutput', label: 'Output', icon: '📤' }
            ]
        },
        {
            title: 'Processing',
            description: 'Data transformation and AI',
            nodes: [
                { type: 'text', label: 'Text', icon: '📝' },
                { type: 'llm', label: 'LLM', icon: '🤖' },
                { type: 'transformer', label: 'Transform', icon: '🔄' }
            ]
        },
        {
            title: 'Logic & Analysis',
            description: 'Conditional logic and calculations',
            nodes: [
                { type: 'filter', label: 'Filter', icon: '🔍' },
                { type: 'condition', label: 'Condition', icon: '❓' },
                { type: 'calculator', label: 'Calculate', icon: '🧮' },
                { type: 'aggregator', label: 'Aggregate', icon: '📊' }
            ]
        }
    ];

    return (
        <div style={{ 
            margin: '4px',
            background: '#ffffff',
            borderRadius: '4px',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb',
            overflow: 'hidden'
        }}>
            {/* Ultra Minimal Header */}
            <div style={{ 
                padding: '2px 6px',
                background: '#f8fafc',
                borderBottom: '1px solid #e5e7eb'
            }}>
                <h3 style={{ 
                    margin: 0, 
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#374151',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}>
                    Components
                </h3>
            </div>
            
            {/* Ultra Minimal Node Categories */}
            <div style={{ padding: '10px 10px' }}>
                {nodeCategories.map((category, categoryIndex) => (
                    <div key={category.title} style={{ 
                        marginBottom: categoryIndex < nodeCategories.length - 1 ? '2px' : '0'
                    }}>
                        <div style={{
                            fontSize: '15px',
                            fontWeight: '500',
                            color: '#6b7280',
                            margin: '5px 1px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            {category.title}
                        </div>
                        <div style={{ 
                            display: 'flex', 
                            flexWrap: 'wrap',
                            gap: '30px'
                        }}>
                            {category.nodes.map((node) => (
                                <DraggableNode 
                                    key={node.type}
                                    type={node.type} 
                                    label={node.label}
                                    icon={node.icon}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
