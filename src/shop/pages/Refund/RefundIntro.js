import React, { useState } from "react";
import SlotMachine from "../../components/Slotmachine/SlotMachine";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { sendEmailForRefund } from "../../../utils/catalinaRequests";
import { refundPages } from "./RefundPagesEnum";
import "./assets/styles.scss";

function RefundIntro({ selectPage }) {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { t } = useTranslation("message");

  function onSubmit(data) {
    setRequestError(false);
    sendEmailForRefund(data.email)
      .then(() => {
        selectPage(refundPages.CHOICES);
      })
      .catch((err) => {
        setRequestError(true);
      });
  }
  const [requestError, setRequestError] = useState(false);

  function RefundIntroContent() {
    return (
      <div className="refund-content">
        <div className="subtitle">{t("refund.intro.title")}</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            autoFocus={true}
            type="text"
            autoComplete="off"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "format incorrect",
              },
            })}
          />
          <label htmlFor="email">{t("refund.intro.label")}</label>

          {errors.email && (
            <label htmlFor="email" className="info">
              {t("refund.intro.error")}
            </label>
          )}
          {requestError && (
            <label htmlFor="email" className="info">
              {t("refund.intro.errorRequest")}
            </label>
          )}
          <div className="button-area">
            <button disabled={!isValid}>{t("refund.intro.btn")}</button>
          </div>
        </form>
      </div>
    );
  }

  return <SlotMachine content={RefundIntroContent()} />;
}

export default RefundIntro;
