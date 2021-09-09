import React from "react";
import "./assets/styles.scss";
import { Link } from "@reach/router";

function Legal({ htmlPage }) {
  return (
    <>
      <div className="legal-container">
        <div className="legal-content">
          <Link className="back-button" to="/" />
          <div className="legal-text">{htmlPage}</div>
        </div>
      </div>
    </>
  );
}

export default Legal;
