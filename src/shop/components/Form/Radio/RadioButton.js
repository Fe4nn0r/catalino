import React from "react";

import "./asset/style.scss";

function RadioButton({ checkAction, title, checked }) {
  function check() {
    checkAction();
  }

  return (
    <div className="radio" onClick={() => check()}>
      <div className={`radioBox ${checked ? "checked" : ""}`}>
        {checked ? <span className="circle" /> : null}
      </div>
      <div className={`radioTitle ${checked ? "checked-text" : ""}`}>
        {title}
      </div>
    </div>
  );
}

export default RadioButton;
