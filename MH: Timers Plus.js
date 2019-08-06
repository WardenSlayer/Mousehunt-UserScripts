// ==UserScript==
// @name         MH Timers+
// @author       Warden Slayer - Warden Slayer#2302
// @namespace    https://greasyfork.org/en/users/227259-wardenslayer
// @version      1.1
// @description  Description Pending
// @include      https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @include      http://www.mousehuntgame.com/*
// @include      https://www.mousehuntgame.com/*
// @grant GM_setClipboard
// ==/UserScript==
$(document).ready(function() {
    console.log("MH Timers+");
    buildTimerBox();
    startTimers();
});

function buildTimerBox() {
    if ($(".timerBox").length > 0) return;
    var container = $("#mousehuntContainer");
    var timerBox = document.createElement("div");
    timerBox.classList.add("timerBox");
    $(timerBox).css({
        'background-image': 'url("https://image.freepik.com/free-vector/cool-blue-parchment_53876-86280.jpg")',
        'background-size': 'cover'
    });
    $(timerBox).css({
        'height': 100 + "px",
        'padding': 2 + "px"
    });
    let forbiddenGrove = buildForbiddenGrove();
    let balacksCove = buildBalacksCove();
    let seasonalGarden = buildSeasonalGarden();
    timerBox.appendChild(forbiddenGrove)
    timerBox.appendChild(balacksCove)
    timerBox.appendChild(seasonalGarden)
    $(forbiddenGrove).css({
        'float': 'left'
    })
    $(balacksCove).css({
        'float': 'left',
        'marginLeft': 1 + "px"
    })
    $(seasonalGarden).css({
        'float': 'left',
        'marginLeft': 1 + "px"
    })
    //LAST
    container.prepend(timerBox);
}

function startTimers() {
    localStorage.setItem("mainTimer", 0);
    runTimers();
}

function runTimers() {
    var myTimer = setInterval(updateText, 1000);
}

function updateText() {
    if ($(".forbiddenGrove").length > 0) updateForbiddenGroveTimer();
    if ($(".balacksCove").length > 0) updateBalacksCoveTimer();
    if ($(".seasonalGarden").length > 0) updateSeasonalGardenTimer();
}
//===================================== Forbidden Grove ======================================
function buildForbiddenGrove() {
    if ($(".forbiddenGrove").length > 0) return;
    var timerBox = $(".timerBox");
    var forbiddenGrove = document.createElement("div");
    forbiddenGrove.classList.add("forbiddenGrove");
    $(forbiddenGrove).css({
        'border': '1px solid black',
        'width': '21%',
        'height': '90%',
        'padding': 2 + "px"
    });
    //Header
    var forbiddenGroveHeader = document.createElement("div");
    forbiddenGroveHeader.classList.add("forbiddenGroveHeader");
    var forbiddenGroveHeaderLabel = document.createElement("div");
    forbiddenGroveHeaderLabel.classList.add("forbiddenGroveHeaderLabel");
    var forbiddenGroveHeaderLabelText = document.createTextNode("Forbidden Grove is:");
    forbiddenGroveHeaderLabel.appendChild(forbiddenGroveHeaderLabelText);
    var forbiddenGroveHeaderValue = document.createElement("div");
    forbiddenGroveHeaderValue.classList.add("forbiddenGroveHeaderValue");
    var forbiddenGroveHeaderValueText = document.createTextNode("Open");
    forbiddenGroveHeaderValue.appendChild(forbiddenGroveHeaderValueText);
    $(forbiddenGroveHeaderLabel).css({
        'float': 'left',
        'font-weight': 700,
        "marginRight": "5px"
    })
    $(forbiddenGroveHeaderValue).css({
        "marginLeft": "100px"
    });
    forbiddenGroveHeader.appendChild(forbiddenGroveHeaderLabel);
    forbiddenGroveHeader.appendChild(forbiddenGroveHeaderValue);
    //Close
    var forbiddenGroveCloses = document.createElement("div");
    forbiddenGroveCloses.classList.add("forbiddenGroveCloses");
    var forbiddenGroveClosesLabel = document.createElement("div");
    forbiddenGroveClosesLabel.classList.add("forbiddenGroveClosesLabel");
    var forbiddenGroveClosesLabelText = document.createTextNode("Closes in:");
    forbiddenGroveClosesLabel.appendChild(forbiddenGroveClosesLabelText);
    var forbiddenGroveClosesValue = document.createElement("div");
    forbiddenGroveClosesValue.classList.add("forbiddenGroveClosesValue");
    var forbiddenGroveClosesValueText = document.createTextNode("?");
    forbiddenGroveClosesValue.appendChild(forbiddenGroveClosesValueText);
    $(forbiddenGroveClosesLabel).css({
        'float': 'left',
        'font-weight': 700,
        "marginRight": "5px"
    })
    $(forbiddenGroveClosesValue).css("marginLeft", "50px");
    forbiddenGroveCloses.appendChild(forbiddenGroveClosesLabel);
    forbiddenGroveCloses.appendChild(forbiddenGroveClosesValue);
    //Open
    var forbiddenGroveOpens = document.createElement("div");
    forbiddenGroveOpens.classList.add("forbiddenGroveOpens");
    var forbiddenGroveOpensLabel = document.createElement("div");
    forbiddenGroveOpensLabel.classList.add("forbiddenGroveOpensLabel");
    var forbiddenGroveOpensLabelText = document.createTextNode("Opens in:");
    forbiddenGroveOpensLabel.appendChild(forbiddenGroveOpensLabelText);
    var forbiddenGroveOpensValue = document.createElement("div");
    forbiddenGroveOpensValue.classList.add("forbiddenGroveOpensValue");
    var forbiddenGroveOpensValueText = document.createTextNode("??");
    forbiddenGroveOpensValue.appendChild(forbiddenGroveOpensValueText);
    $(forbiddenGroveOpensLabel).css({
        'float': 'left',
        'font-weight': 700,
        "marginRight": "5px"
    })
    $(forbiddenGroveOpensValue).css("marginLeft", "50px");
    forbiddenGroveOpens.appendChild(forbiddenGroveOpensLabel);
    forbiddenGroveOpens.appendChild(forbiddenGroveOpensValue);
    //Append
    forbiddenGrove.appendChild(forbiddenGroveHeader);
    forbiddenGrove.appendChild(forbiddenGroveCloses);
    forbiddenGrove.appendChild(forbiddenGroveOpens);
    return forbiddenGrove;
}

function updateForbiddenGroveTimer() {
    if ($(".forbiddenGrove").length < 1) return;
    var forbiddenGrove = $(".forbiddenGrove");
    var firstGroveOpen = 1285704000;
    var now = todayNow();
    let timePassedHours = (now - firstGroveOpen) / 3600;
    var rotaionLenght = 20;
    var rotationsExact = timePassedHours / rotaionLenght;
    var rotationsInteger = Math.trunc(rotationsExact);
    var partialrotation = (rotationsExact - rotationsInteger) * rotaionLenght;
    if (partialrotation < 16) {
        //Open
        $(".forbiddenGroveHeaderValue").text(" OPEN");
        var timeCloses = (16 - partialrotation).toPrecision(4);
        var closesHours = Math.trunc(timeCloses);
        var closesMinutes = Math.ceil((timeCloses - closesHours) * 60);
        $(".forbiddenGroveClosesValue").text(closesHours + "h " + closesMinutes + "m");
        $(".forbiddenGroveOpensLabel").text("Opens Again in:");
        $(".forbiddenGroveOpensValue").text((closesHours + 4) + "h " + closesMinutes + "m");
        forbiddenGrove.append($(".forbiddenGroveOpens"))
    } else {
        //Closed
        $(".forbiddenGroveHeaderValue").text("CLOSED")
        var timeOpens = (rotaionLenght - partialrotation).toPrecision(4);
        var opensHours = Math.trunc(timeOpens);
        var opensMinutes = Math.ceil((timeOpens - opensHours) * 60);
        $(".forbiddenGroveOpensValue").text(opensHours + "h " + opensMinutes + "m");
        $(".forbiddenGroveClosesLabel").text("Next Close in:");
        $(".forbiddenGroveClosesValue").text((opensHours + 16) + "h " + opensMinutes + "m");
        forbiddenGrove.append($(".forbiddenGroveCloses"))
    }
}
//====================================== Balacks's Cove ======================================
function buildBalacksCove() {
    if ($(".balacksCove").length > 0) return;
    var timerBox = $(".timerBox");
    var balacksCove = document.createElement("div");
    balacksCove.classList.add("balacksCove");
    $(balacksCove).css({
        'border': '1px solid black',
        'width': '25%',
        'height': '90%',
        'padding': 2 + "px"
    });
    //Header
    var balacksCoveHeader = document.createElement("div");
    balacksCoveHeader.classList.add("balacksCoveHeader");
    var balacksCoveHeaderLabel = document.createElement("div");
    balacksCoveHeaderLabel.classList.add("balacksCoveHeaderLabel");
    var balacksCoveHeaderLabelText = document.createTextNode("Balack's Cove Tide is:");
    balacksCoveHeaderLabel.appendChild(balacksCoveHeaderLabelText);
    var balacksCoveHeaderValue = document.createElement("div");
    balacksCoveHeaderValue.classList.add("balacksCoveHeaderValue");
    var balacksCoveHeaderValueText = document.createTextNode("Low");
    balacksCoveHeaderValue.appendChild(balacksCoveHeaderValueText);
    $(balacksCoveHeaderLabel).css({
        'float': 'left',
        'font-weight': 700,
        "marginRight": "5px"
    })
    $(balacksCoveHeaderValue).css({
        "marginLeft": "100px"
    });
    balacksCoveHeader.appendChild(balacksCoveHeaderLabel);
    balacksCoveHeader.appendChild(balacksCoveHeaderValue);
    //Low
    var balacksCoveLow = document.createElement("div");
    balacksCoveLow.classList.add("balacksCoveLow");
    var balacksCoveLowLabel = document.createElement("div");
    balacksCoveLowLabel.classList.add("balacksCoveLowLabel");
    var balacksCoveLowLabelText = document.createTextNode("Low Tide in:");
    balacksCoveLowLabel.appendChild(balacksCoveLowLabelText);
    var balacksCoveLowValue = document.createElement("div");
    balacksCoveLowValue.classList.add("balacksCoveLowValue");
    var balacksCoveLowValueText = document.createTextNode("?");
    balacksCoveLowValue.appendChild(balacksCoveLowValueText);
    $(balacksCoveLowLabel).css({
        'float': 'left',
        'font-weight': 700,
        "marginRight": "5px"
    })
    $(balacksCoveLowValue).css("marginLeft", "50px");
    balacksCoveLow.appendChild(balacksCoveLowLabel);
    balacksCoveLow.appendChild(balacksCoveLowValue);
    //Medium
    var balacksCoveMid = document.createElement("div");
    balacksCoveMid.classList.add("balacksCoveMid");
    var balacksCoveMidLabel = document.createElement("div");
    balacksCoveMidLabel.classList.add("balacksCoveMidLabel");
    var balacksCoveMidLabelText = document.createTextNode("Mid Tide in:");
    balacksCoveMidLabel.appendChild(balacksCoveMidLabelText);
    var balacksCoveMidValue = document.createElement("div");
    balacksCoveMidValue.classList.add("balacksCoveMidValue");
    var balacksCoveMidValueText = document.createTextNode("??");
    balacksCoveMidValue.appendChild(balacksCoveMidValueText);
    $(balacksCoveMidLabel).css({
        'float': 'left',
        'font-weight': 700,
        "marginRight": "5px"
    })
    $(balacksCoveMidValue).css("marginLeft", "50px");
    balacksCoveMid.appendChild(balacksCoveMidLabel);
    balacksCoveMid.appendChild(balacksCoveMidValue);
    //High
    var balacksCoveHigh = document.createElement("div");
    balacksCoveHigh.classList.add("balacksCoveHigh");
    var balacksCoveHighLabel = document.createElement("div");
    balacksCoveHighLabel.classList.add("balacksCoveHighLabel");
    var balacksCoveHighLabelText = document.createTextNode("High Tide in:");
    balacksCoveHighLabel.appendChild(balacksCoveHighLabelText);
    var balacksCoveHighValue = document.createElement("div");
    balacksCoveHighValue.classList.add("balacksCoveHighValue");
    var balacksCoveHighValueText = document.createTextNode("??");
    balacksCoveHighValue.appendChild(balacksCoveHighValueText);
    $(balacksCoveHighLabel).css({
        'float': 'left',
        'font-weight': 700,
        "marginRight": "5px"
    })
    $(balacksCoveHighValue).css("marginLeft", "50px");
    balacksCoveHigh.appendChild(balacksCoveHighLabel);
    balacksCoveHigh.appendChild(balacksCoveHighValue);
    //Append
    balacksCove.appendChild(balacksCoveHeader);
    balacksCove.appendChild(balacksCoveLow);
    balacksCove.appendChild(balacksCoveMid);
    balacksCove.appendChild(balacksCoveHigh);
    return balacksCove;
}

function updateBalacksCoveTimer() {
    if ($(".balacksCove").length < 1) return;
    var balacksCove = $(".balacksCove");
    var firstCoveLow = 1294680060;
    var now = todayNow();
    let timePassedHours = (now - firstCoveLow) / 3600;
    var rotaionLenght = 18.6666666666666666666666666666666666666667;
    var rotationsExact = timePassedHours / rotaionLenght;
    var rotationsInteger = Math.trunc(rotationsExact);
    var partialrotation = (rotationsExact - rotationsInteger) * rotaionLenght;
    //partialrotation = 17.8;
    if (partialrotation < 16) {
        //Low
        $(".balacksCoveHeaderValue").text("LOW");
        var timeMid = (16 - partialrotation).toPrecision(4);
        var midHours = Math.trunc(timeMid);
        var midMinutes = Math.ceil((timeMid - midHours) * 60);
        $(".balacksCoveMidValue").text(midHours + "h " + midMinutes + "m");
        $(".balacksCoveMidLabel").text("Mid-Filling in:")
        $(".balacksCoveHighValue").text((midHours + 1) + "h " + midMinutes + "m");
        $(".balacksCoveLowLabel").text("Low Again in:");
        var lowHours = midHours + 2;
        var lowMinutes = midMinutes + 40;
        if (lowMinutes >= 60) {
            lowMinutes = lowMinutes - 60;
            lowHours++;
        }
        $(".balacksCoveLowValue").text((lowHours) + "h " + (lowMinutes) + "m");
        balacksCove.append($(".balacksCoveLow"))
    } else if ((partialrotation >= 16) && (partialrotation < 17)) {
        //Mid (flooding)
        $(".balacksCoveHeaderValue").text("MID-Flooding");
        var timeHigh = (17 - partialrotation).toPrecision(4);
        var highHours = Math.trunc(timeHigh);
        var highMinutes = Math.ceil((timeHigh - highHours) * 60);
        $(".balacksCoveHighValue").text((highHours) + "h " + highMinutes + "m");
        $(".balacksCoveMidLabel").text("Mid-Ebbing in:")
        var midHours = highHours;
        var midMinutes = highMinutes + 40;
        if (midMinutes >= 60) {
            midMinutes = midMinutes - 60;
            midHours++;
        }
        $(".balacksCoveMidValue").text(midHours + "h " + midMinutes + "m");
        $(".balacksCoveLowLabel").text("Low Tide in:");
        $(".balacksCoveLowValue").text((midHours + 1) + "h " + (midMinutes) + "m");
        balacksCove.append($(".balacksCoveMid"))
        balacksCove.append($(".balacksCoveLow"))

    } else if ((partialrotation >= 17) && (partialrotation < 17.6666666667)) {
        //High
        $(".balacksCoveHeaderValue").text("HIGH");
        var timeMid = (17.6666666667 - partialrotation).toPrecision(4);
        var midHours = Math.trunc(timeMid);
        var midMinutes = Math.ceil((timeMid - midHours) * 60);
        $(".balacksCoveMidValue").text((midHours) + "h " + midMinutes + "m");
        $(".balacksCoveMidLabel").text("Mid-Ebbing in:")
        $(".balacksCoveLowLabel").text("Low Tide in:")
        $(".balacksCoveLowValue").text((midHours + 1) + "h " + midMinutes + "m");
        $(".balacksCoveHigh").hide();
        balacksCove.append($(".balacksCoveLow"))
    } else if (partialrotation >= 17.6666666667) {
        //Mid (ebbing)
        $(".balacksCoveHeaderValue").text("MID-Ebbing");
        var timeLow = (rotaionLenght - partialrotation).toPrecision(4);
        var lowHours = Math.trunc(timeLow);
        var lowMinutes = Math.ceil((timeLow - lowHours) * 60);
        $(".balacksCoveLowLabel").text("Low Tide in:")
        $(".balacksCoveLowValue").text((lowHours) + "h " + lowMinutes + "m");
        $(".balacksCoveMidLabel").text("Mid-Filling in:")
        $(".balacksCoveMidValue").text(lowHours + 16 + "h " + lowMinutes + "m");
        $(".balacksCoveHighLabel").text("High Tide in:");
        $(".balacksCoveHighValue").text(lowHours + 17 + "h " + (lowMinutes) + "m");
        balacksCove.append($(".balacksCoveHigh").show())
    }
}
//====================================== Seasonal Garden ======================================
function buildSeasonalGarden() {
    if ($(".seasonalGarden").length > 0) return;
    var timerBox = $(".timerBox");
    var seasonalGarden = document.createElement("div");
    seasonalGarden.classList.add("seasonalGarden");
    $(seasonalGarden).css({
        'border': '1px solid black',
        'width': '24%',
        'height': '90%',
        'padding': 2 + "px"
    });
    //Header
    var seasonalGardenHeader = document.createElement("div");
    seasonalGardenHeader.classList.add("seasonalGardenHeader");
    var seasonalGardenHeaderLabel = document.createElement("div");
    seasonalGardenHeaderLabel.classList.add("seasonalGardenHeaderLabel");
    var seasonalGardenHeaderLabelText = document.createTextNode("Current Garden Season:");
    seasonalGardenHeaderLabel.appendChild(seasonalGardenHeaderLabelText);
    var seasonalGardenHeaderValue = document.createElement("div");
    seasonalGardenHeaderValue.classList.add("seasonalGardenHeaderValue");
    var seasonalGardenHeaderValueText = document.createTextNode("FALL");
    seasonalGardenHeaderValue.appendChild(seasonalGardenHeaderValueText);
    $(seasonalGardenHeaderLabel).css({
        'float': 'left',
        'font-weight': 700,
        "marginRight": "5px"
    })
    $(seasonalGardenHeaderValue).css({
        "marginLeft": "100px"
    });
    seasonalGardenHeader.appendChild(seasonalGardenHeaderLabel);
    seasonalGardenHeader.appendChild(seasonalGardenHeaderValue);
    //Fall
    var seasonalGardenFall = document.createElement("div");
    seasonalGardenFall.classList.add("seasonalGardenFall");
    var seasonalGardenFallLabel = document.createElement("div");
    seasonalGardenFallLabel.classList.add("seasonalGardenFallLabel");
    var seasonalGardenFallLabelText = document.createTextNode("Fall in:");
    seasonalGardenFallLabel.appendChild(seasonalGardenFallLabelText);
    var seasonalGardenFallValue = document.createElement("div");
    seasonalGardenFallValue.classList.add("seasonalGardenFallValue");
    var seasonalGardenFallValueText = document.createTextNode("?");
    seasonalGardenFallValue.appendChild(seasonalGardenFallValueText);
    $(seasonalGardenFallLabel).css({
        'float': 'left',
        'font-weight': 700,
        "marginRight": "5px"
    })
    $(seasonalGardenFallValue).css("marginLeft", "50px");
    seasonalGardenFall.appendChild(seasonalGardenFallLabel);
    seasonalGardenFall.appendChild(seasonalGardenFallValue);
    //Winter
    var seasonalGardenWinter = document.createElement("div");
    seasonalGardenWinter.classList.add("seasonalGardenWinter");
    var seasonalGardenWinterLabel = document.createElement("div");
    seasonalGardenWinterLabel.classList.add("seasonalGardenWinterLabel");
    var seasonalGardenWinterLabelText = document.createTextNode("Winter in:");
    seasonalGardenWinterLabel.appendChild(seasonalGardenWinterLabelText);
    var seasonalGardenWinterValue = document.createElement("div");
    seasonalGardenWinterValue.classList.add("seasonalGardenWinterValue");
    var seasonalGardenWinterValueText = document.createTextNode("?");
    seasonalGardenWinterValue.appendChild(seasonalGardenWinterValueText);
    $(seasonalGardenWinterLabel).css({
        'float': 'left',
        'font-weight': 700,
        "marginRight": "5px"
    })
    $(seasonalGardenWinterValue).css("marginLeft", "50px");
    seasonalGardenWinter.appendChild(seasonalGardenWinterLabel);
    seasonalGardenWinter.appendChild(seasonalGardenWinterValue);
    //Spring
    var seasonalGardenSpring = document.createElement("div");
    seasonalGardenSpring.classList.add("seasonalGardenSpring");
    var seasonalGardenSpringLabel = document.createElement("div");
    seasonalGardenSpringLabel.classList.add("seasonalGardenSpringLabel");
    var seasonalGardenSpringLabelText = document.createTextNode("Spring in:");
    seasonalGardenSpringLabel.appendChild(seasonalGardenSpringLabelText);
    var seasonalGardenSpringValue = document.createElement("div");
    seasonalGardenSpringValue.classList.add("seasonalGardenSpringValue");
    var seasonalGardenSpringValueText = document.createTextNode("?");
    seasonalGardenSpringValue.appendChild(seasonalGardenSpringValueText);
    $(seasonalGardenSpringLabel).css({
        'float': 'left',
        'font-weight': 700,
        "marginRight": "5px"
    })
    $(seasonalGardenSpringValue).css("marginLeft", "50px");
    seasonalGardenSpring.appendChild(seasonalGardenSpringLabel);
    seasonalGardenSpring.appendChild(seasonalGardenSpringValue);
    //Summer
    var seasonalGardenSummer = document.createElement("div");
    seasonalGardenSummer.classList.add("seasonalGardenSummer");
    var seasonalGardenSummerLabel = document.createElement("div");
    seasonalGardenSummerLabel.classList.add("seasonalGardenSummerLabel");
    var seasonalGardenSummerLabelText = document.createTextNode("Summer in:");
    seasonalGardenSummerLabel.appendChild(seasonalGardenSummerLabelText);
    var seasonalGardenSummerValue = document.createElement("div");
    seasonalGardenSummerValue.classList.add("seasonalGardenSummerValue");
    var seasonalGardenSummerValueText = document.createTextNode("?");
    seasonalGardenSummerValue.appendChild(seasonalGardenSummerValueText);
    $(seasonalGardenSummerLabel).css({
        'float': 'left',
        'font-weight': 700,
        "marginRight": "5px"
    })
    $(seasonalGardenSummerValue).css("marginLeft", "50px");
    seasonalGardenSummer.appendChild(seasonalGardenSummerLabel);
    seasonalGardenSummer.appendChild(seasonalGardenSummerValue);
    //Append
    seasonalGarden.appendChild(seasonalGardenHeader);
    seasonalGarden.appendChild(seasonalGardenFall);
    seasonalGarden.appendChild(seasonalGardenWinter);
    seasonalGarden.appendChild(seasonalGardenSpring);
    seasonalGarden.appendChild(seasonalGardenSummer);
    return seasonalGarden;
}

function updateSeasonalGardenTimer() {
    if ($(".seasonalGarden").length < 1) return;
    var seasonalGarden = $(".seasonalGarden");
    var firstFall = 288000;
    var now = todayNow();
    let timePassedHours = (now - firstFall) / 3600;
    var rotaionLenght = 320;
    var rotationsExact = timePassedHours / rotaionLenght;
    var rotationsInteger = Math.trunc(rotationsExact);
    var partialrotation = (rotationsExact - rotationsInteger) * rotaionLenght;
    var fallObj = new season(0, 0, 0);
    var winterObj = new season(0, 0, 0);
    var springObj = new season(0, 0, 0);
    var summerObj = new season(0, 0, 0);
    if (partialrotation < 80) {
        //Summer
        $(".seasonalGardenHeaderValue").text("SUMMER");
        var timeFall = (80 - partialrotation).toPrecision(4);
        fallObj.hours = Math.floor(timeFall);
        fallObj.minutes = Math.ceil((timeFall - fallObj.hours) * 60);
        fallObj = convertToDyHrMn(0, fallObj.hours, fallObj.minutes);
        winterObj = convertToDyHrMn(fallObj.days + 3, fallObj.hours + 8, fallObj.minutes);
        springObj = convertToDyHrMn(winterObj.days + 3, winterObj.hours + 8, winterObj.minutes)
        summerObj = convertToDyHrMn(springObj.days + 3, springObj.hours + 8, springObj.minutes);
        seasonalGarden.append($(".seasonalGardenFall"));
        seasonalGarden.append($(".seasonalGardenWinter"));
        seasonalGarden.append($(".seasonalGardenSpring"));
        seasonalGarden.append($(".seasonalGardenSummer"));
    } else if ((partialrotation >= 80) && (partialrotation < 160)) {
        //Fall
        $(".seasonalGardenHeaderValue").text("FALL");
        var timeWinter = (160 - partialrotation).toPrecision(4);
        winterObj.hours = Math.floor(timeWinter);
        winterObj.minutes = Math.ceil((timeWinter - winterObj.hours) * 60);
        winterObj = convertToDyHrMn(0, winterObj.hours, winterObj.minutes);
        springObj = convertToDyHrMn(winterObj.days + 3, winterObj.hours + 8, winterObj.minutes)
        summerObj = convertToDyHrMn(springObj.days + 3, springObj.hours + 8, springObj.minutes)
        fallObj = convertToDyHrMn(summerObj.days + 3, summerObj.hours + 8, summerObj.minutes);
        seasonalGarden.append($(".seasonalGardenWinter"));
        seasonalGarden.append($(".seasonalGardenSpring"));
        seasonalGarden.append($(".seasonalGardenSummer"));
        seasonalGarden.append($(".seasonalGardenFall"));
    } else if ((partialrotation >= 160) && (partialrotation < 240)) {
        //Winter
        $(".seasonalGardenHeaderValue").text("WINTER");
        var timeSpring = (240 - partialrotation).toPrecision(4);
        springObj.hours = Math.floor(timeSpring);
        springObj.minutes = Math.ceil((timeSpring - springObj.hours) * 60);
        springObj = convertToDyHrMn(0, springObj.hours, springObj.minutes)
        summerObj = convertToDyHrMn(springObj.days + 3, springObj.hours + 8, springObj.minutes);
        fallObj = convertToDyHrMn(summerObj.days + 3, summerObj.hours + 8, summerObj.minutes);
        winterObj = convertToDyHrMn(fallObj.days + 3, fallObj.hours + 8, fallObj.minutes);
        seasonalGarden.append($(".seasonalGardenSpring"));
        seasonalGarden.append($(".seasonalGardenSummer"));
        seasonalGarden.append($(".seasonalGardenFall"));
        seasonalGarden.append($(".seasonalGardenWinter"));
    } else {
        //Spring
        $(".seasonalGardenHeaderValue").text("SPRING");
        var timeSummer = (320 - partialrotation).toPrecision(4);
        summerObj.hours = Math.floor(timeSummer);
        summerObj.minutes = Math.ceil((timeSummer - summerObj.hours) * 60);
        summerObj = convertToDyHrMn(0, summerObj.hours, summerObj.minutes)
        fallObj = convertToDyHrMn(summerObj.days + 3, summerObj.hours + 8, summerObj.minutes);
        winterObj = convertToDyHrMn(fallObj.days + 3, fallObj.hours + 8, fallObj.minutes);
        springObj = convertToDyHrMn(winterObj.days + 3, winterObj.hours + 8, winterObj.minutes);
        seasonalGarden.append($(".seasonalGardenSummer"));
        seasonalGarden.append($(".seasonalGardenFall"));
        seasonalGarden.append($(".seasonalGardenWinter"));
        seasonalGarden.append($(".seasonalGardenSpring"));
    }
    $(".seasonalGardenFallValue").text(fallObj.days + "d " + fallObj.hours + "h " + fallObj.minutes + "m");
    $(".seasonalGardenWinterValue").text(winterObj.days + "d " + winterObj.hours + "h " + winterObj.minutes + "m");
    $(".seasonalGardenSpringValue").text(springObj.days + "d " + springObj.hours + "h " + springObj.minutes + "m");
    $(".seasonalGardenSummerValue").text(summerObj.days + "d " + summerObj.hours + "h " + summerObj.minutes + "m");
}

function season(days, hours, minutes) {
    this.days = days;
    this.hours = hours;
    this.minutes = minutes;
}
//============================================================================================
function todayNow() {
    var today = new Date();
    var todayEpoch = today.getTime() / 1000.0;
    return todayEpoch;
}

function convertToDyHrMn(days, hours, minutes) {
    if (hours >= 24) {
        var daysExact = hours / 24;
        var daysTrunc = Math.floor(daysExact);
        var partialDays = daysExact - daysTrunc;
        hours = Math.floor(partialDays * 24);
        days = daysTrunc + days;
    }
    return {
        days,
        hours,
        minutes
    }
}
