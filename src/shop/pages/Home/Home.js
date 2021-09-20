import React from "react";
import "./assets/styles.scss";
import { Router } from "@reach/router";
import Game from "../Game/Game";
import Landing from "../Landing/Landing";
import Footer from "../../components/Footer/Footer";
import CanNotPlay from "../NotAllowed/CanNotPlay";
import AlreadyPlayed from "../NotAllowed/AlreadyPlayed";
import SuccessEmail from "../Success/Email";
import Logo from "../../components/Logo/Logo";
import Legal from "../Legals/component/Legal";
import Refund from "../Refund/Refund";
import { refundPages } from "../Refund/RefundPagesEnum";

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
        <CanNotPlay path="/can-not-play" />
        <AlreadyPlayed path="/already-played" />
        <Refund path="/refund" />
        <Refund path="/refund-choices" page={refundPages.CHOICES} />
        <SuccessEmail path="/success-email" />
        <Legal path="legal/:legalType" />
      </Router>
      <Footer />
    </div>
  );
}

export default Home;
