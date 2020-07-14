(function() {
    window.fluidIframeContainer = function(url) {
        var init = function() {
            var divContainer = document.createElement("div");
            divContainer.id = "mainContainer";
            divContainer.style.position = "fixed";
            divContainer.style.top = divContainer.style.right = divContainer.style.bottom = divContainer.style.left = "0px";
            document.querySelector("body").appendChild(divContainer);

            var frameContainer = document.createElement("iframe");
            frameContainer.id = "mainFrame";
            frameContainer.src = url;
            frameContainer.style.display = "block";
            frameContainer.style.border = "none";
            frameContainer.style.position = "absolute";
            frameContainer.style.top = frameContainer.style.right = frameContainer.style.bottom = frameContainer.style.left = "0px";
            frameContainer.style.width = divContainer.offsetWidth + "px";
            frameContainer.style.height = divContainer.offsetHeight + "px";
            document.querySelector("#mainContainer").appendChild(frameContainer);

            var retObj = {
                "mainContainer": document.getElementById("mainContainer"),
                "mainFrame": document.getElementById("mainFrame")
            };
            var navAgnt = navigator.userAgent;
            if (navAgnt.indexOf(" Mac ") > -1 && navAgnt.indexOf("Chrome/") > -1) {
                if (("" + document.cookie).indexOf("fluid_refresh=true") < 0) {
                    document.cookie = "fluid_refresh=true;path=/;secure;samesite=none;";
                    window.location.reload(true);
                } else {
                    document.cookie = "fluid_refresh=false;path=/;secure;samesite=none;";
                }
            }
            return retObj;
        };
        var elements = init();

        var fixDim = function() {
            elements.mainFrame.style.width = elements.mainContainer.offsetWidth + "px";
            elements.mainFrame.style.height = elements.mainContainer.offsetHeight + "px";
        };
        var autoAdjustDimensions = function() {
            if (window.attachEvent) {
                window.attachEvent("onresize", fixDim);
            } else if (window.addEventListener) {
                window.addEventListener("resize", fixDim, false);
            }
        };
        autoAdjustDimensions();
    };
}());
/* vTag:jQ3MDcyNTY3MTQ1Njg1 */
