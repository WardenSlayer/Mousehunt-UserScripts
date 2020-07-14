// ==UserScript==
// @name         MH: Living Garden HUD Enhancer
// @author       Warden Slayer - Warden Slayer#2302
// @namespace    https://greasyfork.org/en/users/227259-wardenslayer
// @version      1.0.1
// @description  Quick travel buttons for the Living Garden area locations. More features comning soon.
// @include      https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @include      http://www.mousehuntgame.com/*
// @include      https://www.mousehuntgame.com/*
// ==/UserScript==
$(document).ready(function() {
    const debug = localStorage.getItem('ws.debug');
    const location = user.environment_name;
    const hudWatcher = new MutationObserver(callback);
    const hudWatcherOptions = {
        childList: false,
        attributes: true,
        subtree: false
    };
    if ($('#hudLocationContent').hasClass('hudLocationContent desert_oasis')) {
        if (debug == true) {
            console.log('LG Script Started');
        }
        buildAreaHUD(location)
        hudWatcher.observe($('#hudLocationContent').get(0), hudWatcherOptions);
    } else if ($('#hudLocationContent').hasClass('hudLocationContent lost_city')) {
        if (debug == true) {
            console.log('LG Script Started');
        }
        buildAreaHUD(location)
        hudWatcher.observe($('#hudLocationContent').get(0), hudWatcherOptions);
    } else if ($('#hudLocationContent').hasClass('hudLocationContent sand_dunes')) {
        if (debug == true) {
            console.log('LG Script Started');
        }
        buildAreaHUD(location)
    } else {
        if (debug == true) {
            console.log('Not in the LG region');
        }
    }
})

function callback(mutationList, observer) {
    mutationList.forEach(mutation => {
        if (mutation.type == 'attributes') {
            let $nodes = $(mutation.target);
            const location = user.environment_name;
            buildAreaHUD(location)
        }
    })
}


//**=========================================**//
//HUD Code
function buildAreaHUD(location) {
    buildTravelHUD();
    wipeCheeseBoard();
}

function wipeCheeseBoard() {
    const allPetals = $('.itemContainer').children().not('.travelHudLg');
    allPetals.removeAttr("href").removeAttr("onclick");
    allPetals.on('click',function(e){
        petalsOnClick(e.currentTarget.title);
    });
}

function petalsOnClick(name) {
    const val = name.split(" ");
    const first=val[0];
    const second=val[1];
    const petal = first.concat(" ",second);
    if (petal == 'Dewthief Petal') {
        hg.utils.TrapControl.setBait(1007).go();
    } else if (petal == 'Dreamfluff Herbs') {
        hg.utils.TrapControl.setBait(1008).go();
    } else if (petal == 'Duskshade Petal') {
        hg.utils.TrapControl.setBait(1008).go();
    } else if (petal == 'Graveblossom Petal') {
        hg.utils.TrapControl.setBait(1009).go();
    } else if (petal == 'Plumepearl Herbs') {
        hg.utils.TrapControl.setBait(1010).go();
    } else if (petal == 'Lunaria Petal') {
        hg.utils.TrapControl.setBait(1010).go();
    } else {
    }
}

//**=========================================**//
//Travel Code
function buildTravelHUD() {
    const itemContainer = $('.itemContainer');
    if ($('.travelHudLg').length == 0) {
        const travelHudLg = document.createElement('div');
        travelHudLg.classList.add('travelHudLg');
        $(travelHudLg).css({
            'width': '100%',
        });
        //Garden Button
        const gardenButton = document.createElement('div');
        gardenButton.classList.add('gardenButton');
        $(gardenButton).text('Garden');
        $(gardenButton).css({
            'width': '40px',
            'height': '15px',
            'float': 'left',
            'text-align': 'center',
            'margin-right': '3px',
            'margin-top': '2px',
            'border': '1px solid',
            'background-color': 'rgb(49, 129, 34)',
            'cursor': 'pointer',
        });
        travelHudLg.append(gardenButton);
        //City Button
        const cityButton = document.createElement('div');
        cityButton.classList.add('cityButton');
        $(cityButton).text('City');
        $(cityButton).css({
            'width': '40px',
            'height': '15px',
            'float': 'left',
            'text-align': 'center',
            'margin-right': '3px',
            'margin-top': '2px',
            'border': '1px solid',
            'background-color': '#6dd0e5',
            'cursor': 'pointer',
        });
        travelHudLg.append(cityButton);
        //Sand Button
        const sandButton = document.createElement('div');
        sandButton.classList.add('sandButton');
        $(sandButton).text('Sand');
        $(sandButton).css({
            'width': '40px',
            'height': '15px',
            'float': 'left',
            'text-align': 'center',
            'margin-top': '2px',
            'border': '1px solid',
            'background-color': '#c7ae8f',
            'cursor': 'pointer',
        });
        travelHudLg.append(sandButton);
        //Last
        itemContainer.append(travelHudLg);
    }
}
$(document).on('click', '.gardenButton', function() {
    app.pages.TravelPage.travel('desert_oasis');
})
$(document).on('click', '.cityButton', function() {
    app.pages.TravelPage.travel('lost_city');
})
$(document).on('click', '.sandButton', function() {
    app.pages.TravelPage.travel('sand_dunes');
})
