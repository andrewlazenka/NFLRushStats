import React from "react";
import { Router, Redirect } from "@reach/router";

import "./index.css";

import Dashboard from "./pages/Dashboard";
import Player from "./pages/Player";

const App = () => (
  <Router>
    <Dashboard path="/" />
    <Redirect from='player' to='/' noThrow />
    <Player path="/player/:playerName" />
  </Router>
);

export default App
