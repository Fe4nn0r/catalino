import React from "react";
import "./assets/styles.scss";
import SlotMachine from "../../components/Slotmachine/SlotMachine";
import Button from "../../components/Button/Button";
import eye from "./assets/image/eye.png";
import { useTranslation } from "react-i18next";
function Lost() {
  const { t } = useTranslation("message");
  function LostContent() {
    return (
      <div className="lost-content">
        <div className="content-up">
          <div className="left-eye">
            <img src={eye} />{" "}
          </div>
          <div className="title">
            Sorry,
            <br /> you lost
          </div>
          <div className="right-eye">
            <img src={eye} />
          </div>
        </div>
        <div className="description">Try your luck next time</div>
        <div className="button-area">
          <Button text={t("general.btnGoToSite")} enable to="/" />{" "}
        </div>
        <div className="lips"></div>
      </div>
    );
  }

  return <SlotMachine content={LostContent()} />;
}

export default Lost;
