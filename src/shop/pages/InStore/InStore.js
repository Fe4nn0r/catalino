import React, { useState } from "react";
import {
  inStoreBody,
  steps,
} from "../../resources/inStore/instore-config.json";
import Stepper from "./component/Stepper";
import { sendInStoreInformation } from "../../../utils/catalinaRequests";
import { useNavigate } from "@reach/router";

function InStore() {
  const stepperPages = steps;
  const [selectedInStorePage, setSelectedInStorePage] = useState(0);
  const [inStoreInformationToSend, setInStoreInformationToSend] =
    useState(inStoreBody);
  const navigate = useNavigate();

  function fillInStoreInformation(stepData) {
    let body = inStoreInformationToSend;
    stepData.map((data) => {
      body[data.attribute] = data.value;
    });
    setInStoreInformationToSend(body);
  }

  function sendFilledInformation() {
    sendInStoreInformation(inStoreInformationToSend);
    navigate("/game");
  }

  function StepperContent() {
    let inStorePages = [];
    for (let pageIndex = 0; pageIndex < stepperPages.length; pageIndex++) {
      inStorePages.push(
        <Stepper
          id={pageIndex}
          totalSteps={stepperPages.length}
          stepNumber={stepperPages[pageIndex].stepNumber}
          title={stepperPages[pageIndex].title}
          inputs={stepperPages[pageIndex].inputs}
          stepperNavigation={setSelectedInStorePage}
          selectedInStorePage={selectedInStorePage}
          fillInStoreInformation={fillInStoreInformation}
          sendFilledInformation={sendFilledInformation}
        />
      );
    }
    return inStorePages;
  }

  return StepperContent();
}

export default InStore;
