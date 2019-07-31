// ==UserScript==
// @name         MH: Labyrinth Door Data Collector
// @author       Warden Slayer - Warden Slayer#2302
// @namespace    https://greasyfork.org/en/users/227259-wardenslayer
// @version      1.0.7
// @description  Mousehunt data collection tool for avilible labyrinth doors
// @include      https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @include      http://www.mousehuntgame.com/*
// @include      https://www.mousehuntgame.com/*
// @grant GM_setClipboard
// ==/UserScript==
$(document).ready(function() {
    buildCopyButton();
});

function buildCopyButton() {
    if ($(".copyButtonContainer").length > 0) return;
    var copyButtonContainer = document.createElement("div");
    copyButtonContainer.classList.add("copyButtonContainer");
    var hudLocation = $(".hudLocationContent.labyrinth");
    //Copy Button
    var copyButton = document.createElement("button");
    copyButton.id = "copyButton";
    copyButton.innerText = "Copy to Clipboard";
    copyButton.addEventListener("click", copyData)
    copyButtonContainer.appendChild(copyButton);
    hudLocation.after(copyButtonContainer);
    $(".copyButtonContainer").css({
        float: "right"
    });
}

function copyData() {
    var lastStep = $(".labyrinthHUD-hallway-padding").children().last();
    if ($(lastStep).hasClass("labyrinthHUD-hallway-tile active") || $(lastStep).hasClass("labyrinthHUD-hallway-tile locked")) {
        return;
    } else {
        var fealtyClues = $(".labyrinthHUD-clueDrawer-clue.y").find(".labyrinthHUD-clueDrawer-quantity").text();
        var techClues = $(".labyrinthHUD-clueDrawer-clue.h").find(".labyrinthHUD-clueDrawer-quantity").text();
        var scholarClues = $(".labyrinthHUD-clueDrawer-clue.s").find(".labyrinthHUD-clueDrawer-quantity").text();
        var treasureClues = $(".labyrinthHUD-clueDrawer-clue.t").find(".labyrinthHUD-clueDrawer-quantity").text();
        var farmingClues = $(".labyrinthHUD-clueDrawer-clue.f").find(".labyrinthHUD-clueDrawer-quantity").text();
        var deadEndClues = $(".labyrinthHUD-clueDrawer-clue.m").find(".labyrinthHUD-clueDrawer-quantity").text();
        var allDoors = $(".labyrinthHUD-doorContainer").children();
        //Add flag to denote shuffling
        var journalText = $(".journaltext");
        var journalArray = journalText.toArray(0);
        var shuffleFlag = parseJournal(journalArray);
        //Parse Doors
        var doorOne = $(allDoors).first();
        var doorThree = $(allDoors).last();
        var doorTwo = $(allDoors).not(doorOne).not(doorThree);
        var doorOneData = parseDoor(doorOne)
        var doorOneObj = new doorOption(doorOneData.doorLength,doorOneData.doorQuality,doorOneData.doorType);
        var doorTwoData = parseDoor(doorTwo)
        var doorTwoObj = new doorOption(doorTwoData.doorLength,doorTwoData.doorQuality,doorTwoData.doorType);
        var doorThreeData = parseDoor(doorThree)
        var doorThreeObj = new doorOption(doorThreeData .doorLength,doorThreeData.doorQuality,doorThreeData.doorType);
        var resultsArray = [fealtyClues,
            techClues,
            scholarClues,
            treasureClues,
            farmingClues,
            deadEndClues,
            doorOneObj.length,
            doorOneObj.quality,
            doorOneObj.type,
            doorTwoObj.length,
            doorTwoObj.quality,
            doorTwoObj.type,
            doorThreeObj.length,
            doorThreeObj.quality,
            doorThreeObj.type,
            shuffleFlag
        ];
        let results = resultsArray.join()
        console.log(results)
        GM_setClipboard(results)
    }
}

function parseDoor(door) {
    var doorString = door.find(".labyrinthHUD-door-name-padding").text();
    var doorArray = doorString.split(/\s+/);
    var doorLength = doorArray[0];
    var doorQuality = doorArray[1];
    var doorType = doorArray[2];
    //shorten door length
    if (doorLength == "Long") {
        doorLength = "L";
    } else if (doorLength == "Medium") {
        doorLength = "M";
    } else {
        doorLength = "S";
    }
    //shorten door quality
    if (doorQuality == "Epic") {
        doorQuality = "E";
    } else if (doorQuality == "Superior") {
        doorQuality = "S";
    } else {
        doorQuality = "P";
    }
    //shorten door type
    if (doorType == "Fealty") {
        doorType = "Y";
    } else if (doorType == "Tech") {
        doorType = "H";
    } else if (doorType == "Scholar") {
        doorType = "S";
    } else if (doorType == "Treasury") {
        doorType = "T";
    } else if (doorType == "Farming") {
        doorType = "F";
    } else {
        doorType = "M";
    }
    return {doorLength,doorQuality,doorType}
}

function parseJournal(array){
    var shuffleFlag = 0;
    array.forEach(function(elements) {
        var text = $(elements).text();
        if (text.includes("grinding whirr")) {
            shuffleFlag = 1;
        } else {
        }
    })
    return shuffleFlag;
}

function doorOption(length, quality, type) {
    this.length = length;
    this.quality = quality;
    this.type = type;
}
