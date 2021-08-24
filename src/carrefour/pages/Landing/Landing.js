import React, { useState } from "react";
import "./assets/styles.scss";
import Checkbox from "../../components/Checkbox/Checkbox";
import Button from "../../components/Button/Button";
import { Link } from "@reach/router";

function Landing() {
  const [agreed, setAgreed] = useState(false);

  function agree() {
    setAgreed(!agreed);
  }

  return (
    <>
      <div className="go-to-game-container">
        <div className="go-to-game-content">
          <div className="game-period"> From the 1st to the 30th</div>
          <div className="title">Try to win your basket</div>
          <div className="description">
            for the purchase of one eligible product
          </div>
          <div className="agree">
            <Checkbox checkAction={agree} />I agree with the{" "}
            <Link to="game"> conditions </Link> of the game
          </div>
          <Button text="Play" enable={agreed} to={"/game"} />
        </div>
      </div>
      <div className="shop-and-play-layer" />
    </>
  );
}

export default Landing;
