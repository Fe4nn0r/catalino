import React from "react";
import "./assets/styles.scss";
import SlotMachine from "../../components/Slotmachine/SlotMachine";
import Button from "../../components/Button/Button";

function CanNotPlay() {
  function CanNotPlayContent() {
    return (
      <div className="not-allowed-content">
        <div className="title">Sorry, you can’t play</div>
        <div className="description">The offer is no longer available </div>
        <div className="button-area">
          <Button text="GO ON CARREFOUR'S SITE" enable to="/" />{" "}
        </div>
      </div>
    );
  }

  return <SlotMachine content={CanNotPlayContent()} />;
}

export default CanNotPlay;
