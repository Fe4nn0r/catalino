import React from "react";

import "./assets/style.scss";
import { Link } from "@reach/router";

function Button({ text, enable, doAction, to }) {
  if (to) {
    return (
      <Link className={`play-button  ${!enable ? "disabled" : ""}`} to={to}>
        {text}
      </Link>
    );
  }
  return (
    <div
      className={`play-button  ${!enable ? "disabled" : ""}`}
      onClick={() => doAction()}
    >
      {text}
    </div>
  );
}

export default Button;
