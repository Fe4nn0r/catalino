import React, { useEffect, useState } from "react";
import "./assets/styles.scss";
import SlotMachine from "../../components/Slotmachine/SlotMachine";
import Confetti from "react-dom-confetti";
import Button from "../../components/Button/Button";
import appConfig from "../../resources/config/config.json";
import { useTranslation } from "react-i18next";
function Win() {
  const totalTime = 300;
  const [hurray, setHurray] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHurray(true);
    }, totalTime);
  }, []);

  const config = {
    angle: 90,
    spread: 360,
    startVelocity: "37",
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "20px",
    height: "21px",
    perspective: "544px",
    colors: appConfig.celebrationConfig.colors,
  };

  const { t } = useTranslation("message");

  function winContent() {
    return (
      <div className="win-content">
        <div className="confetti">
          <Confetti active={hurray} config={config} />
        </div>
        <div className="title">{t("win.title")}</div>
        <div className="description">{t("win.description")}</div>
        <div className="button-area">
          <Button text={t("win.btn")} enable to="/refund-intro" />{" "}
        </div>
      </div>
    );
  }

  return <SlotMachine content={winContent()} />;
}

export default Win;
