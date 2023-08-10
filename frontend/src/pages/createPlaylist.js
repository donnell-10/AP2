import React, { useState }  from "react";
import { useNavigate } from 'react-router-dom';

import Select from 'react-select';
import countries from "../assets/countries";
import genreOptions from "../assets/genreOptions";



import axios from 'axios';
let songIds = [];

async function searchSongs(noOfSongs, genres, country, popularity) {
    const accessToken = sessionStorage.getItem('accessToken')
    //console.log(accessToken)
    sessionStorage.setItem('accessToken', accessToken)
    try {
      // const randomCountryCode = countryCodes[Math.floor(Math.random() * 
      //     countryCodes.length)];
      

      const MigosMember = Math.floor(Math.random()*1000) + 1
      //minPopularity + Math.floor(Math.random() * (100 - minPopularity));
      const response = await axios({
        method: 'GET',
        url: 'https://api.spotify.com/v1/search',
        params: {
          q:`genre:${genres.join(',')}`, 
          type: 'track',
          limit: 50,
          market: country,
          offset: MigosMember,
          //min_popularity: minPopularity,
          //max_popularity: maxPopularity,
          //genre: genre,
        },
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const songs = response.data.tracks.items;
      const tracks = [];
      for (const song of songs){
          const artist = song.artists[0].name;
          const songName = song.name;
          const songId = song.id;                
          const existingSong = tracks.find(track => track.artist === artist && track.songName === songName);
          if (existingSong) {
          console.log(`Skipping duplicate song: ${existingSong.songName} by ${existingSong.artist}`);
          continue;
          }
          tracks.push({artist, songName, songId});
          const songPopularity = song.popularity;
          if (songPopularity <= popularity){
              console.log(artist + ' - ' + songName);
              tracks.push({artist, songName});
              songIds.push(songId);
              if (songIds.length >= noOfSongs){
                  break;
              }
          }
  
      }
      sessionStorage.setItem("songIds", JSON.stringify(songIds));
      sessionStorage.setItem("noOfSongs", noOfSongs);
      sessionStorage.setItem("location", country);
      sessionStorage.setItem('genres', genres)
      console.log(songIds)
      //sessionStorage.setItem("songIds", JSON.stringify(songIds));
    } catch (error) {
      console.error(error);
    }
  }

function CreatePlaylist () {
    const navigate = useNavigate();
    const location = localStorage.getItem('countryCode')
    const [no_of_songs, setNumber] = useState(1);
    const [genres, setGenres] = useState([]);
    const [popularity, setPopularity] = React.useState(0);
    const [country, setCountry] = useState(location);

    

    const [playlistName, setPlaylistName] = React.useState('');
    var safeInputValue = no_of_songs !== null && no_of_songs !== undefined ? no_of_songs : 0;

    const handleChange = (event) => {
        setNumber(event.target.value);
    }

    const handleSubmit = async () => {
        console.log("Playlist Name: ", playlistName);
        console.log(popularity);
        console.log("No. of songs: ", no_of_songs);
        sessionStorage.setItem("playlistName", playlistName);
        await searchSongs(no_of_songs, genres, country, popularity);
        const LI = sessionStorage.getItem('spotifyLI')
        if (LI==='true'){
            navigate('/new-playlist')
        }
        else{
            alert('Login with spotify to create a playlist')
        }
    }

    
    return(
        <div style={{display:'flex', flexDirection:'column'}}>
            <div className='grid containter mb-1' style={{background:'#48EF48', border:'1px', borderRadius:'2px', gridTemplateColumns: ' 1050px 200px', display:'flex', flexWrap:'wrap', height:'100vh', justifyContent:'center', alignItems:'center', overflow:'hidden'}}>
                <div className='grid-item' style={{marginBottom:'50px'}}>
                    <h1 style={{color:'white'}}>
                        Create A New Playlist
                    </h1>
                
                <div className="grid-item">
                    <div className='form-group'>
                        <label className='input-label' style={{color:'white', fontSize:'22px'}}>
                            Playlist Name
                        </label>
                        <div style={{display:'flex', width:'150%', marginBottom:'30px'}}>
                            <input
                                className="form-control"
                                type='text'
                                placeholder="Enter Playlist Name"
                                name="playlistName"
                                value={playlistName}
                                onChange={(event)=>{setPlaylistName(event.target.value)}}
                                required
                            />
                        </div>
                        <label className='slider-label' style={{color:'white',fontSize:'22px'}}>
                            Number Of Songs: {no_of_songs}
                        </label>
                        <div style={{display:'flex', width:'150%', marginBottom:'30px'}}>
                            <input
                                className="form-control-range"
                                type='range'
                                id="no_of_songs"
                                min = '1'
                                max='30'
                                step='1'
                                value={safeInputValue}
                                onChange = {handleChange}
                                style={{width:'80%'}}
                            />
                        </div>
                        <label style={{color:'white', fontSize:'22px'}}>
                            Genres
                        </label>
                        <div style={{marginBottom:'30px'}}>
                            <Select
                                multiple
                                isMulti={true}
                                id = 'genre'
                                options={genreOptions}
                                isSearchable={true}
                                placeholder = 'Select Genres'
                                onChange={(selectedOptions) => {
                                    const selectedValues = selectedOptions.map((option) => option.value);
                                    setGenres(selectedValues);
                                  }}
                            />
                        </div>
                        <label className='slider-label' style={{color:'white',fontSize:'22px'}}>
                            Popularity: {popularity}
                        </label>
                        <div style={{display:'flex', width:'150%', marginBottom:'30px'}}>
                            <input
                                className="form-control-range"
                                type='range'
                                id="popularity"
                                min='0'
                                max='100'
                                step='1'
                                onChange={(event) => setPopularity(event.target.value)}
                                style={{width:'80%'}}
                            />
                        </div>
                        <label className='input-label' style={{color:'white',fontSize:'22px'}}>
                            Location: {country}
                        </label>
                        <div style={{display:'flex', width:'150%', marginBottom:'30px', }}> 
                            <Select 
                            options={countries}
                            isSearchable={true}
                            id='location'
                            placeholder= 'Your Country'
                            onChange={(selectedOption) => setCountry(selectedOption.value)}
                            styles={{ 
                                control: (provided) => ({ 
                                  ...provided,
                                  minWidth:'400px', 
                                  borderRadius: 5, 
  
                                }), 
                                menu: (provided) => ({
                                    ...provided,
                                    minWidth:'400px',
                                    minHeight:'20px',
                                    fontSize: '14px',
                                  }),
                              }}
                            />
                
                           
                        </div>
                        <button className='btn btn-lg' type="submit" style={{background:'black', color:'white', width:'200px'}} onClick={handleSubmit}>
                            Create Playlist
                        </button>
                    </div>
                    </div>
                </div>            

            </div>

        </div>
    )


}

export {songIds};
export default CreatePlaylist
sessionStorage.clear()