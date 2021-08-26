import CryptoJS from "crypto-js";
import request from "./request";

const apiHost = "https://uat-it.cwallet.couponnetwork.fr/api/v1/";
const partner_key = "9589ba2c8fef6759f96a7c2726c7d8a0";
const partner_secret = "3c1931161ae51ef1a168a82fe7f0eba3";
const partner_id = 9;
const subscriptionKey = "2fb179f5556c471f8ea8ea9c77dd2e50";

export async function httpGet(url, apiActionPath) {
  let headers = await getHeaders(apiActionPath, "GET", 0);
  return request(url, {
    headers: headers,
  });
}

export async function httpPost(url, apiActionPath, body) {
  const payload = JSON.stringify(body);
  let headers = await getHeaders(apiActionPath, "POST", payload.length);
  return request(apiHost + apiActionPath, {
    method: "POST",
    headers: headers,
    body: body,
  });
}

export function getCryptedAuthentification(body) {
  const cryptedAuth = apiHost + "members/crypted_authentication";
  return httpPost(cryptedAuth, "/members/crypted_authentication", body).then(
    (result) => {
      console.log("Results", result);
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
  let header = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + localStorage.getItem("Authorization"),
    "X-Partner-Access-Token": partnerToken,
    "X-Cwallet-Partner-Id": partner_id,
    "X-Cwallet-Timestamp": timeStamp,
    "Ocp-Apim-Subscription-Key": subscriptionKey,
    "Access-Control-Allow-Origin": "*",
  };
  return header;
}

//TO BE DELETED
function getManualHeader() {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Cwallet-Partner-Id": "9",
    "X-Cwallet-Timestamp": "Thu, 26 Aug 2021 14:48:31 GMT",
    "X-Partner-Access-Token": "9d004ef3d583581c893ab3410c7fa24db8ed044f",
  };
}

export async function GetTokenOldDurtyWay(body?) {
  const l_body = body
    ? body
    : '{\n\n            "retailer_id": 1,\n\n            "holder_ref": "TQtBZxoTTk/HnDSVpBNVsw=="\n\n        }';
  return fetch(
    "https://uat-it.cwallet.couponnetwork.fr/api/v1/members/crypted_authentication",
    {
      body: '{\n\n            "retailer_id": 1,\n\n            "holder_ref": "TQtBZxoTTk/HnDSVpBNVsw=="\n\n        }',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Cwallet-Partner-Id": "9",
        "X-Cwallet-Timestamp": "Thu, 26 Aug 2021 14:48:31 GMT",
        "X-Partner-Access-Token": "9d004ef3d583581c893ab3410c7fa24db8ed044f",
      },
      method: "POST",
    }
  )
    .then((response) => response.json())
    .then((result) => {
      console.log("Results", result);
      localStorage.setItem("memberId", result.id);
      localStorage.setItem("Authorization", result.access_token);
      return result;
    });
}
