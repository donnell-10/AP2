import React, { useState, useEffect }  from "react";

import { getPlaylists } from "../actions/userData";
import { deletePlaylist } from "../actions/userData";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
//import  coverImages  from "../assets/images";

const Dashboard = ({isAuthenticated, user, getPlaylists, deletePlaylist}) => {
    const navigate = useNavigate();
    
    const [playlists, setPlaylists] = useState([]);
    const [initLevel, setInitLevel] = useState(0);
    //const images = coverImages
    
    // const getCoverImage = () => {
    //     const randomIndex = Math.floor(Math.random() * images.length);
    //     const coverImageUrl = images[randomIndex];
    //     return coverImageUrl
    // }
    const handlePlaylistClick = (id, name, location, song_ids, no_of_songs, image) => {
        sessionStorage.setItem('playlistId', id)
        sessionStorage.setItem('playlistName', name)
        sessionStorage.setItem('playlistLocation', location)
        sessionStorage.setItem('playlistSongIds', JSON.stringify(song_ids))
        sessionStorage.setItem('numberOfSongs', no_of_songs)
        sessionStorage.setItem('coverImage', image)
        const LI = sessionStorage.getItem('spotifyLI')
        if(LI === 'true'){
            navigate('/yourPlaylist')
        }
        else{
            alert('Login with spotify to access this playlist')
        }
        
    }

    const handleDelete = async(id) => {
        deletePlaylist(id)
        console.log(id)
        window.location.reload();
    }
    const initPlaylist = async () =>{
        
        await getPlaylists(user.id)
            .then(data => {
                if(data) {
                    
                    setPlaylists(data.map((item) => Object({
                        id: item.id,
                        name: item.name,
                        location: item.location,
                        account: user.name,
                        song_ids: item.song_ids,
                        no_of_songs: item.no_of_songs,
                        image: item.image
                        
                    })));
                    setInitLevel(1);
                } else{
                    setInitLevel(-1);
                }
            })
    }
    useEffect(() => {
        if (!isAuthenticated){
            navigate('/')
            
        }
        else{
            initPlaylist();
        }
        
      }, [])

    
    if(initLevel === 1){
    return(
        <div style={{display:'flex', flexDirection:'column', background:'#48EF48'}}>
            <div className="container mt-5" style={{ width:'100%'}}>
                <h2 className="text-center mt-4 mb-4" style={{color:'white'}}>
                    {user.name}'s Dashboard
                </h2> 
                <div className="row row-cols-1 row-cols-md-4">
                    {playlists.map((item, index) => (
                    <div key={index}>
                        <div className="col-sm-12 mb-4">
                            <div className="card cursor:pointer" style={{boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 1)', cursor: 'pointer'}}>
                                <img className="card-img-top"
                                src={item.image} 
                                alt="playlist tile"
                                width='200'
                                height='250'/>
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">Number of Songs: {item.no_of_songs}</p>
                                    <p className="card-text">Created by: {user.name}</p>
                                    <div className="flex gap-4 justify-content-center" style={{display:'flex', gap:'4', alignContent:'start'}}>
                                        <button className="btn btn-primary btn-sm" 
                                        onClick={() =>handlePlaylistClick(item.id, item.name, 
                                        item.location, item.song_ids, item.no_of_songs, item.image)}>Open</button>
                                        <button className="btn btn-danger"  onClick={() => handleDelete(item.id)}>
                                                <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )}





}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  });

export default connect(mapStateToProps, {getPlaylists, deletePlaylist}) (Dashboard);