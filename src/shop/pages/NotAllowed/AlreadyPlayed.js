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
        <div className="title">{t("already.sorry")}</div>
        <div className="description">{t("already.description")}</div>
        <div className="button-area">
          <Button
            text={t("general.btnGoToSite")}
            enable
            doAction={() =>
              (document.location = process.env.REACT_APP_HOME_SHOPPING_URL)
            }
          />{" "}
        </div>
      </div>
    );
  }

  return <SlotMachine content={AlreadyPlayedContent()} />;
}

export default AlreadyPlayed;
