import Moment from "moment";
import appConfig from "../shop/resources/config/config.json";

export function getAndApplyApiConfiguration(offer) {
  document.getElementById(appConfig.homePageId).style.backgroundColor =
    offer.background_color;
  const startDate = getDate(offer.started_at);
  const endDate = getDate(offer.ended_at);
  const offerTitle = offer.subtitle;
  return { offerTitle: offerTitle, startDate: startDate, endDate: endDate };
}

function getDate(date) {
  return Moment(date).format(appConfig.dateFormat);
}
