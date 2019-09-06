addEventListener('fetch', event=>{
    event.respondWith(handleRequest(event.request))
});

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
    let url, response;
    let headers = {
        "Access-Control-Allow-Origin": "*",
        "Service-Info": "This service is provided by https://www.kcak11.com"
    };
    let responseConfig = {
        status: 200,
        headers: headers
    };
    try {
        if (request.url.indexOf("url=") > -1) {
            var _url = new URL(request.url);
            url = _url.searchParams.get("url");
            if (url.indexOf("cors.kcak11.workers.dev") > -1) {
                throw new Error("Invalid url specified.");
            }
        } else {
            url = "https://www.kcak11.com/ServiceWorker/missing-worker-url";
        }
        response = await fetch(url);
        return new Response(response.body,responseConfig);
    } catch (exjs) {
        responseConfig.status = 500;
        url = "https://www.kcak11.com/ServiceWorker/error";
        response = await fetch(url);
        var responseText = "" + response.body;
        responseText = responseText.split("{{service_error_msg_details}}").join(exjs.message ? exjs.message : exjs);
        return new Response(response.body,responseConfig);
    }
}
