import React, { useEffect, useState } from "react";
import "./App.css";
import { Login } from "./Login";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./DataLayer";
import Player from "./Player";

const spotify = new SpotifyWebApi();

function App() {
  // yaha array destructuring krke data unpack kr rhe hai

  const [{ user, token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;
    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.setAccessToken(_token);

      spotify.getMe().then((user) => {
        // console.log("person:", user);
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });
      spotify.getUserPlaylists().then((playlists) => {
        console.log(playlists);
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
      });
      spotify
        .getPlaylist("78bac2200a37477a9fc1e3639106be81")
        .then((response) => {
          dispatch({
            type: "SET_DISCOVER_WEEKLY",
            discover_weekly: response,
          });
        });
    }
    // console.log("I HAVE A TOKEN :", token);
  }, []);
  // console.log("Userz:", user);
  // console.log("token is:", token);
  return (
    <div className="app">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
