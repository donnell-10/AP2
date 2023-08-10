
import React, { useState, useEffect }  from "react";
import axios from 'axios';
import { addPlaylist } from "../actions/userData";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import coverImages from "../assets/images";
import './styles.css'


const PlaylistView = ({isAuthenticated, user, addPlaylist}) => {
    
    const navigate = useNavigate();
    const [tracks, setTracks] = useState([]);
    const [error, setError] = useState(null);
    const [orderBy, setOrderBy] = useState('name');
    
    const songIds = JSON.parse(sessionStorage.getItem("songIds"));
    const noOfSongs = sessionStorage.getItem('noOfSongs');
    const genres = sessionStorage.getItem('genres')
    const location = sessionStorage.getItem('location');
    const playlistName = sessionStorage.getItem('playlistName');
    const [numberOfSongs, setNumber] = useState(noOfSongs);
    const [avgPopularity, setAverageP] = useState(null);
    const accessToken = sessionStorage.getItem('accessToken')
    const [trackids, setTrackIds] = useState(songIds)
    const spotifyId = sessionStorage.getItem('spotifyId')


    const randomIndex = Math.floor(Math.random() * coverImages.length);
    const coverImageUrl = coverImages[randomIndex];
    
    const handleSubmit = async() => {

      setTrackIds( tracks.map((track) => track.id))
      await addPlaylist(user.id, playlistName, location, trackids, numberOfSongs, coverImageUrl)
      
      console.log('Playlist saved')
      console.log(user.email)
      alert('Playlist Saved')
      navigate('/dashboard')
      if (!isAuthenticated) 
        navigate('/');
    }
    
    const createSpotifyPlaylist = async (accessToken, spotifyId, playlistName, trackids) => {
      const res = await axios.post (`https://api.spotify.com/v1/users/${spotifyId}/playlists`, {
        name: playlistName,
        public: false,
      }, {
        headers:{
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
      });
      const playlistId = res.data.id
      await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        uris: trackids.map(id => `spotify:track:${id}`)
      },{
        headers:{
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      })
      console.log('Playlist added to Spotify')
    }
    const handleSpotify = async() => {
      await createSpotifyPlaylist(accessToken, spotifyId, playlistName, trackids);
      alert('Playlist added to Spotify Library!')
    }

    const handleSortByArtist = () => {
      const sortedTracks = [...tracks].sort((a, b) => {
        const nameA = a.artists[0].name.toUpperCase();
        const nameB = b.artists[0].name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setOrderBy('artist');
      setTracks(sortedTracks);
      const sortedTrackIds = sortedTracks.map(track=> track.id)
      setTrackIds(sortedTrackIds)

    };

    const handleSortByName = () => {
      const sortedTracks = [...tracks].sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setOrderBy('name');
      setTracks(sortedTracks);
      const sortedTrackIds = sortedTracks.map(track=> track.id)
      setTrackIds(sortedTrackIds)

    };

    const handleDelete = (trackid) => {
      setTracks(tracks.filter((track) => track.id !== trackid));
      setTrackIds(trackids.filter((id) => id !== trackid));
     
    
      
      setNumber(parseInt(numberOfSongs) - 1);
    };

    const handleHelp = () => {
      alert('Click the Album Cover to hear a snippet of the song!')
  }
    useEffect(() => {
      const totalPopularity = tracks.reduce((accumulator, track) => accumulator + track.popularity, 0);
      const average = totalPopularity / tracks.length;
      setAverageP(average.toFixed(2));
    }, [tracks]);


    function durationInMins (milliseconds){
      const ms = parseInt(milliseconds)
      const minutes = Math.floor(ms/60000).toString();
      const seconds = Math.floor((ms % 60000)/1000).toString().padStart(2, '0');
      const duration = minutes + ':' + seconds
      return duration;
    }

    useEffect(() => {
      
      const fetchTracks = async () => {
        try{
        const response = await axios.get(
          `https://api.spotify.com/v1/tracks?ids=${songIds.join(',')}`,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          }
        );
        setTracks(response.data.tracks);
        
      } catch(err){
        setError(err)
        console.log(songIds);
      }};
      fetchTracks();
      sessionStorage.removeItem('songIds');
      //sessionStorage.clear('songIds')
    }, []);
    
    if (error) {
        return <div>An error occurred: {error.message}</div>;
      }

    return(
      <div style={{display:'flex', flexDirection:'column', background:'#48EF48',}}>
        <div className="container mt-5" style={{ width:'100%'}}>
            <div className="row">
                <div className="col">
                    <h2 className="text-center">New Playlist</h2>
                </div>
            </div>
            <div className="row justify-content-center align-items-center mt-4">
                <div className="col-sm-8">
                    <div className="row align-items-center">
                        <div className="col-4 col-sm-4">
                            <div className="card">
                                <img src={coverImageUrl}
                                className="card-img-top" 
                                alt="Playlist Cover"
                                width='200'
                                height='225'/>
                            </div>
                        </div>
                        <div className="col-8 col-sm-8">
                            <h4>{playlistName}</h4>
                            <p>{numberOfSongs} Songs</p>
                            <p>Location: {location}</p>
                            <p>Genres: {genres}</p>
                            <p>Average Popularity: {avgPopularity}</p>
                        </div>
                        <div className="col-12 col-sm-8 ">
                          <div className="row align-items-center">
                            <div className="col-8 col-sm-8">
                              <button className="btn btn-primary" onClick={handleSpotify}>
                                Save Playlist To Spotify
                              </button>
                            </div>
                          </div>
                        </div>
                        <button type='button' className="btn bt-sm" onClick={handleHelp}>
                          <i class="bi bi-info-circle-fill"></i>
                        </button>

                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <div className="row align-items-center">
                        <div className="col">
                            <button className="btn btn-link"  onClick={handleSortByName}>Sort by Name</button>
                            <button className="btn btn-link"  onClick={handleSortByArtist}>Sort by Artist</button>
                        </div>
                    </div>
                    {tracks.map((track, index) => (
                    <div className="row mt-3" key={index}>
                        <div className="col">
                            <div className="card">
                                <div className="row align-items-center">
                                    <div className="col-4 col-sm-2">
                                      <div className="albumCover">
                                        <audio id="audio-player" src="" />
                                          <img src={track.album.images[2].url} 
                                            alt={track.album.name} 
                                            className="card-img-top img-fluid rounded " 
                                            style={{height: "100px", width: "100px", objectFit: "cover"}}
                                            onClick ={() => {
                                              const audioPlayer = document.getElementById('audio-player')
                                              audioPlayer.src = track.preview_url;
                                              audioPlayer.play()
                                            }}
                                            onMouseOver ={(e) => {
                                              e.target.classList.add('hover')
                                              
                                            }}
                                            onMouseOut={(e) => {
                                              e.target.classList.remove("hover");
                                            }}
                                        />
                                        <button className='playButton'>
                                          <i className="bi bi-play-fill"></i>
                                        </button>
                                      </div>
                                    </div>
                                <div className="col-8 col-sm-6">
                                    <div className="card-body">
                                        <h5 className="card-title">{track.name}</h5>
                                        <p className="card-text">{track.artists.map((artist) => artist.name).join(", ")}</p>
                                    </div>
                                </div>
                        <       div className="col-sm-2">
                                    <p>{durationInMins(track.duration_ms)}</p>
                                </div>
                                <div className="col-sm-2">
                                    <button className="btn btn-danger" onClick={() => handleDelete(track.id)}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                    <button className="btn btn-primary" onClick={() => window.open(track.external_urls.spotify, '_blank')}>Open In Spotify</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
                </div>

            </div> 
            <div style={{display:'flex', justifyContent:'center', alignItems:'center',}}>               
            {!!user  &&  <button className ='btn btn-lg' type='submit' 
                onClick={handleSubmit}
                style={{background:'black', color:'white', marginTop:'30px', width:'200px' }}
                >
                  Save Playlist</button>}
            </div>  
        </div>
    </div>
    )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});


export default connect(mapStateToProps, {addPlaylist}) (PlaylistView);