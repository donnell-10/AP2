import axios from "axios";


export const getPlaylists = (userid) => async () => {
    if(localStorage.getItem('access')){
        const config ={
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            },
            params: {
                'user': userid,
            }
        };

        try {
            const res = await axios.get('http://localhost:8000/api/playlists/', config)
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }
    else{
        console.error('Authentication error');
        return null
    }
}

export const getAllPlaylist = () => async () => {
    const config ={
        headers:{
            'Content-Type': 'application/json', 
            'Accept': 'application/json'
        },
        params: {
            'world': 'yes',
        }
    };
    try {
        const res = await axios.get('http://localhost:8000/api/playlists/', config)
        return res.data;
    } catch (error) {
        console.error(error);
        
    }
}

export const addPlaylist = (user, name, location, songIds, no_of_songs, coverImage) => async() => {
    if (localStorage.getItem('access')){
        const config = {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
        const body = JSON.stringify({
            user:user,
            name:name,
            location: location,
            songIds: songIds,
            no_of_songs: no_of_songs,
            coverImage: coverImage
        });

        try {
            const res = await axios.post('http://localhost:8000/api/playlists/', body, config)
            
            return res.data
            
        } catch (error) {
            console.error(error.response)
            return null;
        }

    }
    else{
        console.error('Authentication error');
        return null;
    }
}

export const updatePlaylist = (id, songIds, no_of_songs) => async () => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            },
        };
        const body = JSON.stringify({
            id:id,
            songIds:songIds,
            no_of_songs:no_of_songs,
        });

        try {
            const res = await axios.put('http://localhost:8000/api/playlists/', body, config);
            return res.data;
        } catch (err) {
            console.error(err.response);
            return null;
        }
    } else {
        console.error("Authentication error");
        return null;
    }
};


export const deletePlaylist = (id) => async() => {
    console.log('im here')
    if (localStorage.getItem('access')){
        const config = {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            },
            params:{
                'id': id
            }
        };

        try {
            const res = await axios.delete('http://localhost:8000/api/playlists/', config)
            
            return res
            
        } catch (error) {
            console.error(error.response)
            return null;
        }

    }
    else{
        console.error('Authentication error');
        return null;
    }
}