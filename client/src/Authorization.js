// MyComponent.js
import React from 'react';

function Spotify_Auth() {

  return (
    <div>
      <button onClick={() => window.location.href = 'http://localhost:5000/login'}>
        Get Spotify Access Token
      </button>
    </div>
);

}

export default Spotify_Auth;
