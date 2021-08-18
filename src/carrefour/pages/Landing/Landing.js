import "./assets/styles.scss";
import { Link } from "@reach/router";
function Landing() {
  return (
    <div className="go-to-game-container">
      <div className="go-to-game-content">
        <div className="game-period"> FROM THE 1ST TO THE 30TH</div>
        <div className="title">Try to win your basket</div>
        <div className="description">
          Refunder for the purchase one of the eligible product
        </div>
        <Link className="play-button" to="game">
          Play
        </Link>
      </div>
    </div>
  );
}

export default Landing;
