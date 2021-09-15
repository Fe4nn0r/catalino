import React, { useState } from "react";
import SlotMachine from "../../components/Slotmachine/SlotMachine";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import Checkbox from "../../components/Checkbox/Checkbox";
import { Link, useNavigate } from "@reach/router";
import { sendEmailForRefund } from "../../../utils/catalinaRequests";
import "./assets/styles.scss";

function RefundIntro() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { t } = useTranslation("message");
  const navigate = useNavigate();

  function onSubmit(data) {
    setRequestError(false);
    sendEmailForRefund(data.email)
      .then(() => {
        navigate("/success-email");
      })
      .catch((err) => {
        setRequestError(true);
      });
  }

  function agree() {
    setAgreed(!agreed);
  }
  const [agreed, setAgreed] = useState(false);
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

          <div className="agree">
            <Checkbox checkAction={agree} />
            <div className="text">
              {t("refund.intro.agree")}
              <Link to="/conditions"> {t("refund.intro.agreeLink")} </Link>{" "}
            </div>
          </div>
          <div className="button-area">
            <button disabled={!isValid || !agreed}>
              {t("refund.intro.btn")}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return <SlotMachine content={RefundIntroContent()} />;
}

export default RefundIntro;
