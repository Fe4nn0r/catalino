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
import { encodeToRemove } from "../../../utils/catalinaRequests";
import InStore from "../InStore/InStore";
import Win from "../Game/Win/Win";
import Lost from "../Game/Lost/Lost";

function Home() {
  //TODO : remove this function
  const encodeInfo = {
    holderRef: 7,
    offerId: 4318,
    retailerId: 1,
  };
  const token = encodeToRemove(encodeInfo);
  console.log(token);

  return (
    <div id="home-container">
      <Logo displayLogo />
      <Router>
        <Landing path="/" />
        <Game path="game" />
        <CanNotPlay path="/can-not-play" />
        <AlreadyPlayed path="/already-played" />
        <Refund path="/refund" />
        <Refund path="/refund-choices" page={refundPages.CHOICES} />
        <SuccessEmail path="/success-email" />
        <Legal path="legal/:legalType" />
        <InStore path="in-store" />

        <Win path="/win" />
        <Lost path="/lost" />
      </Router>
      <Footer />
    </div>
  );
}

export default Home;
