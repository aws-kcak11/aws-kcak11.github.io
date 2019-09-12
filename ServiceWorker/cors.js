const serviceInfo = "Provider=[https://www.kcak11.com|https://www.ashishkumarkc.com]";

addEventListener('fetch', event=>{
    event.respondWith(handleRequest(event.request));
});

/**
 * Get response ID
 */
function getResponseID() {
    let chars = "abcdef0123456789"
      , responseID = "";
    for (let i = 0; i < 2; i++) {
        responseID += chars;
    }
    return responseID.split("").sort(function() {
        return Math.random() - Math.random();
    }).join("");
}

/**
 * Base64 Encode
 * @param {ArrayBuffer} buf
 */
function base64Encode(buf) {
    let string = '';
    (new Uint8Array(buf)).forEach((byte)=>{
        string += String.fromCharCode(byte);
    });
    return btoa(string);
}

/**
 * Base64 Decode
 * @param {String} string
 */
function base64Decode(string) {
    string = atob(string);
    const length = string.length
      , buf = new ArrayBuffer(length)
      , bufView = new Uint8Array(buf);
    for (var i = 0; i < length; i++) {
        bufView[i] = string.charCodeAt(i);
    }
    return buf;
}

/**
 * Handle Base64 Request
 * @param {String} url
 * @param {Response} response
 */
async function handleBase64Request(url, response, responseConfig) {
    let responseObject = {
        url: url,
        base64Data: base64Encode(await response.arrayBuffer())
    };
    responseConfig["headers"]["Content-type"] = "application/json";
    return new Response(JSON.stringify(responseObject),responseConfig);
}

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
    let _url, url, urlExists = false, response, contentType;
    let responseHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Service-Info": serviceInfo,
        "X-KCAK11-ResponseID": getResponseID()
    };
    let responseConfig = {
        status: 200,
        headers: responseHeaders
    };
    let supportedMethods = "GET|HEAD|OPTIONS";
    try {
        if (supportedMethods.indexOf(request.method.toUpperCase()) === -1) {
            let methodError = new Error(request.method + " is not supported by this service.");
            methodError.httpStatus = 405;
            throw methodError;
        }
        _url = new URL(request.url);
        if (_url.searchParams.get("url")) {
            url = _url.searchParams.get("url");
            contentType = _url.searchParams.get("contentType") || null;
            if (url.indexOf("cors.kcak11.workers.dev") > -1) {
                throw new Error("Invalid url specified.");
            }
        } else {
            url = "https://www.kcak11.com/ServiceWorker/missing-worker-url";
        }
        let customRequest = new Request(request,{
            "redirect": "follow"
        });
        response = await fetch(url,customRequest);
        if (_url.searchParams.get("format") === "base64") {
            return handleBase64Request(url, response, responseConfig);
        }
        if (contentType) {
            responseConfig["headers"]["Content-type"] = contentType;
        }
        return new Response(response.body,responseConfig);
    } catch (exjs) {
        url = "https://www.kcak11.com/ServiceWorker/error";
        response = await fetch(url);
        let responseText = await response.text();
        responseText = responseText.split("{{service_error_msg_details}}").join(exjs.message ? exjs.message : exjs);
        responseConfig["headers"]["Content-type"] = "text/html;charset=UTF-8";
        responseConfig.status = exjs.httpStatus || 500;
        return new Response(responseText,responseConfig);
    }
}
