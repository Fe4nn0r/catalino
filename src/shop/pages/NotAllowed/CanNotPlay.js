import React from "react";
import SlotMachine from "../../components/Slotmachine/SlotMachine";
import Button from "../../components/Button/Button";
import { useTranslation } from "react-i18next";
import eye from "../../resources/assets/img/eye.png";
import lips from "../../resources/assets/img/lips.png";

function CanNotPlay() {
  const { t } = useTranslation("message");
  function CanNotPlayContent() {
    return (
      <>
        <div className="content-up">
          <img src={eye} />{" "}
          <div className="title">
            {t("general.sorry")}
            <br /> {t("cannot.canNotPlay")}
          </div>
          <img src={eye} />
        </div>
        <div className="description">{t("cannot.description")}</div>
        <div className="button-area">
          <Button
            text={t("general.btnGoToSite")}
            enable
            doAction={() =>
              (document.location = process.env.REACT_APP_HOME_SHOPPING_URL)
            }
          />{" "}
        </div>
        <img className="lips" src={lips} />
      </>
    );
  }

  return <SlotMachine content={CanNotPlayContent()} />;
}

export default CanNotPlay;
