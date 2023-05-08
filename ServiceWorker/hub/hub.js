const upstream = 'https://cdn.kcak11.com/hub/'
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
});

function getRandom() {
    return "0123456789abcdef0123456789abcdef".split("").sort(function () { return Math.random() - Math.random(); }).join("");
}

function isValidNumber(inp) {
    if (inp && (typeof inp === "string" || typeof inp === "number") && !isNaN(inp)) {
        return true;
    }
    return false;
}

function decodeToken(token) {
    var token = decodeURIComponent(atob(atob(token)));
    var ts = "";
    for (var i = 0; i < token.length; i++) {
        ts += String.fromCharCode(token[i].charCodeAt(0) ^ 11 ^ 121 ^ 92 ^ (i + 1));
    }
    return +(ts.split(".")[1]);
}

async function handleRequest(request) {
    let responseHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "text/html; charset=UTF-8",
        "X-Response-Hub-ID": getRandom()
    };
    let responseConfig = {
        status: 200,
        headers: responseHeaders
    };
    if (request.url.indexOf("/update-token") > -1) {
        let response = await fetch(upstream + "update", request);
        let responseText = await response.text();
        return new Response(responseText, responseConfig);
    } else {
        const url = new URL(request.url);
        let pageTitle = "Content View";
        let fileIdentifier = "default";
        let tokenExpired = false;
        if (url.search) {
            let data = url.search.substring(1);
            if (data) {
                try {
                    let decodedData = JSON.parse(atob(decodeURIComponent(data)));
                    if (!decodedData["token"]) {
                        tokenExpired = true;
                    } else {
                        let decodedToken = decodeToken(decodedData["token"]);
                        if (!isValidNumber(decodedToken) || new Date().getTime() >= decodedToken) {
                            tokenExpired = true;
                        }
                    }
                    fileIdentifier = decodedData["id"];
                    pageTitle = decodedData["_t"] || pageTitle;
                } catch (exjs) {
                    /** NO ACTION */
                }
            }
        }
        let response = await fetch(upstream, request);
        let responseText = await response.text();
        if (!tokenExpired) {
            responseText = responseText.replace(/{{FILE_IDENTIFIER}}/g, fileIdentifier);
            responseText = responseText.replace(/{{PAGE_TITLE}}/g, pageTitle);
        } else {
            responseText = responseText.replace(/{{FILE_IDENTIFIER}}/g, "TOKEN-EXPIRED");
            responseText = responseText.replace(/{{PAGE_TITLE}}/g, "Link Expired");
        }
        return new Response(responseText, responseConfig);
    }
}