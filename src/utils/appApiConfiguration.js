import Moment from "moment";

import appConfig from "../shop/resources/config/config.json";
import icoWin from "../shop/resources/assets/img/icoWin.png";
import desktopBackgroundLayer from "../shop/resources/assets/img/background-layer.png";

export function getAndApplyApiConfiguration(offer) {
  document.getElementById(appConfig.homePageId).style.backgroundColor =
    offer.background_color;
  const startDate = getDate(offer.started_at);
  const endDate = getDate(offer.ended_at);
  const offerTitle = offer.title;
  const offerFullDescription = offer.overview ? offer.overview : offer.subtitle;

  localStorage.setItem("bgDesktopImageUrl", offer.picture_url);
  localStorage.setItem("footer", offer.carousel_pictures[0]);
  localStorage.setItem("winIcon", offer.brand_logo_url);
  return {
    offerTitle: offerTitle,
    offerDescription: offerFullDescription,
    startDate: startDate,
    endDate: endDate,
  };
}

export async function getDesktopBackgroundLayer() {
  return getImageIfExistOrReturnDefault(
    localStorage.getItem("bgDesktopImageUrl"),
    desktopBackgroundLayer
  );
}

export async function getWinIcon() {
  return getImageIfExistOrReturnDefault(
    localStorage.getItem("winIcon"),
    icoWin
  );
}

export async function getFooterImage() {
  return getImageIfExistOrReturnDefault(localStorage.getItem("footer"), null);
}

async function getImageIfExistOrReturnDefault(imgUrl, defaultUrl) {
  if (imgUrl && imgUrl !== "null") {
    return await fetch(imgUrl, { method: "HEAD", mode: "no-cors" })
      .then(() => {
        return imgUrl;
      })
      .catch((err) => {
        console.error("Error:", err);
        return defaultUrl;
      });
  } else return Promise.resolve(defaultUrl);
}

function getDate(date) {
  return Moment(date).format(appConfig.dateFormat);
}
