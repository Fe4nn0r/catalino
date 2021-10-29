import React, { useEffect } from "react";
import Home from "./shop/pages/Home/Home";
import { googleTagManagerId } from "./shop/resources/config/config.json";
import { globalHistory } from "@reach/router";
import ReactGA from "react-ga";
import TagManager from "react-gtm-module";

let Shake = require("shake.js");

function App() {
  useEffect(() => {
    initializeShaker();
    initializeGoogleAnalytics();
  }, []);

  function initializeGoogleAnalytics() {
    TagManager.initialize(googleTagManagerId);
    //ReactGA.initialize(googleTagManagerId);
    globalHistory.listen(({ location }) => {
      //ReactGA.pageview(window.location.pathname + window.location.search);
      window.dataLayer.push({
        event: "pageview",
        page: {
          url: window.location.pathname + window.location.search,
          title: window.location.pathname,
        },
      });
      console.log("Sending the visite", location.pathname + location.search);
    });
    window.dataLayer.push({
      event: "pageview",
      page: {
        url: window.location.pathname + window.location.search,
        title: window.location.pathname,
      },
    });
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
