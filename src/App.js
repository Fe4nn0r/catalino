import React, { useEffect } from "react";
import Home from "./shop/pages/Home/Home";
import { googleAnalyticsTrackingId } from "./shop/resources/config/config.json";
import { globalHistory } from "@reach/router";
import ReactGA from "react-ga";

let Shake = require("shake.js");

function App() {
  useEffect(() => {
    initializeShaker();
    initializeGoogleAnalytics();
  }, []);

  function initializeGoogleAnalytics() {
    ReactGA.initialize(googleAnalyticsTrackingId);
    globalHistory.listen(({ location }) => {
      ReactGA.pageview(window.location.pathname + window.location.search);
      console.log("Sending the visite", location.pathname + location.search);
    });
    //First info collection
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
  function initializeShaker() {
    //Shaker part
    window.onload = function () {
      //create a new instancey of shake.js.
      let myShakeEvent = new Shake({
        threshold: 15,
      });
      // start listening to device motion
      myShakeEvent.start();
    };
  }
  return (
    <>
      <Home />
    </>
  );
}

export default App;
