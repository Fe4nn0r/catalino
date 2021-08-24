import React from "react";
import "./assets/styles.scss";
import { Link, Router } from "@reach/router";
import Game from "../Game/Game";
import Landing from "../Landing/Landing";
import Footer from "../../components/Footer/Footer";
import carrefour from "../../assets/carrefour.png";
import Win from "../Win/Win";
import Lost from "../Lost/Lost";

function Home() {
  return (
    <div className="home-container">
      <div className="logo">
        <img src={carrefour} />
      </div>
      <Router>
        <Landing path="/" />
        <Game path="game" />
        <Win path="win" />
        <Lost path="lost" />
      </Router>
      <Footer />
    </div>
  );
}

export default Home;
