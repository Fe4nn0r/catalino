import React from "react";
import ReactDOM from "react-dom";

import BannerTest from "./BannerTest";

if (document.getElementById("banner")) {
  ReactDOM.render(
    <React.StrictMode>
      <BannerTest />
    </React.StrictMode>,
    document.getElementById("banner")
  );
}
