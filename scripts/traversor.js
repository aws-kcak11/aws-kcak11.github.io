window["-testDelay-"] = 180000;
(function () {
    var cnameList = [
        "https://status.kcak11.com",
        "https://status.ashishkumarkc.com",
        "https://apps.kcak11.com",
        "https://books-collection.kcak11.com",
        "https://cdn.kcak11.com",
        "https://codepen.kcak11.com",
        "https://crypto.kcak11.com",
        "https://docs.kcak11.com",
        "https://gallery.kcak11.com",
        "https://js-engine.kcak11.com",
        "https://mit-license.kcak11.com",
        "https://music.kcak11.com",
        "https://pen.kcak11.com",
        "https://presentation.kcak11.com",
        "https://services.kcak11.com",
        "https://time.kcak11.com",
        "https://web-kcak11-cdn.kcak11.com",
        "https://www.kcak11.com",
        "https://apps.ashishkumarkc.com",
        "https://api.kcak11.com",
        "https://blogger-app.ashishkumarkc.com",
        "https://bookmarks.ashishkumarkc.com",
        "https://cv.ashishkumarkc.com",
        "https://es6-cheatsheet.ashishkumarkc.com",
        "https://es6play.ashishkumarkc.com",
        "https://forecasts.ashishkumarkc.com",
        "https://js-best-practices.ashishkumarkc.com",
        "https://m.ashishkumarkc.com",
        "https://playground-k.ashishkumarkc.com",
        "https://react-best-practices.ashishkumarkc.com",
        "https://recipe-book.ashishkumarkc.com",
        "https://services.ashishkumarkc.com",
        "https://timerapp.ashishkumarkc.com",
        "https://todos.ashishkumarkc.com",
        "https://videoapp.ashishkumarkc.com",
        "https://weatherapp.ashishkumarkc.com",
        "https://web.ashishkumarkc.com",
        "https://www.ashishkumarkc.com"
    ];
    var winCollection = {};
    var runTest = function () {
        window.console && window.console.log("Running test @", new Date());
        for (var i = 0; i < cnameList.length; i++) {
            (function (u, i) {
                setTimeout(function () {
                    if (!winCollection["_win_t" + i] || winCollection["_win_t" + i].window) {
                        winCollection["_win_t" + i] = window.open(u, "_win_t" + i);
                    }
                }, i * 605);
            }(cnameList[i], i));
            if (i === cnameList.length - 1) {
                setTimeout(function () {
                    runTest();
                }, window["-testDelay-"]);
            }
        }
    }
    runTest();
}());
