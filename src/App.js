import React from "react";
import Home from "./shop/pages/Home/Home";
let Shake = require("shake.js");

function App() {
  //Shaker part
  window.onload = function () {
    //create a new instancey of shake.js.
    let myShakeEvent = new Shake({
      threshold: 15,
    });
    // start listening to device motion
    myShakeEvent.start();
  };
  return (
    <>
      <Home />
    </>
  );
}

export default App;
