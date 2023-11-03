import React, { useState } from 'react';

const AddAlarmForm = ({ onAddAlarm }) => {
  const [time, setTime] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddAlarm(time);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
 
      <button type="submit">Set Alarm</button>
    </form>
  );
};

export default AddAlarmForm;
