import React from "react";
import "./assets/style.scss";
import { Link } from "@reach/router";

function Footer() {
  return (
    <div className="footer">
      <div className="options">
        <a>Help (FAQ)</a>
        <Link to="cgu">General conditions</Link>
        <a>Legal notices</a>
        <a>Data protection</a>
        <a>Cookie</a>
      </div>
    </div>
  );
}

export default Footer;
