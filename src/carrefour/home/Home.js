import "./assets/styles.scss";
import { Router } from "@reach/router";
import Campaign from "../Campaign/Campaign";
import Game from "../Game/Game";
function Home() {
  return (
    <div className="home-container">
      <Router>
        <Campaign path="/" />
        <Game path="game" />
      </Router>
    </div>
  );
}

export default Home;
