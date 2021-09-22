import React, { useEffect, useState } from "react";
import "./assets/styles.scss";
import Checkbox from "../../components/Checkbox/Checkbox";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import mobileBackgroundLayer from "../../resources/assets/img/background-layer-mobile.png";

import {
  getCryptedAuthentication,
  getOffer,
  retrieveGameInformationFromToken,
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
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

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

  useEffect(() => {
    const token = urlParams.get("info");
    if (token) {
      retrieveGameInformationFromToken(token);
      authenticate();
    } else {
      if (!localStorage.getItem("holderRef")) {
        navigate("/in-store");
      } else {
        authenticate();
      }
    }
  }, []);

  function authenticate() {
    getCryptedAuthentication()
      .then(() => {
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
          .catch((err) => {
            navigate("/can-not-play");
          });
      })
      .catch((err) => {
        navigate("/can-not-play");
      });
  }

  function agree() {
    setAgreed(!agreed);
  }

  return allowed ? (
    <>
      <div className="part1">
        <div className="go-to-game-container">
          <div className="go-to-game-content content">
            <div className="game-period">
              {" "}
              {t("landing.gamePeriod", {
                start: landingInformation.startDate,
                end: landingInformation.endDate,
              })}
            </div>
            <div className="title">{landingInformation.offerTitle}</div>
            <div className="description">{t("landing.description")}</div>
            <div className="agree">
              <Checkbox checkAction={agree} />
              {t("landing.agreeP1")}
              <Link to="game"> {t("landing.conditions")} </Link>{" "}
              {t("landing.agreeP2")}
            </div>
            <Button text={t("landing.play")} enable={agreed} to={"/game"} />
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
