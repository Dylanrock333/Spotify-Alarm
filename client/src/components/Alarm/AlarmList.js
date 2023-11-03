import React from 'react';
import AlarmItem from './AlarmItem';

function compareAlarms(a, b) {
    
    // Convert time strings to date objects, assuming the current day
    const timeFormat = 'YYYY-MM-DD'; // Use a fixed date for comparison
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
  
    // Create date objects for comparison
    const dateTimeA = new Date(`${currentDate}T${a.time}:00${a.amPm === 'PM' ? '+12:00' : ''}`);
    const dateTimeB = new Date(`${currentDate}T${b.time}:00${b.amPm === 'PM' ? '+12:00' : ''}`);
  
    // Compare the date objects
    return dateTimeA - dateTimeB;
}

  
const AlarmList = ({ alarms, onToggleActive, onDelete  }) => {
    const sortedAlarms = [...alarms].sort(compareAlarms);

    return (
      <ul>
        {sortedAlarms.map((alarm) => (
          <AlarmItem 
            key={alarm.id} 
            alarm={alarm}
            onToggleActive={onToggleActive}
            onDelete={onDelete} />
        ))}
      </ul>
    );
  };

export default AlarmList;
