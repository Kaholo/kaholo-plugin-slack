const fetch = require("node-fetch");

async function sendHttp({
  url, httpMethod, params, body,
}) {
  const urlObject = new URL(url);
  const reqParams = {
    method: httpMethod,
  };
  if (body) {
    reqParams.body = JSON.stringify(body);
    reqParams.headers = { "Content-Type": "application/json" };
  }
  if (params) {
    urlObject.search = new URLSearchParams(params).toString();
  }
  let result;
  try {
    const reasponse = await fetch(urlObject, reqParams);
    result = await reasponse.text();
  } catch (err) {
    throw new Error(`Problem reaching '${urlObject}': ${err.message}`);
  }
  if (result !== "ok") {
    throw result;
  }
  return result;
}

module.exports = {
  sendHttp,
};
