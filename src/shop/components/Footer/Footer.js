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
        <Link to="legal/help">Help (FAQ)</Link>
        <Link to="legal/generalConditions">General conditions</Link>
        <Link to="legal/legalNotices">Legal notices</Link>
        <Link to="legal/dataProtection">Data protection</Link>
        <Link to="legal/cookie">Cookie</Link>
      </div>
    </div>
  );
}

export default Footer;
