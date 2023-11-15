const upstream = 'https://kcak11-ashishkumarkc.onlineornot.com'

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
});

async function handleRequest(request) {
    let responseHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "text/html; charset=UTF-8"
    };
    let responseConfig = {
        status: 200,
        headers: responseHeaders
    };
    let responseText = decodeURIComponent("%3C!DOCTYPE%20html%3E%0A%3Chtml%3E%0A%0A%3Chead%3E%0A%20%20%20%20%3Ctitle%3EWebsite%20Health%20Report%3C%2Ftitle%3E%0A%20%20%20%20%3Clink%20rel%3D%22icon%22%20sizes%3D%22192x192%22%20href%3D%22%2F%2Fwww.kcak11.com%2Fassets%2Fimages%2Fthe-k-circle_192x192.png%22%20%2F%3E%0A%20%20%20%20%3Clink%20rel%3D%22apple-touch-icon%22%20sizes%3D%22128x128%22%20href%3D%22%2F%2Fwww.kcak11.com%2Fassets%2Fimages%2Fthe-k-circle_128x128.png%22%20%2F%3E%0A%20%20%20%20%3Cmeta%20content%3D%22https%3A%2F%2Fcdn.kcak11.com%2Fprofile%2Fthe-k-circle.png%22%20itemprop%3D%22image%22%20%2F%3E%0A%20%20%20%20%3Cmeta%20content%3D%22width%3Ddevice-width%2Cinitial-scale%3D1.0%2Cminimum-scale%3D1.0%2Cmaximum-scale%3D1.0%2Cuser-scalable%3D0%22%20name%3D%22viewport%22%20%2F%3E%0A%20%20%20%20%3Cmeta%20name%3D%22theme-color%22%20content%3D%22%235aa0d3%22%20%2F%3E%0A%20%20%20%20%3Cscript%20type%3D%22text%2Fjavascript%22%20src%3D%22https%3A%2F%2Fwww.kcak11.com%2Fscripts%2Ffluid-iframe-container.js%22%3E%3C%2Fscript%3E%0A%3C%2Fhead%3E%0A%0A%3Cbody%3E%0A%20%20%20%20%3Cscript%20type%3D%22text%2Fjavascript%22%3E%0A%20%20%20%20%20%20%20%20new%20fluidIframeContainer(%22https%3A%2F%2Fkcak11-ashishkumarkc.onlineornot.com%2F%22)%3B%0A%20%20%20%20%3C%2Fscript%3E%0A%3C%2Fbody%3E%0A%0A%3C%2Fhtml%3E");
    return new Response(responseText, responseConfig);
}
