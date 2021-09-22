import React from "react";
import "./assets/style.scss";

function StepperInput({ type, attribute, fillData }) {
  function handleInput(value) {
    fillData(attribute, value);
  }

  return type === "upload" ? (
    <div>UPLOAD {attribute}</div>
  ) : (
    <div onClick={() => handleInput("6")}>INPUT {attribute}</div>
  );
}

export default StepperInput;
