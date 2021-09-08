import Moment from "moment";

import appConfig from "../shop/resources/config/config.json";
import icoWin from "../shop/resources/assets/img/icoWin.png";
import desktopBackgroundLayer from "../shop/resources/assets/img/background-layer.png";
import mobileBackgroundLayer from "../shop/resources/assets/img/background-layer-mobile.png";

export function getAndApplyApiConfiguration(offer) {
  document.getElementById(appConfig.homePageId).style.backgroundColor =
    offer.background_color;
  const startDate = getDate(offer.started_at);
  const endDate = getDate(offer.ended_at);
  const offerTitle = offer.subtitle;
  localStorage.setItem("bgDesktopImageUrl", offer.picture_url);
  localStorage.setItem("bgMobileImageUrl", offer.picture_url + "mobile");
  localStorage.setItem("winIcon", offer.brand_logo_url);
  return { offerTitle: offerTitle, startDate: startDate, endDate: endDate };
}

export async function getDesktopBackgroundLayer() {
  return getImageIfExistOrReturnDefault(
    localStorage.getItem("bgDesktopImageUrl"),
    desktopBackgroundLayer
  );
}
export async function getMobileBackgroundLayer() {
  return getImageIfExistOrReturnDefault(
    localStorage.getItem("bgMobileImageUrl"),
    mobileBackgroundLayer
  );
}

export async function getWinIcon() {
  return getImageIfExistOrReturnDefault(
    localStorage.getItem("winIcon"),
    icoWin
  );
}

async function getImageIfExistOrReturnDefault(imgUrl, defaultUrl) {
  return await fetch(imgUrl, { method: "HEAD" })
    .then((res) => {
      if (res.ok) {
        return imgUrl;
      } else {
        return defaultUrl;
      }
    })
    .catch((err) => console.log("Error:", err));
}

function getDate(date) {
  return Moment(date).format(appConfig.dateFormat);
}
