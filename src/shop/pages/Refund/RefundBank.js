import React, { useEffect, useState } from "react";
import SlotMachine from "../../components/Slotmachine/SlotMachine";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useNavigate } from "@reach/router";
import "./assets/styles.scss";
import "./assets/bank.scss";
import Button from "../../components/Button/Button";
import { refundPages } from "./RefundPagesEnum";
import {
  sendBankInformation,
  sendPaypalInformation,
} from "../../../utils/catalinaRequests";

function RefundBank({ selectPage }) {
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

  useEffect(() => {
    const labels = document.querySelectorAll(".form-control label");

    labels.forEach((label) => {
      label.innerHTML = label.innerText
        .split("")
        .map(
          (letter, idx) => `<span style="
				transition-delay: ${idx * 50}ms
			">${letter}</span>`
        )
        .join("");
    });
  }, []);

  const [name, setName] = useState("");
  const [iban, setIban] = useState("");
  const [bic, setBic] = useState("");

  const [requestError, setRequestError] = useState(false);

  function onSubmit() {
    sendBankInformation(name, iban, bic)
      .then(() => {
        navigate("/success-email");
      })
      .catch((err) => {
        setRequestError(true);
      });
  }

  function RefundIntroContent() {
    return (
      <div className="refund-content refund-bank">
        <div className="subtitle">{t("refund.bank.title")}</div>
        <form>
          <div className="form-control">
            <input
              type="text"
              autoComplete="off"
              {...register("name", {
                required: true,
                validate: (name) => setName(name),
              })}
              required
            />
            <label htmlFor="name">{t("refund.bank.name")}</label>
          </div>
          <div className="form-control">
            <input
              type="text"
              autoComplete="off"
              {...register("iban", {
                required: true,
                pattern: {
                  value:
                    /^[a-zA-Z]{2}[0-9]{2}\s?[a-zA-Z0-9]{4}\s?[0-9]{4}\s?[0-9]{3}([a-zA-Z0-9]\s?[a-zA-Z0-9]{0,4}\s?[a-zA-Z0-9]{0,4}\s?[a-zA-Z0-9]{0,4}\s?[a-zA-Z0-9]{0,3})?$/i,
                },
                validate: (iban) => setIban(iban),
              })}
              required
            />
            <label htmlFor="iban">{t("refund.bank.iban")}</label>
          </div>
          <div className="form-control">
            <input
              type="text"
              autoComplete="off"
              {...register("bic", {
                required: true,
                pattern: {
                  value: /^[A-Z]{6,6}[A-Z2-9][A-NP-Z0-9]([A-Z0-9]{3,3}){0,1}$/i,
                },
                validate: (bic) => setBic(bic),
              })}
              required
            />
            <label>{t("refund.bank.bic")}</label>
          </div>
          {(errors.iban || errors.bic) && (
            <div className="error-messages">
              {errors.iban && (
                <label htmlFor="bic" className="iban">
                  {t("refund.bank.ibanerror")}
                </label>
              )}
              {errors.bic && (
                <label htmlFor="bic" className="bic">
                  {t("refund.bank.bicerror")}
                </label>
              )}
            </div>
          )}

          {requestError && (
            <label htmlFor="email" className="info">
              {t("refund.intro.errorRequest")}
            </label>
          )}
          <div className="agree">
            <div className="text">{t("refund.bank.description")}</div>
          </div>
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
      </div>
    );
  }

  return <SlotMachine content={RefundIntroContent()} />;
}

export default RefundBank;
