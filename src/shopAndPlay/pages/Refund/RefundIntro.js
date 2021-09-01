import React from "react";
import "./assets/styles.scss";
import SlotMachine from "../../components/Slotmachine/SlotMachine";
import Button from "../../components/Button/Button";
import { useTranslation } from "react-i18next";

function RefundIntro() {
  const { t } = useTranslation("message");

  function RefundIntroContent() {
    return (
      <div className="refund-intro-content content">
        <div className="subtitle">{t("refund.intro.title")}</div>
        <form action="">
          <input type="text" />
        </form>
        <div className="button-area">
          <Button text={t("refund.intro.btn")} enable to="/" />{" "}
        </div>
      </div>
    );
  }

  return <SlotMachine content={RefundIntroContent()} />;
}

export default RefundIntro;
