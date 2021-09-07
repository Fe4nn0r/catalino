import React from "react";
import "./assets/styles.scss";
import { Router } from "@reach/router";
import Game from "../Game/Game";
import Landing from "../Landing/Landing";
import Footer from "../../components/Footer/Footer";
import Win from "../Win/Win";
import Lost from "../Lost/Lost";
import CanNotPlay from "../NotAllowed/CanNotPlay";
import AlreadyPlayed from "../NotAllowed/AlreadyPlayed";
import RefundIntro from "../Refund/RefundIntro";
import SuccessEmail from "../Success/Email";
import Cgu from "../Legals/Cgu";
import Logo from "../../components/Logo/Logo";

function Home() {
  const offerId = 4318; //TODO : to be sent by the offerId website
  const retailerId = 1; //TODO : to be sent by the retaler website
  const holderRef = "2"; //TODO : to be sent by the holderRef website
  return (
    <div id="home-container">
      <Logo displayLogo />
      <Router>
        <Landing
          offerId={offerId}
          retailerId={retailerId}
          holderRef={holderRef}
          path="/"
        />
        <Game path="game" />
        <Win path="win" />
        <Lost path="lost" />
        <CanNotPlay path="/can-not-play" />
        <AlreadyPlayed path="/already-played" />
        <RefundIntro path="/refund-intro" />
        <SuccessEmail path="/success-email" />
        <Cgu path="legal/cgu" />
      </Router>
      <Footer />
    </div>
  );
}

export default Home;
