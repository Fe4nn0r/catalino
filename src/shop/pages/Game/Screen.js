import React, { useEffect, useState } from "react";
import { isIE } from "react-device-detect";

import "./assets/styles.scss";
import ico1 from "../../resources/assets/img/ico1.png";
import ico2 from "../../resources/assets/img/ico2.png";
import ico3 from "../../resources/assets/img/ico3.png";
import ico4 from "../../resources/assets/img/ico4.png";
import ico5 from "../../resources/assets/img/ico5.png";
import ico6 from "../../resources/assets/img/ico6.png";
import ico7 from "../../resources/assets/img/ico7.png";
import ico8 from "../../resources/assets/img/ico8.png";
import ico9 from "../../resources/assets/img/ico9.png";
import defaultIcoWin from "../../resources/assets/img/icoWin.png";

import useSound from "use-sound";
import screenSound1 from "../../resources/assets/sound/Screen1.mp3";
import screenSound2 from "../../resources/assets/sound/Screen2.mp3";
import screenSound3 from "../../resources/assets/sound/Screen3.mp3";
import { getWinIcon } from "../../../utils/appApiConfiguration";

const DURATION = 5000;

function Screen({ animate, speed, screenNumber, winner, onFinish }) {
  const defaultStyle = { top: isIE ? "-480%" : "30%" };
  let waitingTime = getWaitingTime();
  const [fruitStyle, setFruitStyle] = useState(defaultStyle);
  const [gameFinished, setGameFinished] = useState(false);
  const totalTime = DURATION + waitingTime * 5000;
  const [screenSound1Play] = useSound(screenSound1, { volume: 0.1 });
  const [screenSound2Play] = useSound(screenSound2, { volume: 0.1 });
  const [screenSound3Play] = useSound(screenSound3, { volume: 0.1 });
  const [icoWin, setIcoWin] = useState(defaultIcoWin);
  useEffect(() => {
    getWinIcon()
      .then((res) => {
        setIcoWin(res);
      })
      .catch(setIcoWin(defaultIcoWin));
  }, []);
  useEffect(() => {
    if (animate) {
      animateFruits(true);
      setTimeout(() => {
        animateFruits(false);
        setGameFinished(true);
        triggerSound();
        onFinish && onFinish();
      }, totalTime);
    }
  }, [animate]);

  function animateFruits(isAnimated) {
    let newStyle = {};
    if (isAnimated) {
      newStyle = {
        animation:
          speed +
          "s linear " +
          waitingTime +
          "s infinite " +
          (isIE ? "spinItIE" : "spinIt"),
      };
    }
    setFruitStyle(newStyle);
  }

  function triggerSound() {
    switch (screenNumber) {
      case 1:
        screenSound1Play();
        break;
      case 2:
        screenSound2Play();
        break;
      case 3:
        screenSound3Play();
        break;
    }
  }

  function getWaitingTime() {
    switch (screenNumber) {
      case 1:
        return 0;
      case 2:
        return 0.2;
      case 3:
        return 0.4;
      default:
        return 0;
    }
  }

  function winningCombination() {
    return constructFruitsOrder([ico4, icoWin, ico6]);
  }

  function defaultCombination() {
    switch (screenNumber) {
      case 1:
        return constructFruitsOrder([
          ico1,
          ico2,
          ico3,
          ico4,
          ico5,
          ico6,
          ico7,
          ico8,
          ico9,
          icoWin,
        ]);
      case 2:
        return constructFruitsOrder([
          icoWin,
          ico1,
          ico2,
          ico3,
          ico4,
          ico5,
          ico6,
          ico7,
          ico8,
          ico9,
        ]);
      case 3:
        return constructFruitsOrder([
          ico9,
          icoWin,
          ico1,
          ico2,
          ico3,
          ico4,
          ico5,
          ico6,
          ico7,
          ico8,
        ]);
      default:
        return constructFruitsOrder([
          ico8,
          ico9,
          icoWin,
          ico1,
          ico2,
          ico3,
          ico4,
          ico5,
          ico6,
          ico7,
        ]);
    }
  }

  function constructFruitsOrder(fruitsOrder) {
    let allFruits = [];
    allFruits.push(...fruitsOrder);
    return allFruits.map((fruit) => (
      <img
        className={gameFinished && winner ? "winnerImg" : ""}
        style={fruitStyle}
        src={fruit}
      />
    ));
  }

  return (
    <>
      <div
        className={`screen-column ${
          screenNumber === 1 ? "screen-column-first" : ""
        }`}
      >
        {gameFinished && winner ? winningCombination() : defaultCombination()}
      </div>
    </>
  );
}

export default Screen;
