import React, { useState } from "react";

import "./assets/styles.scss";

function Game() {
  const [animated, setAnimated] = useState(false);
  return (
    <div className="game-container">
      <div className="game-content">
        <div className="slot-machine">
          <div className="screen-container"></div>
          <div className="play-button" onClick={() => setAnimated(true)}>
            Play
          </div>
        </div>
        <div
          className="slot-lever-support"
          onClick={() => setAnimated(true)}
        ></div>
        <div
          className={`slot-lever ${animated ? "lever-slide" : ""}`}
          onClick={() => setAnimated(true)}
        ></div>
        <div
          className={`slot-hand ${animated ? "hand-slide" : ""}`}
          onClick={() => setAnimated(true)}
          onAnimationEnd={() => setAnimated(false)}
        ></div>
      </div>
    </div>
  );
}

export default Game;
