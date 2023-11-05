import React, { useState, useEffect } from 'react';

const CurrentTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date()); // Update time every second
    }, 1000);

    // Clean up the interval on unmount
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div>
    {time.toLocaleTimeString()}
    </div>
  );
};

export default CurrentTime;
