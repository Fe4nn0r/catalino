import React, { useEffect } from "react";
import "./assets/styles.scss";
import { Link, navigate, Router, useNavigate } from "@reach/router";
import Game from "../Game/Game";
import Landing from "../Landing/Landing";
import Footer from "../../components/Footer/Footer";
import carrefour from "../../resources/assets/carrefour.png";
import Win from "../Win/Win";
import Lost from "../Lost/Lost";
import CanNotPlay from "../NotAllowed/CanNotPlay";
import AlreadyPlayed from "../NotAllowed/AlreadyPlayed";
import { getCryptedAuthentification } from "../../../utils/catalinaRequests";

function Home() {
  return (
    <div className="home-container">
      <div className="logo">
        <Link to="/">
          <img src={carrefour} />
        </Link>
      </div>
      <Router>
        <Landing path="/" />
        <Game path="game" />
        <Win path="win" />
        <Lost path="lost" />
        <CanNotPlay path="/can-not-play" />
        <AlreadyPlayed path="/already-played" />
      </Router>
      <Footer />
    </div>
  );
}

export default Home;
