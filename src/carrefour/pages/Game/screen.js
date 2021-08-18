import React, { useEffect, useState } from "react";

import "./assets/styles.scss";
import cheryImg from "../../assets/chery.png";
import bananaImg from "../../assets/banana.png";
import gelatoImg from "../../assets/gelato.png";

const DURATION = 3000;

function Screen({ animate, speed, screenNumber, winner }) {
  const defaultStyle = { top: "0%" };
  let waitingTime = getWaitingTime();
  const [fruitStyle, setFruitStyle] = useState(defaultStyle);
  const totalTime = DURATION + waitingTime * 1000;

  useEffect(() => {
    if (animate) {
      animateFruits(true);
      setTimeout(() => {
        animateFruits(false);
        console.log(winner);
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
    return constructFruitsOrder([bananaImg, cheryImg, gelatoImg]);
  }

  function defaultCombination() {
    switch (screenNumber) {
      case 1:
        return constructFruitsOrder([bananaImg, cheryImg, gelatoImg]);
      case 2:
        return constructFruitsOrder([cheryImg, gelatoImg, bananaImg]);
      case 3:
        return constructFruitsOrder([gelatoImg, bananaImg, cheryImg]);
      default:
        return constructFruitsOrder([bananaImg, cheryImg, gelatoImg]);
    }
  }

  function constructFruitsOrder(fruitsOrder) {
    let allFruits = [];
    for (let i = 0; i < 3; i++) {
      allFruits.push(...fruitsOrder);
    }
    return allFruits.map((fruit) => <img style={fruitStyle} src={fruit} />);
  }

  return (
    <>
      <div
        className={`screen-column ${
          screenNumber === 1 ? "screen-column-first" : ""
        }`}
      >
        {!animate && winner ? winningCombination() : defaultCombination()}
      </div>
    </>
  );
}

export default Screen;
