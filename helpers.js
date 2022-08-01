const fetch = require('node-fetch');

async function sendHttp({url, httpMethod, params, body}) {
    url = new URL(url);
    const reqParams = {
        method: httpMethod,
    }
    if (body) {
        reqParams.body = JSON.stringify(body);
        reqParams.headers = {'Content-Type': 'application/json'};
    }
    if (params){
        url.search = new URLSearchParams(params).toString();
    }
    var result;
    try {
        const reasponse = await fetch(url, reqParams);
        result = await reasponse.text();
    }
    catch (err){
        throw `Problem reaching '${url}': ${err.message}`;
    }
    if (result !== "ok") throw result;
    return result;
}

module.exports = {
    sendHttp
}