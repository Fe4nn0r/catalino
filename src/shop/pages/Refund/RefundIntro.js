import React, { useState } from "react";
import SlotMachine from "../../components/Slotmachine/SlotMachine";
import { useTranslation } from "react-i18next";
import { sendEmailForRefund } from "../../../utils/catalinaRequests";
import { refundPages } from "./RefundPagesEnum";
import "./assets/styles.scss";
import InputText from "../../components/Form/Input/InputText";
import Button from "../../components/Button/Button";
import ErrorMessage from "../../components/Form/Error/ErrorMessage";
import Loading from "../../components/Loading/Loading";

function RefundIntro({ selectPage }) {
  const { t } = useTranslation("message");
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setLoading] = useState(false);

  function handleEmail(email) {
    setEmail(email);
  }
  function onSubmit() {
    setLoading(true);
    setRequestError(false);
    sendEmailForRefund(email)
      .then(() => {
        setLoading(false);
        selectPage(refundPages.CHOICES);
      })
      .catch((err) => {
        setLoading(false);
        setRequestError(true);
      });
  }
  const [requestError, setRequestError] = useState(false);

  function RefundIntroContent() {
    return (
      <>
        <div className="subtitle">{t("refund.intro.title")}</div>
        <form>
          <InputText
            autoFocus={true}
            type="text"
            placeholder={t("refund.intro.email")}
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
          <label>{t("refund.intro.label")}</label>
          {isLoading && <Loading />}
          {requestError && (
            <ErrorMessage message={t("refund.intro.errorRequest")} />
          )}
          <div className="button-area">
            <Button
              text={t("general.next")}
              enable={isValid}
              doAction={() => onSubmit()}
            />
          </div>
        </form>
      </>
    );
  }

  return <SlotMachine content={RefundIntroContent()} />;
}

export default RefundIntro;
