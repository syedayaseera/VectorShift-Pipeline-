// submit.js

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

export const SubmitButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { nodes, edges } = useStore(
        (state) => ({ nodes: state.nodes, edges: state.edges }),
        shallow
    );

    const showAlert = (title, message, type = 'info') => {
        // Create a modern alert modal
        const alertDiv = document.createElement('div');
        alertDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            font-family: var(--font-family);
        `;

        const alertContent = document.createElement('div');
        alertContent.style.cssText = `
            background: white;
            border-radius: var(--radius-lg);
            padding: var(--space-6);
            max-width: 500px;
            width: 90%;
            box-shadow: var(--shadow-xl);
            border: 1px solid var(--gray-200);
            position: relative;
        `;

        const colors = {
            success: { bg: 'var(--success-50)', border: 'var(--success-200)', text: 'var(--success-700)' },
            error: { bg: 'var(--error-50)', border: 'var(--error-200)', text: 'var(--error-700)' },
            info: { bg: 'var(--primary-50)', border: 'var(--primary-200)', text: 'var(--primary-700)' }
        };

        const color = colors[type] || colors.info;

        alertContent.innerHTML = `
            <div style="
                display: flex;
                align-items: center;
                margin-bottom: var(--space-4);
                padding: var(--space-3);
                background: ${color.bg};
                border: 1px solid ${color.border};
                border-radius: var(--radius-md);
                color: ${color.text};
            ">
                <span style="font-size: 1.5rem; margin-right: var(--space-2);">
                    ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
                </span>
                <h3 style="margin: 0; font-size: 1.125rem; font-weight: 600;">
                    ${title}
                </h3>
            </div>
            <div style="
                font-size: 0.875rem;
                line-height: 1.6;
                color: var(--gray-700);
                margin-bottom: var(--space-4);
            ">
                ${message}
            </div>
            <button onclick="this.closest('.alert-container').remove()" style="
                background: var(--primary-600);
                color: white;
                border: none;
                padding: var(--space-2) var(--space-4);
                border-radius: var(--radius-md);
                font-weight: 500;
                cursor: pointer;
                width: 100%;
                transition: all var(--transition-fast);
            " onmouseover="this.style.background='var(--primary-700)'" 
               onmouseout="this.style.background='var(--primary-600)'">
                Close
            </button>
        `;

        alertContent.className = 'alert-container';
        alertDiv.appendChild(alertContent);
        document.body.appendChild(alertDiv);

        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 10000);
    };

    const handleSubmit = async () => {
        if (nodes.length === 0) {
            showAlert(
                'No Pipeline',
                'Please add some nodes to your pipeline before submitting.',
                'error'
            );
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nodes: nodes,
                    edges: edges
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Create user-friendly message
            const dagStatus = data.is_dag ? '✅ Valid DAG' : '⚠️ Contains Cycles';
            const connectionStatus = data.is_connected ? '✅ Connected' : '⚠️ Disconnected Components';
            
            const message = `
                <div style="margin-bottom: var(--space-3);">
                    <strong>Pipeline Analysis Results:</strong>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); margin-bottom: var(--space-3);">
                    <div style="padding: var(--space-2); background: var(--gray-50); border-radius: var(--radius-md);">
                        <div style="font-weight: 600; color: var(--gray-700);">Nodes</div>
                        <div style="font-size: 1.25rem; font-weight: 700; color: var(--primary-600);">${data.num_nodes}</div>
                    </div>
                    <div style="padding: var(--space-2); background: var(--gray-50); border-radius: var(--radius-md);">
                        <div style="font-weight: 600; color: var(--gray-700);">Edges</div>
                        <div style="font-size: 1.25rem; font-weight: 700; color: var(--primary-600);">${data.num_edges}</div>
                    </div>
                </div>
                <div style="margin-bottom: var(--space-2);">
                    <div style="font-weight: 600; margin-bottom: var(--space-1);">Graph Structure:</div>
                    <div style="margin-bottom: var(--space-1);">${dagStatus}</div>
                    <div>${connectionStatus}</div>
                </div>
                ${data.node_types && data.node_types.length > 0 ? `
                    <div style="margin-top: var(--space-3);">
                        <div style="font-weight: 600; margin-bottom: var(--space-1);">Node Types:</div>
                        <div style="display: flex; flex-wrap: wrap; gap: var(--space-1);">
                            ${data.node_types.map(type => `
                                <span style="
                                    padding: 2px 6px;
                                    background: var(--primary-100);
                                    color: var(--primary-700);
                                    border-radius: var(--radius-sm);
                                    font-size: 10 rem;
                                    font-weight: 500;
                                ">${type}</span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            `;

            showAlert(
                'Pipeline Analysis Complete',
                message,
                data.is_dag ? 'success' : 'error'
            );

        } catch (error) {
            console.error('Error submitting pipeline:', error);
            showAlert(
                'Submission Failed',
                `Failed to analyze pipeline: ${error.message}. Please make sure the backend server is running on http://localhost:8000`,
                'error'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '24px',
            background: 'linear-gradient(135deg, #f8fafc 0%, #f0f9ff 100%)',
            borderTop: '1px solid #e2e8f0',
            minHeight: '80px'
        }}>
            <button 
                onClick={handleSubmit}
                disabled={isLoading}
                style={{
                    padding: '12px 32px',
                    fontSize: '15px',
                    fontWeight: '600',
                    minWidth: '160px',
                    background: isLoading ? '#94a3b8' : '#0284c7',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.7 : 1,
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    position: 'relative',
                    overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                    if (!isLoading) {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isLoading) {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                    }
                }}
            >
                {isLoading ? '⏳ Analyzing...' : '🚀 Execute Pipeline'}
            </button>
        </div>
    );
}
