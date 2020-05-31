// ==UserScript==
// @name         MH: Labyrinth Door Data Collector
// @author       Warden Slayer - Warden Slayer#2302
// @namespace    https://greasyfork.org/en/users/227259-wardenslayer
// @version      1.2.2
// @description  Mousehunt data collection tool for avilible labyrinth doors
// @include      https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @include      http://www.mousehuntgame.com/*
// @include      https://www.mousehuntgame.com/*
// @grant GM_setClipboard
// ==/UserScript==
$(document).ready(function() {
    const debug = localStorage.getItem('ws.debug');
    if (user.environment_name == 'Labyrinth') {
        if (debug == true) {
            console.log('Labyrinth Door Script Running');
        }
        buildCopyButton();
    } else {
        if (debug == true) {
            console.log('Not in the Labyrinth');
        }

    }
});

function buildCopyButton() {
    const debug = localStorage.getItem('ws.debug');
    if ($(".copyButtonContainer").length > 0) return;
    const copyButtonContainer = document.createElement("div");
    copyButtonContainer.classList.add("copyButtonContainer");
    const hudLocation = $(".hudLocationContent");
    if (debug == true) {
        console.log('HUD Element:',hudLocation);
    }
    //Copy Button
    const copyButton = document.createElement("button");
    copyButton.id = "copyButton";
    copyButton.innerText = "Copy/Submit Data";
    copyButton.addEventListener("click", copyData);
    copyButtonContainer.appendChild(copyButton);
    $(copyButton).css({
        'margin-right': '5px',
    })
    hudLocation.after(copyButtonContainer);
    $(".copyButtonContainer").css({
        'width': '100%',
        'margin-bottom': '10px',
        'text-align': 'right',
    });
}

function copyData() {
    const debug = localStorage.getItem('ws.debug');
    const lastStep = $(".labyrinthHUD-hallway-padding").children().last();
    if ($('.labyrinthHUD.intersection.entrance').get(0)) {
        if (debug == true) {
            console.log('At the Entrance. Submit cancelled')
        }
    } else if ($(lastStep).hasClass("labyrinthHUD-hallway-tile active") || $(lastStep).hasClass("labyrinthHUD-hallway-tile locked")) {
        if (debug == true) {
            console.log('Not in an intersection. Submit cancelled')
        }
        return;
    } else {
        if (debug == true) {
            console.log('Collecting Data')
        }
        const fealtyClues = $('[class*="labyrinthHUD-clueDrawer-clue y"]').find(".labyrinthHUD-clueDrawer-quantity").text();
        if (debug == true) {
            console.log("Fealty Clues: ", fealtyClues)
        }
        const techClues = $('[class*="labyrinthHUD-clueDrawer-clue h"]').find(".labyrinthHUD-clueDrawer-quantity").text();
        if (debug == true) {
            console.log("Tech Clues: ", techClues)
        }
        const scholarClues = $('[class*="labyrinthHUD-clueDrawer-clue s"]').find(".labyrinthHUD-clueDrawer-quantity").text();
        if (debug == true) {
            console.log("Scholar Clues: ", scholarClues)
        }
        const treasureClues = $('[class*="labyrinthHUD-clueDrawer-clue t"]').find(".labyrinthHUD-clueDrawer-quantity").text();
        if (debug == true) {
            console.log("Treasury Clues: ", treasureClues)
        }
        const farmingClues = $('[class*="labyrinthHUD-clueDrawer-clue f"]').find(".labyrinthHUD-clueDrawer-quantity").text();
        if (debug == true) {
            console.log("Farming Clues: ", farmingClues)
        }
        const deadEndClues = $('[class*="labyrinthHUD-clueDrawer-clue m"]').find(".labyrinthHUD-clueDrawer-quantity").text();
        if (debug == true) {
            console.log("Dead End Clues: ", deadEndClues)
        }
        const A = isNaN(parseInt(fealtyClues, 10));
        const B = isNaN(parseInt(techClues, 10));
        const C = isNaN(parseInt(scholarClues, 10));
        const D = isNaN(parseInt(treasureClues, 10));
        const E = isNaN(parseInt(farmingClues, 10));
        const F = isNaN(parseInt(deadEndClues, 10));
        //if data is missing: stop
        if (A || B || C || D || E || F) {
            if (debug == true) {
                console.log('Bad Data Parse, Submit cancelled', A, B, C, D, E, F)
            }
            return
        }
        const allDoors = $(".labyrinthHUD-doorContainer").children();
        //Add flag to denote shuffling
        const journalText = $(".journaltext");
        const journalArray = journalText.toArray(0);
        const shuffleFlag = parseJournal(journalArray);
        //Parse Doors
        const doorOne = $(allDoors).first();
        const doorThree = $(allDoors).last();
        const doorTwo = $(allDoors).not(doorOne).not(doorThree);
        const doorOneData = parseDoor(doorOne)
        const doorOneObj = new doorOption(doorOneData.doorLength, doorOneData.doorQuality, doorOneData.doorType);
        const doorTwoData = parseDoor(doorTwo)
        const doorTwoObj = new doorOption(doorTwoData.doorLength, doorTwoData.doorQuality, doorTwoData.doorType);
        const doorThreeData = parseDoor(doorThree)
        const doorThreeObj = new doorOption(doorThreeData.doorLength, doorThreeData.doorQuality, doorThreeData.doorType);
        const resultsArray = [fealtyClues,
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
        const results = resultsArray.join()
        console.log('Result String: ', results)
        GM_setClipboard(results)
        publishResults(results)
    }
}

function parseDoor(door) {
    const debug = localStorage.getItem('ws.debug');
    const doorString = door.find(".labyrinthHUD-door-name-padding").text();
    const doorArray = doorString.split(/\s+/);
    let doorLength = doorArray[0];
    let doorQuality = doorArray[1];
    let doorType = doorArray[2];
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
    let shuffleFlag = 0;
    array.forEach(function(elements) {
        const text = $(elements).text();
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
    const debug = localStorage.getItem('ws.debug');
    const lastSubmit = localStorage.getItem('Last Submission');
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
    const form = new submitData(results)
    const jqxhr = $.ajax({
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
