import React, { useState } from "react";
import "./assets/styles.scss";
import Checkbox from "../../components/Checkbox/Checkbox";
import Button from "../../components/Button/Button";
import { Link } from "@reach/router";
import { useTranslation } from "react-i18next";

function Landing() {
  const [t] = useTranslation("message");
  const [agreed, setAgreed] = useState(false);

  function agree() {
    setAgreed(!agreed);
  }

  return (
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
  );
}

export default Landing;
