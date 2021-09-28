import React, { useEffect, useState } from "react";
import "./assets/style.scss";
import mobileBackgroundLayer from "../../resources/assets/img/background-layer-mobile.png";
import { getDesktopBackgroundLayer } from "../../../utils/appApiConfiguration";
import { useMediaQuery } from "react-responsive";
import config from "../../resources/config/config.json";

function SlotMachine({ content }) {
  const [desktopBackgroundImgLayer, setDesktopBackgroundImgLayer] =
    useState("");
  const isMobile = useMediaQuery({
    query: "(max-width: " + config.queryMobile + ")",
  });
  const [backgroundLayerStyle, setBackgroundLayerStyle] = useState({
    backgroundImage: desktopBackgroundImgLayer,
  });
  useEffect(() => {
    getDesktopBackgroundLayer().then((res) =>
      setDesktopBackgroundImgLayer(res)
    );
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
  return (
    <>
      <div className="slot-machine-container">
        <div className="slot-machine-screen">
          <div className="slot-machine-screen-content">{content}</div>
        </div>
        <div className="shop-and-play-layer" style={backgroundLayerStyle} />
      </div>
    </>
  );
}

export default SlotMachine;
