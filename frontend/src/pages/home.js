import React, {useState, useEffect} from "react";
import {useNavigate } from "react-router-dom";
import Auth1 from "../actions/SpotifyAuth";

import { getAllPlaylist } from "../actions/userData";
import { connect } from "react-redux";





//localStorage.setItem('code', code)
const Home = ({getAllPlaylist}) => {
    //if (code ){
        //const accessToken = SpAuth()
        //console.log(accessToken)
    //}
        //  const accessToken= SpAuth(code)
        //  console.log(accessToken)
    //api key for ip: at_t7XeLyqWyhEyeLiKp86ZhMxwWiFQh
    const navigate = useNavigate();
    //const [ipInfo, setIpInfo] = useState({});
    const handleLocation = () =>{
        //fetch('http://ipinfo.io/json')
        fetch('https://geo.ipify.org/api/v2/country?apiKey=at_t7XeLyqWyhEyeLiKp86ZhMxwWiFQh')
            .then (res => res.json())
            .then (info => {
                const countryCode = info.location.country;
                setCountry(countryCode)
                console.log(`Country Code:${countryCode}` )
                localStorage.setItem('countryCode', countryCode)
                // fetch(`http://ip-api.com/json/${publicIp}`)
                //     .then(res => res.json())
                //     .then(info => {
                //         const countryCode = info.countryCode;
                //         setIpInfo ({publicIp, countryCode});
                    
                //     console.log(`Public IP: ${publicIp}`);
                //     console.log(`Country Code: ${countryCode}`);
                //     sessionStorage.setItem("countryCode", JSON.stringify(countryCode));
                //     });
            });
            
    }

    const [authClicked, setAuthClicked] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    //const [initLevel, setInitLevel] = useState(0);
    //const worldPlaylists =[];
    const handleClick = () => {
        navigate('/generate-playlist')
    }
    
    const handleHelp = () => {
        alert('Refresh this page to refresh your access token! You will need to so you generate a new playlist!')
    }
    const handlePlaylistClick = (id, name, location, song_ids, no_of_songs, image) => {
        sessionStorage.setItem('playlistId', id)
        sessionStorage.setItem('playlistName', name)
        sessionStorage.setItem('playlistLocation', location)
        sessionStorage.setItem('playlistSongIds', JSON.stringify(song_ids))
        sessionStorage.setItem('numberOfSongs', no_of_songs)
        sessionStorage.setItem('coverImage', image)
        const LI = sessionStorage.getItem('spotifyLI')
        if (LI==='true'){
            navigate('/worldPlaylist')
        }
        else{
            alert('Login with spotify to access this playlist')
        }
        
    }

    const initPlaylist = async() =>{
        await getAllPlaylist()
            .then(data => {
                if(data){

                    setPlaylists(data.map((item)=> Object({
                        id: item.id,
                        name: item.name,
                        location: item.location,
                        account: item.user.name,
                        song_ids: item.song_ids,
                        no_of_songs: item.no_of_songs,
                        image: item.image
                    })))
                    
                };
                
            })
    }

    useEffect(() => {
        const LI = sessionStorage.getItem('spotifyLI')
        
        console.log(LI)
        initPlaylist()
        if (LI === 'true'){
            setAuthClicked(true);
            
        }
        else{
            setAuthClicked(false)
        }

    }, []);
    const [country, setCountry] = useState('')
    
    return(
        <div style={{display:'flex', flexDirection:'column', height:'100vh'}}>
            <div className='grid containter mb-1' style={{background:'#48EF48', border:'1px', borderRadius:'2px', gridTemplateColumns: ' 1050px 200px', display:'flex', flexWrap:'wrap', justifyContent:'space-between', width: '100%'}}>
                <div className="grid-item">
                    <h2 style={{color:'white'}}>
                        Create a playlist based on what is popular in your location! 
                    </h2>
                    <p style={{color:'white'}}>Click Find My Location and Then Generate Your Playlist!</p>
                    <p style={{color:'white'}}>Continue with spotify to access playlists and create your own!</p>
                    <p style={{color:'white'}}>Your Current Country: {country}</p>                    
                    <div className="grid containter" style={{display:'grid', gridTemplateColumns: '250px 250px'}}>
                        <div className="grid-item">
                            <button className="btn btn-lg" onClick={handleLocation}
                            style={{background:'black', color:'white'}}>
                                Find My Location
                            </button>    
                        </div>
                        <div className="grid-item">
                            <button className="btn btn-lg"  onClick={handleClick} style={{background:'black', color:'white'}}>
                                Generate Playlist
                            </button>      
                        </div>
                    </div>
                    
                </div>
                <div className="grid-item">

                    {!authClicked && <Auth1/>}
                    <button type='button' className="btn bt-sm" onClick={handleHelp}>
                        <i class="bi bi-info-circle-fill"></i>
                    </button>
                </div>
            </div>
            <h3>What The World Is Listening To</h3>
            <div className='grid containter' style={{ border:'1px', borderRadius:'2px', gridTemplateColumns: ' 100px 1000px', display:'grid'}}>
                <div className='grid-item'>
                    <div className='sidebar'>
                        <label className="container" style={{fontSize:'20px', marginBottom:'10px'}}>
                            Filter
                        </label>
                        <label className='container' style={{marginBottom:'10px'}}>
                            <input type='checkbox'></input>
                                United Kingdom
                        </label>
                        <label className='container' style={{marginBottom:'10px'}}>
                            <input type='checkbox'></input>
                                United States
                        </label>
                        <label className='container' style={{marginBottom:'10px'}}>
                            <input type='checkbox'></input>
                                Spain
                        </label>
                        <label className='container' style={{marginBottom:'10px'}}>
                            <input type='checkbox'></input>
                                Brazil
                        </label>
                        <label className='container' style={{marginBottom:'10px'}}>
                            <input type='checkbox'></input>
                                Netherlands
                        </label>
                        <label className='container' style={{marginBottom:'10px'}}>
                            <input type='checkbox'></input>
                                Portugal
                        </label>
                        <label className='container' style={{marginBottom:'10px'}}>
                            <input type='checkbox'></input>
                                India
                        </label>
                        <label className='container' style={{marginBottom:'10px'}}>
                            <input type='checkbox'></input>
                                Japan
                        </label>
                        <label className='container' style={{marginBottom:'10px'}}>
                            <input type='checkbox'></input>
                                France
                        </label>
                            
                    </div>
                </div>
                <div className="grid-item" style={{display:'flex', flexDirection:'column', width:'100%', marginLeft:'50px'}}>
                    <div className='grid-container' style={{display:'grid', flexWrap: 'wrap', gridTemplateColumns: 'repeat(4, 20fr)', gap:'50px', border:'1px', borderRadius:'2px', marginLeft:'75px', width:'100%'}}>
                    {playlists.map((item, index) => (            
                           <div key={index}> 
                            <div className="grid-item" style = {{width:'100%', display:'flex', flexDirection:'column'}}>
                                
                                    <div className="card" style={{boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',}}>
                                        <img className="card-img-top"
                                        src={item.image}
                                        alt='playlist tile'
                                        width='100'
                                        height='200'
                                        onClick={() =>handlePlaylistClick(item.id, item.name, 
                                            item.location, item.song_ids, item.no_of_songs, item.image)}/>
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">Location: {item.location}</p>
                                        <p className="card-text">Number of Songs: {item.no_of_songs}</p>
                                    </div>
                                </div>
                            
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    )        
  
};

export default connect(null,{getAllPlaylist}) (Home);