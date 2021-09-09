import React, { useEffect, useState } from "react";
import "./assets/style.scss";
import { Link } from "@reach/router";
import { getFooterImage } from "../../../utils/appApiConfiguration";

function Footer() {
  const [sponsors, setSponsors] = useState(null);
  useEffect(() => {
    getFooterImage().then((res) => setSponsors(res));
  }, []);

  function getSponsors() {
    if (sponsors)
      return (
        <div className="sponsors">
          <img src={sponsors} />
        </div>
      );
    else return null;
  }

  return (
    <div className="footer">
      {getSponsors()}
      <div className="options">
        <a>Help (FAQ)</a>
        <Link to="legal/cgu">General conditions</Link>
        <a>Legal notices</a>
        <a>Data protection</a>
        <a>Cookie</a>
      </div>
    </div>
  );
}

export default Footer;
