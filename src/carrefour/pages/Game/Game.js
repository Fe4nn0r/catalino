import React, { useState } from "react";

import "./assets/styles.scss";
import Screen from "./screen";

function Game() {
  const [animated, setAnimated] = useState(false);
  const [winner, setWinner] = useState(false);

  function play() {
    if (!animated) {
      setAnimated(true);
      setWinner(!winner);
    }
  }

  return (
    <div className="game-container">
      <div className="game-content">
        <div className="slot-machine">
          <div className="title">Pull the handle or click to play!</div>
          <div className="screen-container">
            <Screen
              animate={animated}
              speed={0.5}
              screenNumber={1}
              winner={winner}
            />
            <Screen
              animate={animated}
              speed={0.45}
              screenNumber={2}
              winner={winner}
            />
            <Screen
              animate={animated}
              speed={0.3}
              screenNumber={3}
              winner={winner}
            />
          </div>
          <div
            className={`play-button  ${animated ? "disabled" : ""}`}
            onClick={() => play()}
          >
            Play
          </div>
        </div>
        <div className="slot-lever-support" onClick={() => play()} />
        <div
          className={`slot-lever ${animated ? "lever-slide" : ""}`}
          onClick={() => play()}
        />
        <div
          className={`slot-hand ${animated ? "hand-slide" : ""}`}
          onClick={() => play()}
        />
      </div>
    </div>
  );
}

export default Game;
