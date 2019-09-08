addEventListener('fetch', event=>{
    event.respondWith(handleRequest(event.request));
});

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
    let url, response, contentType;
    let responseHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Service-Info": "This service is provided by https://www.kcak11.com"
    };
    let responseConfig = {
        status: 200,
        headers: responseHeaders
    };
    let supportedMethods = "GET|HEAD|OPTIONS";
    try {
        if (supportedMethods.indexOf(request.method.toUpperCase()) === -1) {
            var methodError = new Error(request.method + " is not supported by this service.");
            methodError.httpStatus = 405;
            throw methodError;
        }
        if (request.url.indexOf("url=") > -1) {
            var _url = new URL(request.url);
            url = _url.searchParams.get("url");
            contentType = _url.searchParams.get("contentType") || null;
            if (url.indexOf("cors.kcak11.workers.dev") > -1) {
                throw new Error("Invalid url specified.");
            }
        } else {
            url = "https://www.kcak11.com/ServiceWorker/missing-worker-url";
        }
        response = await fetch(url,request);
        if (contentType) {
            responseConfig["headers"]["Content-type"] = contentType;
        }
        return new Response(response.body,responseConfig);
    } catch (exjs) {
        url = "https://www.kcak11.com/ServiceWorker/error";
        response = await fetch(url);
        var responseText = await response.text();
        responseText = responseText.split("{{service_error_msg_details}}").join(exjs.message ? exjs.message : exjs);
        responseConfig["headers"]["Content-type"] = "text/html;charset=UTF-8";
        responseConfig.status = exjs.httpStatus || 500;
        return new Response(responseText,responseConfig);
    }
}
