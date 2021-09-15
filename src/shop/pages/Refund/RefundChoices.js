import React, { useState } from "react";
import SlotMachine from "../../components/Slotmachine/SlotMachine";
import Button from "../../components/Button/Button";
import { useTranslation } from "react-i18next";
import RadioButton from "../../components/Radio/RadioButton";
import { useNavigate } from "@reach/router";

function RefundChoices() {
  const [bank, setBank] = useState(false);
  const [paypal, setPaypal] = useState(false);
  const [later, setLater] = useState(false);
  const navigate = useNavigate();

  function chooseRefund(choice) {
    switch (choice) {
      case "bank":
        setBank(true);
        setPaypal(false);
        setLater(false);
        break;
      case "paypal":
        setBank(false);
        setPaypal(true);
        setLater(false);
        break;
      case "later":
        setBank(false);
        setPaypal(false);
        setLater(true);
        break;
      default:
        setBank(false);
        setPaypal(false);
        setLater(false);
    }
  }
  function navigateToChoice() {
    if (bank) {
      navigate("/refund-bank");
    }
    if (paypal) {
      navigate("/refund-paypal");
    }
    if (later) {
      navigate("refund-later");
    }
  }
  const { t } = useTranslation("message");

  function refundChoiceContent() {
    return (
      <div className="content">
        <div className="description">{t("refund.choices.description")}</div>
        <div className="refund-options">
          <RadioButton
            checked={bank}
            checkAction={() => chooseRefund("bank")}
            title={t("refund.choices.bank")}
          />
          <RadioButton
            checked={paypal}
            checkAction={() => chooseRefund("paypal")}
            title={t("refund.choices.paypal")}
          />
          <RadioButton
            checked={later}
            checkAction={() => chooseRefund("later")}
            title={t("refund.choices.later")}
          />
        </div>
        <div className="button-area">
          <Button
            text={t("general.next")}
            enable={later || bank || paypal}
            doAction={() => navigateToChoice()}
          />{" "}
        </div>
        <div className="lips" />
      </div>
    );
  }

  return <SlotMachine content={refundChoiceContent()} />;
}

export default RefundChoices;
