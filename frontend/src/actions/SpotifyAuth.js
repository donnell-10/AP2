import React, {useState} from "react";
import {SpotifyAuth} from "react-spotify-auth";
import axios from "axios";







const Auth1 = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  //const navigate = useNavigate();
  const CLIENT_ID = '9838db9d8cb14cf9b9bbc985a3f9ee41';
  const REDIRECT_URI = 'http://localhost:3000';
  const SCOPES = ['user-read-email', 
          'user-library-read', 
          'user-library-modify', 
          'playlist-read-private', 
          'playlist-modify-public', 'playlist-modify-private', 
          'user-read-private', 'user-read-playback-state', 
          'user-modify-playback-state', 'user-read-currently-playing', 
          'app-remote-control', 'streaming', 'user-read-recently-played', 
          'user-top-read', 'user-follow-read'];
  const onAccessToken = async (accessToken, expiresIn, refreshToken) => {
      console.log('Access token:', accessToken);
      console.log('Expires in:', expiresIn);
      console.log('Refresh token:', refreshToken);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setLoggedIn(true);
      //console.log(loggedIn)
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('spotifyLI', true)
      //const LI = sessionStorage.getItem('spotifyLI')
      //console.log(LI)
      try {
        const response = await axios.get('https://api.spotify.com/v1/me', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const spotifyId = response.data.id;
        console.log('Spotify ID:', spotifyId);
        sessionStorage.setItem('spotifyId', spotifyId);
      } catch (error) {
        console.error(error);
      }
    };
    
    
    
    
    
    
  

  const refreshAccessToken = async () => {
      try {
        const response = await axios.post('https://accounts.spotify.com/api/token', {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          client_id: CLIENT_ID,
          client_secret: 'cf602882ffda4623b3f8ef75556f7cd7',
        });
  
        const newAccessToken = response.data.access_token;
        console.log('New access token:', newAccessToken);
        setAccessToken(newAccessToken);
      } catch (error) {
        console.error(error);
      }
    };
    
    return (
      <>
        <SpotifyAuth
          clientID={CLIENT_ID}
          redirectUri={REDIRECT_URI}
          scopes={SCOPES}
          //showDialog ={true}
          onAccessToken={onAccessToken}
        />
      
  
        {accessToken && refreshToken && (
          <button onClick={refreshAccessToken}>Refresh access token</button>
        )}
      </>
    );
  
};

export default (Auth1);

