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
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
    let url, response, contentType;
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
        if (request.url.indexOf("url=") > -1) {
            let _url = new URL(request.url);
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
