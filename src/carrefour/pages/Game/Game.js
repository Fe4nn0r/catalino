import React, { useState } from "react";
import { useNavigate } from "@reach/router";
import useSound from "use-sound";
import leverSound from "../../../assets/sound/lever.mp3";
import "./assets/styles.scss";
import Screen from "./Screen";
import Button from "../../components/Button/Button";

const REDIRECTING_TIME = 800;

function Game() {
  const [animated, setAnimated] = useState(false);
  const [winner, setWinner] = useState(false);
  const navigate = useNavigate();
  const [leverPulled] = useSound(leverSound);

  function play() {
    if (!animated) {
      leverPulled();
      setAnimated(true);
      setWinner(!winner);
    }
  }

  function onScreenFinished() {
    setTimeout(() => {
      if (winner) {
        navigate("/win");
      } else {
        navigate("/lost");
      }
    }, REDIRECTING_TIME);
  }

  return (
    <div className="game-container">
      <div className="game-content">
        <div className="slot-machine">
          <div className="title">Pull the handle or click to play!</div>
          <div className="screen-container">
            <Screen
              animate={animated}
              speed={0.8}
              screenNumber={1}
              winner={winner}
            />
            <Screen
              animate={animated}
              speed={0.6}
              screenNumber={2}
              winner={winner}
            />
            <Screen
              animate={animated}
              speed={0.4}
              screenNumber={3}
              winner={winner}
              onFinish={onScreenFinished}
            />
          </div>
          <div className="buttons-area">
            <Button text="Play" enable={!animated} doAction={play} />
            <div className="insert-coin">
              <div className="coin-line" />
            </div>
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
