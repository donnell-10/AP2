import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Activate from './pages/activate';
import ResetPassword from './pages/resetPassword';
import ResetPasswordConfirm from './pages/resetPasswordConfirm';
import Layout from './hocs/layout';
import CreatePlaylist from './pages/createPlaylist';
import PlaylistView from './pages/playlist';
import Dashboard from './pages/dashboard';
import YourPlaylist from './pages/yourPlaylist';
//import Auth from './components/SpotifyAuth';

import WorldPlaylist from './pages/worldPlaylist';

import { Provider } from 'react-redux';
import store from './store';

//const code = new URLSearchParams(window.location.search).get('code')

const App =  () => (
    <Provider store ={store}>
        <Router>
            <Layout>
                <Routes>
                    <Route path = '/' element={<Home/>}/>
                    <Route path = '/login' element={<Login/>}/>
                    <Route path = '/register' element={<Register/>}/>
                    <Route path = '/reset-password' element={<ResetPassword/>}/>
                    <Route path = '/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>}/>
                    <Route path = '/activate/:uid/:token' element={<Activate/>}/>
                    <Route path = '/generate-playlist' element={<CreatePlaylist/>}/>
                    <Route path = '/new-playlist' element={<PlaylistView/>}/>
                    <Route path = '/dashboard' element={<Dashboard/>}/>
                    <Route path = '/yourPlaylist' element={<YourPlaylist/>}/>
                    <Route path = '/worldPlaylist' element={<WorldPlaylist/>}/>
                   
                    {/* <Route path = '/auth' element={<Auth/>}/> */}
                </Routes>
            </Layout>
        </Router>
    </Provider>
);

export default App;