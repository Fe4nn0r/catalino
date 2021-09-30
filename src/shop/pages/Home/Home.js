import React, { useEffect, useState } from "react";
import "./assets/styles.scss";
import { Router } from "@reach/router";
import Game from "../Game/Game";
import Landing from "../Landing/Landing";
import Footer from "../../components/Footer/Footer";
import CanNotPlay from "../NotAllowed/CanNotPlay";
import NotFound from "../NotAllowed/NotFound";
import SuccessEmail from "../Success/Email";
import Logo from "../../components/Logo/Logo";
import Legal from "../Legals/component/Legal";
import Refund from "../Refund/Refund";
import { refundPages } from "../Refund/RefundPagesEnum";
import {
  encodeToRemove,
  extractGameInformationFromToken,
  getEncryptedHolderRef,
} from "../../../utils/catalinaRequests";
import InStore from "../InStore/InStore";
import Win from "../Game/Win/Win";
import Lost from "../Game/Lost/Lost";
import Loading from "../../components/Loading/Loading";

function Home() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const token = urlParams.get("info");
    //TODO : remove this
    if (urlParams.get("holderRef"))
      localStorage.setItem(
        "holderRef",
        getEncryptedHolderRef(urlParams.get("holderRef"))
      );
    if (urlParams.get("offerId"))
      localStorage.setItem("offerId", urlParams.get("offerId"));
    if (urlParams.get("retailerId"))
      localStorage.setItem("retailerId", urlParams.get("retailerId"));
    if (urlParams.get("refundChoices"))
      localStorage.setItem("refundChoices", urlParams.get("refundChoices"));

    if (token) extractGameInformationFromToken(token);
    setAllowed(true);
  }, []);

  //TODO : remove this function
  const encodeInfo = {
    holderRef: 7,
    offerId: 4318,
    retailerId: 1,
  };
  const token = encodeToRemove(encodeInfo);
  console.log(token);

  return allowed ? (
    <div id="home-container">
      <Logo displayLogo />
      <Router>
        <NotFound default />
        <Landing path="/" />
        <Game path="game" />
        <CanNotPlay path="/can-not-play" />
        <NotFound path="/already-played" />
        <Refund path="/refund-choices" page={refundPages.CHOICES} />
        <SuccessEmail path="/success-email" />
        <Legal path="legal/:legalType" />

        <Refund path="/refund" />
        <InStore path="in-store" />
        <Win path="/win" />
        <Lost path="/lost" />
      </Router>
      <Footer />
    </div>
  ) : (
    <Loading />
  );
}

export default Home;
