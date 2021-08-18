import React from "react";
import "./assets/styles.scss";
import { Router } from "@reach/router";
import Game from "../Game/Game";
import Landing from "../Landing/Landing";
function Home() {
  return (
    <div className="home-container">
      <Router>
        <Landing path="/" />
        <Game path="game" />
      </Router>
    </div>
  );
}

export default Home;
