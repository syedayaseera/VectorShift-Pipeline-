import './draggableNode.css';

export const DraggableNode = ({ type, label, icon = null }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.target.style.transform = 'scale(0.95)';
      event.target.style.opacity = '0.8';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    const onDragEnd = (event) => {
      event.target.style.cursor = 'grab';
      event.target.style.transform = 'scale(1)';
      event.target.style.opacity = '1';
    };

    const getNodeStyle = (nodeType) => {
      const styles = {
        customInput: { background: '#ffffff', borderColor: '#10b981', color: '#065f46', iconBg: '#d1fae5' },
        llm: { background: '#ffffff', borderColor: '#3b82f6', color: '#1e40af', iconBg: '#dbeafe' },
        customOutput: { background: '#ffffff', borderColor: '#f59e0b', color: '#92400e', iconBg: '#fef3c7' },
        text: { background: '#ffffff', borderColor: '#6b7280', color: '#374151', iconBg: '#f3f4f6' },
        calculator: { background: '#ffffff', borderColor: '#8b5cf6', color: '#5b21b6', iconBg: '#ede9fe' },
        filter: { background: '#ffffff', borderColor: '#06b6d4', color: '#0e7490', iconBg: '#cffafe' },
        transformer: { background: '#ffffff', borderColor: '#f59e0b', color: '#92400e', iconBg: '#fef3c7' },
        condition: { background: '#ffffff', borderColor: '#ec4899', color: '#be185d', iconBg: '#fce7f3' },
        aggregator: { background: '#ffffff', borderColor: '#10b981', color: '#065f46', iconBg: '#d1fae5' }
      };
      return styles[nodeType] || styles.text;
    };

    const nodeStyle = getNodeStyle(type);

    return (
      <div
        className={`draggable-node draggable-node--${type}`}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={onDragEnd}
        style={{ 
          border: `1px solid ${nodeStyle.borderColor}`,
          backgroundColor: nodeStyle.background
        }}
        draggable
      >
        {icon && (
          <div 
            className="draggable-node-icon"
            style={{ color: nodeStyle.color }}
          >
            {icon}
          </div>
        )}
        
        <span 
          className="draggable-node-label"
          style={{ color: nodeStyle.color }}
        >
          {label}
        </span>
      </div>
    );
};
