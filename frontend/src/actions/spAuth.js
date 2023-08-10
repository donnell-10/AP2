import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const  SpAuth = () => {
    // const[accessToken, setAccessToken] = useState()
    // const[refreshToken, setRefreshToken] = useState()
    // const[expiresIn, setExpiresIn] = useState()
    const code = localStorage.getItem('code')
    // try {
    //     const res = await axios.post ('http://localhost:3001/spotify-login', code)
    //     console.log(res)
    //     return res
    // } catch (error) {
    //     console.log(error)
    // }

    useEffect ( () => {
        axios.post('http://localhost:3001/spotify-login', 
            code,)
        .then(res => {
            console.log(res.data)
            window.history.pushState({}, null, '/')
        })
        .catch((err) => {
            // window.location = '/'
            console.log(err)
        })
    },[])
}
