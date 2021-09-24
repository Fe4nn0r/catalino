import React, { useState, useEffect } from "react";
import SlotMachine from "../../components/Slotmachine/SlotMachine";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@reach/router";
import "./assets/styles.scss";
import "./assets/bank.scss";
import Button from "../../components/Button/Button";
import { refundPages } from "./RefundPagesEnum";
import { sendBankInformation } from "../../../utils/catalinaRequests";
import InputText from "../../components/Form/Input/InputText";
import ErrorMessage from "../../components/Form/Error/ErrorMessage";
import Loading from "../../components/Loading/Loading";

function RefundBank({ selectPage }) {
  const { t } = useTranslation("message");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [iban, setIban] = useState("");
  const [bic, setBic] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isBicValid, setIsBicValid] = useState(false);
  const [isIbanValid, setIsIbanValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [requestError, setRequestError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    if (name && iban && bic)
      setIsValid(isIbanValid && isBicValid && isNameValid);
  }, [isIbanValid, isBicValid, isNameValid, name, iban, bic]);

  function onSubmit() {
    setLoading(true);
    sendBankInformation(name, iban, bic)
      .then(() => {
        setLoading(false);
        navigate("/success-email");
      })
      .catch((err) => {
        setRequestError(true);
        setLoading(false);
      });
  }

  function RefundIntroContent() {
    return (
      <>
        <div className="subtitle">{t("refund.bank.title")}</div>
        <form>
          <InputText
            autoFocus={true}
            type="text"
            placeholder={t("refund.bank.name")}
            autoComplete="off"
            required={true}
            handleInput={setName}
            errorMessage={t("refund.bank.nameerror")}
            setIsValid={setIsNameValid}
          />

          <InputText
            autoFocus={true}
            type="text"
            placeholder={t("refund.bank.iban")}
            autoComplete="off"
            pattern={{
              value:
                /^[a-zA-Z]{2}[0-9]{2}\s?[a-zA-Z0-9]{4}\s?[0-9]{4}\s?[0-9]{3}([a-zA-Z0-9]\s?[a-zA-Z0-9]{0,4}\s?[a-zA-Z0-9]{0,4}\s?[a-zA-Z0-9]{0,4}\s?[a-zA-Z0-9]{0,3})?$/i,
              message: "format incorrect",
            }}
            required={true}
            handleInput={setIban}
            errorMessage={t("refund.bank.ibanerror")}
            setIsValid={setIsIbanValid}
          />
          <InputText
            autoFocus={true}
            type="text"
            placeholder={t("refund.bank.bic")}
            autoComplete="off"
            pattern={{
              value: /^[A-Z]{6,6}[A-Z2-9][A-NP-Z0-9]([A-Z0-9]{3,3}){0,1}$/i,
              message: "format incorrect",
            }}
            required={true}
            handleInput={setBic}
            errorMessage={t("refund.bank.bicerror")}
            setIsValid={setIsBicValid}
          />
          {isLoading && <Loading />}
          {requestError && (
            <ErrorMessage message={t("refund.intro.errorRequest")} />
          )}
          <div className="info">{t("refund.bank.info")}</div>
        </form>
        <div className="button-area">
          <Button
            text={t("general.back")}
            enable
            doAction={() => selectPage(refundPages.CHOICES)}
          />
          <Button
            type="submit"
            text={t("general.next")}
            enable={isValid}
            doAction={() => onSubmit()}
          />
        </div>
      </>
    );
  }

  return <SlotMachine content={RefundIntroContent()} />;
}

export default RefundBank;
