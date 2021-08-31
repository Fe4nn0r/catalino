import React, { useEffect, useState } from "react";
import "./assets/styles.scss";
import Checkbox from "../../components/Checkbox/Checkbox";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import {
  decript,
  encryptWithKey,
  generateCryptedHolderRef,
  getCryptedAuthentication,
} from "../../../utils/catalinaRequests";
import Loading from "../../components/Loading/Loading";

function Landing() {
  const [t] = useTranslation("message");
  const [agreed, setAgreed] = useState(false);
  const [allowed, setAllowed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(encryptWithKey("1", "TQtBZxoTTk/HnDSVpBNVsw=="));
    const body = {
      retailer_id: 1,
      holder_ref: "TQtBZxoTTk/HnDSVpBNVsw==",
    };
    getCryptedAuthentication(body)
      .then(() => {
        setAllowed(true);
      })
      .catch((err) => {
        navigate("/can-not-play");
      });
  }, []);

  function agree() {
    setAgreed(!agreed);
  }

  return allowed ? (
    <>
      <div className="go-to-game-container">
        <div className="go-to-game-content">
          <div className="game-period"> {t("landing.gamePeriod")}</div>
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
