import React, { useEffect, useState } from "react";
import { useNavigate } from "@reach/router";
import useSound from "use-sound";
import leverSound from "../../resources/assets/sound/lever.mp3";
import winSound from "../../resources/assets/sound/Win.mp3";

import "./assets/styles.scss";
import Screen from "./Screen";
import Button from "../../components/Button/Button";
import { getWallet } from "../../../utils/catalinaRequests";
import mobileHand from "../../resources/assets/img/mobile-ico.png";
import { useMediaQuery } from "react-responsive";

const REDIRECTING_TIME = 800;

function Game() {
  const [animated, setAnimated] = useState(false);
  let [winner, setWinner] = useState(false);
  let [isScreenFinished, setScreenFinished] = useState(false);
  const navigate = useNavigate();
  const [leverPulled] = useSound(leverSound, { volume: 0.05 });
  const [winSoundPlay] = useSound(winSound, { volume: 0.3 });
  const isMobile = useMediaQuery({ query: "(max-width: 414px)" });

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
      getWallet()
        .then((isWinner) => {
          leverPulled();
          setAnimated(true);
          setWinner(isWinner);
        })
        .catch((err) => {
          navigate("/can-not-play");
        });
    }
  }
  function gameTitle() {
    let title;
    if (!isMobile) {
      title = "Pull the handle or click to play!";
    } else {
      title = "Shake your phone or click to play!";
    }
    return title;
  }
  function gameDescription() {
    if (isMobile) {
      return (
        <div className="description">
          Shake to start the slot machine<span className="or"> or </span>
        </div>
      );
    }
  }
  function onScreenFinished() {
    setScreenFinished(true);
  }

  return (
    <div className="game-container">
      <div className="game-content">
        <div className="slot-machine">
          <div className="title">{gameTitle()}</div>
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
          {gameDescription()}
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