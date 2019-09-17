// ==UserScript==
// @name         MH: Warpath Wave Calculator
// @author       Warden Slayer - Warden Slayer#2302
// @namespace    https://greasyfork.org/en/users/227259-wardenslayer
// @version      1.1.1
// @description  Keeps track of remaining wave mice to help you manage the wave.
// @include      https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @include      http://www.mousehuntgame.com/*
// @include      https://www.mousehuntgame.com/*
// ==/UserScript==
$(document).ready(function() {
    var observer = new MutationObserver(callback);
    var observerOptions = {
        childList: true,
        attributes: false,
        subtree: false,
        characterData: false
    };
    if ($(".hudLocationContent.desert_warpath").get(0)) {
        if ($('.warpathHUD-streak-quantity').get(0)) {
            observer.observe($('.warpathHUD-streak-quantity').get(0), observerOptions);
        }
        updateWave();
    }
});

function callback(mutationList, observer) {
    mutationList.forEach(mutation => {
        switch (mutation.type) {
            case "childList":
                updateWave()
                break;
        }
    });
}

function updateWave() {
    var wave = "";
    var waveRetreat = "";
    var waveMice = "";
    var warrior = "";
    var scout = "";
    var archer = "";
    var cavalry = "";
    var mage = "";
    var artillery = "";
    var streakedW = 0;
    var streakedS = 0;
    var streakedA = 0;
    var streakedC = 0;
    var streakedM = 0;
    var streakedF = 0;
    var retreatText = "";
    var resultString = "";
    var streak = parseInt($('.warpathHUD-streak-quantity').text(), 10)
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
    var totalRemaining = 0 + remainingW + remainingS + remainingA + remainingC + remainingM + remainingF;
    const panicMeter = $('.warpathHUD-moraleBar.mousehuntTooltipParent');
    var streaked = 0 + streakedW + streakedS + streakedA + streakedC + streakedM + streakedF;
    if (totalRemaining > waveRetreat) {
        var retreatingIn = totalRemaining - waveRetreat;
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
    var highLow = (totalRemaining - streaked) - waveRetreat;
    if (highLow > 0) {
        const plus = "+";
        highLow = plus.concat(highLow);
    }
    if (retreatText == "Retreated") {
        resultString = "The commnders have retreated";
    } else {
        resultString = "Wave commander cutoff: " + waveRetreat + "\nMice left after commander: " + (totalRemaining - streaked) + " (" + highLow + ")";
    }
    return resultString
}
$('.warpathHUD-moraleBar.mousehuntTooltipParent').mouseover(function() {
    var title = updateWave();
    $('.warpathHUD-moraleBar.mousehuntTooltipParent').attr('title', title);
    $('.warpathHUD-moraleBar.mousehuntTooltipParent').css('cursor', 'pointer');
});
