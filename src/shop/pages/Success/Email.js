import React from "react";
import SlotMachine from "../../components/Slotmachine/SlotMachine";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button/Button";

function SuccessEmail() {
  const { t } = useTranslation("message");
  function SuccessEmailContent() {
    return (
      <>
        <div className="title">{t("success.email.title")}</div>
        <div className="subtitle">{t("success.email.description")}</div>
        <div className="button-area">
          <Button
            text={t("success.btn")}
            enable
            doAction={() =>
              (document.location = process.env.REACT_APP_HOME_SHOPPING_URL)
            }
          />
        </div>
      </>
    );
  }

  return <SlotMachine content={SuccessEmailContent()} />;
}

export default SuccessEmail;
