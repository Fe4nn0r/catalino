import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import leverSound from "../../resources/assets/sound/lever.mp3";
import winSound from "../../resources/assets/sound/Win.mp3";

import "./assets/styles.scss";
import Screen from "./Screen";
import Button from "../../components/Button/Button";
import { applyBasketAndGetWallet } from "../../../utils/catalinaRequests";
import mobileHand from "../../resources/assets/img/mobile-ico.png";
import Win from "./Win/Win";
import Lost from "./Lost/Lost";
import { useMediaQuery } from "react-responsive";
import { getDesktopBackgroundLayer } from "../../../utils/appApiConfiguration";
import mobileBackgroundLayer from "../../resources/assets/img/background-layer-mobile.png";

const REDIRECTING_TIME = 800;

function Game() {
  const [desktopBackgroundImgLayer, setDesktopBackgroundImgLayer] =
    useState("");
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const [backgroundLayerStyle, setBackgroundLayerStyle] = useState({
    backgroundImage: desktopBackgroundImgLayer,
  });
  useEffect(() => {
    getDesktopBackgroundLayer().then((res) =>
      setDesktopBackgroundImgLayer(res)
    );
  }, []);
  useEffect(() => {
    if (isMobile) {
      setBackgroundLayerStyle({
        backgroundImage: "url(" + mobileBackgroundLayer + ")",
      });
    } else {
      setBackgroundLayerStyle({
        backgroundImage: "url(" + desktopBackgroundImgLayer + ")",
      });
    }
  }, [isMobile, desktopBackgroundImgLayer]);

  const [animated, setAnimated] = useState(false);
  let [winner, setWinner] = useState(false);
  let [gameEnded, setGameEnded] = useState(false);

  let [isScreenFinished, setScreenFinished] = useState(false);
  const [leverPulled] = useSound(leverSound, { volume: 0.05 });
  const [winSoundPlay] = useSound(winSound, { volume: 0.3 });

  useEffect(() => {
    if (isScreenFinished) {
      setTimeout(() => {
        if (winner) {
          winSoundPlay();
        }
        setGameEnded(true);
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
        });
    }
  }

  function onScreenFinished() {
    setScreenFinished(true);
  }

  function gameContent() {
    return (
      <div className="display-game">
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
        </div>
        <div className="shop-and-play-layer" style={backgroundLayerStyle} />
      </div>
    );
  }

  function renderedGame() {
    if (!gameEnded) {
      return gameContent();
    } else {
      if (winner) return <Win />;
      else return <Lost />;
    }
  }

  return renderedGame();
}

export default Game;
