import React, { useState } from "react";
import SlotMachine from "../../../components/Slotmachine/SlotMachine";
import { useTranslation } from "react-i18next";
import Button from "../../../components/Button/Button";
import "./assets/style.scss";
import StepperInput from "./StepperInput";

function Stepper({
  id,
  totalSteps,
  title,
  inputs,
  stepperNavigation,
  selectedInStorePage,
  fillInStoreInformation,
  sendFilledInformation,
}) {
  const { t } = useTranslation("message");
  const [data, setData] = useState([]);

  function navigateToStep(stepId) {
    stepperNavigation(stepId);
  }

  function nextButton() {
    if (id < totalSteps - 1) {
      return (
        <Button
          text={t("general.next")}
          enable
          doAction={() => submit(id + 1)}
        />
      );
    } else return null;
  }

  function backButton() {
    if (id > 0) {
      return (
        <Button
          text={t("general.back")}
          enable
          doAction={() => navigateToStep(id - 1)}
        />
      );
    } else return null;
  }

  function validateButton(attribute, value) {
    if (id === totalSteps - 1) {
      return (
        <Button
          text={t("general.validate")}
          enable
          doAction={() => submit(attribute, value)}
        />
      );
    } else return null;
  }

  function submit(nextStep) {
    fillInStoreInformation(data);
    if (nextStep) navigateToStep(nextStep);
    else sendFilledInformation();
  }

  function fillData(attribute, value) {
    let newData = new Array(...data);
    let existingAttribute = false;
    newData.forEach((element) => {
      if (element.attribute === attribute) {
        element.value = value;
        existingAttribute = true;
      }
    });
    if (!existingAttribute) {
      newData.push({ attribute: attribute, value: value });
    }
    setData(newData);
  }

  function StepperContent() {
    return (
      <div className="success-email-content content">
        <div className="title">{title}</div>
        <div className="stepper-inputs">
          {inputs.map((stepInput) => (
            <StepperInput
              type={stepInput.type}
              attribute={stepInput.attribute}
              fillData={fillData}
            />
          ))}
        </div>
        <div className="button-area">
          {backButton()}
          {nextButton()}
          {validateButton()}
        </div>
      </div>
    );
  }

  return selectedInStorePage === id ? (
    <SlotMachine content={StepperContent()} />
  ) : null;
}

export default Stepper;
