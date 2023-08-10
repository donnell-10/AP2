import React, {useState} from 'react'
import Auth from '../actions/SpotifyAuth'
import { Link } from "react-router-dom";
import DatePicker from 'react-datepicker';
import Select from 'react-select';
// const AUTH_URL = 
// "https://accounts.spotify.com/authorize?client_id=9838db9d8cb14cf9b9bbc985a3f9ee41&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-email%20user-library-read%20user-library-modify%20playlist-read-private%20playlist-modify-public%20playlist-modify-private%20user-read-private%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20app-remote-control%20streaming%20user-read-recently-played%20user-top-read%20user-follow-read"

// green:#0DC80D
// pale green: #48EF48

export default function SpotifyLogin() {
    const [no_of_songs, setNumber] = useState(1);
const handleChange = (event) => {
  setNumber(event.target.value);
}
var safeInputValue = no_of_songs !== null && no_of_songs !== undefined ? no_of_songs : 0;
const genreOptions = [
  { value: 'rap', label: 'Rap' },
  { value: 'pop', label: 'Pop' },
  { value: 'hip-hop', label: 'Hip-Hop' },
  { value: 'uk hip-hop', label: 'UK Hip-Hop' },
  { value: 'uk pop', label: 'UK Pop' },
  { value: 'country', label: 'Country' },
  { value: 'reggaeton', label: 'Reggaeton' },
];


const genres = [
  'Alternative',
  'Blues',
  'Classical',
  'Country',
  'Dance',
  'Electronic',
  'Hip-hop',
  'Jazz',
  'Latin',
  'Metal',
  'Pop',
  'R&B',
  'Reggae',
  'Rock',
  'Soul',
];
const [searchTerm, setSearchTerm] = useState('');
const [searchResults, setSearchResults] = useState([]);

const handleSearchTermChange = (event) => {
  setSearchTerm(event.target.value);
  const results = genres.filter((genre) => genre.toLowerCase().includes(event.target.value.toLowerCase()));
  setSearchResults(results);
};
  
  return (
    <div style={{display:'flex', flexDirection:'column'}}>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', background:'#48EF48', width:'100%', border:'1px', borderRadius:'2px', height:'100vh'}}>
          <div style={{textAlign:'center', marginBottom:'50px'}}>
            <h2 style={{color:'white'}}>Create A New Password</h2>
            <form>
              <div className='form-group' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <label className='input-label' style={{color:'white',fontSize:'20px'}}>
                  New Password
                </label>
                <div style={{ display: 'flex', justifyContent: 'center', width: '150%', marginBottom:'30px' }}>
                  <input
                      className='form-control'
                      type='password'
                      name='new_password'
                      placeholder='New Password'
                      required
                      minLength='6'
                      style={{width: '100%', maxWidth: '1000px', margin: '0 auto' }}
                  />
                </div>
                <label className='input-label' style={{color:'white',fontSize:'20px'}}>
                  Confirm Password
                </label>
                <div style={{ display: 'flex', justifyContent: 'center', width: '150%', marginBottom:'30px' }}>
                  <input
                    className='form-control'
                    type='password'
                    name='re_password'
                    placeholder='Confirm Password'
                    required
                    minLength='6'
                    style={{width: '100%', maxWidth: '1000px', margin: '0 auto' }}
                  />
                </div>
              </div>            
              <button
                style={{background:'black', color:'white', width:'300px'}}
                type = 'submit'
                className="btn btn-lg "
                >
                  Reset Password
                </button>
            </form>

            
          </div>
      </div>
    </div>
  )
}

// ['user-read-email', 
//             'user-library-read', 
//             'user-library-modify', 
//             'playlist-read-private', 
//             'playlist-modify-public', 'playlist-modify-private', 
//             'user-read-private', 'user-read-playback-state', 
//             'user-modify-playback-state', 'user-read-currently-playing', 
//             'app-remote-control', 'streaming', 'user-read-recently-played', 
//             'user-top-read', 'user-follow-read'];
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const SPOTIFY_CLIENT_ID = '9838db9d8cb14cf9b9bbc985a3f9ee41';
// const SPOTIFY_REDIRECT_URI = 'http://localhost:3000/generate-playlist'; // Change this to your callback URL

// const SpotifyLogin = () => {
//   const [accessToken, setAccessToken] = useState('');
//   const [refreshToken, setRefreshToken] = useState('');
//   const [expiresIn, setExpiresIn] = useState('');

//   useEffect(() => {
//     // Check if the URL contains an access token and refresh token
//     const urlSearchParams = new URLSearchParams(window.location.search);
//     const params = Object.fromEntries(urlSearchParams.entries());
//     const { access_token, refresh_token, expires_in } = params;
//     if (access_token && refresh_token && expires_in) {
//       setAccessToken(access_token);
//       setRefreshToken(refresh_token);
//       setExpiresIn(expires_in);
//       console.log(access_token)
//     }
//   }, []);

//   const handleSpotifyLogin = () => {
//     // Generate a random state value for CSRF protection
//     const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

//     // Store the state value in session storage
//     sessionStorage.setItem('spotify_auth_state', state);

//     // Redirect the user to the Spotify authorization page
//     const queryParams = new URLSearchParams({
//       response_type: 'code',
//       client_id: SPOTIFY_CLIENT_ID,
//       redirect_uri: SPOTIFY_REDIRECT_URI,
//       state,
//       scope: 'user-read-private user-read-email' // Change this to the required scopes
//     });
//     const authorizationUrl = `https://accounts.spotify.com/authorize?${queryParams.toString()}`;
//     window.location.href = authorizationUrl;
//   };

//   const handleSpotifyCallback = async () => {
//     // Check if the URL contains an error message
//     const urlSearchParams = new URLSearchParams(window.location.search);
//     const params = Object.fromEntries(urlSearchParams.entries());
//     if (params.error) {
//       console.error(params.error);
//       return;
//     }

//     // Check the state value for CSRF protection
//     const storedState = sessionStorage.getItem('spotify_auth_state');
//     const { state, code } = params;
//     if (state === null || state !== storedState) {
//       console.error('Invalid state parameter');
//       return;
//     }

//     // Exchange the authorization code for an access token and refresh token
//     const requestBody = new URLSearchParams({
//       grant_type: 'authorization_code',
//       code,
//       redirect_uri: SPOTIFY_REDIRECT_URI
//     }).toString();
//     const { data } = await axios.post('https://accounts.spotify.com/api/token', requestBody, {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         Authorization: `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`)}`
//       }
//     });
//     setAccessToken(data.access_token);
//     setRefreshToken(data.refresh_token);
//     setExpiresIn(data.expires_in);
    
//   };

//   return (
//     <div>
//       <button onClick={handleSpotifyLogin}>Login with Spotify</button>
//       {accessToken && refreshToken && expiresIn && (
//         <div>
//           <p>Access Token: {accessToken}</p>
//           <p>Refresh Token: {refreshToken}</p>
//           <p>Expires In: {expiresIn}</p>
//         </div>
//       )}
//     </div>
//   )}

// export default SpotifyLogin;
// import React, {useState}from 'react';
// import {SpotifyAuth} from 'react-spotify-auth';

// const CLIENT_ID = '9838db9d8cb14cf9b9bbc985a3f9ee41';
// const SCOPES = ['user-read-email', 
//             'user-library-read', 
//             'user-library-modify', 
//             'playlist-read-private', 
//             'playlist-modify-public', 'playlist-modify-private', 
//             'user-read-private', 'user-read-playback-state', 
//             'user-modify-playback-state', 'user-read-currently-playing', 
//             'app-remote-control', 'streaming', 'user-read-recently-played', 
//             'user-top-read', 'user-follow-read'];


//   const SpotifyLogin = () => {
    
//     function handleAuth(token, refreshToken, expiresIn) {
//     console.log('Access token:', token);
//     console.log('Refresh token:', refreshToken);
//     console.log('Expires in:', expiresIn);
//     setAccessToken(token);
//     sessionStorage.setItem('accessToken', accessToken);
//   }
    
//     const [accessToken, setAccessToken] = useState('');
//     const [refreshToken, setRefreshToken] = useState('');
//     return (
//       <div className="App">
//         <SpotifyAuth
//           clientID={CLIENT_ID}
//           redirectUri="http://localhost:3000/generate-playlist"
//           scopes = {SCOPES}
//           onAccessToken={handleAuth}
//         />
//       </div>
//     );
//   }
  
//   export default SpotifyLogin;