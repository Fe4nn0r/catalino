import React, { useState } from "react";
import "./assets/styles.scss";
import SlotMachine from "../../components/Slotmachine/SlotMachine";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import Checkbox from "../../components/Checkbox/Checkbox";
import { Link } from "@reach/router";

function RefundIntro() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { t } = useTranslation("message");

  function onSubmit(data) {
    console.log(data);
  }

  function agree() {
    setAgreed(!agreed);
  }
  const [agreed, setAgreed] = useState(false);

  function RefundIntroContent() {
    return (
      <div className="refund-intro-content content">
        <div className="subtitle">{t("refund.intro.title")}</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
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
          <div className="agree">
            <Checkbox checkAction={agree} />
            <div>
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
