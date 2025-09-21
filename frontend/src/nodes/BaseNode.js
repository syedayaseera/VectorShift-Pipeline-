import { Handle } from 'reactflow';
import './BaseNode.css';

export const BaseNode = ({ 
  id, 
  data, 
  title, 
  handles = [], 
  children, 
  style = {},
  className = "",
  nodeType = "default"
}) => {
  return (
    <div 
      className={`base-node base-node--${nodeType} ${className}`}
      style={style}
    >
      {/* Render handles */}
      {handles.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style}
        />
      ))}
      
      {/* Title section with icon */}
      {title && (
        <div className="base-node__title">
          <div className="base-node__dot" />
          <h3>{title}</h3>
        </div>
      )}
      
      {/* Content section */}
      <div className="base-node__content">
        {children}
      </div>
    </div>
  );
};

// Helper function to create handle configurations
export const createHandle = (type, position, id, style = {}) => ({
  type,
  position,
  id,
  style
});

// Helper function for common input fields
export const InputField = ({ 
  label, 
  value, 
  onChange, 
  type = "text", 
  options = null, 
  placeholder = "",
  multiline = false,
  rows = 3
}) => {
  return (
    <div className="input-field">
      <label>{label}</label>
      {options ? (
        <select 
          className="select" 
          value={value} 
          onChange={onChange}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : multiline ? (
        <textarea 
          className="textarea"
          value={value} 
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
        />
      ) : (
        <input 
          className="input"
          type={type} 
          value={value} 
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};
