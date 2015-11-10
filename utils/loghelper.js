debugMode = true;

var LogHelper = function () { }

LogHelper.log = function (message, objectToShow, force) {
    if (!force && !debugMode)
        return;

    var date = new Date();

    console.log("[" + date.toGMTString() + " " + date.getMilliseconds() + " ms] " + message);

    if (objectToShow)
        console.log(objectToShow);
}

