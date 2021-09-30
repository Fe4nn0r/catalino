import React, { useEffect, useState } from "react";
import SlotMachine from "../../components/Slotmachine/SlotMachine";
import Button from "../../components/Button/Button";
import { useTranslation } from "react-i18next";
import RadioButton from "../../components/Form/Radio/RadioButton";
import { refundPages } from "./RefundPagesEnum";
import {
  getCryptedAuthentication,
  retrieveGameInformationFromToken,
} from "../../../utils/catalinaRequests";
import { useNavigate } from "@reach/router";

function RefundChoices({ selectPage }) {
  const [bank, setBank] = useState(false);
  const [paypal, setPaypal] = useState(false);
  const [later, setLater] = useState(false);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const navigate = useNavigate();

  useEffect(() => {
    const token = urlParams.get("info");
    if (token) {
      retrieveGameInformationFromToken(token);
      getCryptedAuthentication().catch(() => {
        navigate("/can-not-play");
      });
    } else {
      if (!localStorage.getItem("Authorization")) {
        navigate("/in-store");
      }
    }
  }, []);
  function chooseRefund(choice) {
    switch (choice) {
      case refundPages.BANK:
        setBank(true);
        setPaypal(false);
        setLater(false);
        break;
      case refundPages.PAYPAL:
        setBank(false);
        setPaypal(true);
        setLater(false);
        break;
      case refundPages.LATER:
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
      selectPage(refundPages.BANK);
    }
    if (paypal) {
      selectPage(refundPages.PAYPAL);
    }
    if (later) {
      selectPage(refundPages.LATER);
    }
  }
  const { t } = useTranslation("message");

  function refundChoiceContent() {
    return (
      <>
        <div className="subtitle">{t("refund.choices.description")}</div>
        <div className="refund-options">
          <RadioButton
            checked={bank}
            checkAction={() => chooseRefund(refundPages.BANK)}
            title={t("refund.choices.bank")}
          />
          <RadioButton
            checked={paypal}
            checkAction={() => chooseRefund(refundPages.PAYPAL)}
            title={t("refund.choices.paypal")}
          />
          <RadioButton
            checked={later}
            checkAction={() => chooseRefund(refundPages.LATER)}
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
      </>
    );
  }

  return <SlotMachine content={refundChoiceContent()} />;
}

export default RefundChoices;
