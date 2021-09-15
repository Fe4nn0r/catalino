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
import Logo from "../../components/Logo/Logo";
import Legal from "../Legals/component/Legal";
import RefundChoices from "../Refund/RefundChoices";
import RefundPaypal from "../Refund/RefundPayPal";
import RefundBank from "../Refund/RefundBank";

function Home() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const holderRef = urlParams.get("holderRef")
    ? urlParams.get("holderRef")
    : "4";
  const offerId = 4318; //TODO : to be sent by the offerId website
  const retailerId = 1; //TODO : to be sent by the retaler website
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
        <Legal path="legal/:legalType" />
        <RefundChoices path="refund-choices" />
        <RefundPaypal path="refund-paypal" />
        <RefundBank path="refund-bank" />
      </Router>
      <Footer />
    </div>
  );
}

export default Home;
