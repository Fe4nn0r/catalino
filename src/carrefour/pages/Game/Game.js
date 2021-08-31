import React, { useEffect, useState } from "react";
import { useNavigate } from "@reach/router";
import useSound from "use-sound";
import leverSound from "../../resources/assets/sound/lever.mp3";
import sliderSound from "../../resources/assets/sound/slider.mp3";
import winSound from "../../resources/assets/sound/Win.mp3";

import "./assets/styles.scss";
import Screen from "./Screen";
import Button from "../../components/Button/Button";
import { getWallet } from "../../../utils/catalinaRequests";

const REDIRECTING_TIME = 800;

function Game() {
  const [animated, setAnimated] = useState(false);
  const [winner, setWinner] = useState(true);
  const navigate = useNavigate();
  const [leverPulled] = useSound(leverSound, { volume: 0.05 });
  const [sliderPlay, { stop }] = useSound(sliderSound, { volume: 0 });
  const [winSoundPlay] = useSound(winSound, { volume: 0.3 });

  useEffect(() => {
    getWallet().then((results) => {
      let lotteryId = 0;
      if (results.lottery_rejected && results.lottery_rejected.length > 0) {
        lotteryId = results.lottery_rejected[0].id;
      }
      if (
        results.validated &&
        results.validated.length > 0 &&
        results.validated[0].id > lotteryId
      ) {
        setWinner(true);
      } else {
        setWinner(false);
      }
    });
  }, []);

  function play() {
    if (!animated) {
      leverPulled();
      setAnimated(true);
      sliderPlay();
    }
  }

  function onScreenFinished() {
    stop();
    setTimeout(() => {
      if (winner) {
        winSoundPlay();
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
      <div className="shop-and-play-layer" />
    </div>
  );
}

export default Game;
