// ==UserScript==
// @name         MH: Warpath Wave Calculator
// @author       Warden Slayer - Warden Slayer#2010
// @namespace    https://greasyfork.org/en/users/227259-wardenslayer
// @version      1.1.6
// @description  Keeps track of remaining wave mice to help you manage the wave.
// @include      https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @include      http://www.mousehuntgame.com/*
// @include      https://www.mousehuntgame.com/*
// ==/UserScript==
$(document).ready(function() {
    const debug = localStorage.getItem('ws.debug');
    if (user.environment_name == 'Fiery Warpath') {
        if (debug == true) {
            console.log('FW Script Started');
        }
        updateWave();
    } else {
        if (debug == true) {
            console.log('Not at the FW');
        }
    }
});

function updateWave() {
    const debug = localStorage.getItem('ws.debug');
    let waveRetreat = 0;
    let waveMice = "";
    let remainingWaveMice = {};
    let totalRemaining = 0;
    let streaked = 0;
    let retreatText = "";
    let resultString = "";
    const streak = parseInt($('.warpathHUD-streak-quantity').text(), 10);
    if (debug == true) {
        console.log('Updating Wave...Current Streak:',streak);
    }
    if ($('.warpathHUD.wave_1').get(0)) {
        waveRetreat = 10;
        waveMice = $('.warpathHUD-wave.wave_1').children();
    } else if ($('.warpathHUD.wave_2').get(0)) {
        waveRetreat = 18;
        waveMice = $('.warpathHUD-wave.wave_2').children();
    } else if ($('.warpathHUD.wave_3').get(0)) {
        waveRetreat = 26;
        waveMice = $('.warpathHUD-wave.wave_3').children();
    } else {
        if (debug == true) {
            console.log('Wave 4: Script Stopped');
        }
        return
    };
    if (debug == true) {
        console.log('Wave Retreat@',waveRetreat);
    };
    waveMice.each(function(i) {
        const thisRemaning = parseInt($(this).find('.warpathHUD-wave-mouse-population').text(), 10);
        let thisStreaked = 0;
        if (thisRemaning >= streak) {
            thisStreaked = streak;
        } else {
            thisStreaked = thisRemaning;
        }
        const thisMouse = new mouseClass(thisRemaning,thisStreaked);
        remainingWaveMice[$(this).attr('data-mouse')] = thisMouse;
        totalRemaining += thisRemaning;
        streaked += thisStreaked;
    });
    if (debug == true) {
        console.log('Mouse Breakdown:',remainingWaveMice);
    };
    const panicMeter = $('.warpathHUD-moraleBar.mousehuntTooltipParent');
    if (totalRemaining > waveRetreat) {
        const retreatingIn = totalRemaining - waveRetreat;
        if (retreatingIn > 1) {
            retreatText = retreatingIn + " catches left";
        } else {
            retreatText = "Last Catch!";
        }
    } else {
        retreatText = "Retreated";
    }
    $(panicMeter).text(retreatText).css({
        'padding': '1px',
        'font-size': '10px',
        'font-weight': 'bold',
        'text-align': 'center'
    });
    if (debug == true) {
        console.log('Retreat Text:',retreatText);
    }
    let highLow = (totalRemaining - streaked) - waveRetreat;
    if (highLow > 0) {
        highLow = '+'+highLow;
    }
    if (retreatText == "Retreated") {
        resultString = "The commanders have retreated";
    } else {
        resultString = "Wave commander cutoff: " + waveRetreat + "\nMice left after commander: " + (totalRemaining - streaked) + " (" + highLow + ")";
    }
    if (debug == true) {
        console.log('Hover Text:',resultString);
    }
    return resultString
};

function mouseClass(remaining,streaked) {
    this.remaining = remaining;
    this.streaked = streaked;
};

$('.warpathHUD-moraleBar.mousehuntTooltipParent').mouseover(function() {
    const title = updateWave();
    $('.warpathHUD-moraleBar.mousehuntTooltipParent').attr('title', title);
    $('.warpathHUD-moraleBar.mousehuntTooltipParent').css('cursor', 'pointer');
});

$(document).ajaxComplete(function(event,xhr,options){
    if (user.environment_name == 'Fiery Warpath') {
        updateWave();
    }
});


