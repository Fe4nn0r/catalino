import React from "react";
import SlotMachine from "../../../components/Slotmachine/SlotMachine";
import Button from "../../../components/Button/Button";
import eye from "./assets/image/eye.png";
import { useTranslation } from "react-i18next";
function Lost() {
  const { t } = useTranslation("message");
  function LostContent() {
    return (
      <div className="sad-content">
        <div className="content-up">
          <img src={eye} />{" "}
          <div className="title">
            {t("general.sorry")}
            <br /> {t("lost.lost")}
          </div>
          <img src={eye} />
        </div>
        <div className="description">{t("lost.description")}</div>
        <div className="button-area">
          <Button
            text={t("general.btnGoToSite")}
            enable
            doAction={() =>
              (document.location = process.env.REACT_APP_HOME_SHOPPING_URL)
            }
          />{" "}
        </div>
        <div className="lips" />
      </div>
    );
  }

  return <SlotMachine content={LostContent()} />;
}

export default Lost;
