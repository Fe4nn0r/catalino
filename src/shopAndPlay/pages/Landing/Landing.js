import React, { useEffect, useState } from "react";
import "./assets/styles.scss";
import Checkbox from "../../components/Checkbox/Checkbox";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import {
  getCryptedAuthentication,
  getEncryptedHolderRef,
  getOffer,
} from "../../../utils/catalinaRequests";
import Loading from "../../components/Loading/Loading";

function Landing() {
  const [t] = useTranslation("message");
  const [agreed, setAgreed] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const offerId = 4318; //TODO : to be sent by the offerId website
    const retailerId = 1; //TODO : to be sent by the retaler website
    const holderRef = "2"; //TODO : to be sent by the holderRef website
    const body = {
      retailer_id: 1,
      holder_ref: getEncryptedHolderRef(holderRef),
    };
    getCryptedAuthentication(body, retailerId, offerId, holderRef)
      .then(() => {
        getOffer(offerId)
          .then((offer) => {
            setStartDate(offer.started_at);
            setEndDate(offer.ended_at);
            document.getElementById("home-container").style.backgroundColor =
              "#e8f1fb"; //offer.background_color;
            setAllowed(true);
          })
          .catch((err) => {
            navigate("/can-not-play");
          });
      })
      .catch((err) => {
        navigate("/can-not-play");
      });
  }, []);

  function agree() {
    setAgreed(!agreed);
  }
  function changeBackground(background_color) {}
  return allowed ? (
    <>
      <div className="go-to-game-container">
        <div className="go-to-game-content content">
          <div className="game-period">
            {" "}
            {t("landing.gamePeriod", { start: startDate, end: endDate })}
          </div>
          <div className="title">{t("landing.title")}</div>
          <div className="description">{t("landing.description")}</div>
          <div className="agree">
            <Checkbox checkAction={agree} />
            {t("landing.agreeP1")}
            <Link to="game"> {t("landing.conditions")} </Link>{" "}
            {t("landing.agreeP2")}
          </div>
          <Button text={t("landing.play")} enable={agreed} to={"/game"} />
        </div>
      </div>
      <div className="shop-and-play-layer" />
    </>
  ) : (
    <Loading />
  );
}

export default Landing;
