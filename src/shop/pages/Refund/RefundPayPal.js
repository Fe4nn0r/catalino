import React, { useState, useEffect } from "react";
import SlotMachine from "../../components/Slotmachine/SlotMachine";
import Button from "../../components/Button/Button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@reach/router";
import { sendPaypalInformation } from "../../../utils/catalinaRequests";
import { refundPages } from "./RefundPagesEnum";
import InputText from "../../components/Form/Input/InputText";
import ErrorMessage from "../../components/Form/Error/ErrorMessage";
import Loading from "../../components/Loading/Loading";

function RefundPaypal({ selectPage }) {
  const { t } = useTranslation("message");
  const navigate = useNavigate();
  const [requestError, setRequestError] = useState(false);
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [identicalEmails, setIdenticalEmails] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const onEnter = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };
  function onSubmit() {
    setLoading(true);
    sendPaypalInformation(email)
      .then(() => {
        setLoading(false);
        navigate("/success-email");
      })
      .catch((err) => {
        setLoading(false);
        setRequestError(true);
      });
  }

  function handleEmail(email) {
    setEmail(email);
  }

  function handleConfirmEmail(confirmEmail) {
    setConfirmEmail(confirmEmail);
  }

  useEffect(() => {
    if (confirmEmail === email) {
      setIdenticalEmails(true);
    } else {
      setIdenticalEmails(false);
    }
  }, [confirmEmail, email]);

  function refundPaypalContent() {
    return (
      <>
        <div className="subtitle">{t("refund.paypal.title")}</div>
        <div className="refund-options">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            onKeyUp={onEnter}
          >
            <InputText
              autoFocus={true}
              type="text"
              placeholder={t("refund.paypal.email")}
              autoComplete="off"
              pattern={{
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "format incorrect",
              }}
              required={true}
              handleInput={handleEmail}
              errorMessage={t("refund.intro.error")}
              setIsValid={setIsValid}
            />
            <InputText
              autoFocus={true}
              type="text"
              placeholder={t("refund.paypal.confirmEmail")}
              autoComplete="off"
              pattern={{
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "format incorrect",
              }}
              required={true}
              handleInput={handleConfirmEmail}
              errorMessage={t("refund.intro.error")}
              setIsValid={setIsValid}
            />
            <>
              {email && confirmEmail && !identicalEmails && (
                <ErrorMessage message={t("refund.paypal.error")} />
              )}
              {isLoading && <Loading />}
              {requestError && (
                <ErrorMessage message={t("refund.intro.errorRequest")} />
              )}
            </>
            <div className="info">{t("refund.paypal.info")}</div>
          </form>
        </div>
        <div className="button-area">
          <Button
            text={t("general.back")}
            enable
            doAction={() => selectPage(refundPages.CHOICES)}
          />
          <Button
            text={t("general.next")}
            enable={isValid && identicalEmails}
            doAction={() => onSubmit()}
          />
        </div>
      </>
    );
  }

  return <SlotMachine content={refundPaypalContent()} />;
}

export default RefundPaypal;
