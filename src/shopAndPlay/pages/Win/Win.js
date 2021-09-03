import React, { useEffect, useState } from "react";
import "./assets/styles.scss";
import SlotMachine from "../../components/Slotmachine/SlotMachine";
import Confetti from "react-dom-confetti";
import Button from "../../components/Button/Button";
import appConfig from "../../resources/config/config.json";
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

  function winContent() {
    return (
      <div className="win-content">
        <div className="confetti">
          <Confetti active={hurray} config={config} />
        </div>
        <div className="title">Well done, you won !</div>
        <div className="description">
          Your winning will be paid into your Carrefour fidelity account
        </div>
        <div className="button-area">
          <Button text="NEXT" enable to="/" />{" "}
        </div>
      </div>
    );
  }

  return <SlotMachine content={winContent()} />;
}

export default Win;
