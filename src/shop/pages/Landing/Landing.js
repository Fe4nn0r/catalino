import React, { useEffect, useState } from "react";
import "./assets/styles.scss";
import Checkbox from "../../components/Checkbox/Checkbox";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import mobileBackgroundLayer from "../../resources/assets/img/background-layer-mobile.png";
import config from "../../resources/config/config.json";
import {
  getDecryptedHolderRef,
  getOffer,
} from "../../../utils/catalinaRequests";
import Loading from "../../components/Loading/Loading";
import {
  getAndApplyApiConfiguration,
  getDesktopBackgroundLayer,
} from "../../../utils/appApiConfiguration";

function Landing() {
  const [t] = useTranslation("message");
  const [agreed, setAgreed] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [landingInformation, setLandingInformation] = useState({});
  const [desktopBackgroundImgLayer, setDesktopBackgroundImgLayer] =
    useState("");
  const [backgroundLayerStyle, setBackgroundLayerStyle] = useState({
    backgroundImage: desktopBackgroundImgLayer,
  });
  const navigate = useNavigate();
  const isMobile = useMediaQuery({
    query: "(max-width: " + config.queryMobile + ")",
  });

  useEffect(() => {
    applyApiConfiguration();
  }, []);

  useEffect(() => {
    if (isMobile) {
      setBackgroundLayerStyle({
        backgroundImage: "url(" + mobileBackgroundLayer + ")",
      });
    } else {
      setBackgroundLayerStyle({
        backgroundImage: "url(" + desktopBackgroundImgLayer + ")",
      });
    }
  }, [isMobile, desktopBackgroundImgLayer]);

  function applyApiConfiguration() {
    getOffer()
      .then((offer) => {
        if (offer) {
          setLandingInformation(getAndApplyApiConfiguration(offer));
          getDesktopBackgroundLayer().then((res) =>
            setDesktopBackgroundImgLayer(res)
          );
          setAllowed(true);
        } else {
          navigate("/can-not-play");
        }
      })
      .catch(() => {
        navigate("/can-not-play");
      });
  }
  function navigateToPage() {
    if (localStorage.getItem("holderRef")) {
      navigate("/game");
    } else {
      navigate("/in-store");
    }
  }
  function agree() {
    setAgreed(!agreed);
  }

  return allowed ? (
    <>
      <div className="info-part">
        <div className="go-to-game-container">
          <div className="go-to-game-content">
            <div className="game-period">
              {" "}
              {t("landing.gamePeriod", {
                start: landingInformation.startDate,
                end: landingInformation.endDate,
              })}
            </div>
            <div className="title">{landingInformation.offerTitle}</div>
            <div className="description">
              {landingInformation.offerDescription}
            </div>
            <div className="agree">
              <Checkbox checkAction={agree} />
              {t("landing.agreeP1")}
              <Link to="/legal/generalConditions">
                {" "}
                {t("landing.conditions")}{" "}
              </Link>{" "}
              {t("landing.agreeP2")}
            </div>
            <div className="button-area">
              <Button
                text={t("landing.play")}
                enable={agreed}
                doAction={navigateToPage}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="shop-and-play-layer" style={backgroundLayerStyle} />
    </>
  ) : (
    <Loading />
  );
}

export default Landing;
