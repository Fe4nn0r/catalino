import React from "react";
import "./assets/styles.scss";
import SlotMachine from "../../components/Slotmachine/SlotMachine";
import Button from "../../components/Button/Button";

function AlreadyPlayed() {
  function AlreadyPlayedContent() {
    return (
      <div className="not-allowed-content">
        <div className="title">Sorry, you have already play</div>
        <div className="description">
          You can’t play again, try your luck next time
        </div>
        <div className="button-area">
          <Button text="GO ON CARREFOUR'S SITE" enable to="/" />{" "}
        </div>
      </div>
    );
  }

  return <SlotMachine content={AlreadyPlayedContent()} />;
}

export default AlreadyPlayed;
