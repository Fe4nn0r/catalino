import React, { useState } from "react";
import SlotMachine from "../../components/Slotmachine/SlotMachine";
import Button from "../../components/Button/Button";
import { useTranslation } from "react-i18next";
import RadioButton from "../../components/Radio/RadioButton";

function RefundChoices() {
  const [bank, setBank] = useState(false);
  const [paypal, setPaypal] = useState(false);
  const [later, setLater] = useState(false);

  function chooseRefund(choice) {
    switch (choice) {
      case "bank":
        console.log("bank");
        setBank(true);
        setPaypal(false);
        setLater(false);
        break;
      case "paypal":
        console.log("paypal");
        setBank(false);
        setPaypal(true);
        setLater(false);
        break;
      case "later":
        console.log("Later");
        setBank(false);
        setPaypal(false);
        setLater(true);
        break;
    }
  }
  const { t } = useTranslation("message");

  function LostContent() {
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
            text={t("general.validate")}
            enable={later || bank || paypal}
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

export default RefundChoices;
