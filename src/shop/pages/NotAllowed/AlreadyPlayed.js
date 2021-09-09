import React from "react";
import "./assets/styles.scss";
import SlotMachine from "../../components/Slotmachine/SlotMachine";
import Button from "../../components/Button/Button";
import { useTranslation } from "react-i18next";

function AlreadyPlayed() {
  const { t } = useTranslation("message");
  function AlreadyPlayedContent() {
    return (
      <div className="not-allowed-content">
        <div className="title">Sorry, you have already play</div>
        <div className="description">
          You can’t play again, try your luck next time
        </div>
        <div className="button-area">
          <Button text={t("general.btnGoToSite")} enable to="/" />{" "}
        </div>
      </div>
    );
  }

  return <SlotMachine content={AlreadyPlayedContent()} />;
}

export default AlreadyPlayed;
