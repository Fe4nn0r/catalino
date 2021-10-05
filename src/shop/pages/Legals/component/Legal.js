import React from "react";
import "./assets/styles.scss";
import { Link, useParams } from "@reach/router";
import legalJson from "../../../resources/legals/legal.json";

function Legal() {
  const params = useParams();

  function getLegalPageHtml(legalType) {
    switch (legalType) {
      case "help":
        return legalJson.help;
      case "generalConditions":
        return legalJson.generalConditions;
      case "legalNotices":
        return legalJson.legalNotices;
      case "dataProtection":
        return legalJson.dataProtection;
      default:
        return legalJson.help;
    }
  }

  const htmlPage = getLegalPageHtml(params.legalType);
  return (
    <>
      <div className="legal-container">
        <div className="legal-content">
          <Link className="back-button" to="/" />
          <div className="legal-text">
            <div dangerouslySetInnerHTML={{ __html: htmlPage }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Legal;
