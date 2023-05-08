const upstream = 'https://kcak11-ashishkumarkc.onlineornot.com'
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
});

function getRandom() {
    return "0123456789abcdef0123456789abcdef".split("").sort(function () { return Math.random() - Math.random(); }).join("");
}

async function handleRequest(request) {
    let responseHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "text/html; charset=UTF-8"
    };
    let responseConfig = {
        status: 200,
        headers: responseHeaders
    };
    const url = new URL(request.url);
    let response = await fetch(upstream + url.pathname + url.search, request);
    let responseText = await response.text();
    responseText = responseText.replace("<head>", "<head><base href=\"" + upstream + "\"/><script src=\"https://cdn.kcak11.com/cdn/resources/k11b/monitor.js?session=" + getRandom() + "\"></script>");
    responseText = responseText.replace("</head>", "<link href=\"https://www.kcak11.com/favicon.png\" rel=\"icon\" type=\"image/x-icon\"/></head>");
    responseText = responseText.replace("</body>", "<script>window[\"_kMonitor\"] && window[\"_kMonitor\"]();</script>");
    return new Response(responseText, responseConfig);
}
