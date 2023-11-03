import React from 'react';


const AlarmItem = ({ alarm, onToggleActive, onDelete }) => {
    
    return (
      <li>
        Time: {alarm.time}, Active: {alarm.active ? 'Yes' : 'No'}
        <button onClick={() => onToggleActive(alarm.id)}>
            Toggle Active
        </button>
        <button onClick={() => onDelete(alarm.id)}>
            Delete
        </button>
      </li>
    );
  };
  

export default AlarmItem;
