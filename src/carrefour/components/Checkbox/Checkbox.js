import React, { useState } from "react";

import "./assets/style.scss";
import checkImg from "./assets/images/check.png";

function Checkbox({ checkAction }) {
  const [checked, setChecked] = useState(false);
  function check() {
    setChecked(!checked);
    checkAction();
  }

  return (
    <div
      className={`checkbox ${checked ? "checked" : ""}`}
      onClick={() => check()}
    >
      {checked ? <img src={checkImg} /> : null}
    </div>
  );
}

export default Checkbox;
