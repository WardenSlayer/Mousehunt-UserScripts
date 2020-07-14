// ==UserScript==
// @name         MH: Living Garden HUD Enhancer
// @author       Warden Slayer - Warden Slayer#2302
// @namespace    https://greasyfork.org/en/users/227259-wardenslayer
// @version      1.0
// @description  Quick travel buttons for the Living Garden area location. More features comning soon.
// @include      https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @include      http://www.mousehuntgame.com/*
// @include      https://www.mousehuntgame.com/*
// ==/UserScript==
$(document).ready(function() {
    const debug = localStorage.getItem('ws.debug');
    const location = user.environment_name;
    if (location == 'Twisted Garden') {
        if (debug == true) {
            console.log('LG Script Started');
        }
        buildTravelHUD();
    } else if (location == 'Cursed City') {
        if (debug == true) {
            console.log('LG Script Started');
        }
        buildTravelHUD();
    } else if (location == 'Sand Crypts') {
        if (debug == true) {
            console.log('LG Script Started');
        }
        buildTravelHUD();
    } else if (location == 'Living Garden') {
        if (debug == true) {
            console.log('LG Script Started');
        }
        buildTravelHUD();
    } else if (location == 'Lost City') {
        if (debug == true) {
            console.log('LG Script Started');
        }
        buildTravelHUD();
    } else if (location == 'Sand Dunes') {
        if (debug == true) {
            console.log('LG Script Started');
        }
        buildTravelHUD();
    } else {if (debug == true) {
        console.log('Not in the LG region');
    }
           }
})

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
    setTimeout(buildTravelHUD, 500);
})
$(document).on('click', '.cityButton', function() {
    app.pages.TravelPage.travel('lost_city');
    setTimeout(buildTravelHUD, 500);
})
$(document).on('click', '.sandButton', function() {
    app.pages.TravelPage.travel('sand_dunes');
    setTimeout(buildTravelHUD, 500);
})
