import React from "react";
import "./assets/style.scss";

function SlotMachine({ content }) {
  return (
    <div className="slot-machine-container">
      <div className="slot-machine-content">
        <div className="slot-machine-screen">
          <div className="slot-machine-screen-content content">{content}</div>
        </div>
        <div className="slot-machine-lever-support" />
        <div className="slot-machine-lever" />
        <div className="slot-machine-hand" />
      </div>
      <div className="shop-and-play-layer" />
    </div>
  );
}

export default SlotMachine;
