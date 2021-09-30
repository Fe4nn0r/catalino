import CryptoJS from "crypto-js";
import request from "./request";
import jwt from "jwt-simple";
import {
  inStoreRetailerId,
  inStoreOfferId,
} from "../shop/resources/inStore/instore-config.json";

const apiHost = "https://cmfr-test.azure-api.net/s-a-p-test/";
const partner_key = "9589ba2c8fef6759f96a7c2726c7d8a0";
const partner_secret = "3c1931161ae51ef1a168a82fe7f0eba3";
const partner_id = 9;
const subscriptionKey = "2fb179f5556c471f8ea8ea9c77dd2e50";

export function encodeToRemove(body) {
  const token = jwt.encode(body, partner_secret);
  //retrieveGameInformationFromToken(token);
  return token;
}

export function retrieveGameInformationFromToken(token) {
  const decodedInfo = jwt.decode(token, partner_secret);
  localStorage.setItem("retailerId", decodedInfo.retailerId.toString());
  localStorage.setItem(
    "holderRef",
    getEncryptedHolderRef(decodedInfo.holderRef.toString())
  );
  localStorage.setItem("offerId", decodedInfo.offerId.toString());
}

export function getCryptedAuthentication() {
  const body = {
    retailer_id: Number(localStorage.getItem("retailerId")),
    holder_ref: localStorage.getItem("holderRef"),
  };
  const encryptedAuthUrl = apiHost + "members/crypted_authentication";
  return httpPost(
    encryptedAuthUrl,
    "/members/crypted_authentication",
    body
  ).then((result) => {
    localStorage.setItem("memberId", result.id);
    localStorage.setItem("Authorization", result.access_token);
  });
}

export function getOffer() {
  const actionPath =
    "/ecommerce/offers?retailer_id=" + localStorage.getItem("retailerId");
  const offerId = localStorage.getItem("offerId");
  return httpGet(apiHost + actionPath, actionPath).then((offers) => {
    return extractOffer(offers, offerId);
  });
}
export function getOfferByIdAndRetailerID(offerId, retailerId) {
  const actionPath = "/ecommerce/offers?retailer_id=" + retailerId;
  return httpGet(apiHost + actionPath, actionPath).then((offers) => {
    return extractOffer(offers, offerId);
  });
}

function extractOffer(offers, offerId) {
  let availableOffer = null;
  offers.forEach((offer) => {
    console.log(offer.id.toString(), offerId);
    if (offer.id.toString() === offerId) {
      availableOffer = offer;
    }
  });
  return availableOffer;
}

export async function applyBasket() {
  const basketUrl =
    apiHost + "members/" + localStorage.getItem("memberId") + "/basket";
  const body = [
    {
      retailer_id: Number(localStorage.getItem("retailerId")),
      offer_id: Number(localStorage.getItem("offerId")),
    },
  ];
  return httpPost(
    basketUrl,
    "/members/" + localStorage.getItem("memberId") + "/basket",
    body
  );
}

export async function sendEmailForRefund(email) {
  const basketUrl = apiHost + "members/" + localStorage.getItem("memberId");
  const body = {
    email: email,
    holders: [
      {
        ref: localStorage.getItem("holderRef"),
        retailer_id: Number(localStorage.getItem("retailerId")),
      },
    ],
  };
  return httpPatch(
    basketUrl,
    "/members/" + localStorage.getItem("memberId"),
    body
  );
}

export async function sendPaypalInformation(email) {
  const basketUrl = apiHost + "members/" + localStorage.getItem("memberId");
  const body = {
    paypal_id: email,
  };
  return httpPatch(
    basketUrl,
    "/members/" + localStorage.getItem("memberId"),
    body
  );
}

export async function sendBankInformation(name, iban, bic) {
  const basketUrl = apiHost + "members/" + localStorage.getItem("memberId");
  const body = {
    firstname: name.substr(0, name.indexOf(" ")),
    lastname: name.substr(name.indexOf(" ") + 1),
    bank_iban: iban,
    bank_bic: bic,
  };
  return httpPatch(
    basketUrl,
    "/members/" + localStorage.getItem("memberId"),
    body
  );
}

export async function applyBasketAndGetWallet() {
  return applyBasket().then(() => {
    return getWallet();
  });
}

export async function getWallet() {
  return httpGet(
    apiHost + "/members/" + localStorage.getItem("memberId") + "/wallet",
    "/members/" + localStorage.getItem("memberId") + "/wallet"
  ).then((results) => {
    let lotteryId = 0;
    if (results.lottery_rejected && results.lottery_rejected.length > 0) {
      lotteryId = results.lottery_rejected[0].id;
    }
    return (
      results.validated &&
      results.validated.length > 0 &&
      results.validated[0].id > lotteryId
    );
  });
}

async function httpGet(url, apiActionPath) {
  let headers = await getHeaders(apiActionPath, "GET", 0);
  return request(url, {
    headers: headers,
  });
}

async function httpPost(url, apiActionPath, body) {
  const payload = JSON.stringify(body);
  let headers = await getHeaders(apiActionPath, "POST", payload.length);
  return request(apiHost + apiActionPath, {
    method: "POST",
    headers: headers,
    body: body,
  });
}

async function httpPatch(url, apiActionPath, body) {
  const payload = JSON.stringify(body);
  let headers = await getHeaders(apiActionPath, "PATCH", payload.length);
  return request(apiHost + apiActionPath, {
    method: "PATCH",
    headers: headers,
    body: body,
  });
}

function generatePartnerToken(
  methodRest,
  apiActionPath,
  timeStamp,
  dataLength
) {
  return CryptoJS.enc.Hex.stringify(
    CryptoJS.HmacSHA1(
      "/api/v1" +
        apiActionPath +
        methodRest +
        dataLength +
        partner_secret +
        timeStamp,
      partner_key
    )
  );
}

async function getHeaders(apiActionPath, methodRest, dataLength) {
  let timeStamp = new Date()["toGMTString"]();
  let partnerToken = await generatePartnerToken(
    methodRest,
    apiActionPath,
    timeStamp,
    dataLength
  );
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + localStorage.getItem("Authorization"),
    "X-Partner-Access-Token": partnerToken,
    "X-Cwallet-Partner-Id": partner_id,
    "X-Cwallet-Timestamp": timeStamp,
    "Ocp-Apim-Subscription-Key": subscriptionKey,
    "Access-Control-Allow-Origin": "*",
  };
}

export function generateCryptedHolderRef(holder_ref) {
  const encodedWord = CryptoJS.enc.Utf8.parse(holder_ref); // encodedWord Array object
  return CryptoJS.enc.Base64.stringify(encodedWord);
}

export function getEncryptedHolderRef(holder_ref) {
  const encrypted_source = CryptoJS.AES.encrypt(
    holder_ref,
    CryptoJS.enc.Utf8.parse(partner_key),
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return encrypted_source.toString();
}

export function sendInStoreInformation(body) {
  localStorage.setItem("retailerId", inStoreRetailerId);
  localStorage.setItem(
    "holderRef",
    getEncryptedHolderRef(body.holder_ref.toString())
  );
  localStorage.setItem("offerId", body.offerId);
  const inStoreUrl =
    apiHost + "members/" + localStorage.getItem("memberId") + "/basket";
  return true;
  /*return httpPost(
        inStoreUrl,
        "/members/" + localStorage.getItem("memberId") + "/basket",
        body
    );*/
}
