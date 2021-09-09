import React, { useEffect, useState } from "react";
import { useNavigate } from "@reach/router";
import useSound from "use-sound";
import leverSound from "../../resources/assets/sound/lever.mp3";
import winSound from "../../resources/assets/sound/Win.mp3";

import "./assets/styles.scss";
import Screen from "./Screen";
import Button from "../../components/Button/Button";
import { applyBasketAndGetWallet } from "../../../utils/catalinaRequests";
import mobileHand from "../../resources/assets/img/mobile-ico.png";

const REDIRECTING_TIME = 800;

function Game() {
  const [animated, setAnimated] = useState(false);
  let [winner, setWinner] = useState(false);
  let [isScreenFinished, setScreenFinished] = useState(false);
  const navigate = useNavigate();
  const [leverPulled] = useSound(leverSound, { volume: 0.05 });
  const [winSoundPlay] = useSound(winSound, { volume: 0.3 });

  useEffect(() => {
    if (isScreenFinished) {
      setTimeout(() => {
        if (winner) {
          winSoundPlay();
          navigate("/win");
        } else {
          navigate("/lost");
        }
      }, REDIRECTING_TIME);
    }
  }, [isScreenFinished]);

  function play() {
    if (!animated) {
      leverPulled();
      setAnimated(true);
      applyBasketAndGetWallet()
        .then((isWinner) => {
          setWinner(isWinner);
        })
        .catch((err) => {
          window.location.href = "/can-not-play";
          //navigate("/can-not-play");
        });
    }
  }

  function onScreenFinished() {
    setScreenFinished(true);
  }

  return (
    <div className="game-container">
      <div className="game-content">
        <div className="slot-machine">
          <div className="title mobile-only">
            Shake your phone or click to play!
          </div>
          <div className="title desktop-only">
            Pull the handle or click to play!
          </div>
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
          <div className="shake-phone">
            <img src={mobileHand} />
            <div className="insert-coin">
              <div className="coin-line" />
            </div>
          </div>
          <div className="description mobile-only">
            Shake to start the slot machine <br />{" "}
            <span className="or"> or </span>
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
      <div className="shop-and-play-layer" />
    </div>
  );
}

export default Game;
