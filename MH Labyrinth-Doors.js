// ==UserScript==
// @name         MH: Labyrinth Door Data Collector
// @author       Warden Slayer - Warden Slayer#2010
// @namespace    https://greasyfork.org/en/users/227259-wardenslayer
// @version      1.2.4
// @description  Mousehunt data collection tool for avilible labyrinth doors
// @include      https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @include      http://www.mousehuntgame.com/*
// @include      https://www.mousehuntgame.com/*
// ==/UserScript==
$(document).ready(function() {
    const debug = localStorage.getItem('ws.debug');
    if (user.environment_name == 'Labyrinth') {
        if (debug == true) {
            console.log('Labyrinth Door Script Running');
        }
        buildWorkingIndicator();
        copyData();
    } else {
        if (debug == true) {
            console.log('Not in the Labyrinth');
        }

    }
});

$(document).ajaxStop(function(){
    if (user.environment_name == 'Labyrinth') {
        buildWorkingIndicator();
        copyData();
    }
});

function buildWorkingIndicator() {
    const debug = localStorage.getItem('ws.debug');
    if ($('.workingIndicatorContainer').length > 0) return;
    const workingIndicatorContainer = document.createElement("div");
    workingIndicatorContainer.classList.add("workingIndicatorContainer");
    const hudLocation = $('.labyrinthHUD-itemContainer');
    if (debug == true) {
        console.log('HUD Element:',hudLocation);
    }
    const workingIndicator = document.createElement("div");
    workingIndicator.classList.add("workingIndicator");
    $(workingIndicator).text('Collecting Door Data');
    workingIndicator.addEventListener("click", copyData);
    workingIndicatorContainer.appendChild(workingIndicator);
    $(workingIndicator).css({
        'margin-right': '5px',
    })
    hudLocation.after(workingIndicatorContainer);
    $('.workingIndicatorContainer').css({
        'height': '5%',
        'width': '15%',
        'right':'8px',
        'bottom': '-10px',
        'position': 'absolute',
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
        let resultsArray = [];
        const allFactions = $('[class*="labyrinthHUD-clueDrawer-clue"]');
        allFactions.each(function(i) {
            const thisClueQty = parseInt($(this).find(".labyrinthHUD-clueDrawer-quantity").text(),10)
            resultsArray[i] = thisClueQty;
        });
        const allDoors = $(".labyrinthHUD-doorContainer").children();
        allDoors.each(function(i) {
            const thisDoor = parseDoor(this);
            resultsArray.push(thisDoor.doorLength,thisDoor.doorQuality,thisDoor.doorType)
        });
        if (debug == true) {
            console.log(resultsArray);
        }
        //Add flag to denote shuffling
        const journalText = $(".journaltext");
        const journalArray = journalText.toArray(0);
        const shuffleFlag = parseJournal(journalArray);
        resultsArray.push(shuffleFlag);
        const results = resultsArray.join();
        console.log('Result String: ', results);
        publishResults(results);
    }
}

function parseDoor(door) {
    const debug = localStorage.getItem('ws.debug');
    if ($(door).hasClass('mystery')) {
        return
    };
    const doorString = $(door).find(".labyrinthHUD-door-name-padding").text();
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
        localStorage.setItem('Last Submission', results);
        $('.workingIndicator').text('Data Submitted');
        setTimeout(function() {
            $('.workingIndicator').text('Collecting Door Data');
        }, 1000);
    });


}

function submitData(result_string) {
    this.The_String_From_The_Script = result_string;
}
