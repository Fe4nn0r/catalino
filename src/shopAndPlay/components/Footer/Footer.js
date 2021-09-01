import React from "react";
import { useMediaQuery } from "react-responsive";
import "./assets/style.scss";
import sponsors from "../../resources/assets/img/sponsors.png";

function Footer() {
  return (
    <div className="footer">
      <div className="sponsors">
        <img src={sponsors} />
      </div>
      <div className="options">
        <p>Help (FAQ)</p>
        <p>General conditions</p>
        <p>Legal notices</p>
        <p>Data protection</p>
        <p>Cookie</p>
      </div>
    </div>
  );
}

export default Footer;
