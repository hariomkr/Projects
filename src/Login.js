import React from "react";
import "./Login.css";
import { loginUrl } from "./spotify";
export function Login() {
  return (
    <div className="login">
      {/* spotfy logo */}
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
        alt=""
      />
      {/* Login with Spotify button */}
      <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
    </div>
  );
}

export default Login;
