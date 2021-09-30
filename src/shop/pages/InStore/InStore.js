import React, { useEffect, useState } from "react";
import {
  inStoreOfferId,
  inStoreBody,
  steps,
} from "../../resources/inStore/instore-config.json";
import Stepper from "./component/Stepper";
import {
  getOfferById,
  sendInStoreInformation,
} from "../../../utils/catalinaRequests";
import { useNavigate } from "@reach/router";
import { getAndApplyApiConfiguration } from "../../../utils/appApiConfiguration";

function InStore() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const stepperPages = steps;
  const [selectedInStorePage, setSelectedInStorePage] = useState(0);
  const [inStoreInformationToSend, setInStoreInformationToSend] =
    useState(inStoreBody);
  const navigate = useNavigate();

  useEffect(() => {
    const offerId = urlParams.get("offerId")
      ? urlParams.get("offerId")
      : inStoreOfferId;
    if (offerId) {
      getOfferById(offerId)
        .then((offer) => {
          if (offer) {
            getAndApplyApiConfiguration(offer);
            let body = { offerId: offerId };
            setInStoreInformationToSend(body);
          } else {
            navigate("/can-not-play");
          }
        })
        .catch(() => {
          navigate("/can-not-play");
        });
    } else {
      navigate("/can-not-play");
    }
  }, []);

  function fillInStoreInformation(stepData) {
    let body = inStoreInformationToSend;
    stepData.map((data) => {
      body[data.attribute] = data.value;
    });
    setInStoreInformationToSend(body);
  }

  function sendFilledInformation() {
    sendInStoreInformation(inStoreInformationToSend);
    navigate("/");
  }

  function StepperContent() {
    let inStorePages = [];
    for (let pageIndex = 0; pageIndex < stepperPages.length; pageIndex++) {
      inStorePages.push(
        <Stepper
          id={pageIndex}
          totalSteps={stepperPages.length}
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
