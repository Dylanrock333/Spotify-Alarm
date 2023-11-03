import React, { useContext, useEffect, useState } from 'react';
import TokenContext from '../Spotify/TokenContext';

function Playlists() {
  const { tokens } = useContext(TokenContext);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (tokens.access_token) {
      const fetchPlaylists = async () => {
        try {
          const response = await fetch('https://api.spotify.com/v1/me/playlists', {
            headers: {
              'Authorization': `Bearer ${tokens.access_token}`
            }
          });
          const data = await response.json();
          setPlaylists(data.items);
        } catch (error) {
          console.error('Error fetching playlists:', error);
        }
      };

      fetchPlaylists();
    }
  }, [tokens.access_token]);

  const startPlayback = async (playlistUri) => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${tokens.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ context_uri: playlistUri }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Playback started');
    } catch (error) {
      console.error('Error starting playback:', error);
    }
  };
  
  return (
    <div>
      {playlists.map(playlist => (
        <div key={playlist.id}>
          <h3>{playlist.name}</h3>
          <button onClick={() => startPlayback(playlist.uri)}>Play</button>
        </div>
      ))}
    </div>
  );
}

export default Playlists;
