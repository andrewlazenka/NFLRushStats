import React from "react";
import { Router, Redirect } from "@reach/router";

import "./index.css";

import PlayerList from "./PlayerList";
import Player from "./Player";

const App = () => (
  <Router>
    <PlayerList path="/" />
    <Redirect from='player' to='/' noThrow />
    <Player path="/player/:playerName" />
  </Router>
);

export default App
