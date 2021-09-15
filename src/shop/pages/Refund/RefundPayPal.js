import React, { useState } from "react";
import SlotMachine from "../../components/Slotmachine/SlotMachine";
import Button from "../../components/Button/Button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@reach/router";
import { useForm } from "react-hook-form";
import { sendPaypalInformation } from "../../../utils/catalinaRequests";

function RefundPaypal() {
  const {
    register,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { t } = useTranslation("message");
  const navigate = useNavigate();
  const [requestError, setRequestError] = useState(false);
  const [email, setEmail] = useState("");
  const [confirmEmailValid, setConfirmEmailValid] = useState(false);

  function onSubmit() {
    console.log("Email", email);
    sendPaypalInformation(email)
      .then(() => {
        navigate("/success-email");
      })
      .catch((err) => {
        setRequestError(true);
      });
  }
  function handleEmail(email) {
    setEmail(email);
    console.log(email);
  }
  function handleConfirmEmail(confirmEmail) {
    if (confirmEmail === email) {
      setConfirmEmailValid(true);
    } else {
      setConfirmEmailValid(false);
    }
  }
  function refundPaypalContent() {
    return (
      <div className="content">
        <div className="description">{t("refund.paypal.title")}</div>
        <div className="refund-options">
          <form>
            <input
              autoFocus={true}
              type="text"
              placeholder={t("refund.paypal.email")}
              autoComplete="off"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "format incorrect",
                },
                validate: handleEmail,
              })}
            />
            {errors.email && (
              <label htmlFor="email" className="info">
                {t("refund.intro.error")}
              </label>
            )}
            <input
              autoFocus={true}
              type="text"
              placeholder={t("refund.paypal.confirmEmail")}
              autoComplete="off"
              {...register("confirmEmail", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "format incorrect",
                },
                validate: handleConfirmEmail,
              })}
            />
            {errors.confirmEmail && (
              <label htmlFor="email" className="info">
                {t("refund.intro.error")}
              </label>
            )}
            <div className="errors">
              {isValid && !confirmEmailValid && (
                <label htmlFor="email" className="info">
                  {t("refund.paypal.error")}
                </label>
              )}
              {requestError && (
                <label htmlFor="email" className="info">
                  {t("refund.intro.errorRequest")}
                </label>
              )}
            </div>
            <div className="info">{t("refund.paypal.info")}</div>
          </form>
        </div>
        <div className="button-area">
          <Button text={t("general.back")} enable to="/refund-choices" />
          <Button
            type="submit"
            text={t("general.next")}
            enable={isValid && confirmEmailValid}
            doAction={() => onSubmit()}
          />
        </div>
        <div className="lips" />
      </div>
    );
  }

  return <SlotMachine content={refundPaypalContent()} />;
}

export default RefundPaypal;
