import React, { useState } from 'react';
import Spotify_Auth from './Spotify/Authorization';
import TokenFetcher from './Spotify/getAccessToken';
import TokenContext from './Spotify/TokenContext';
import Playlists from './components/Playlists';
import AlarmList from './components/Alarm/AlarmList';
import AddAlarmForm  from './components/Alarm/AddAlarmForum.js';

function App() {
  const [alarms, setAlarms] = useState([]); 
  const addAlarm = (time) => { 
    const newAlarm = {
      id: Date.now(), // Unique identifier for each alarm
      time: time,
      amPm: 'AM',
      active: true // Assuming new alarms are active by default
    };
    setAlarms([...alarms, newAlarm]); 
  };
  const toggleActive = (id) => {
    setAlarms(alarms.map(alarm => {
      if (alarm.id === id) {
        return { ...alarm, active: !alarm.active };
      }
      return alarm;
    }));
  };
  const deleteAlarm = (id) => {
    setAlarms(alarms.filter(alarm => alarm.id !== id));
  };

  const [tokens, setTokens] = React.useState({
    access_token: null,
    refresh_token: null,
    expires_in: null
  });

  
  return (

    <TokenContext.Provider value={{ tokens, setTokens }}>
      {
        <div>
          <h1>The Future is Here</h1>
          <div className='App'>
            <Spotify_Auth />
            <TokenFetcher />

            <AddAlarmForm onAddAlarm={addAlarm}/>
            <AlarmList alarms={alarms} onToggleActive={toggleActive} onDelete={deleteAlarm}/>
          </div>

     

        </div>
      }
    </TokenContext.Provider>
   
  );

}

export default App;
