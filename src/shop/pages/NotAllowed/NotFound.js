import React from "react";
import SlotMachine from "../../components/Slotmachine/SlotMachine";
import Button from "../../components/Button/Button";
import { useTranslation } from "react-i18next";

function NotFound() {
  const { t } = useTranslation("message");
  function AlreadyPlayedContent() {
    return (
      <>
        <div className="title">{t("notFound.oops")}</div>
        <div className="subtitle">{t("notFound.description")}</div>
        <div className="button-area">
          <Button text={t("notFound.back")} enable to="/" />{" "}
        </div>
      </>
    );
  }

  return <SlotMachine content={AlreadyPlayedContent()} />;
}

export default NotFound;
