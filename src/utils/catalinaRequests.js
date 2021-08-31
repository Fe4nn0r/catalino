import CryptoJS from "crypto-js";
import request from "./request";

const apiHost = "https://cmfr-test.azure-api.net/s-a-p-test/";
const partner_key = "9589ba2c8fef6759f96a7c2726c7d8a0";
const partner_secret = "3c1931161ae51ef1a168a82fe7f0eba3";
const partner_id = 9;
const subscriptionKey = "2fb179f5556c471f8ea8ea9c77dd2e50";

export function getCryptedAuthentication(body) {
  const cryptedAuthUrl = apiHost + "members/crypted_authentication";
  return httpPost(cryptedAuthUrl, "/members/crypted_authentication", body).then(
    (result) => {
      localStorage.setItem("memberId", result.id);
      localStorage.setItem("Authorization", result.access_token);
    }
  );
}

export async function getWallet() {
  return httpGet(
    apiHost + "/members/" + localStorage.getItem("memberId") + "/wallet",
    "/members/" + localStorage.getItem("memberId") + "/wallet"
  );
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
  const encoded = CryptoJS.enc.Base64.stringify(encodedWord);
  return encoded;
}
export function encryptWithKey(holder_ref) {
  const encrypted = CryptoJS.AES.encrypt(holder_ref, partner_secret, {
    mode: CryptoJS.mode.ECB,
  });
  return encrypted.toString(); // Ciphertext
}
