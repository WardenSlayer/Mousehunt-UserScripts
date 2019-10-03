// ==UserScript==
// @name         MH: Labyrinth Door Data Collector
// @author       Warden Slayer - Warden Slayer#2302
// @namespace    https://greasyfork.org/en/users/227259-wardenslayer
// @version      1.2
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
    copyButton.innerText = "Copy/Submit Data";
    copyButton.addEventListener("click", copyData);
    copyButtonContainer.appendChild(copyButton);
    hudLocation.after(copyButtonContainer);
    $(".copyButtonContainer").css({
        float: "right"
    });
}

function copyData() {
    const debug = localStorage.getItem('debug');
    var lastStep = $(".labyrinthHUD-hallway-padding").children().last();
    if ($(lastStep).hasClass("labyrinthHUD-hallway-tile active") || $(lastStep).hasClass("labyrinthHUD-hallway-tile locked")) {
        if (debug == true) {
            console.log('Not in an intersection. Submit cancelled')
        }
        return;
    } else {
        if (debug == true) {
            console.log('Collecting Data')
        }
        var fealtyClues = $('[class*="labyrinthHUD-clueDrawer-clue y"]').find(".labyrinthHUD-clueDrawer-quantity").text();
        if (debug == true) {
            console.log("Fealty Clues: ", fealtyClues)
        }
        var techClues = $('[class*="labyrinthHUD-clueDrawer-clue h"]').find(".labyrinthHUD-clueDrawer-quantity").text();
        if (debug == true) {
            console.log("Tech Clues: ", techClues)
        }
        var scholarClues = $('[class*="labyrinthHUD-clueDrawer-clue s"]').find(".labyrinthHUD-clueDrawer-quantity").text();
        if (debug == true) {
            console.log("Scholar Clues: ", scholarClues)
        }
        var treasureClues = $('[class*="labyrinthHUD-clueDrawer-clue t"]').find(".labyrinthHUD-clueDrawer-quantity").text();
        if (debug == true) {
            console.log("Treasury Clues: ", treasureClues)
        }
        var farmingClues = $('[class*="labyrinthHUD-clueDrawer-clue f"]').find(".labyrinthHUD-clueDrawer-quantity").text();
        if (debug == true) {
            console.log("Farming Clues: ", farmingClues)
        }
        var deadEndClues = $('[class*="labyrinthHUD-clueDrawer-clue m"]').find(".labyrinthHUD-clueDrawer-quantity").text();
        if (debug == true) {
            console.log("Dead End Clues: ", deadEndClues)
        }
        var A = isNaN(parseInt(fealtyClues, 10));
        var B = isNaN(parseInt(techClues, 10));
        var C = isNaN(parseInt(scholarClues, 10));
        var D = isNaN(parseInt(treasureClues, 10));
        var E = isNaN(parseInt(farmingClues, 10));
        var F = isNaN(parseInt(deadEndClues, 10));
        //if data is missing: stop
        if (A || B || C || D || E || F) {
            if (debug == true) {
                console.log('Bad Data Parse, Submit cancelled', A, B, C, D, E, F)
            }
            return
        }
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
        var doorOneObj = new doorOption(doorOneData.doorLength, doorOneData.doorQuality, doorOneData.doorType);
        var doorTwoData = parseDoor(doorTwo)
        var doorTwoObj = new doorOption(doorTwoData.doorLength, doorTwoData.doorQuality, doorTwoData.doorType);
        var doorThreeData = parseDoor(doorThree)
        var doorThreeObj = new doorOption(doorThreeData.doorLength, doorThreeData.doorQuality, doorThreeData.doorType);
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
        console.log('Result String: ', results)
        GM_setClipboard(results)
        publishResults(results)
    }
}

function parseDoor(door) {
    const debug = localStorage.getItem('debug');
    var doorString = door.find(".labyrinthHUD-door-name-padding").text();
    var doorArray = doorString.split(/\s+/);
    var doorLength = doorArray[0];
    var doorQuality = doorArray[1];
    var doorType = doorArray[2];
    if (debug == true) {
        console.log("Door before shortening: ", doorLength, doorQuality, doorType)
    }
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
    if (debug == true) {
        console.log("Door after shortening: ", doorLength, doorQuality, doorType)
    }
    return {
        doorLength,
        doorQuality,
        doorType
    }
}

function parseJournal(array) {
    var shuffleFlag = 0;
    array.forEach(function(elements) {
        var text = $(elements).text();
        if (text.includes("grinding whirr")) {
            shuffleFlag = 1;
        } else {}
    })
    return shuffleFlag;
}

function doorOption(length, quality, type) {
    this.length = length;
    this.quality = quality;
    this.type = type;
}

function publishResults(results) {
    const debug = localStorage.getItem('debug');
    var lastSubmit = localStorage.getItem('Last Submission');
    if (debug == true) {
        console.log('Atempting to submit data')
    }
    if (results == lastSubmit) {
        if (debug == true) {
            console.log("Data has not changed, submit cancelled", lastSubmit)
        }
        return
    }
    const url = 'https://script.google.com/macros/s/AKfycbwmnDYV_3f5XFj7xzKcPclMcrzTaDkG1SMLwm2e8A8ABN5ms_j6/exec';
    var form = new submitData(results)
    var jqxhr = $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        data: form,
    }).success(function() {
        // do something
        console.log('Door Data Submitted!')
        localStorage.setItem('Last Submission', results)
    });


}

function submitData(result_string) {
    this.The_String_From_The_Script = result_string;
}
