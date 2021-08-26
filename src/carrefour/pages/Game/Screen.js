import React, { useEffect, useState } from "react";

import "./assets/styles.scss";
import ico1 from "../../resources/assets/ico1.png";
import ico2 from "../../resources/assets/ico2.png";
import ico3 from "../../resources/assets/ico3.png";
import ico4 from "../../resources/assets/ico4.png";
import ico5 from "../../resources/assets/ico5.png";
import ico6 from "../../resources/assets/ico6.png";
import ico7 from "../../resources/assets/ico7.png";
import ico8 from "../../resources/assets/ico8.png";
import ico9 from "../../resources/assets/ico9.png";
import icoWin from "../../resources/assets/icoWin.png";

const DURATION = 5000;

function Screen({ animate, speed, screenNumber, winner, onFinish }) {
  const defaultStyle = { top: "25%" };
  let waitingTime = getWaitingTime();
  const [fruitStyle, setFruitStyle] = useState(defaultStyle);
  const [gameFinished, setGameFinished] = useState(false);
  const totalTime = DURATION + waitingTime * 5000;

  useEffect(() => {
    if (animate) {
      animateFruits(true);
      setTimeout(() => {
        animateFruits(false);
        setGameFinished(true);
        onFinish && onFinish();
      }, totalTime);
    }
  }, [animate]);

  function animateFruits(isAnimated) {
    let newStyle = {};
    if (isAnimated) {
      newStyle = {
        animation:
          speed + "s linear " + waitingTime + "s  infinite running spinIt",
      };
    }
    setFruitStyle(newStyle);
  }

  function getWaitingTime() {
    switch (screenNumber) {
      case 1:
        return 0;
      case 2:
        return 0.2;
      case 3:
        return 0.5;
      default:
        return 0;
    }
  }

  function winningCombination() {
    return constructFruitsOrder([
      ico1,
      ico2,
      ico3,
      ico4,
      icoWin,
      ico6,
      ico7,
      ico8,
      ico9,
      ico5,
    ]);
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
    return allFruits.map((fruit) => <img style={fruitStyle} src={fruit} />);
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
