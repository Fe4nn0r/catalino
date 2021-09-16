import React from "react";
import SlotMachine from "../../components/Slotmachine/SlotMachine";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button/Button";

function RefundLater() {
  const { t } = useTranslation("message");
  function RefundLaterContent() {
    return (
      <div className="success-email-content content">
        <div className="title">{t("success.later.title")}</div>
        <div className="subtitle">{t("success.later.description")}</div>
        <div className="button-area">
          <Button
            text={t("success.btn")}
            enable
            doAction={() =>
              (document.location = process.env.REACT_APP_HOME_SHOPPING_URL)
            }
          />
        </div>
      </div>
    );
  }

  return <SlotMachine content={RefundLaterContent()} />;
}

export default RefundLater;
