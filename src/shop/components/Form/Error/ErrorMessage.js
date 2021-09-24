import React from "react";

import "./assets/style.scss";
import union from "../../../resources/assets/img/union.png";

function ErrorMessage({ message }) {
  return (
    <div className="generic-error-message">
      <img src={union} />
      {message}
    </div>
  );
}

export default ErrorMessage;
