import React from "react";
import SlotMachine from "../../components/Slotmachine/SlotMachine";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button/Button";

function SuccessEmail() {
  const { t } = useTranslation("message");
  function SuccessEmailContent() {
    return (
      <div className="success-email-content content">
        <div className="title">{t("success.email.title")}</div>
        <div className="subtitle">{t("success.email.description")}</div>
        <div className="button-area">
          <Button text={t("success.email.btn")} enable to="/" />{" "}
        </div>
      </div>
    );
  }

  return <SlotMachine content={SuccessEmailContent()} />;
}

export default SuccessEmail;
