// ==UserScript==
// @name         MH: Warpath Wave Calculator
// @author       Warden Slayer - Warden Slayer#2302
// @namespace    https://greasyfork.org/en/users/227259-wardenslayer
// @version      1.1.3
// @description  Keeps track of remaining wave mice to help you manage the wave.
// @include      https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @include      http://www.mousehuntgame.com/*
// @include      https://www.mousehuntgame.com/*
// ==/UserScript==
$(document).ready(function() {
    const debug = localStorage.getItem('ws.debug');
    if (debug == true) {
        console.log('FW Script Started');
    }
    const observer = new MutationObserver(callback);
    const observerOptions = {
        childList: true,
        attributes: false,
        subtree: false,
        characterData: false
    };
    if ($('.warpathHUD-streak-quantity').get(0)) {
        if (debug == true) {
            console.log('Observing Streak');
        }
        observer.observe($('.warpathHUD-streak-quantity').get(0), observerOptions);
    } else {
        if (debug == true) {
            console.log('Streak not found');
        }
    }
    updateWave();
});

function callback(mutationList, observer) {
    const debug = localStorage.getItem('ws.debug');
    mutationList.forEach(mutation => {
        switch (mutation.type) {
            case "childList":
                if (debug == true) {
                    console.log('Observer Triggered');
                }
                updateWave()
                break;
        }
    });
}

function updateWave() {
    const debug = localStorage.getItem('ws.debug');
    let wave = "";
    let waveRetreat = "";
    let waveMice = "";
    let warrior = "";
    let scout = "";
    let archer = "";
    let cavalry = "";
    let mage = "";
    let artillery = "";
    let streakedW = 0;
    let streakedS = 0;
    let streakedA = 0;
    let streakedC = 0;
    let streakedM = 0;
    let streakedF = 0;
    let retreatText = "";
    let resultString = "";
    const streak = parseInt($('.warpathHUD-streak-quantity').text(), 10)
    if (debug == true) {
        console.log('Updating Wave...Current Streak:',streak);
    }
    if ($('.warpathHUD.showPortal.wave_1').get(0)) {
        wave = 1;
        waveRetreat = 10;
        waveMice = $('.warpathHUD-wave.wave_1').children();
    } else if ($('.warpathHUD.showPortal.wave_2').get(0)) {
        wave = 2;
        waveRetreat = 18;
        waveMice = $('.warpathHUD-wave.wave_2').children();
    } else if ($('.warpathHUD.showPortal.wave_3').get(0)) {
        wave = 3;
        waveRetreat = 26;
        waveMice = $('.warpathHUD-wave.wave_3').children();
    } else {
        return
    }
    if (debug == true) {
        console.log('Wave Retreat:',waveRetreat);
    }
    if (debug == true) {
        console.log('Wave Mice:',waveMice);
    }
    if (waveMice.get(0)) {
        warrior = waveMice.get(0);
        var remainingW = parseInt($(warrior).find('.warpathHUD-wave-mouse-population').text(), 10);
        if (remainingW >= streak) {
            streakedW = streak;
        } else {
            streakedW = remainingW;
        }
    } else {
        remainingW = 0;
        streakedW = remainingW;
    }
    if (waveMice.get(1)) {
        scout = waveMice.get(1);
        var remainingS = parseInt($(scout).find('.warpathHUD-wave-mouse-population').text(), 10);
        if (remainingS >= streak) {
            streakedS = streak;
        } else {
            streakedS = remainingS;
        }
    } else {
        remainingS = 0;
        streakedS = remainingS;
    }
    if (waveMice.get(2)) {
        archer = waveMice.get(2);
        var remainingA = parseInt($(archer).find('.warpathHUD-wave-mouse-population').text(), 10);
        if (remainingA >= streak) {
            streakedA = streak;
        } else {
            streakedA = remainingA;
        }
    } else {
        remainingA = 0;
        streakedA = remainingA;
    }
    if (waveMice.get(3)) {
        cavalry = waveMice.get(3);
        var remainingC = parseInt($(cavalry).find('.warpathHUD-wave-mouse-population').text(), 10);
        if (remainingC >= streak) {
            streakedC = streak;
        } else {
            streakedC = remainingC;
        }
    } else {
        remainingC = 0;
        streakedC = remainingC;
    }
    if (waveMice.get(4)) {
        mage = waveMice.get(4);
        var remainingM = parseInt($(mage).find('.warpathHUD-wave-mouse-population').text(), 10);
        if (remainingM >= streak) {
            streakedM = streak;
        } else {
            streakedM = remainingM;
        }
    } else {
        remainingM = 0;
        streakedM = remainingM;
    }
    if (waveMice.get(5)) {
        artillery = waveMice.get(5);
        var remainingF = parseInt($(artillery).find('.warpathHUD-wave-mouse-population').text(), 10);
        if (remainingF >= streak) {
            streakedF = streak;
        } else {
            streakedF = remainingF;
        }
    } else {
        remainingF = 0;
        streakedF = remainingF;
    }
    if (debug == true) {
        console.log('Mouse Breakdown:',remainingW,remainingS,remainingA,remainingC,remainingM,remainingF);
    }
    const totalRemaining = 0 + remainingW + remainingS + remainingA + remainingC + remainingM + remainingF;
    const panicMeter = $('.warpathHUD-moraleBar.mousehuntTooltipParent');
    const streaked = 0 + streakedW + streakedS + streakedA + streakedC + streakedM + streakedF;
    if (totalRemaining > waveRetreat) {
        const retreatingIn = totalRemaining - waveRetreat;
        if (retreatingIn > 1) {
            retreatText = retreatingIn + " catches left";
        } else {
            retreatText = "Last Catch!";
        }
        $(panicMeter).text(retreatText).css({
            'padding': '1px',
            'font-size': '10px',
            'font-weight': 'bold',
            'text-align': 'center'
        })
    } else {
        retreatText = "Retreated";
        $(panicMeter).text(retreatText).css({
            'padding': '1px',
            'font-size': '10px',
            'font-weight': 'bold',
            'text-align': 'center'
        })
    }
    if (debug == true) {
        console.log('Retreat Text:',retreatText);
    }
    let highLow = (totalRemaining - streaked) - waveRetreat;
    if (highLow > 0) {
        const plus = "+";
        highLow = plus.concat(highLow);
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
}
$('.warpathHUD-moraleBar.mousehuntTooltipParent').mouseover(function() {
    const title = updateWave();
    $('.warpathHUD-moraleBar.mousehuntTooltipParent').attr('title', title);
    $('.warpathHUD-moraleBar.mousehuntTooltipParent').css('cursor', 'pointer');
});
