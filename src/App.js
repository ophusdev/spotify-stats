import {React, useEffect, useState} from 'react';

import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { getTokenFromResponse } from "./spotify";
import { accessEndpoint } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import NavBar from './components/NavBar';
import { useDispatch } from 'react-redux';
import { fetchTopArtists, fetchTopTracks, setToken, fetchAudioFeature } from "./reducer/spotifySlice";
import ArtistList from "./components/ArtistList";
import TrackList from "./components/TrackList";
import AudioFeature from "./components/AudioFeature";
import Footer from "./components/Footer";
import Privacy from "./components/Privacy";

import CookieConsent from "react-cookie-consent";
import dotenv from 'dotenv';
dotenv.config();


const spotify_api = new SpotifyWebApi();

function App() {
  const dispatch = useDispatch();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    let _token = sessionStorage.getItem('token')
    if(_token === null || _token === "undefined")
    {
      const hash = getTokenFromResponse();
      window.location.hash = "";
      _token = hash.access_token;
    }

    //if (_token !== null && _token !== "undefined" && _token !== undefined) {
    if (_token) {

      spotify_api.setAccessToken(_token)
      
      dispatch(
        setToken({
          token: _token
        })
      );

      sessionStorage.setItem('token', _token);
      setIsLogged(true);

      dispatch(fetchTopArtists(spotify_api));
      dispatch(fetchTopTracks(spotify_api))
      .then((data) => {
        let tracks_ids = data.payload.map((track) => track.id);
        dispatch(fetchAudioFeature({spotify_api: spotify_api, tracks_ids: tracks_ids}));
      })
    }

  }, [dispatch]);

  async function loginClick() {
    window.location.href = accessEndpoint;
  }

  async function logoutClick() {
    sessionStorage.removeItem('token');
    setIsLogged(false);
    window.location.reload();
  }

  return (
    <Router>
      <Switch>
        <Route path="/privacy">
          <NavBar isLogged={isLogged} onLogin={loginClick} onLogout={logoutClick}/>
          <Privacy></Privacy>
          <Footer />
        </Route>
        <Route path="/">
        <CookieConsent
          location="bottom"
          buttonText="I understand!"
          enableDeclineButton
          declineButtonText="I decline"
          cookieName="statsCookie"
          style={{ background: "#2B373B" }}
          buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
          expires={1}
        >
          This website uses cookies to enhance the user experience.{" "}
          <span style={{ fontSize: "10px" }}></span>
        </CookieConsent>

          <NavBar isLogged={isLogged} onLogin={loginClick} onLogout={logoutClick}/>
            <ArtistList />
            <TrackList />
            <AudioFeature />
          <Footer />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
