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
import {
  encodeToDO,
  encodeToRemove,
  retrieveGameInformationFromToken,
} from "../../../utils/catalinaRequests";
import InStore from "../InStore/InStore";

function Home() {
  //TODO : remove this function
  /*const encodeInfo = {
    holderRef : 4
    offerId : 4315,
    retailerId :1
  }
  const token = encodeToRemove(encodeInfo);
  */

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
      </Router>
      <Footer />
    </div>
  );
}

export default Home;
