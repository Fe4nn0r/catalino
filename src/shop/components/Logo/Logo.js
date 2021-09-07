import React from "react";

import "./assets/style.scss";
import { Link } from "@reach/router";
import logo from "../../resources/assets/img/logo.png";

function Logo({ displayLogo }) {
  return displayLogo ? (
    <>
      <div className="logo">
        <Link to="/">
          <img src={logo} />
        </Link>
      </div>
    </>
  ) : null;
}

export default Logo;
