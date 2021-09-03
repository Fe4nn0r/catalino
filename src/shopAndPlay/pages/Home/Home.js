import React from "react";
import "./assets/styles.scss";
import { Link, Router } from "@reach/router";
import Game from "../Game/Game";
import Landing from "../Landing/Landing";
import Footer from "../../components/Footer/Footer";
import carrefour from "../../resources/assets/img/carrefour.png";
import Win from "../Win/Win";
import Lost from "../Lost/Lost";
import CanNotPlay from "../NotAllowed/CanNotPlay";
import AlreadyPlayed from "../NotAllowed/AlreadyPlayed";
import RefundIntro from "../Refund/RefundIntro";
import SuccessEmail from "../Success/Email";

function Home() {
  return (
    <div id="home-container">
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
        <RefundIntro path="/refund-intro" />
        <SuccessEmail path="/success-email" />
      </Router>
      <Footer />
    </div>
  );
}

export default Home;
