(function() {
    window.fluidIframeContainer = function(url) {
        var init = function() {
            var divContainer = document.createElement("div");
            divContainer.id = "mainContainer";
            divContainer.style.position = "fixed";
            divContainer.style.top = divContainer.style.right = divContainer.style.bottom = divContainer.style.left = "0px";
            document.getElementsByTagName("body")[0].appendChild(divContainer);

            var frameContainer = document.createElement("iframe");
            frameContainer.id = "mainFrame";
            frameContainer.src = url;
            frameContainer.style.display = "block";
            frameContainer.style.border = "none";
            frameContainer.style.position = "absolute";
            frameContainer.style.top = frameContainer.style.right = frameContainer.style.bottom = frameContainer.style.left = "0px";
            frameContainer.style.width = divContainer.offsetWidth + "px";
            frameContainer.style.height = divContainer.offsetHeight + "px";
            document.getElementById("mainContainer").appendChild(frameContainer);
            var retObj =  {
                "mainContainer": document.getElementById("mainContainer"),
                "mainFrame": document.getElementById("mainFrame")
            };
            try{throw new Error();}catch(exjs){console.log("invoked . . .\n"+exjs);}
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
