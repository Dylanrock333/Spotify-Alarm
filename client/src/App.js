import React from 'react';
import Spotify_Auth from './Authorization';
import TokenFetcher from './getAccessToken';
import TokenContext from './TokenContext';

function App() {
  const [tokens, setTokens] = React.useState({
    access_token: null,
    refresh_token: null,
    expires_in: null
  });
  
  return (

    <TokenContext.Provider value={{ tokens, setTokens }}>
      {
        <div>
          <h1>Spotify Alarm</h1>
          <div className='App'>
            <Spotify_Auth />
            <TokenFetcher />
          </div>



        </div>
      }
    </TokenContext.Provider>
   
  );

}

export default App;
