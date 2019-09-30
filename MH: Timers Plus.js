// ==UserScript==
// @name         MH Timers+
// @author       Warden Slayer - Warden Slayer#2302
// @namespace    https://greasyfork.org/en/users/227259-wardenslayer
// @version      1.4
// @description  Handy script to keep track of the various MH location timers
// @include      https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @include      http://www.mousehuntgame.com/*
// @include      https://www.mousehuntgame.com/*
// @grant GM_setClipboard
// ==/UserScript==
$(document).ready(function() {
    buildTimerBox();
    buildControlPanels();
    buildTinkerPanel();
    startTimers();
});

function buildTimerBox() {
    if ($(".timerBox").length > 0) return;
    if ($(".accordion").length > 0) return;
    var container = $("#mousehuntContainer");
    var accordion = document.createElement("div");
    accordion.classList.add("accordion");
    $(accordion).css({
        'background-image': "url('https://www.toptal.com/designers/subtlepatterns/patterns/interlaced.png')",
        'width': '98%',
        'height': '15px',
        'padding': '5px',
        'border': '2px solid black',
        'cursor': 'pointer'
    });
    var accordionPrompt = document.createElement("div");
    accordionPrompt.classList.add("accordionPrompt");
    var accordionTitle = document.createElement("div");
    accordionTitle.classList.add("accordionTitle");
    $(accordionTitle).text("MouseHunt Timers+").css({
        'float': 'left',
        'padding': '1px 0',
        'font-size': '12px',
        'font-weight': 'bold'
    })
    $(accordionPrompt).text("Click to Hide").css({
        'float': 'right',
        'padding': '1px 0',
        'font-size': '11px',
        'font-weight': 'bold'
    })
    accordion.appendChild(accordionTitle)
    accordion.appendChild(accordionPrompt)
    var timerBox = document.createElement("div");
    if (localStorage.getItem('HideTimers') == "Y") {
        timerBox.classList.add("timerBox")
        timerBox.classList.add("hide");
        $(accordionPrompt).text("Click to Show")
    } else {
        timerBox.classList.add("timerBox");
    }
    $(timerBox).css({
        'background-image': "url('https://www.toptal.com/designers/subtlepatterns/patterns/interlaced.png')"
    });
    $(timerBox).css({
        'height': 150 + "px",
        'padding': 2 + "px"
    });
    let forbiddenGrove = buildForbiddenGrove();
    if (localStorage.getItem('RemindGrove') == null) {
        localStorage.setItem('RemindGrove', 'N')
    }
    let balacksCove = buildBalacksCove();
    if (localStorage.getItem('RemindCove') == null) {
        localStorage.setItem('RemindCove', 'N')
    }
    let seasonalGarden = buildSeasonalGarden();
    if (localStorage.getItem('RemindGarden') == null) {
        localStorage.setItem('RemindGarden', 'N')
    }
    let toxicSpill = buildToxicSpill();
    if (localStorage.getItem('RemindSpill') == null) {
        localStorage.setItem('RemindSpill', 'N')
    }
    timerBox.appendChild(forbiddenGrove)
    timerBox.appendChild(balacksCove)
    timerBox.appendChild(seasonalGarden)
    timerBox.appendChild(toxicSpill)
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
    $(toxicSpill).css({
        'float': 'left',
        'marginLeft': 1 + "px"
    })
    //LAST
    container.prepend(timerBox)
    container.prepend(accordion)

}
$(document).on('click', '.accordion', function() {
    if (localStorage.getItem('HideTimers') == "Y") {
        //show
        $('.timerBox').removeClass("hide")
        $('.accordionPrompt').text("Click to Hide")
        localStorage.setItem('HideTimers', "N")
    } else {
        //hide
        $('.timerBox').find('*').removeClass("hide")
        $('.timerBox').addClass("hide")
        $('.accordionPrompt').text("Click to Show")
        $('.tinkerPanel').addClass("hide");
        $('.tinkerButton').text("Tinker");
        localStorage.setItem('HideTimers', "Y")
    }
})

function buildControlPanels() {
    var timerBox = $(".timerBox");
    //FG
    const remindGrove = localStorage.getItem('RemindGrove');
    var forbiddenGroveControlPanel = document.createElement("div");
    forbiddenGroveControlPanel.classList.add("forbiddenGroveControlPanel");
    var forbiddenGroveButton = document.createElement("button");
    forbiddenGroveButton.id = "forbiddenGroveButton";
    forbiddenGroveButton.innerText = "Travel";
    forbiddenGroveButton.addEventListener("click", travelToGrove);
    forbiddenGroveControlPanel.appendChild(forbiddenGroveButton);
    $(forbiddenGroveControlPanel).css({
        'float': 'left',
        'width': '21.5%',
        'marginTop': 10 + "px"
    })
    $(forbiddenGroveButton).css({
        'width': '75px',
        'float': 'left',
        'marginRight': 5 + "px"
    })
    var forbiddenGroveCb = document.createElement('input');
    forbiddenGroveCb.type = "checkbox";
    forbiddenGroveCb.name = "forbiddenGroveCb";
    forbiddenGroveCb.value = "value";
    forbiddenGroveCb.id = "forbiddenGroveCb";
    if (remindGrove.search("N") < 0) {
        forbiddenGroveCb.checked = "Yes";
    } else {
        forbiddenGroveCb.checked = "";
    }
    var forbiddenGroveCbLabel = document.createElement('label')
    forbiddenGroveCbLabel.htmlFor = "forbiddenGroveCbLabel";
    forbiddenGroveCbLabel.appendChild(document.createTextNode('Remind '));
    forbiddenGroveControlPanel.appendChild(forbiddenGroveCbLabel);
    forbiddenGroveControlPanel.appendChild(forbiddenGroveCb)
    $(forbiddenGroveCbLabel).css({
        'float': 'left',
        'fontSize': "14px",
        'width': '45px',
    })
    $(forbiddenGroveCb).css({
        'float': 'left',
        'width': '20px'
    })
    timerBox.append(forbiddenGroveControlPanel);
    //BC
    const remindCove = localStorage.getItem('RemindCove');
    var balacksCoveControlPanel = document.createElement("div");
    balacksCoveControlPanel.classList.add("balacksCoveControlPanel");
    var balacksCoveButton = document.createElement("button");
    balacksCoveButton.id = "balacksCoveButton";
    balacksCoveButton.innerText = "Travel";
    balacksCoveButton.addEventListener("click", travelToCove);
    balacksCoveControlPanel.appendChild(balacksCoveButton);
    $(balacksCoveControlPanel).css({
        'float': 'left',
        'width': '25%',
        'marginLeft': 5 + "px",
        'marginTop': 10 + "px"
    })
    $(balacksCoveButton).css({
        'width': '75px',
        'float': 'left',
        'marginRight': 5 + "px"
    })
    var balacksCoveCb = document.createElement('input');
    balacksCoveCb.type = "checkbox";
    balacksCoveCb.name = "balacksCoveCb";
    balacksCoveCb.value = "value";
    balacksCoveCb.id = "balacksCoveCb";
    if (remindCove.search("N") < 0) {
        balacksCoveCb.checked = "Yes";
    } else {
        balacksCoveCb.checked = "";
    }
    var balacksCoveCbLabel = document.createElement('label')
    balacksCoveCbLabel.htmlFor = "balacksCoveCbLabel";
    balacksCoveCbLabel.appendChild(document.createTextNode('Remind '));
    balacksCoveControlPanel.appendChild(balacksCoveCbLabel);
    balacksCoveControlPanel.appendChild(balacksCoveCb)
    $(balacksCoveCbLabel).css({
        'float': 'left',
        'fontSize': "14px",
        'width': '45px',
    })
    $(balacksCoveCb).css({
        'float': 'left',
        'width': '20px'
    })
    timerBox.append(balacksCoveControlPanel);
    //SG
    const remindGarden = localStorage.getItem('RemindGarden');
    var seasonalGardenControlPanel = document.createElement("div");
    seasonalGardenControlPanel.classList.add("seasonalGardenControlPanel");
    var seasonalGardenButton = document.createElement("button");
    seasonalGardenButton.id = "seasonalGardenButton";
    seasonalGardenButton.innerText = "Travel";
    seasonalGardenButton.addEventListener("click", travelToGarden);
    seasonalGardenControlPanel.appendChild(seasonalGardenButton);
    $(seasonalGardenControlPanel).css({
        'float': 'left',
        'width': '24%',
        'marginLeft': 5 + "px",
        'marginTop': 10 + "px"
    })
    $(seasonalGardenButton).css({
        'width': '75px',
        'float': 'left',
        'marginRight': 5 + "px"
    })
    var seasonalGardenCb = document.createElement('input');
    seasonalGardenCb.type = "checkbox";
    seasonalGardenCb.name = "seasonalGardenCb";
    seasonalGardenCb.value = "value";
    seasonalGardenCb.id = "seasonalGardenCb";
    if (remindGarden.search("N") < 0) {
        seasonalGardenCb.checked = "Yes";
    } else {
        seasonalGardenCb.checked = "";
    }
    var seasonalGardenCbLabel = document.createElement('label')
    seasonalGardenCbLabel.htmlFor = "seasonalGardenCbLabel";
    seasonalGardenCbLabel.appendChild(document.createTextNode('Remind '));
    seasonalGardenControlPanel.appendChild(seasonalGardenCbLabel);
    seasonalGardenControlPanel.appendChild(seasonalGardenCb)
    $(seasonalGardenCbLabel).css({
        'float': 'left',
        'fontSize': "14px",
        'width': '45px',
    })
    $(seasonalGardenCb).css({
        'float': 'left',
        'width': '20px'
    })
    timerBox.append(seasonalGardenControlPanel);
    //TS
    const remindSpill = localStorage.getItem('RemindSpill');
    var toxicSpillControlPanel = document.createElement("div");
    toxicSpillControlPanel.classList.add("toxicSpillControlPanel");
    var toxicSpillButton = document.createElement("button");
    toxicSpillButton.id = "toxicSpillButton";
    toxicSpillButton.innerText = "Travel";
    toxicSpillButton.addEventListener("click", travelToSpill);
    toxicSpillControlPanel.appendChild(toxicSpillButton);
    $(toxicSpillControlPanel).css({
        'float': 'left',
        'width': '26%',
        'marginLeft': 10 + "px",
        'marginTop': 10 + "px"
    })
    $(toxicSpillButton).css({
        'width': '75px',
        'float': 'left',
        'marginRight': 5 + "px"
    })
    var toxicSpillCb = document.createElement('input');
    toxicSpillCb.type = "checkbox";
    toxicSpillCb.name = "toxicSpillCb";
    toxicSpillCb.value = "value";
    toxicSpillCb.id = "toxicSpillCb";
    if (remindSpill.search("N") < 0) {
        toxicSpillCb.checked = "Yes";
    } else {
        toxicSpillCb.checked = "";
    }
    var toxicSpillCbLabel = document.createElement('label')
    toxicSpillCbLabel.htmlFor = "toxicSpillCbLabel";
    toxicSpillCbLabel.appendChild(document.createTextNode('Remind '));
    toxicSpillControlPanel.appendChild(toxicSpillCbLabel);
    toxicSpillControlPanel.appendChild(toxicSpillCb)
    $(toxicSpillCbLabel).css({
        'float': 'left',
        'fontSize': "14px",
        'width': '45px',
    })
    $(toxicSpillCb).css({
        'float': 'left',
        'width': '20px'
    })
    //tinker button
    var tinkerButton = document.createElement("div");
    tinkerButton.classList.add("tinkerButton");
    $(tinkerButton).text("Tinker");
    toxicSpillControlPanel.appendChild(tinkerButton);
    $(tinkerButton).css({
        'width': '30px',
        'float': 'right',
        'padding': 3 + 'px',
        'color': 'rgb(4, 44, 202)',
        'marginRight': 5 + "px"
    })
    timerBox.append(toxicSpillControlPanel);
}

$('.tinkerButton').mouseover(function() {
    $('.tinkerButton').attr('title', 'Tinker Menu');
    $('.tinkerButton').css('cursor', 'pointer');
});
$(document).on('click', '.tinkerButton', function() {
    var fg = $('.forbiddenGrove');
    var bc = $('.balacksCove');
    var sg = $('.seasonalGarden');
    var ts = $('.toxicSpill');
    var tp = $('.tinkerPanel');
    if (fg.hasClass("hide")) {
        //show
        fg.removeClass("hide");
        bc.removeClass("hide");
        sg.removeClass("hide");
        ts.removeClass("hide");
        tp.addClass("hide");
        $('.tinkerButton').text("Tinker");
    } else {
        //hide
        fg.addClass("hide");
        bc.addClass("hide");
        sg.addClass("hide");
        ts.addClass("hide");
        tp.removeClass("hide");
        $('.tinkerButton').text("Close");
    }
});

function buildTinkerPanel() {
    var timerBox = $(".timerBox");
    var tinkerPanel = document.createElement("div");
    tinkerPanel.classList.add("tinkerPanel");
    tinkerPanel.classList.add("hide");
    $(tinkerPanel).css({
        'height': '70%',
        'width': '99%',
        'float': 'left',
        'padding': 2 + "px",
        'background-image': "url('https://www.toptal.com/designers/subtlepatterns/patterns/interlaced.png')",
        'border': '1px solid black'
    });
    //FG Options
    const remindGrove = localStorage.getItem('RemindGrove');
    var forbiddenGroveOptions = document.createElement("div");
    forbiddenGroveOptions.classList.add("forbiddenGroveOptions");
    var forbiddenGroveOptionsLabel = document.createElement("div");
    forbiddenGroveOptionsLabel.classList.add("forbiddenGroveOptionsLabel");
    var forbiddenGroveOptionsLabelText = document.createTextNode("Forbidden Grove");
    forbiddenGroveOptionsLabel.appendChild(forbiddenGroveOptionsLabelText);
    forbiddenGroveOptions.appendChild(forbiddenGroveOptionsLabel);
    $(forbiddenGroveOptions).css({
        'float': 'left',
        'width': '12%',
    })
    $(forbiddenGroveOptionsLabel).css({
        'float': 'left',
        'width': '100%',
        'font-weight': 700,
        "marginRight": "5px"
    })
    var forbiddenGroveOpenCb = document.createElement('input');
    forbiddenGroveOpenCb.type = "checkbox";
    forbiddenGroveOpenCb.name = "forbiddenGroveOpenCb";
    forbiddenGroveOpenCb.value = "value";
    forbiddenGroveOpenCb.id = "forbiddenGroveOpenCb";
    if (remindGrove.search("O") >= 0) {
        forbiddenGroveOpenCb.checked = "Yes";
    } else {
        forbiddenGroveOpenCb.checked = "";
    }
    var forbiddenGroveOpenCbLabel = document.createElement('label')
    forbiddenGroveOpenCbLabel.htmlFor = "forbiddenGroveOpenCbLabel";
    forbiddenGroveOpenCbLabel.appendChild(document.createTextNode('Open'));
    $(forbiddenGroveOpenCbLabel).css({
        'float': 'left',
        'width': '30px',
        'padding': '1px'
    })
    $(forbiddenGroveOpenCb).css({
        'float': 'left',
        'width': '20px'
    })
    forbiddenGroveOptions.appendChild(forbiddenGroveOpenCbLabel);
    forbiddenGroveOptions.appendChild(forbiddenGroveOpenCb);
    //
    var forbiddenGroveCloseCb = document.createElement('input');
    forbiddenGroveCloseCb.type = "checkbox";
    forbiddenGroveCloseCb.name = "forbiddenGroveCloseCb";
    forbiddenGroveCloseCb.value = "value";
    forbiddenGroveCloseCb.id = "forbiddenGroveCloseCb";
    if (remindGrove.search("C") >= 0) {
        forbiddenGroveCloseCb.checked = "Yes";
    } else {
        forbiddenGroveCloseCb.checked = "";
    }
    var forbiddenGroveCloseCbLabel = document.createElement('label')
    forbiddenGroveCloseCbLabel.htmlFor = "forbiddenGroveCloseCbLabel";
    forbiddenGroveCloseCbLabel.appendChild(document.createTextNode('Closed'));
    $(forbiddenGroveCloseCbLabel).css({
        'float': 'left',
        'width': '30px',
        'padding': '1px'
    })
    $(forbiddenGroveCloseCb).css({
        'float': 'left',
        'width': '20px'
    })
    forbiddenGroveOptions.appendChild(forbiddenGroveCloseCbLabel);
    forbiddenGroveOptions.appendChild(forbiddenGroveCloseCb);
    //BC Options
    const remindCove = localStorage.getItem('RemindCove');
    var balacksCoveOptions = document.createElement("div");
    balacksCoveOptions.classList.add("balacksCoveOptions");
    var balacksCoveOptionsLabel = document.createElement("div");
    balacksCoveOptionsLabel.classList.add("balacksCoveOptionsLabel");
    var balacksCoveOptionsLabelText = document.createTextNode("Balack's Cove");
    balacksCoveOptionsLabel.appendChild(balacksCoveOptionsLabelText);
    balacksCoveOptions.appendChild(balacksCoveOptionsLabel);
    $(balacksCoveOptions).css({
        'float': 'left',
        'width': '12%',
    })
    $(balacksCoveOptionsLabel).css({
        'float': 'left',
        'width': '100%',
        'font-weight': 700,
        "marginRight": "5px"
    })
    var balacksCoveLowCb = document.createElement('input');
    balacksCoveLowCb.type = "checkbox";
    balacksCoveLowCb.name = "balacksCoveLowCb";
    balacksCoveLowCb.value = "value";
    balacksCoveLowCb.id = "balacksCoveLowCb";
    if ((remindCove.search("L") >= 0) && (remindCove.search("N") < 0)) {
        balacksCoveLowCb.checked = "Yes";
    } else {
        balacksCoveLowCb.checked = "";
    }
    var balacksCoveLowCbLabel = document.createElement('label')
    balacksCoveLowCbLabel.htmlFor = "balacksCoveLowCbLabel";
    balacksCoveLowCbLabel.appendChild(document.createTextNode('Low'));
    $(balacksCoveLowCbLabel).css({
        'float': 'left',
        'width': '30px',
        'padding': '1px'
    })
    $(balacksCoveLowCb).css({
        'float': 'left',
        'width': '20px'
    })
    balacksCoveOptions.appendChild(balacksCoveLowCbLabel);
    balacksCoveOptions.appendChild(balacksCoveLowCb);
    //
    var balacksCoveMidCb = document.createElement('input');
    balacksCoveMidCb.type = "checkbox";
    balacksCoveMidCb.name = "balacksCoveMidCb";
    balacksCoveMidCb.value = "value";
    balacksCoveMidCb.id = "balacksCoveMidCb";
    if (remindCove.search("M") >= 0) {
        balacksCoveMidCb.checked = "Yes";
    } else {
        balacksCoveMidCb.checked = "";
    }
    var balacksCoveMidCbLabel = document.createElement('label')
    balacksCoveMidCbLabel.htmlFor = "balacksCoveMidCbLabel";
    balacksCoveMidCbLabel.appendChild(document.createTextNode('Mid'));
    $(balacksCoveMidCbLabel).css({
        'float': 'left',
        'width': '30px',
        'padding': '1px'
    })
    $(balacksCoveMidCb).css({
        'float': 'left',
        'width': '20px'
    })
    balacksCoveOptions.appendChild(balacksCoveMidCbLabel);
    balacksCoveOptions.appendChild(balacksCoveMidCb);
    //
    var balacksCoveHighCb = document.createElement('input');
    balacksCoveHighCb.type = "checkbox";
    balacksCoveHighCb.name = "balacksCoveHighCb";
    balacksCoveHighCb.value = "value";
    balacksCoveHighCb.id = "balacksCoveHighCb";
    if (remindCove.search("H") >= 0) {
        balacksCoveHighCb.checked = "Yes";
    } else {
        balacksCoveHighCb.checked = "";
    }
    var balacksCoveHighCbLabel = document.createElement('label')
    balacksCoveHighCbLabel.htmlFor = "balacksCoveHighCbLabel";
    balacksCoveHighCbLabel.appendChild(document.createTextNode('High'));
    $(balacksCoveHighCbLabel).css({
        'float': 'left',
        'width': '30px',
        'padding': '1px'
    })
    $(balacksCoveHighCb).css({
        'float': 'left',
        'width': '20px'
    })
    balacksCoveOptions.appendChild(balacksCoveHighCbLabel);
    balacksCoveOptions.appendChild(balacksCoveHighCb);
    //SG Options
    const remindGarden = localStorage.getItem('RemindGarden');
    var seasonalGardenOptions = document.createElement("div");
    seasonalGardenOptions.classList.add("seasonalGardenOptions");
    var seasonalGardenOptionsLabel = document.createElement("div");
    seasonalGardenOptionsLabel.classList.add("seasonalGardenOptionsLabel");
    var seasonalGardenOptionsLabelText = document.createTextNode("Seasonal Garden");
    seasonalGardenOptionsLabel.appendChild(seasonalGardenOptionsLabelText);
    seasonalGardenOptions.appendChild(seasonalGardenOptionsLabel);
    $(seasonalGardenOptions).css({
        'float': 'left',
        'width': '13%',
    })
    $(seasonalGardenOptionsLabel).css({
        'float': 'left',
        'width': '100%',
        'font-weight': 700,
        "marginRight": "5px"
    })
    var seasonalGardenFallCb = document.createElement('input');
    seasonalGardenFallCb.type = "checkbox";
    seasonalGardenFallCb.name = "seasonalGardenFallCb";
    seasonalGardenFallCb.value = "value";
    seasonalGardenFallCb.id = "seasonalGardenFallCb";
    if (remindGarden.search("F") >= 0) {
        seasonalGardenFallCb.checked = "Yes";
    } else {
        seasonalGardenFallCb.checked = "";
    }
    var seasonalGardenFallCbLabel = document.createElement('label')
    seasonalGardenFallCbLabel.htmlFor = "seasonalGardenFallCbLabel";
    seasonalGardenFallCbLabel.appendChild(document.createTextNode('Fall'));
    $(seasonalGardenFallCbLabel).css({
        'float': 'left',
        'width': '40px',
        'padding': '1px',
    })
    $(seasonalGardenFallCb).css({
        'float': 'left',
        'width': '20px',
        "marginRight": "25px"
    })
    seasonalGardenOptions.appendChild(seasonalGardenFallCbLabel);
    seasonalGardenOptions.appendChild(seasonalGardenFallCb);
    //
    var seasonalGardenWinterCb = document.createElement('input');
    seasonalGardenWinterCb.type = "checkbox";
    seasonalGardenWinterCb.name = "seasonalGardenWinterCb";
    seasonalGardenWinterCb.value = "value";
    seasonalGardenWinterCb.id = "seasonalGardenWinterCb";
    if (remindGarden.search("W") >= 0) {
        seasonalGardenWinterCb.checked = "Yes";
    } else {
        seasonalGardenWinterCb.checked = "";
    }
    var seasonalGardenWinterCbLabel = document.createElement('label')
    seasonalGardenWinterCbLabel.htmlFor = "seasonalGardenWinterCbLabel";
    seasonalGardenWinterCbLabel.appendChild(document.createTextNode('Winter'));
    $(seasonalGardenWinterCbLabel).css({
        'float': 'left',
        'width': '40px',
        'padding': '1px'
    })
    $(seasonalGardenWinterCb).css({
        'float': 'left',
        'width': '20px',
        "marginRight": "25px"
    })
    seasonalGardenOptions.appendChild(seasonalGardenWinterCbLabel);
    seasonalGardenOptions.appendChild(seasonalGardenWinterCb);
    //
    var seasonalGardenSpringCb = document.createElement('input');
    seasonalGardenSpringCb.type = "checkbox";
    seasonalGardenSpringCb.name = "seasonalGardenSpringCb";
    seasonalGardenSpringCb.value = "value";
    seasonalGardenSpringCb.id = "seasonalGardenSpringCb";
    if (remindGarden.search("S") >= 0) {
        seasonalGardenSpringCb.checked = "Yes";
    } else {
        seasonalGardenSpringCb.checked = "";
    }
    var seasonalGardenSpringCbLabel = document.createElement('label')
    seasonalGardenSpringCbLabel.htmlFor = "seasonalGardenSpringCbLabel";
    seasonalGardenSpringCbLabel.appendChild(document.createTextNode('Spring'));
    $(seasonalGardenSpringCbLabel).css({
        'float': 'left',
        'width': '40px',
        'padding': '1px'
    })
    $(seasonalGardenSpringCb).css({
        'float': 'left',
        'width': '20px',
        "marginRight": "25px"
    })
    seasonalGardenOptions.appendChild(seasonalGardenSpringCbLabel);
    seasonalGardenOptions.appendChild(seasonalGardenSpringCb);
    //
    var seasonalGardenSummerCb = document.createElement('input');
    seasonalGardenSummerCb.type = "checkbox";
    seasonalGardenSummerCb.name = "seasonalGardenSummerCb";
    seasonalGardenSummerCb.value = "value";
    seasonalGardenSummerCb.id = "seasonalGardenSummerCb";
    if (remindGarden.search("R") >= 0) {
        seasonalGardenSummerCb.checked = "Yes";
    } else {
        seasonalGardenSummerCb.checked = "";
    }
    var seasonalGardenSummerCbLabel = document.createElement('label')
    seasonalGardenSummerCbLabel.htmlFor = "seasonalGardenSummerCbLabel";
    seasonalGardenSummerCbLabel.appendChild(document.createTextNode('Summer'));
    $(seasonalGardenSummerCbLabel).css({
        'float': 'left',
        'width': '40px',
        'padding': '1px'
    })
    $(seasonalGardenSummerCb).css({
        'float': 'left',
        'width': '20px',
        "marginRight": "25px"
    })
    seasonalGardenOptions.appendChild(seasonalGardenSummerCbLabel);
    seasonalGardenOptions.appendChild(seasonalGardenSummerCb);
    //TS Options
    const remindSpill = localStorage.getItem('RemindSpill');
    var toxicSpillOptions = document.createElement("div");
    toxicSpillOptions.classList.add("toxicSpillOptions");
    var toxicSpillOptionsLabel = document.createElement("div");
    toxicSpillOptionsLabel.classList.add("toxicSpillOptionsLabel");
    var toxicSpillOptionsLabelText = document.createTextNode("Toxic Spill");
    toxicSpillOptionsLabel.appendChild(toxicSpillOptionsLabelText);
    toxicSpillOptions.appendChild(toxicSpillOptionsLabel);
    $(toxicSpillOptions).css({
        'float': 'left',
        'width': '18%',
        'marginLeft': '10px',
    })
    $(toxicSpillOptionsLabel).css({
        'float': 'left',
        'width': '100%',
        'font-weight': 700,
    })
    var toxicSpillHeroCb = document.createElement('input');
    toxicSpillHeroCb.type = "checkbox";
    toxicSpillHeroCb.name = "toxicSpillHeroCb";
    toxicSpillHeroCb.value = "value";
    toxicSpillHeroCb.id = "toxicSpillHeroCb";
    if (remindSpill.search("H") >= 0) {
        toxicSpillHeroCb.checked = "Yes";
    } else {
        toxicSpillHeroCb.checked = "";
    }
    var toxicSpillHeroCbLabel = document.createElement('label')
    toxicSpillHeroCbLabel.htmlFor = "toxicSpillHeroCbLabel";
    toxicSpillHeroCbLabel.appendChild(document.createTextNode('Hero'));
    $(toxicSpillHeroCbLabel).css({
        'float': 'left',
        'width': '35px',
        'padding': '1px',
    })
    $(toxicSpillHeroCb).css({
        'float': 'left',
        'width': '20px',
        "marginRight": "5px"
    })
    toxicSpillOptions.appendChild(toxicSpillHeroCbLabel);
    toxicSpillOptions.appendChild(toxicSpillHeroCb);
    //
    var toxicSpillKnightCb = document.createElement('input');
    toxicSpillKnightCb.type = "checkbox";
    toxicSpillKnightCb.name = "toxicSpillKnightCb";
    toxicSpillKnightCb.value = "value";
    toxicSpillKnightCb.id = "toxicSpillKnightCb";
    if (remindSpill.search("K") >= 0) {
        toxicSpillKnightCb.checked = "Yes";
    } else {
        toxicSpillKnightCb.checked = "";
    }
    var toxicSpillKnightCbLabel = document.createElement('label')
    toxicSpillKnightCbLabel.htmlFor = "toxicSpillKnightCbLabel";
    toxicSpillKnightCbLabel.appendChild(document.createTextNode('Knight'));
    $(toxicSpillKnightCbLabel).css({
        'float': 'left',
        'width': '35px',
        'padding': '1px',
    })
    $(toxicSpillKnightCb).css({
        'float': 'left',
        'width': '20px',
        "marginRight": "5px"
    })
    toxicSpillOptions.appendChild(toxicSpillKnightCbLabel);
    toxicSpillOptions.appendChild(toxicSpillKnightCb);
    //
    var toxicSpillLordCb = document.createElement('input');
    toxicSpillLordCb.type = "checkbox";
    toxicSpillLordCb.name = "toxicSpillLordCb";
    toxicSpillLordCb.value = "value";
    toxicSpillLordCb.id = "toxicSpillLordCb";
    if (remindSpill.search("L") >= 0) {
        toxicSpillLordCb.checked = "Yes";
    } else {
        toxicSpillLordCb.checked = "";
    }
    var toxicSpillLordCbLabel = document.createElement('label')
    toxicSpillLordCbLabel.htmlFor = "toxicSpillLordCbLabel";
    toxicSpillLordCbLabel.appendChild(document.createTextNode('Lord'));
    $(toxicSpillLordCbLabel).css({
        'float': 'left',
        'width': '35px',
        'padding': '1px',
    })
    $(toxicSpillLordCb).css({
        'float': 'left',
        'width': '20px',
        "marginRight": "5px"
    })
    toxicSpillOptions.appendChild(toxicSpillLordCbLabel);
    toxicSpillOptions.appendChild(toxicSpillLordCb);
    //
    var toxicSpillBaronCb = document.createElement('input');
    toxicSpillBaronCb.type = "checkbox";
    toxicSpillBaronCb.name = "toxicSpillBaronCb";
    toxicSpillBaronCb.value = "value";
    toxicSpillBaronCb.id = "toxicSpillBaronCb";
    if (remindSpill.search("B") >= 0) {
        toxicSpillBaronCb.checked = "Yes";
    } else {
        toxicSpillBaronCb.checked = "";
    }
    var toxicSpillBaronCbLabel = document.createElement('label')
    toxicSpillBaronCbLabel.htmlFor = "toxicSpillBaronCbLabel";
    toxicSpillBaronCbLabel.appendChild(document.createTextNode('Baron'));
    $(toxicSpillBaronCbLabel).css({
        'float': 'left',
        'width': '35px',
        'padding': '1px',
    })
    $(toxicSpillBaronCb).css({
        'float': 'left',
        'width': '20px',
        "marginRight": "5px"
    })
    toxicSpillOptions.appendChild(toxicSpillBaronCbLabel);
    toxicSpillOptions.appendChild(toxicSpillBaronCb);
    //
    var toxicSpillCountCb = document.createElement('input');
    toxicSpillCountCb.type = "checkbox";
    toxicSpillCountCb.name = "toxicSpillCountCb";
    toxicSpillCountCb.value = "value";
    toxicSpillCountCb.id = "toxicSpillCountCb";
    if (remindSpill.search("C") >= 0) {
        toxicSpillCountCb.checked = "Yes";
    } else {
        toxicSpillCountCb.checked = "";
    }
    var toxicSpillCountCbLabel = document.createElement('label')
    toxicSpillCountCbLabel.htmlFor = "toxicSpillCountCbLabel";
    toxicSpillCountCbLabel.appendChild(document.createTextNode('Count'));
    $(toxicSpillCountCbLabel).css({
        'float': 'left',
        'width': '35px',
        'padding': '1px',
    })
    $(toxicSpillCountCb).css({
        'float': 'left',
        'width': '20px',
        "marginRight": "5px"
    })
    toxicSpillOptions.appendChild(toxicSpillCountCbLabel);
    toxicSpillOptions.appendChild(toxicSpillCountCb);
    //
    var toxicSpillDukeCb = document.createElement('input');
    toxicSpillDukeCb.type = "checkbox";
    toxicSpillDukeCb.name = "toxicSpillDukeCb";
    toxicSpillDukeCb.value = "value";
    toxicSpillDukeCb.id = "toxicSpillDukeCb";
    if (remindSpill.search("D") >= 0) {
        toxicSpillDukeCb.checked = "Yes";
    } else {
        toxicSpillDukeCb.checked = "";
    }
    var toxicSpillDukeCbLabel = document.createElement('label')
    toxicSpillDukeCbLabel.htmlFor = "toxicSpillDukeCbLabel";
    toxicSpillDukeCbLabel.appendChild(document.createTextNode('Duke'));
    $(toxicSpillDukeCbLabel).css({
        'float': 'left',
        'width': '35px',
        'padding': '1px',
    })
    $(toxicSpillDukeCb).css({
        'float': 'left',
        'width': '20px',
        "marginRight": "5px"
    })
    toxicSpillOptions.appendChild(toxicSpillDukeCbLabel);
    toxicSpillOptions.appendChild(toxicSpillDukeCb);
    //
    var toxicSpillGrandDukeCb = document.createElement('input');
    toxicSpillGrandDukeCb.type = "checkbox";
    toxicSpillGrandDukeCb.name = "toxicSpillGrandDukeCb";
    toxicSpillGrandDukeCb.value = "value";
    toxicSpillGrandDukeCb.id = "toxicSpillGrandDukeCb";
    if (remindSpill.search("G") >= 0) {
        toxicSpillGrandDukeCb.checked = "Yes";
    } else {
        toxicSpillGrandDukeCb.checked = "";
    }
    var toxicSpillGrandDukeCbLabel = document.createElement('label')
    toxicSpillGrandDukeCbLabel.htmlFor = "toxicSpillGrandDukeCbLabel";
    toxicSpillGrandDukeCbLabel.appendChild(document.createTextNode('GDuke'));
    $(toxicSpillGrandDukeCbLabel).css({
        'float': 'left',
        'width': '35px',
        'padding': '1px',
    })
    $(toxicSpillGrandDukeCb).css({
        'float': 'left',
        'width': '20px',
        "marginRight": "5px"
    })
    toxicSpillOptions.appendChild(toxicSpillGrandDukeCbLabel);
    toxicSpillOptions.appendChild(toxicSpillGrandDukeCb);
    //
    var toxicSpillArchdukeCb = document.createElement('input');
    toxicSpillArchdukeCb.type = "checkbox";
    toxicSpillArchdukeCb.name = "toxicSpillArchdukeCb";
    toxicSpillArchdukeCb.value = "value";
    toxicSpillArchdukeCb.id = "toxicSpillArchdukeCb";
    if (remindSpill.search("A") >= 0) {
        toxicSpillArchdukeCb.checked = "Yes";
    } else {
        toxicSpillArchdukeCb.checked = "";
    }
    var toxicSpillArchdukeCbLabel = document.createElement('label')
    toxicSpillArchdukeCbLabel.htmlFor = "toxicSpillArchdukeCbLabel";
    toxicSpillArchdukeCbLabel.appendChild(document.createTextNode('ADuke'));
    $(toxicSpillArchdukeCbLabel).css({
        'float': 'left',
        'width': '35px',
        'padding': '1px',
    })
    $(toxicSpillArchdukeCb).css({
        'float': 'left',
        'width': '20px',
        "marginRight": "5px"
    })
    toxicSpillOptions.appendChild(toxicSpillArchdukeCbLabel);
    toxicSpillOptions.appendChild(toxicSpillArchdukeCb);
    //
    //Timer Options
    var timerOptions = document.createElement("div");
    timerOptions.classList.add("timerOptions");
    var timerOptionsLabel = document.createElement("div");
    timerOptionsLabel.classList.add("timerOptionsLabel");
    var timerOptionsLabelText = document.createTextNode("Timer Options");
    timerOptionsLabel.appendChild(timerOptionsLabelText);
    timerOptions.appendChild(timerOptionsLabel);
    $(timerOptions).css({
        'float': 'left',
        'width': '40%',
        'marginLeft': '25px',
    })
    $(timerOptionsLabel).css({
        'float': 'left',
        'width': '100%',
        'font-weight': 700,
        "marginRight": "5px",
    })
    var timerOptionsUpdate = document.createElement("div");
    timerOptionsUpdate.classList.add("timerOptionsUpdate");
    var timerOptionsUpdateLabel = document.createElement("div");
    timerOptionsUpdateLabel.classList.add("timerOptionsUpdateLabel");
    var timerOptionsUpdateLabelText = document.createTextNode('Update Interval (min)');
    $(timerOptionsUpdate).css({
        'float': 'left',
        'width': '100%',
        'vertical-align': 'middle',
        'margin-bottom': '3px'
    })
    $(timerOptionsUpdateLabel).css({
        'float': 'left',
        'width': '40%',
        'vertical-align': 'middle',
    })
    timerOptionsUpdateLabel.appendChild(timerOptionsUpdateLabelText);
    timerOptionsUpdate.appendChild(timerOptionsUpdateLabel)
    //Timer  Interval
    var updateInterval = localStorage.getItem('UpdateInterval');
    var timerOptionsUpdateRadioA = document.createElement('input');
    timerOptionsUpdateRadioA.type = "radio";
    timerOptionsUpdateRadioA.name = "timerOptionsUpdateRadioA";
    timerOptionsUpdateRadioA.value = "value";
    timerOptionsUpdateRadioA.id = "timerOptionsUpdateRadioA";
    if (updateInterval == 1) {
        timerOptionsUpdateRadioA.checked = true;
    }
    var timerOptionsUpdateRadioALabel = document.createElement('label')
    timerOptionsUpdateRadioALabel.htmlFor = "timerOptionsUpdateRadioLabel";
    timerOptionsUpdateRadioALabel.appendChild(document.createTextNode('1'));
    $(timerOptionsUpdateRadioALabel).css({
        'float': 'left',
        'width': '10px',
        'vertical-align': 'middle'
    })
    $(timerOptionsUpdateRadioA).css({
        'float': 'left',
        'width': '15px',
        'vertical-align': 'middle'
    })
    timerOptionsUpdate.appendChild(timerOptionsUpdateRadioA);
    timerOptionsUpdate.appendChild(timerOptionsUpdateRadioALabel);
    //
    var timerOptionsUpdateRadioB = document.createElement('input');
    timerOptionsUpdateRadioB.type = "radio";
    timerOptionsUpdateRadioB.name = "timerOptionsUpdateRadioB";
    timerOptionsUpdateRadioB.value = "value";
    timerOptionsUpdateRadioB.id = "timerOptionsUpdateRadioB";
    if ((updateInterval == null) || (updateInterval == 5)) {
        timerOptionsUpdateRadioB.checked = true;
    }
    var timerOptionsUpdateRadioBLabel = document.createElement('label')
    timerOptionsUpdateRadioBLabel.htmlFor = "timerOptionsUpdateRadioBLabel";
    timerOptionsUpdateRadioBLabel.appendChild(document.createTextNode('5'));
    $(timerOptionsUpdateRadioBLabel).css({
        'float': 'left',
        'width': '10px',
        'vertical-align': 'middle'
    })
    $(timerOptionsUpdateRadioB).css({
        'float': 'left',
        'width': '15px',
        'vertical-align': 'middle'
    })
    timerOptionsUpdate.appendChild(timerOptionsUpdateRadioB);
    timerOptionsUpdate.appendChild(timerOptionsUpdateRadioBLabel);
    //
    var timerOptionsUpdateRadioC = document.createElement('input');
    timerOptionsUpdateRadioC.type = "radio";
    timerOptionsUpdateRadioC.name = "timerOptionsUpdateRadioC";
    timerOptionsUpdateRadioC.value = "value";
    timerOptionsUpdateRadioC.id = "timerOptionsUpdateRadioC";
    if (updateInterval == 15) {
        timerOptionsUpdateRadioC.checked = true;
    }
    var timerOptionsUpdateRadioCLabel = document.createElement('label')
    timerOptionsUpdateRadioCLabel.htmlFor = "timerOptionsUpdateRadioCLabel";
    timerOptionsUpdateRadioCLabel.appendChild(document.createTextNode('15'));
    $(timerOptionsUpdateRadioCLabel).css({
        'float': 'left',
        'width': '10px',
        'vertical-align': 'middle'
    })
    $(timerOptionsUpdateRadioC).css({
        'float': 'left',
        'width': '15px',
        'vertical-align': 'middle'
    })
    timerOptionsUpdate.appendChild(timerOptionsUpdateRadioC);
    timerOptionsUpdate.appendChild(timerOptionsUpdateRadioCLabel);
    timerOptions.appendChild(timerOptionsUpdate);
    //Reminder Window
    var remindInterval = localStorage.getItem('RemindInterval');
    var timerOptionsWindow = document.createElement("div");
    timerOptionsWindow.classList.add("timerOptionsWindow");
    var timerOptionsWindowLabel = document.createElement("div");
    timerOptionsWindowLabel.classList.add("timerOptionsWindowLabel");
    var timerOptionsWindowLabelText = document.createTextNode('Remind Me Within (min)');
    $(timerOptionsWindow).css({
        'float': 'left',
        'width': '100%',
        'vertical-align': 'middle',
        'margin-bottom': '3px'
    })
    $(timerOptionsWindowLabel).css({
        'float': 'left',
        'width': '40%',
        'vertical-align': 'middle'
    })
    timerOptionsWindowLabel.appendChild(timerOptionsWindowLabelText);
    timerOptionsWindow.appendChild(timerOptionsWindowLabel);
    var timerOptionsWindowRadioA = document.createElement('input');
    timerOptionsWindowRadioA.type = "radio";
    timerOptionsWindowRadioA.name = "timerOptionsWindowRadioA";
    timerOptionsWindowRadioA.value = "value";
    timerOptionsWindowRadioA.id = "timerOptionsWindowRadioA";
    if (remindInterval == 5) {
        timerOptionsWindowRadioA.checked = true;
    }
    var timerOptionsWindowRadioALabel = document.createElement('label')
    timerOptionsWindowRadioALabel.htmlFor = "timerOptionsWindowRadioALabel";
    timerOptionsWindowRadioALabel.appendChild(document.createTextNode('5'));
    $(timerOptionsWindowRadioALabel).css({
        'float': 'left',
        'width': '10px',
        'vertical-align': 'middle'
    })
    $(timerOptionsWindowRadioA).css({
        'float': 'left',
        'width': '15px',
        'vertical-align': 'middle'
    })
    timerOptionsWindow.appendChild(timerOptionsWindowRadioA);
    timerOptionsWindow.appendChild(timerOptionsWindowRadioALabel);
    //
    var timerOptionsWindowRadioB = document.createElement('input');
    timerOptionsWindowRadioB.type = "radio";
    timerOptionsWindowRadioB.name = "timerOptionsWindowRadioB";
    timerOptionsWindowRadioB.value = "value";
    timerOptionsWindowRadioB.id = "timerOptionsWindowRadioB";
    if ((remindInterval == null) || (remindInterval == 10)) {
        timerOptionsWindowRadioB.checked = true;
    }
    var timerOptionsWindowRadioBLabel = document.createElement('label')
    timerOptionsWindowRadioBLabel.htmlFor = "timerOptionsWindowRadioBLabel";
    timerOptionsWindowRadioBLabel.appendChild(document.createTextNode('10'));
    $(timerOptionsWindowRadioBLabel).css({
        'float': 'left',
        'width': '10px',
        'vertical-align': 'middle'
    })
    $(timerOptionsWindowRadioB).css({
        'float': 'left',
        'width': '15px',
        'vertical-align': 'middle'
    })
    timerOptionsWindow.appendChild(timerOptionsWindowRadioB);
    timerOptionsWindow.appendChild(timerOptionsWindowRadioBLabel);
    //
    var timerOptionsWindowRadioC = document.createElement('input');
    timerOptionsWindowRadioC.type = "radio";
    timerOptionsWindowRadioC.name = "timerOptionsWindowRadioC";
    timerOptionsWindowRadioC.value = "value";
    timerOptionsWindowRadioC.id = "timerOptionsWindowRadioC";
    if (remindInterval == 15) {
        timerOptionsWindowRadioC.checked = true;
    }
    var timerOptionsWindowRadioCLabel = document.createElement('label')
    timerOptionsWindowRadioCLabel.htmlFor = "timerOptionsWindowRadioCLabel";
    timerOptionsWindowRadioCLabel.appendChild(document.createTextNode('15'));
    $(timerOptionsWindowRadioCLabel).css({
        'float': 'left',
        'width': '10px',
        'vertical-align': 'middle'
    })
    $(timerOptionsWindowRadioC).css({
        'float': 'left',
        'width': '15px',
        'vertical-align': 'middle'
    })
    timerOptionsWindow.appendChild(timerOptionsWindowRadioC);
    timerOptionsWindow.appendChild(timerOptionsWindowRadioCLabel);
    timerOptions.appendChild(timerOptionsWindow);
    //Other Options
    const killSwitch = localStorage.getItem('KillSwitch')
    var killSwitchCB = document.createElement('input');
    killSwitchCB.type = "checkbox";
    killSwitchCB.name = "killSwitchCB";
    killSwitchCB.value = "value";
    killSwitchCB.id = "killSwitchCB";
    if (killSwitch == "Y") {
        killSwitchCB.checked = "Yes";
    } else {
        killSwitchCB.checked = "";
    }
    var killSwitchCBLabel = document.createElement('label')
    killSwitchCBLabel.htmlFor = "killSwitchCBLabel";
    killSwitchCBLabel.appendChild(document.createTextNode('Remind Me Only Once'));
    $(killSwitchCBLabel).css({
        'float': 'left',
        'width': '118px',
        'padding': '1px',
    })
    $(killSwitchCB).css({
        'float': 'left',
        'width': '20px',
        "marginRight": "100px"
    })
    timerOptions.appendChild(killSwitchCBLabel);
    timerOptions.appendChild(killSwitchCB);
    //
    const disarm = localStorage.getItem('DAT')
    var disarmCB = document.createElement('input');
    disarmCB.type = "checkbox";
    disarmCB.name = "disarmCB";
    disarmCB.value = "value";
    disarmCB.id = "disarmCB";
    if (disarm == "Y") {
        disarmCB.checked = "Yes";
    } else {
        disarmCB.checked = "";
    }
    var disarmCBLabel = document.createElement('label')
    disarmCBLabel.htmlFor = "disarmCBLabel";
    disarmCBLabel.appendChild(document.createTextNode('Disarm Bait After Travel'));
    $(disarmCBLabel).css({
        'float': 'left',
        'width': '118px',
        'padding': '1px',
    })
    $(disarmCB).css({
        'float': 'left',
        'width': '20px',
        "marginRight": "5px"
    })
    timerOptions.appendChild(disarmCBLabel);
    timerOptions.appendChild(disarmCB);
    //Panic Button
    var panicButton = document.createElement("button");
    panicButton.id = "panicButton";
    panicButton.innerText = "Travel Back";
    panicButton.addEventListener("click", travelBack);
    timerOptions.appendChild(panicButton);
    $(panicButton).css({
        'width': '100px',
        'float': 'left',
        'marginRight': 5 + "px",
        'marginLeft': 35 + "px"
    })
    //
    tinkerPanel.appendChild(forbiddenGroveOptions);
    tinkerPanel.appendChild(balacksCoveOptions);
    tinkerPanel.appendChild(seasonalGardenOptions);
    tinkerPanel.appendChild(toxicSpillOptions);
    tinkerPanel.appendChild(timerOptions);
    //Last
    timerBox.prepend(tinkerPanel)
}
$(document).on('click', '#timerOptionsUpdateRadioA', function() {
    $('#timerOptionsUpdateRadioB').prop("checked", false);
    $('#timerOptionsUpdateRadioC').prop("checked", false);
    localStorage.setItem('UpdateInterval', 1)
})
$(document).on('click', '#timerOptionsUpdateRadioB', function() {
    $('#timerOptionsUpdateRadioA').prop("checked", false);
    $('#timerOptionsUpdateRadioC').prop("checked", false);
    localStorage.setItem('UpdateInterval', 5)
})
$(document).on('click', '#timerOptionsUpdateRadioC', function() {
    $('#timerOptionsUpdateRadioA').prop("checked", false);
    $('#timerOptionsUpdateRadioB').prop("checked", false);
    localStorage.setItem('UpdateInterval', 15)
})
$(document).on('click', '#timerOptionsWindowRadioA', function() {
    $('#timerOptionsWindowRadioB').prop("checked", false);
    $('#timerOptionsWindowRadioC').prop("checked", false);
    localStorage.setItem('RemindInterval', 5)
})
$(document).on('click', '#timerOptionsWindowRadioB', function() {
    $('#timerOptionsWindowRadioA').prop("checked", false);
    $('#timerOptionsWindowRadioC').prop("checked", false);
    localStorage.setItem('RemindInterval', 10)
})
$(document).on('click', '#timerOptionsWindowRadioC', function() {
    $('#timerOptionsWindowRadioA').prop("checked", false);
    $('#timerOptionsWindowRadioB').prop("checked", false);
    localStorage.setItem('RemindInterval', 15)
})
$(document).on('change', '#killSwitchCB', function() {
    if (this.checked) {
        this.checked = "Yes";
        localStorage.setItem('KillSwitch', 'Y')
    } else {
        this.checked = "";
        localStorage.setItem('KillSwitch', 'N')
    }
})
$(document).on('change', '#disarmCB', function() {
    if (this.checked) {
        this.checked = "Yes";
        localStorage.setItem('DAT', 'Y')
    } else {
        this.checked = "";
        localStorage.setItem('DAT', 'N')
    }
})


//===================================== Timers ======================================
//
//
//===================================================================================
function startTimers() {
    localStorage.setItem("mainTimer", 0);
    runTimers();
}

function runTimers() {
    updateText();
    var myTimer = "";
    const updateInterval = parseInt(localStorage.getItem('UpdateInterval'), 10)
    if (updateInterval == null) {
        myTimer = setInterval(updateText, 60000);
    } else {
        myTimer = setInterval(updateText, updateInterval * 60000);
    }
}

function updateText() {
    if ($(".forbiddenGrove").length > 0) updateForbiddenGroveTimer();
    if ($(".balacksCove").length > 0) updateBalacksCoveTimer();
    if ($(".seasonalGarden").length > 0) updateSeasonalGardenTimer();
    if ($(".toxicSpill").length > 0) updateToxicSpillTimer();
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
        'height': '70%',
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
    const remind = localStorage.getItem('RemindGrove');
    const remindInterval = parseInt(localStorage.getItem('RemindInterval'), 10);
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
        $(".forbiddenGroveHeaderValue").css({
            'color': 'green'
        })
        var timeCloses = (16 - partialrotation).toPrecision(4);
        var closesHours = Math.trunc(timeCloses);
        var closesMinutes = Math.ceil((timeCloses - closesHours) * 60);
        $(".forbiddenGroveClosesValue").text(formatOutput(0, closesHours, closesMinutes));
        $(".forbiddenGroveClosesValue").css({
                'float': 'right'
            }),
            $(".forbiddenGroveOpensLabel").text("Opens Again in:");
        $(".forbiddenGroveOpensValue").text(formatOutput(0, (closesHours + 4), closesMinutes));
        $(".forbiddenGroveOpensValue").css({
                'float': 'right'
            }),
            forbiddenGrove.append($(".forbiddenGroveOpens"))
        if ((closesHours == 0) && (closesMinutes <= remindInterval) && (remind.search('C') >= 0) && (remind.search('N') < 0)) {
            if (confirm('The forbidden grove is closing soon, travel there now?') == true) {
                travelToGrove("skip");
            }
            if (localStorage.getItem('KillSwitch') == 'Y') {
                $("#forbiddenGroveCb").click();
            }
        }
    } else {
        //Closed
        $(".forbiddenGroveHeaderValue").text("CLOSED")
        $(".forbiddenGroveHeaderValue").css({
            'color': 'red'
        })
        var timeOpens = (rotaionLenght - partialrotation).toPrecision(4);
        var opensHours = Math.trunc(timeOpens);
        var opensMinutes = Math.ceil((timeOpens - opensHours) * 60);
        $(".forbiddenGroveOpensValue").text(formatOutput(0, opensHours, opensMinutes));
        $(".forbiddenGroveOpensValue").css({
                'float': 'right'
            }),
            $(".forbiddenGroveClosesLabel").text("Next Close in:");
        $(".forbiddenGroveClosesValue").text(formatOutput(0, (opensHours + 16), opensMinutes));
        $(".forbiddenGroveClosesValue").css({
                'float': 'right'
            }),
            forbiddenGrove.append($(".forbiddenGroveCloses"))
        if ((opensHours == 0) && (opensMinutes <= remindInterval) && (remind.search('O') >= 0) && (remind.search('N') < 0)) {
            alert('The forbidden grove is opening soon')
            if (localStorage.getItem('KillSwitch') == 'Y') {
                $("#forbiddenGroveCb").click();
            }
        }
    }
}
$(document).on('change', '#forbiddenGroveCb', function() {
    if (this.checked) {
        this.checked = "Yes";
    } else {
        this.checked = "";
    }
    remindGrove(this.name, this.checked);
})

$(document).on('change', '#forbiddenGroveOpenCb', function() {
    if (this.checked) {
        this.checked = "Yes";
    } else {
        this.checked = "";
    }
    remindGrove(this.name, this.checked);
})

$(document).on('change', '#forbiddenGroveCloseCb', function() {
    if (this.checked) {
        this.checked = "Yes";
    } else {
        this.checked = "";
    }
    remindGrove(this.name, this.checked);
})

//if master checked and no other - remind all
//if master not checked - no reminder
//if master checked and 1 or more checked - remind the ones checked.
// N none
// O open
// C closed
function remindGrove(cb, checked) {
    var main = $('#forbiddenGroveCb');
    var open = $('#forbiddenGroveOpenCb');
    var closed = $('#forbiddenGroveCloseCb');
    const mName = main.prop("name");
    const oName = open.prop("name");
    const cName = closed.prop("name");;
    const mChecked = main.prop("checked");
    const oChecked = open.prop("checked");
    const cChecked = closed.prop("checked");
    //-----------------------------------------------------------------------
    var remindGrove = localStorage.getItem('RemindGrove')
    var remindNone = remindGrove.search("N");
    var remindOpen = remindGrove.search("O");
    var remindClosed = remindGrove.search("C");
    //main was checked
    if ((cb == mName) && (checked == true)) {
        if ((oChecked == false) && (cChecked == false)) {
            remindGrove = "CO";
        } else if ((oChecked == true) && (cChecked == true)) {
            remindGrove = "CO";
        } else if ((oChecked == true) && (cChecked == false)) {
            remindGrove = remindGrove.replace("N", "");
            if (remindOpen < 0) {
                remindGrove = remindGrove.concat("O");
            }
        } else if ((oChecked == false) && (cChecked == true)) {
            remindGrove = remindGrove.replace("N", "");
            if (remindClosed < 0) {
                remindGrove = remindGrove.concat("C");
            }
        }
        //main was unchecked
    } else if ((cb == mName) && (checked == false)) {
        if ((oChecked == false) && (cChecked == false)) {
            remindGrove = 'N';
        } else if (remindNone < 0) {
            remindGrove = remindGrove.concat("N");
        }
        //open was checked
    } else if ((cb == oName) && (checked == true)) {
        if (mChecked == false) {
            if (remindOpen < 0) {
                remindGrove = remindGrove.concat("O");
            }
        } else if (cChecked == true) {
            remindGrove = remindGrove.replace("N", "");
            if (remindOpen < 0) {
                remindGrove = remindGrove.concat("O");
            }
        } else {
            remindGrove = "O";
        }
        //open was unchecked
    } else if ((cb == oName) && (checked == false)) {
        if (mChecked == false) {
            if (remindOpen >= 0) {
                remindGrove = remindGrove.replace("O", "");
            }
        } else if (cChecked == true) {
            if (remindOpen >= 0) {
                remindGrove = remindGrove.replace("O", "");
            }
        } else if ((oChecked == false) && (cChecked == false)) {
            remindGrove = "CO";
        }
        //closed was checked
    } else if ((cb == cName) && (checked == true)) {
        if (mChecked == false) {
            if (remindClosed < 0) {
                remindGrove = remindGrove.concat("C");
            }
        } else if (oChecked == true) {
            remindGrove = remindGrove.replace("N", "");
            if (remindClosed < 0) {
                remindGrove = remindGrove.concat("C");
            }
        } else {
            remindGrove = "C";
        }
        //closed was unchecked
    } else if ((cb == cName) && (checked == false)) {
        if (mChecked == false) {
            if (remindClosed >= 0) {
                remindGrove = remindGrove.replace("C", "");
            }
        } else if (oChecked == true) {
            if (remindClosed >= 0) {
                remindGrove = remindGrove.replace("C", "");
            }
        } else if ((oChecked == false) && (cChecked == false)) {
            remindGrove = "CO";
        }
    }
    localStorage.setItem('RemindGrove', remindGrove)
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
        'height': '70%',
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
        'width': '100px',
        'font-weight': 700,
        "marginRight": "5px"
    })
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
        'width': '100px',
        'font-weight': 700,
        "marginRight": "5px"
    })
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
        'width': '100px',
        'font-weight': 700,
        "marginRight": "5px"
    })
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
    const remind = localStorage.getItem('RemindCove');
    const remindInterval = parseInt(localStorage.getItem('RemindInterval'), 10);
    var balacksCove = $(".balacksCove");
    var firstCoveLow = 1294680060;
    var now = todayNow();
    let timePassedHours = (now - firstCoveLow) / 3600;
    var rotaionLenght = 18.6666666666666666666666666666666666666667;
    var rotationsExact = timePassedHours / rotaionLenght;
    var rotationsInteger = Math.trunc(rotationsExact);
    var partialrotation = (rotationsExact - rotationsInteger) * rotaionLenght;
    if (partialrotation < 16) {
        //Low
        $(".balacksCoveHeaderValue").text("LOW");
        $(".balacksCoveHeaderValue").css({
            'color': 'green'
        })
        var timeMid = (16 - partialrotation).toPrecision(4);
        var midHours = Math.trunc(timeMid);
        var midMinutes = Math.ceil((timeMid - midHours) * 60);
        $(".balacksCoveMidValue").text(formatOutput(0, midHours, midMinutes));
        $(".balacksCoveMidLabel").text("Mid-Flooding in:")
        $(".balacksCoveHighValue").text(formatOutput(0, (midHours + 1), midMinutes));
        $(".balacksCoveLowLabel").text("Low Again in:");
        $(".balacksCoveMidValue").css({
            'float': 'right'
        })
        $(".balacksCoveHighValue").css({
            'float': 'right'
        })
        $(".balacksCoveLowValue").css({
            'float': 'right'
        })
        var lowHours = midHours + 2;
        var lowMinutes = midMinutes + 40;
        if (lowMinutes >= 60) {
            lowMinutes = lowMinutes - 60;
            lowHours++;
        }
        $(".balacksCoveLowValue").text(formatOutput(0, lowHours, lowMinutes));
        balacksCove.append($(".balacksCoveLow"))
        if ((midHours == 0) && (midMinutes <= remindInterval) && (remind.search('M') >= 0) && (remind.search('N') < 0)) {
            if (confirm('It will be mid tide soon, travel there now?') == true) {
                travelToCove("skip");
            }
            if (localStorage.getItem('KillSwitch') == 'Y') {
                $("#balacksCoveCb").click();
            }
        }
    } else if ((partialrotation >= 16) && (partialrotation < 17)) {
        //Mid (flooding)
        $(".balacksCoveHeaderValue").text("MID-Flooding");
        $(".balacksCoveHeaderValue").css({
            'color': 'orange'
        })
        var timeHigh = (17 - partialrotation).toPrecision(4);
        var highHours = Math.trunc(timeHigh);
        var highMinutes = Math.ceil((timeHigh - highHours) * 60);
        $(".balacksCoveHighValue").text(formatOutput(0, highHours, highMinutes));
        $(".balacksCoveMidLabel").text("Mid-Ebbing in:")
        var midHours = highHours;
        var midMinutes = highMinutes + 40;
        if (midMinutes >= 60) {
            midMinutes = midMinutes - 60;
            midHours++;
        }
        $(".balacksCoveMidValue").text(formatOutput(0, midHours, midMinutes));
        $(".balacksCoveLowLabel").text("Low Tide in:");
        $(".balacksCoveLowValue").text(formatOutput(0, (midHours + 1), midMinutes));
        $(".balacksCoveMidValue").css({
            'float': 'right'
        })
        $(".balacksCoveHighValue").css({
            'float': 'right'
        })
        $(".balacksCoveLowValue").css({
            'float': 'right'
        })
        balacksCove.append($(".balacksCoveMid"))
        balacksCove.append($(".balacksCoveLow"))
        if ((highHours == 0) && (highMinutes <= remindInterval) && (remind.search('H') >= 0) && (remind.search('N') < 0)) {
            if (confirm('It will be high tide soon, travel there now?') == true) {
                travelToCove("skip");
            }
            if (localStorage.getItem('KillSwitch') == 'Y') {
                $("#balacksCoveCb").click();
            }
        }
    } else if ((partialrotation >= 17) && (partialrotation < 17.6666666667)) {
        //High
        $(".balacksCoveHeaderValue").text("HIGH");
        $(".balacksCoveHeaderValue").css({
            'color': 'red'
        })
        var timeMid = (17.6666666667 - partialrotation).toPrecision(4);
        var midHours = Math.trunc(timeMid);
        var midMinutes = Math.ceil((timeMid - midHours) * 60);
        $(".balacksCoveMidValue").text(formatOutput(0, midHours, midMinutes));
        $(".balacksCoveMidLabel").text("Mid-Ebbing in:")
        $(".balacksCoveLowLabel").text("Low Tide in:")
        $(".balacksCoveLowValue").text(formatOutput(0, (midHours + 1), midMinutes));
        $(".balacksCoveMidValue").css({
            'float': 'right'
        })
        $(".balacksCoveLowValue").css({
            'float': 'right'
        })
        $(".balacksCoveHigh").hide();
        balacksCove.append($(".balacksCoveLow"))
        if ((midHours == 0) && (midMinutes <= remindInterval) && (remind.search('M') >= 0) && (remind.search('N') < 0)) {
            if (confirm('It will be mid tide soon, travel there now?') == true) {
                travelToCove("skip");
            }
            if (localStorage.getItem('KillSwitch') == 'Y') {
                $("#balacksCoveCb").click();
            }
        }
    } else if (partialrotation >= 17.6666666667) {
        //Mid (ebbing)
        $(".balacksCoveHeaderValue").text("MID-Ebbing");
        $(".balacksCoveHeaderValue").css({
            'color': 'orange'
        })
        var timeLow = (rotaionLenght - partialrotation).toPrecision(4);
        var lowHours = Math.trunc(timeLow);
        var lowMinutes = Math.ceil((timeLow - lowHours) * 60);
        $(".balacksCoveLowLabel").text("Low Tide in:")
        $(".balacksCoveLowValue").text(formatOutput(0, lowHours, lowMinutes));
        $(".balacksCoveMidLabel").text("Mid-Filling in:")
        $(".balacksCoveMidValue").text(formatOutput(0, lowHours + 16, lowMinutes));
        $(".balacksCoveHighLabel").text("High Tide in:");
        $(".balacksCoveHighValue").text(formatOutput(0, lowHours + 17, lowMinutes));
        $(".balacksCoveMidValue").css({
            'float': 'right'
        })
        $(".balacksCoveHighValue").css({
            'float': 'right'
        })
        $(".balacksCoveLowValue").css({
            'float': 'right'
        })
        balacksCove.append($(".balacksCoveHigh").show())
        if ((lowHours == 0) && (lowMinutes <= remindInterval) && (remind.search('L') >= 0) && (remind.search('N') < 0)) {
            if (confirm('It will be low tide soon, travel there now?') == true) {
                travelToCove("skip");
            }
            if (localStorage.getItem('KillSwitch') == 'Y') {
                $("#balacksCoveCb").click();
            }
        }
    }
}
$(document).on('change', '#balacksCoveCb', function() {
    if (this.checked) {
        this.checked = "Yes";
    } else {
        this.checked = "";
    }
    remindCove(this.name, this.checked);
})

$(document).on('change', '#balacksCoveLowCb', function() {
    if (this.checked) {
        this.checked = "Yes";
    } else {
        this.checked = "";
    }
    remindCove(this.name, this.checked);
})

$(document).on('change', '#balacksCoveMidCb', function() {
    if (this.checked) {
        this.checked = "Yes";
    } else {
        this.checked = "";
    }
    remindCove(this.name, this.checked);
})

$(document).on('change', '#balacksCoveHighCb', function() {
    if (this.checked) {
        this.checked = "Yes";
    } else {
        this.checked = "";
    }
    remindCove(this.name, this.checked);
})
//if master checked and no other - remind all
//if master not checked - no reminder
//if master checked and 1 or more checked - remind the ones checked.
// N none
// L low
// M mid
// H high
function remindCove(cb, checked) {
    var main = $('#balacksCoveCb');
    var low = $('#balacksCoveLowCb');
    var mid = $('#balacksCoveMidCb');
    var high = $('#balacksCoveHighCb');
    const mainName = main.prop("name");
    const lName = low.prop("name");
    const mName = mid.prop("name");
    const hName = high.prop("name");
    const mainChecked = main.prop("checked");
    const lChecked = low.prop("checked");
    const mChecked = mid.prop("checked");
    const hChecked = high.prop("checked");
    var remindCove = localStorage.getItem('RemindCove')
    var remindNone = remindCove.search("N");
    var remindLow = remindCove.search("L");
    var remindMid = remindCove.search("M");
    var remindHigh = remindCove.search("H");
    //main was checked
    if ((cb == mainName) && (checked == true)) {
        if ((lChecked == false) && (mChecked == false) && (hChecked == false)) {
            remindCove = "LMH";
        } else if ((lChecked == true) && (mChecked == true) && (hChecked == true)) {
            remindCove = "LMH";
        } else if ((lChecked == true) && (mChecked == false) && (hChecked == false)) {
            remindCove = remindCove.replace("N", "");
            if (remindLow < 0) {
                remindCove = remindCove.concat("L");
            }
        } else if ((lChecked == false) && (mChecked == true) && (hChecked == false)) {
            remindCove = remindCove.replace("N", "");
            if (remindMid < 0) {
                remindCove = remindCove.concat("M");
            }
        } else if ((lChecked == false) && (mChecked == false) && (hChecked == true)) {
            remindCove = remindCove.replace("N", "");
            if (remindHigh < 0) {
                remindCove = remindCove.concat("H");
            }
        } else if ((lChecked == true) && (mChecked == true) && (hChecked == false)) {
            remindCove = remindCove.replace("N", "");
            if (remindLow < 0) {
                remindCove = remindCove.concat("L");
            }
            if (remindMid < 0) {
                remindCove = remindCove.concat("M");
            }
        } else if ((lChecked == true) && (mChecked == false) && (hChecked == true)) {
            remindCove = remindCove.replace("N", "");
            if (remindLow < 0) {
                remindCove = remindCove.concat("L");
            }
            if (remindHigh < 0) {
                remindCove = remindCove.concat("H");
            }
        } else if ((lChecked == false) && (mChecked == true) && (hChecked == true)) {
            remindCove = remindCove.replace("N", "");
            if (remindMid < 0) {
                remindCove = remindCove.concat("M");
            }
            if (remindHigh < 0) {
                remindCove = remindCove.concat("H");
            }
        }
        //main was unchecked
    } else if ((cb == mainName) && (checked == false)) {
        if ((lChecked == false) && (mChecked == false) && (hChecked == false)) {
            remindCove = 'N';
        } else if (remindNone < 0) {
            remindCove = remindCove.concat("N");
        }
        //low was checked
    } else if ((cb == lName) && (checked == true)) {
        if (mainChecked == false) {
            if (remindLow < 0) {
                remindCove = remindCove.concat("L");
            }
        } else if ((mChecked == true) || (hChecked == true)) {
            remindCove = remindCove.replace("N", "");
            if (remindLow < 0) {
                remindCove = remindCove.concat("L");
            }
        } else {
            remindCove = "L";
        }
        //low was unchecked
    } else if ((cb == lName) && (checked == false)) {
        if (mainChecked == false) {
            if (remindLow >= 0) {
                remindCove = remindCove.replace("L", "");
            }
        } else if ((mChecked == true) || (hChecked == true)) {
            if (remindLow >= 0) {
                remindCove = remindCove.replace("L", "");
            }
        } else if ((mChecked == false) && (hChecked == false)) {
            remindCove = "LMH";
        }
        //mid was checked
    } else if ((cb == mName) && (checked == true)) {
        if (mainChecked == false) {
            if (remindMid < 0) {
                remindCove = remindCove.concat("M");
            }
        } else if ((lChecked == true) || (hChecked == true)) {
            remindCove = remindCove.replace("N", "");
            if (remindMid < 0) {
                remindCove = remindCove.concat("M");
            }
        } else {
            remindCove = "M";
        }
        //mid was unchecked
    } else if ((cb == mName) && (checked == false)) {
        if (mainChecked == false) {
            if (remindMid >= 0) {
                remindCove = remindCove.replace("M", "");
            }
        } else if ((lChecked == true) || (hChecked == true)) {
            if (remindMid >= 0) {
                remindCove = remindCove.replace("M", "");
            }
        } else if ((lChecked == false) && (hChecked == false)) {
            remindCove = "LMH";
        }
        //high was checked
    } else if ((cb == hName) && (checked == true)) {
        if (mainChecked == false) {
            if (remindHigh < 0) {
                remindCove = remindCove.concat("H");
            }
        } else if ((lChecked == true) || (mChecked == true)) {
            remindCove = remindCove.replace("N", "");
            if (remindHigh < 0) {
                remindCove = remindCove.concat("H");
            }
        } else {
            remindCove = "H";
        }
        //high was unchecked
    } else if ((cb == hName) && (checked == false)) {
        if (mainChecked == false) {
            if (remindHigh >= 0) {
                remindCove = remindCove.replace("H", "");
            }
        } else if ((lChecked == true) || (mChecked == true)) {
            if (remindHigh >= 0) {
                remindCove = remindCove.replace("H", "");
            }
        } else if ((lChecked == false) && (mChecked == false)) {
            remindCove = "LMH";
        }
    }
    localStorage.setItem('RemindCove', remindCove)
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
        'height': '70%',
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
        'width': '100px',
        'font-weight': 700,
        "marginRight": "5px"
    })
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
        'width': '100px',
        'font-weight': 700,
        "marginRight": "5px"
    })
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
        'width': '100px',
        'font-weight': 700,
        "marginRight": "5px"
    })
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
        'width': '100px',
        'font-weight': 700,
        "marginRight": "5px"
    })
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
    const remind = localStorage.getItem('RemindGarden');
    const remindInterval = parseInt(localStorage.getItem('RemindInterval'), 10);
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
        $(".seasonalGardenHeaderValue").css({
            'color': 'red'
        })
        var timeFall = (80 - partialrotation).toPrecision(4);
        fallObj.hours = Math.floor(timeFall);
        fallObj.minutes = Math.ceil((timeFall - fallObj.hours) * 60);
        fallObj = convertToDyHrMn(0, fallObj.hours, fallObj.minutes);
        winterObj = convertToDyHrMn(fallObj.days + 3, fallObj.hours + 8, fallObj.minutes);
        springObj = convertToDyHrMn(winterObj.days + 3, winterObj.hours + 8, winterObj.minutes)
        summerObj = convertToDyHrMn(springObj.days + 3, springObj.hours + 8, springObj.minutes);
        $(".seasonalGardenFallLabel").text("Fall in:")
        $(".seasonalGardenWinterLabel").text("Winter in:")
        $(".seasonalGardenSpringLabel").text("Spring in:")
        $(".seasonalGardenSummerLabel").text("Next Summer in:")
        seasonalGarden.append($(".seasonalGardenFall"));
        seasonalGarden.append($(".seasonalGardenWinter"));
        seasonalGarden.append($(".seasonalGardenSpring"));
        seasonalGarden.append($(".seasonalGardenSummer"));
        if ((fallObj.hours == 0) && (fallObj.minutes <= remindInterval) && (remind.search('F') >= 0) && (remind.search('N') < 0)) {
            if (confirm('It will be fall in the garden soon, travel there now?') == true) {
                travelToGarden("skip");
            }
            if (localStorage.getItem('KillSwitch') == 'Y') {
                $("#seasonalGardenCb").click();
            }
        }
    } else if ((partialrotation >= 80) && (partialrotation < 160)) {
        //Fall
        $(".seasonalGardenHeaderValue").text("FALL");
        $(".seasonalGardenHeaderValue").css({
            'color': 'orange'
        })
        var timeWinter = (160 - partialrotation).toPrecision(4);
        winterObj.hours = Math.floor(timeWinter);
        winterObj.minutes = Math.ceil((timeWinter - winterObj.hours) * 60);
        winterObj = convertToDyHrMn(0, winterObj.hours, winterObj.minutes);
        springObj = convertToDyHrMn(winterObj.days + 3, winterObj.hours + 8, winterObj.minutes)
        summerObj = convertToDyHrMn(springObj.days + 3, springObj.hours + 8, springObj.minutes)
        fallObj = convertToDyHrMn(summerObj.days + 3, summerObj.hours + 8, summerObj.minutes);
        $(".seasonalGardenFallLabel").text("Next Fall in:")
        $(".seasonalGardenWinterLabel").text("Winter in:")
        $(".seasonalGardenSpringLabel").text("Spring in:")
        $(".seasonalGardenSummerLabel").text("Summer in:")
        seasonalGarden.append($(".seasonalGardenWinter"));
        seasonalGarden.append($(".seasonalGardenSpring"));
        seasonalGarden.append($(".seasonalGardenSummer"));
        seasonalGarden.append($(".seasonalGardenFall"));
        if ((winterObj.hours == 0) && (winterObj.minutes <= remindInterval) && (remind.search('W') >= 0) && (remind.search('N') < 0)) {
            if (confirm('It will be winter in the garden soon, travel there now?') == true) {
                travelToGarden("skip");
            }
            if (localStorage.getItem('KillSwitch') == 'Y') {
                $("#seasonalGardenCb").click();
            }
        }
    } else if ((partialrotation >= 160) && (partialrotation < 240)) {
        //Winter
        $(".seasonalGardenHeaderValue").text("WINTER");
        $(".seasonalGardenHeaderValue").css({
            'color': 'blue'
        })
        var timeSpring = (240 - partialrotation).toPrecision(4);
        springObj.hours = Math.floor(timeSpring);
        springObj.minutes = Math.ceil((timeSpring - springObj.hours) * 60);
        springObj = convertToDyHrMn(0, springObj.hours, springObj.minutes)
        summerObj = convertToDyHrMn(springObj.days + 3, springObj.hours + 8, springObj.minutes);
        fallObj = convertToDyHrMn(summerObj.days + 3, summerObj.hours + 8, summerObj.minutes);
        winterObj = convertToDyHrMn(fallObj.days + 3, fallObj.hours + 8, fallObj.minutes);
        $(".seasonalGardenFallLabel").text("Fall in:")
        $(".seasonalGardenWinterLabel").text("Next Winter in:")
        $(".seasonalGardenSpringLabel").text("Spring in:")
        $(".seasonalGardenSummerLabel").text("Summer in:")
        seasonalGarden.append($(".seasonalGardenSpring"));
        seasonalGarden.append($(".seasonalGardenSummer"));
        seasonalGarden.append($(".seasonalGardenFall"));
        seasonalGarden.append($(".seasonalGardenWinter"));
        if ((springObj.hours == 0) && (springObj.minutes <= remindInterval) && (remind.search('S') >= 0) && (remind.search('N') < 0)) {
            if (confirm('It will be spring in the garden soon, travel there now?') == true) {
                travelToGarden("skip");
            }
            if (localStorage.getItem('KillSwitch') == 'Y') {
                $("#seasonalGardenCb").click();
            }
        }
    } else {
        //Spring
        $(".seasonalGardenHeaderValue").text("SPRING");
        $(".seasonalGardenHeaderValue").css({
            'color': 'green'
        })
        var timeSummer = (320 - partialrotation).toPrecision(4);
        summerObj.hours = Math.floor(timeSummer);
        summerObj.minutes = Math.ceil((timeSummer - summerObj.hours) * 60);
        summerObj = convertToDyHrMn(0, summerObj.hours, summerObj.minutes)
        fallObj = convertToDyHrMn(summerObj.days + 3, summerObj.hours + 8, summerObj.minutes);
        winterObj = convertToDyHrMn(fallObj.days + 3, fallObj.hours + 8, fallObj.minutes);
        springObj = convertToDyHrMn(winterObj.days + 3, winterObj.hours + 8, winterObj.minutes);
        $(".seasonalGardenFallLabel").text("Fall in:")
        $(".seasonalGardenWinterLabel").text("Winter in:")
        $(".seasonalGardenSpringLabel").text("Next Spring in:")
        $(".seasonalGardenSummerLabel").text("Summer in:")
        seasonalGarden.append($(".seasonalGardenSummer"));
        seasonalGarden.append($(".seasonalGardenFall"));
        seasonalGarden.append($(".seasonalGardenWinter"));
        seasonalGarden.append($(".seasonalGardenSpring"));
        if ((summerObj.hours == 0) && (summerObj.minutes <= remindInterval) && (remind.search('R') >= 0) && (remind.search('N') < 0)) {
            if (confirm('It will be summer in the garden soon, travel there now?') == true) {
                travelToGarden("skip");
            }
            if (localStorage.getItem('KillSwitch') == 'Y') {
                $("#seasonalGardenCb").click();
            }
        }
    }
    $(".seasonalGardenFallValue").text(formatOutput(fallObj.days, fallObj.hours, fallObj.minutes));
    $(".seasonalGardenWinterValue").text(formatOutput(winterObj.days, winterObj.hours, winterObj.minutes));
    $(".seasonalGardenSpringValue").text(formatOutput(springObj.days, springObj.hours, springObj.minutes));
    $(".seasonalGardenSummerValue").text(formatOutput(summerObj.days, summerObj.hours, summerObj.minutes));
    $(".seasonalGardenFallValue").css({
        'float': 'right'
    })
    $(".seasonalGardenWinterValue").css({
        'float': 'right'
    })
    $(".seasonalGardenSpringValue").css({
        'float': 'right'
    })
    $(".seasonalGardenSummerValue").css({
        'float': 'right'
    })
}

function season(days, hours, minutes) {
    this.days = days;
    this.hours = hours;
    this.minutes = minutes;
}
$(document).on('change', '#seasonalGardenCb', function() {
    if (this.checked) {
        this.checked = "Yes";
    } else {
        this.checked = "";
    }
    remindGarden(this.name, this.checked);
})

$(document).on('change', '#seasonalGardenFallCb', function() {
    if (this.checked) {
        this.checked = "Yes";
    } else {
        this.checked = "";
    }
    remindGarden(this.name, this.checked);
})

$(document).on('change', '#seasonalGardenWinterCb', function() {
    if (this.checked) {
        this.checked = "Yes";
    } else {
        this.checked = "";
    }
    remindGarden(this.name, this.checked);
})

$(document).on('change', '#seasonalGardenSpringCb', function() {
    if (this.checked) {
        this.checked = "Yes";
    } else {
        this.checked = "";
    }
    remindGarden(this.name, this.checked);
})
$(document).on('change', '#seasonalGardenSummerCb', function() {
    if (this.checked) {
        this.checked = "Yes";
    } else {
        this.checked = "";
    }
    remindGarden(this.name, this.checked);
})
//if master checked and no other - remind all
//if master not checked - no reminder
//if master checked and 1 or more checked - remind the ones checked.
// N none
// F Fall
// W Winter
// S Spring
// R Summer
function remindGarden(cb, checked) {
    var main = $('#seasonalGardenCb');
    var fall = $('#seasonalGardenFallCb');
    var winter = $('#seasonalGardenWinterCb');
    var spring = $('#seasonalGardenSpringCb');
    var summer = $('#seasonalGardenSummerCb');
    const mainName = main.prop("name");
    const fName = fall.prop("name");
    const wName = winter.prop("name");
    const sName = spring.prop("name");
    const rName = summer.prop("name");
    const mainChecked = main.prop("checked");
    const fChecked = fall.prop("checked");
    const wChecked = winter.prop("checked");
    const sChecked = spring.prop("checked");
    const rChecked = summer.prop("checked");
    var remindGarden = localStorage.getItem('RemindGarden')
    var remindNone = remindGarden.search("N");
    var remindFall = remindGarden.search("F");
    var remindWinter = remindGarden.search("W");
    var remindSpring = remindGarden.search("S");
    var remindSummer = remindGarden.search("R");
    //main was checked
    if ((cb == mainName) && (checked == true)) {
        if ((fChecked == false) && (wChecked == false) && (sChecked == false) && (rChecked == false)) {
            remindGarden = "FWSR";
        } else if ((fChecked == true) && (wChecked == true) && (sChecked == true) && (rChecked == true)) {
            remindGarden = "FWSR";
        } else {
            remindGarden = remindGarden.replace("N", "");
            if ((fChecked == true) && (remindFall < 0)) {
                remindGarden = remindGarden.concat("F");
            }
            if ((wChecked == true) && (remindWinter < 0)) {
                remindGarden = remindGarden.concat("W");
            }
            if ((sChecked == true) && (remindSpring < 0)) {
                remindGarden = remindGarden.concat("S");
            }
            if ((rChecked == true) && (remindSummer < 0)) {
                remindGarden = remindGarden.concat("R");
            }
        }
        //main was unchecked
    } else if ((cb == mainName) && (checked == false)) {
        if ((fChecked == false) && (wChecked == false) && (sChecked == false) && (rChecked == false)) {
            remindGarden = 'N';
        } else if (remindNone < 0) {
            remindGarden = remindGarden.concat("N");
        }
        //fall was checked
    } else if ((cb == fName) && (checked == true)) {
        if (mainChecked == false) {
            if (remindFall < 0) {
                remindGarden = remindGarden.concat("F");
            }
        } else if ((wChecked == true) || (sChecked == true) || (rChecked == true)) {
            remindGarden = remindGarden.replace("N", "");
            if (remindFall < 0) {
                remindGarden = remindGarden.concat("F");
            }
        } else {
            remindGarden = "F";
        }
        //fall was unchecked
    } else if ((cb == fName) && (checked == false)) {
        if (mainChecked == false) {
            if (remindFall >= 0) {
                remindGarden = remindGarden.replace("F", "");
            }
        } else if ((wChecked == false) && (sChecked == false) && (rChecked == false)) {
            remindGarden = "FWSR";
        } else {
            if (remindFall >= 0) {
                remindGarden = remindGarden.replace("F", "");
            }
        }
        //winter was checked
    } else if ((cb == wName) && (checked == true)) {
        if (mainChecked == false) {
            if (remindWinter < 0) {
                remindGarden = remindGarden.concat("W");
            }
        } else if ((fChecked == true) || (sChecked == true) || (rChecked == true)) {
            remindGarden = remindGarden.replace("N", "");
            if (remindWinter < 0) {
                remindGarden = remindGarden.concat("W");
            }
        } else {
            remindGarden = "W";
        }
        //winter was unchecked
    } else if ((cb == wName) && (checked == false)) {
        if (mainChecked == false) {
            if (remindWinter >= 0) {
                remindGarden = remindGarden.replace("W", "");
            }
        } else if ((fChecked == false) && (sChecked == false) && (rChecked == false)) {
            remindGarden = "FWSR";
        } else {
            if (remindWinter >= 0) {
                remindGarden = remindGarden.replace("F", "");
            }
        }
        //spring was checked
    } else if ((cb == sName) && (checked == true)) {
        if (mainChecked == false) {
            if (remindSpring < 0) {
                remindGarden = remindGarden.concat("S");
            }
        } else if ((fChecked == true) || (wChecked == true) || (rChecked == true)) {
            remindGarden = remindGarden.replace("N", "");
            if (remindSpring < 0) {
                remindGarden = remindGarden.concat("S");
            }
        } else {
            remindGarden = "S";
        }
        //Spring was unchecked
    } else if ((cb == sName) && (checked == false)) {
        if (mainChecked == false) {
            if (remindSpring >= 0) {
                remindGarden = remindGarden.replace("S", "");
            }
        } else if ((fChecked == false) && (wChecked == false) && (rChecked == false)) {
            remindGarden = "FWSR";
        } else {
            if (remindSpring >= 0) {
                remindGarden = remindGarden.replace("S", "");
            }
        }
        //summer was checked
    } else if ((cb == rName) && (checked == true)) {
        if (mainChecked == false) {
            if (remindSummer < 0) {
                remindGarden = remindGarden.concat("R");
            }
        } else if ((fChecked == true) || (wChecked == true) || (sChecked == true)) {
            remindGarden = remindGarden.replace("N", "");
            if (remindSpring < 0) {
                remindGarden = remindGarden.concat("R");
            }
        } else {
            remindGarden = "R";
        }
        //summer was unchecked
    } else if ((cb == rName) && (checked == false)) {
        if (mainChecked == false) {
            if (remindSummer >= 0) {
                remindGarden = remindGarden.replace("R", "");
            }
        } else if ((fChecked == false) && (wChecked == false) && (sChecked == false)) {
            remindGarden = "FWSR";
        } else {
            if (remindSummer >= 0) {
                remindGarden = remindGarden.replace("R", "");
            }
        }
    }
    localStorage.setItem('RemindGarden', remindGarden)
}
//====================================== Toxic Spill ======================================
function buildToxicSpill() {
    if ($(".toxicSpill").length > 0) return;
    var timerBox = $(".timerBox");
    var toxicSpill = document.createElement("div");
    toxicSpill.classList.add("toxicSpill");
    $(toxicSpill).css({
        'border': '1px solid black',
        'width': '26%',
        'height': '70%',
        'padding': 2 + "px"
    });
    //Header
    var toxicSpillHeader = document.createElement("div");
    toxicSpillHeader.classList.add("toxicSpillHeader");
    var toxicSpillHeaderLabel = document.createElement("div");
    toxicSpillHeaderLabel.classList.add("toxicSpillHeaderLabel");
    var toxicSpillHeaderLabelText = document.createTextNode("Current Spill Level:");
    toxicSpillHeaderLabel.appendChild(toxicSpillHeaderLabelText);
    var toxicSpillHeaderValue = document.createElement("div");
    toxicSpillHeaderValue.classList.add("toxicSpillHeaderValue");
    var toxicSpillHeaderValueText = document.createTextNode("Archduke");
    toxicSpillHeaderValue.appendChild(toxicSpillHeaderValueText);
    $(toxicSpillHeaderLabel).css({
        'float': 'left',
        'font-weight': 700,
        "marginRight": "5px"
    })
    $(toxicSpillHeaderValue).css({
        "marginLeft": "100px"
    });
    toxicSpillHeader.appendChild(toxicSpillHeaderLabel);
    toxicSpillHeader.appendChild(toxicSpillHeaderValue);
    //Hero
    var toxicSpillHero = document.createElement("div");
    toxicSpillHero.classList.add("toxicSpillHero");
    var toxicSpillHeroLabel = document.createElement("div");
    toxicSpillHeroLabel.classList.add("toxicSpillHeroLabel");
    var toxicSpillHeroLabelText = document.createTextNode("Hero in:");
    toxicSpillHeroLabel.appendChild(toxicSpillHeroLabelText);
    var toxicSpillHeroValue = document.createElement("div");
    toxicSpillHeroValue.classList.add("toxicSpillHeroValue");
    var toxicSpillHeroValueText = document.createTextNode("?");
    toxicSpillHeroValue.appendChild(toxicSpillHeroValueText);
    $(toxicSpillHeroLabel).css({
        'float': 'left',
        'width': '100px',
        'font-weight': 700,
        "marginRight": "5px"
    })
    toxicSpillHero.appendChild(toxicSpillHeroLabel);
    toxicSpillHero.appendChild(toxicSpillHeroValue);
    //Knight
    var toxicSpillKnight = document.createElement("div");
    toxicSpillKnight.classList.add("toxicSpillKnight");
    var toxicSpillKnightLabel = document.createElement("div");
    toxicSpillKnightLabel.classList.add("toxicSpillKnightLabel");
    var toxicSpillKnightLabelText = document.createTextNode("Knight in:");
    toxicSpillKnightLabel.appendChild(toxicSpillKnightLabelText);
    var toxicSpillKnightValue = document.createElement("div");
    toxicSpillKnightValue.classList.add("toxicSpillKnightValue");
    var toxicSpillKnightValueText = document.createTextNode("?");
    toxicSpillKnightValue.appendChild(toxicSpillKnightValueText);
    $(toxicSpillKnightLabel).css({
        'float': 'left',
        'width': '100px',
        'font-weight': 700,
        "marginRight": "5px"
    })
    toxicSpillKnight.appendChild(toxicSpillKnightLabel);
    toxicSpillKnight.appendChild(toxicSpillKnightValue);
    //Lord
    var toxicSpillLord = document.createElement("div");
    toxicSpillLord.classList.add("toxicSpillLord");
    var toxicSpillLordLabel = document.createElement("div");
    toxicSpillLordLabel.classList.add("toxicSpillLordLabel");
    var toxicSpillLordLabelText = document.createTextNode("Lord in:");
    toxicSpillLordLabel.appendChild(toxicSpillLordLabelText);
    var toxicSpillLordValue = document.createElement("div");
    toxicSpillLordValue.classList.add("toxicSpillLordValue");
    var toxicSpillLordValueText = document.createTextNode("?");
    toxicSpillLordValue.appendChild(toxicSpillLordValueText);
    $(toxicSpillLordLabel).css({
        'float': 'left',
        'width': '100px',
        'font-weight': 700,
        "marginRight": "5px"
    })
    toxicSpillLord.appendChild(toxicSpillLordLabel);
    toxicSpillLord.appendChild(toxicSpillLordValue);
    //Baron
    var toxicSpillBaron = document.createElement("div");
    toxicSpillBaron.classList.add("toxicSpillBaron");
    var toxicSpillBaronLabel = document.createElement("div");
    toxicSpillBaronLabel.classList.add("toxicSpillBaronLabel");
    var toxicSpillBaronLabelText = document.createTextNode("Baron in:");
    toxicSpillBaronLabel.appendChild(toxicSpillBaronLabelText);
    var toxicSpillBaronValue = document.createElement("div");
    toxicSpillBaronValue.classList.add("toxicSpillBaronValue");
    var toxicSpillBaronValueText = document.createTextNode("?");
    toxicSpillBaronValue.appendChild(toxicSpillBaronValueText);
    $(toxicSpillBaronLabel).css({
        'float': 'left',
        'width': '100px',
        'font-weight': 700,
        "marginRight": "5px"
    })
    toxicSpillBaron.appendChild(toxicSpillBaronLabel);
    toxicSpillBaron.appendChild(toxicSpillBaronValue);
    //Count
    var toxicSpillCount = document.createElement("div");
    toxicSpillCount.classList.add("toxicSpillCount");
    var toxicSpillCountLabel = document.createElement("div");
    toxicSpillCountLabel.classList.add("toxicSpillCountLabel");
    var toxicSpillCountLabelText = document.createTextNode("Count in:");
    toxicSpillCountLabel.appendChild(toxicSpillCountLabelText);
    var toxicSpillCountValue = document.createElement("div");
    toxicSpillCountValue.classList.add("toxicSpillCountValue");
    var toxicSpillCountValueText = document.createTextNode("?");
    toxicSpillCountValue.appendChild(toxicSpillCountValueText);
    $(toxicSpillCountLabel).css({
        'float': 'left',
        'width': '100px',
        'font-weight': 700,
        "marginRight": "5px"
    })
    toxicSpillCount.appendChild(toxicSpillCountLabel);
    toxicSpillCount.appendChild(toxicSpillCountValue);
    //Duke
    var toxicSpillDuke = document.createElement("div");
    toxicSpillDuke.classList.add("toxicSpillDuke");
    var toxicSpillDukeLabel = document.createElement("div");
    toxicSpillDukeLabel.classList.add("toxicSpillDukeLabel");
    var toxicSpillDukeLabelText = document.createTextNode("Duke in:");
    toxicSpillDukeLabel.appendChild(toxicSpillDukeLabelText);
    var toxicSpillDukeValue = document.createElement("div");
    toxicSpillDukeValue.classList.add("toxicSpillDukeValue");
    var toxicSpillDukeValueText = document.createTextNode("?");
    toxicSpillDukeValue.appendChild(toxicSpillDukeValueText);
    $(toxicSpillDukeLabel).css({
        'float': 'left',
        'width': '100px',
        'font-weight': 700,
        "marginRight": "5px"
    })
    toxicSpillDuke.appendChild(toxicSpillDukeLabel);
    toxicSpillDuke.appendChild(toxicSpillDukeValue);
    //Grand Duke
    var toxicSpillGrandDuke = document.createElement("div");
    toxicSpillGrandDuke.classList.add("toxicSpillGrandDuke");
    var toxicSpillGrandDukeLabel = document.createElement("div");
    toxicSpillGrandDukeLabel.classList.add("toxicSpillGrandDukeLabel");
    var toxicSpillGrandDukeLabelText = document.createTextNode("Grand Duke in:");
    toxicSpillGrandDukeLabel.appendChild(toxicSpillGrandDukeLabelText);
    var toxicSpillGrandDukeValue = document.createElement("div");
    toxicSpillGrandDukeValue.classList.add("toxicSpillGrandDukeValue");
    var toxicSpillGrandDukeValueText = document.createTextNode("?");
    toxicSpillGrandDukeValue.appendChild(toxicSpillGrandDukeValueText);
    $(toxicSpillGrandDukeLabel).css({
        'float': 'left',
        'width': '100px',
        'font-weight': 700,
        "marginRight": "5px"
    })
    toxicSpillGrandDuke.appendChild(toxicSpillGrandDukeLabel);
    toxicSpillGrandDuke.appendChild(toxicSpillGrandDukeValue);
    //Archduke
    var toxicSpillArchduke = document.createElement("div");
    toxicSpillArchduke.classList.add("toxicSpillArchduke");
    var toxicSpillArchdukeLabel = document.createElement("div");
    toxicSpillArchdukeLabel.classList.add("toxicSpillArchdukeLabel");
    var toxicSpillArchdukeLabelText = document.createTextNode("Archduke in:");
    toxicSpillArchdukeLabel.appendChild(toxicSpillArchdukeLabelText);
    var toxicSpillArchdukeValue = document.createElement("div");
    toxicSpillArchdukeValue.classList.add("toxicSpillArchdukeValue");
    var toxicSpillArchdukeValueText = document.createTextNode("?");
    toxicSpillArchdukeValue.appendChild(toxicSpillArchdukeValueText);
    $(toxicSpillArchdukeLabel).css({
        'float': 'left',
        'width': '100px',
        'font-weight': 700,
        "marginRight": "5px"
    })
    toxicSpillArchduke.appendChild(toxicSpillArchdukeLabel);
    toxicSpillArchduke.appendChild(toxicSpillArchdukeValue);
    //Append
    toxicSpill.appendChild(toxicSpillHeader);
    toxicSpill.appendChild(toxicSpillHero);
    toxicSpill.appendChild(toxicSpillKnight);
    toxicSpill.appendChild(toxicSpillLord);
    toxicSpill.appendChild(toxicSpillBaron);
    toxicSpill.appendChild(toxicSpillCount);
    toxicSpill.appendChild(toxicSpillDuke);
    toxicSpill.appendChild(toxicSpillGrandDuke);
    toxicSpill.appendChild(toxicSpillArchduke);
    return toxicSpill;
}

function updateToxicSpillTimer() {
    if ($(".toxicSpill").length < 1) return;
    var toxicSpill = $(".toxicSpill");
    const remind = localStorage.getItem('RemindSpill');
    const remindInterval = parseInt(localStorage.getItem('RemindInterval'), 10);
    $(".toxicSpill").children().show();
    var firstHero = 1503597600;
    var now = todayNow();
    let timePassedHours = (now - firstHero) / 3600;
    var rotaionLenght = 302;
    var rotationsExact = timePassedHours / rotaionLenght;
    var rotationsInteger = Math.floor(rotationsExact);
    var partialrotation = (rotationsExact - rotationsInteger) * rotaionLenght;
    var heroObj = new season(0, 0, 0);
    var knightObj = new season(0, 0, 0);
    var lordObj = new season(0, 0, 0);
    var baronObj = new season(0, 0, 0);
    var countObj = new season(0, 0, 0);
    var dukeObj = new season(0, 0, 0);
    var granddukeObj = new season(0, 0, 0);
    var archdukeObj = new season(0, 0, 0);
    if (partialrotation < 15) {
        //Hero Rising
        $(".toxicSpillHeaderValue").text("HERO-RISING");
        $(".toxicSpillHeaderValue").css({
            'color': 'red'
        });
        var timeKnight = (15 - partialrotation).toPrecision(4);
        knightObj.hours = Math.floor(timeKnight);
        knightObj.minutes = Math.ceil((timeKnight - knightObj.hours) * 60);
        knightObj = convertToDyHrMn(0, knightObj.hours, knightObj.minutes);
        lordObj = convertToDyHrMn(knightObj.days, knightObj.hours + 16, knightObj.minutes);
        baronObj = convertToDyHrMn(lordObj.days, lordObj.hours + 18, lordObj.minutes);
        countObj = convertToDyHrMn(baronObj.days, baronObj.hours + 18, baronObj.minutes);
        dukeObj = convertToDyHrMn(countObj.days + 1, countObj.hours, countObj.minutes);
        $(".toxicSpillKnightLabel").text("Knight in:");
        $(".toxicSpillLordLabel").text("Lord in:");
        $(".toxicSpillBaronLabel").text("Baron in:");
        $(".toxicSpillCountLabel").text("Count in:");
        $(".toxicSpillDukeLabel").text("Duke in:");
        toxicSpill.append($(".toxicSpillKnight"));
        toxicSpill.append($(".toxicSpillLord"));
        toxicSpill.append($(".toxicSpillBaron"));
        toxicSpill.append($(".toxicSpillCount"));
        toxicSpill.append($(".toxicSpillDuke"));
        $(".toxicSpillHero").hide();
        $(".toxicSpillGrandDuke").hide();
        $(".toxicSpillArchduke").hide();
        if ((knightObj.hours == 0) && (knightObj.minutes <= remindInterval) && (remind.search('K') >= 0) && (remind.search('N') < 0)) {
            if (confirm('It will be Knight level soon at the toxic spill, travel there now?') == true) {
                travelToSpill("skip");
            }
            if (localStorage.getItem('KillSwitch') == 'Y') {
                $("#toxicSpillCb").click();
            }
        }
    } else if (partialrotation >= 15 && partialrotation < 31) {
        //Knight Rising
        $(".toxicSpillHeaderValue").text("KNIGHT-RISING");
        $(".toxicSpillHeaderValue").css({
            'color': 'red'
        });
        var timeLord = (31 - partialrotation).toPrecision(4);
        lordObj.hours = Math.floor(timeLord);
        lordObj.minutes = Math.ceil((timeLord - lordObj.hours) * 60);
        lordObj = convertToDyHrMn(0, lordObj.hours, lordObj.minutes);
        baronObj = convertToDyHrMn(lordObj.days, lordObj.hours + 18, lordObj.minutes);
        countObj = convertToDyHrMn(baronObj.days, baronObj.hours + 18, baronObj.minutes);
        dukeObj = convertToDyHrMn(countObj.days + 1, countObj.hours, countObj.minutes);
        granddukeObj = convertToDyHrMn(dukeObj.days + 1, dukeObj.hours, dukeObj.minutes);
        $(".toxicSpillLordLabel").text("Lord in:");
        $(".toxicSpillBaronLabel").text("Baron in:");
        $(".toxicSpillCountLabel").text("Count in:");
        $(".toxicSpillDukeLabel").text("Duke in:");
        $(".toxicSpillGrandDukeLabel").text("Grand Duke in:");
        toxicSpill.append($(".toxicSpillLord"));
        toxicSpill.append($(".toxicSpillBaron"));
        toxicSpill.append($(".toxicSpillCount"));
        toxicSpill.append($(".toxicSpillDuke"));
        toxicSpill.append($(".toxicSpillGrandDuke"));
        $(".toxicSpillHero").hide();
        $(".toxicSpillKnight").hide();
        $(".toxicSpillArchduke").hide();
        if ((lordObj.hours == 0) && (lordObj.minutes <= remindInterval) && (remind.search('L') >= 0) && (remind.search('N') < 0)) {
            if (confirm('It will be Lord level soon at the toxic spill, travel there now?') == true) {
                travelToSpill("skip");
            }
            if (localStorage.getItem('KillSwitch') == 'Y') {
                $("#toxicSpillCb").click();
            }
        }
    } else if (partialrotation >= 31 && partialrotation < 49) {
        //Lord Rising
        $(".toxicSpillHeaderValue").text("LORD-RISING");
        $(".toxicSpillHeaderValue").css({
            'color': 'red'
        });
        var timeBaron = (49 - partialrotation).toPrecision(4);
        baronObj.hours = Math.floor(timeBaron);
        baronObj.minutes = Math.ceil((timeBaron - baronObj.hours) * 60);
        baronObj = convertToDyHrMn(0, baronObj.hours, baronObj.minutes);
        countObj = convertToDyHrMn(baronObj.days, baronObj.hours + 18, baronObj.minutes);
        dukeObj = convertToDyHrMn(countObj.days + 1, countObj.hours, countObj.minutes);
        granddukeObj = convertToDyHrMn(dukeObj.days + 1, dukeObj.hours, dukeObj.minutes);
        archdukeObj = convertToDyHrMn(granddukeObj.days + 1, granddukeObj.hours, granddukeObj.minutes);
        $(".toxicSpillBaronLabel").text("Baron in:");
        $(".toxicSpillCountLabel").text("Count in:");
        $(".toxicSpillDukeLabel").text("Duke in:");
        $(".toxicSpillGrandDukeLabel").text("Grand Duke in:");
        $(".toxicSpillArchdukeLabel").text("Archduke in:");
        toxicSpill.append($(".toxicSpillBaron"));
        toxicSpill.append($(".toxicSpillCount"));
        toxicSpill.append($(".toxicSpillDuke"));
        toxicSpill.append($(".toxicSpillGrandDuke"));
        toxicSpill.append($(".toxicSpillArchduke"));
        $(".toxicSpillHero").hide();
        $(".toxicSpillKnight").hide();
        $(".toxicSpillLord").hide();
        if ((baronObj.hours == 0) && (baronObj.minutes <= remindInterval) && (remind.search('B') >= 0) && (remind.search('N') < 0)) {
            if (confirm('It will be Baron level soon at the toxic spill, travel there now?') == true) {
                travelToSpill("skip");
            }
            if (localStorage.getItem('KillSwitch') == 'Y') {
                $("#toxicSpillCb").click();
            }
        }
    } else if (partialrotation >= 49 && partialrotation < 67) {
        //Baron Rising
        $(".toxicSpillHeaderValue").text("BARON-RISING");
        $(".toxicSpillHeaderValue").css({
            'color': 'red'
        });
        var timeCount = (67 - partialrotation).toPrecision(4);
        countObj.hours = Math.floor(timeCount);
        countObj.minutes = Math.ceil((timeCount - countObj.hours) * 60);
        countObj = convertToDyHrMn(0, countObj.hours, countObj.minutes);
        dukeObj = convertToDyHrMn(countObj.days + 1, countObj.hours, countObj.minutes);
        granddukeObj = convertToDyHrMn(dukeObj.days + 1, dukeObj.hours, dukeObj.minutes);
        archdukeObj = convertToDyHrMn(granddukeObj.days + 1, granddukeObj.hours, granddukeObj.minutes);
        baronObj = convertToDyHrMn(archdukeObj.days + 4, archdukeObj.hours, archdukeObj.minutes);
        $(".toxicSpillGrandDukeLabel").text("Grand Duke in:");
        $(".toxicSpillArchdukeLabel").text("Archduke in:");
        $(".toxicSpillDukeLabel").text("Duke in:");
        $(".toxicSpillCountLabel").text("Count in:");
        $(".toxicSpillBaronLabel").text("Baron Falling in:");
        toxicSpill.append($(".toxicSpillCount"));
        toxicSpill.append($(".toxicSpillDuke"));
        toxicSpill.append($(".toxicSpillGrandDuke"));
        toxicSpill.append($(".toxicSpillArchduke"));
        toxicSpill.append($(".toxicSpillBaron"));
        $(".toxicSpillHero").hide();
        $(".toxicSpillKnight").hide();
        $(".toxicSpillLord").hide();
        if ((countObj.hours == 0) && (countObj.minutes <= remindInterval) && (remind.search('C') >= 0) && (remind.search('N') < 0)) {
            if (confirm('It will be Count level soon at the toxic spill, travel there now?') == true) {
                travelToSpill("skip");
            }
            if (localStorage.getItem('KillSwitch') == 'Y') {
                $("#toxicSpillCb").click();
            }
        }
    } else if (partialrotation >= 67 && partialrotation < 91) {
        //Count Rising
        $(".toxicSpillHeaderValue").text("COUNT-RISING");
        $(".toxicSpillHeaderValue").css({
            'color': 'red'
        });
        var timeDuke = (91 - partialrotation).toPrecision(4);
        dukeObj.hours = Math.floor(timeDuke);
        dukeObj.minutes = Math.ceil((timeDuke - dukeObj.hours) * 60);
        dukeObj = convertToDyHrMn(0, dukeObj.hours, dukeObj.minutes);
        granddukeObj = convertToDyHrMn(dukeObj.days + 1, dukeObj.hours, dukeObj.minutes);
        archdukeObj = convertToDyHrMn(granddukeObj.days + 1, granddukeObj.hours, granddukeObj.minutes);
        countObj = convertToDyHrMn(archdukeObj.days + 3, archdukeObj.hours, archdukeObj.minutes);
        baronObj = convertToDyHrMn(countObj.days + 1, countObj.hours, countObj.minutes);
        $(".toxicSpillGrandDukeLabel").text("Grand Duke in:");
        $(".toxicSpillArchdukeLabel").text("Archduke in:");
        $(".toxicSpillDukeLabel").text("Duke in:");
        $(".toxicSpillCountLabel").text("Count Falling in:");
        $(".toxicSpillBaronLabel").text("Baron in:");
        toxicSpill.append($(".toxicSpillDuke"));
        toxicSpill.append($(".toxicSpillGrandDuke"));
        toxicSpill.append($(".toxicSpillArchduke"));
        toxicSpill.append($(".toxicSpillCount"));
        toxicSpill.append($(".toxicSpillBaron"));
        $(".toxicSpillHero").hide();
        $(".toxicSpillKnight").hide();
        $(".toxicSpillLord").hide();
        if ((dukeObj.hours == 0) && (dukeObj.minutes <= remindInterval) && (remind.search('D') >= 0) && (remind.search('N') < 0)) {
            if (confirm('It will be Duke level soon at the toxic spill, travel there now?') == true) {
                travelToSpill("skip");
            }
            if (localStorage.getItem('KillSwitch') == 'Y') {
                $("#toxicSpillCb").click();
            }
        }
    } else if (partialrotation >= 91 && partialrotation < 115) {
        //Duke Rising
        $(".toxicSpillHeaderValue").text("DUKE-RISING");
        $(".toxicSpillHeaderValue").css({
            'color': 'red'
        });
        var timeGrandDuke = (115 - partialrotation).toPrecision(4);
        granddukeObj.hours = Math.floor(timeGrandDuke);
        granddukeObj.minutes = Math.ceil((timeGrandDuke - granddukeObj.hours) * 60);
        granddukeObj = convertToDyHrMn(0, granddukeObj.hours, granddukeObj.minutes);
        archdukeObj = convertToDyHrMn(granddukeObj.days + 1, granddukeObj.hours, granddukeObj.minutes);
        dukeObj = convertToDyHrMn(archdukeObj.days + 2, archdukeObj.hours, archdukeObj.minutes);
        countObj = convertToDyHrMn(dukeObj.days + 1, dukeObj.hours + 10, dukeObj.minutes);
        baronObj = convertToDyHrMn(countObj.days + 1, countObj.hours, countObj.minutes);
        $(".toxicSpillGrandDukeLabel").text("Grand Duke in:");
        $(".toxicSpillArchdukeLabel").text("Archduke in:");
        $(".toxicSpillDukeLabel").text("Duke Falling in:");
        $(".toxicSpillCountLabel").text("Count in:");
        $(".toxicSpillBaronLabel").text("Baron in:");
        toxicSpill.append($(".toxicSpillGrandDuke"));
        toxicSpill.append($(".toxicSpillArchduke"));
        toxicSpill.append($(".toxicSpillDuke"));
        toxicSpill.append($(".toxicSpillCount"));
        toxicSpill.append($(".toxicSpillBaron"));
        $(".toxicSpillHero").hide();
        $(".toxicSpillKnight").hide();
        $(".toxicSpillLord").hide();
        if ((granddukeObj.hours == 0) && (granddukeObj.minutes <= remindInterval) && (remind.search('G') >= 0) && (remind.search('N') < 0)) {
            if (confirm('It will be Grand Duke level soon at the toxic spill, travel there now?') == true) {
                travelToSpill("skip");
            }
            if (localStorage.getItem('KillSwitch') == 'Y') {
                $("#toxicSpillCb").click();
            }
        }
    } else if (partialrotation >= 115 && partialrotation < 139) {
        //Grand Duke Rising
        $(".toxicSpillHeaderValue").text("GD-RISING");
        $(".toxicSpillHeaderValue").css({
            'color': 'red'
        });
        var timeArchduke = (139 - partialrotation).toPrecision(4);
        archdukeObj.hours = Math.floor(timeArchduke);
        archdukeObj.minutes = Math.ceil((timeArchduke - archdukeObj.hours) * 60);
        archdukeObj = convertToDyHrMn(0, archdukeObj.hours, archdukeObj.minutes);
        granddukeObj = convertToDyHrMn(archdukeObj.days, archdukeObj.hours + 24, archdukeObj.minutes);
        dukeObj = convertToDyHrMn(0, granddukeObj.hours + 24, granddukeObj.minutes);
        countObj = convertToDyHrMn(dukeObj.days + 1, dukeObj.hours + 10, dukeObj.minutes);
        baronObj = convertToDyHrMn(countObj.days + 1, countObj.hours, countObj.minutes);
        $(".toxicSpillArchdukeLabel").text("Archduke in:");
        $(".toxicSpillGrandDukeLabel").text("GD Falling in:");
        $(".toxicSpillDukeLabel").text("Duke in:");
        $(".toxicSpillCountLabel").text("Count in:");
        $(".toxicSpillBaronLabel").text("Baron in:");
        toxicSpill.append($(".toxicSpillArchduke"));
        toxicSpill.append($(".toxicSpillGrandDuke"));
        toxicSpill.append($(".toxicSpillDuke"));
        toxicSpill.append($(".toxicSpillCount"));
        toxicSpill.append($(".toxicSpillBaron"));
        $(".toxicSpillHero").hide();
        $(".toxicSpillKnight").hide();
        $(".toxicSpillLord").hide();
        if ((granddukeObj.hours == 0) && (granddukeObj.minutes <= remindInterval) && (remind.search('A') >= 0) && (remind.search('N') < 0)) {
            if (confirm('It will be Archduke level soon at the toxic spill, travel there now?') == true) {
                travelToSpill("skip");
            }
            if (localStorage.getItem('KillSwitch') == 'Y') {
                $("#toxicSpillCb").click();
            }
        }
    } else if (partialrotation >= 139 && partialrotation < 151) {
        //Archduke Rising
        $(".toxicSpillHeaderValue").text("AD-RISING");
        $(".toxicSpillHeaderValue").css({
            'color': 'red'
        });
        var timeArchduke = (151 - partialrotation).toPrecision(4);
        archdukeObj.hours = Math.floor(timeArchduke);
        archdukeObj.minutes = Math.ceil((timeArchduke - archdukeObj.hours) * 60);
        archdukeObj = convertToDyHrMn(0, archdukeObj.hours, archdukeObj.minutes);
        granddukeObj = convertToDyHrMn(archdukeObj.days, archdukeObj.hours + 12, archdukeObj.minutes);
        dukeObj = convertToDyHrMn(0, granddukeObj.hours + 24, granddukeObj.minutes);
        countObj = convertToDyHrMn(dukeObj.days + 1, dukeObj.hours + 10, dukeObj.minutes);
        baronObj = convertToDyHrMn(countObj.days + 1, countObj.hours, countObj.minutes);
        $(".toxicSpillArchdukeLabel").text("AD Falling in:");
        $(".toxicSpillGrandDukeLabel").text("Grand Duke in:");
        $(".toxicSpillDukeLabel").text("Duke in:");
        $(".toxicSpillCountLabel").text("Count in:");
        $(".toxicSpillBaronLabel").text("Baron in:");
        toxicSpill.append($(".toxicSpillArchduke"));
        toxicSpill.append($(".toxicSpillGrandDuke"));
        toxicSpill.append($(".toxicSpillDuke"));
        toxicSpill.append($(".toxicSpillCount"));
        toxicSpill.append($(".toxicSpillBaron"));
        $(".toxicSpillHero").hide();
        $(".toxicSpillKnight").hide();
        $(".toxicSpillLord").hide();
    } else if (partialrotation >= 151 && partialrotation < 163) {
        //Archduke Falling
        $(".toxicSpillHeaderValue").text("AD-FALLING");
        $(".toxicSpillHeaderValue").css({
            'color': 'green'
        });
        var timeGDuke = (163 - partialrotation).toPrecision(4);
        granddukeObj.hours = Math.floor(timeGDuke);
        granddukeObj.minutes = Math.ceil((timeGDuke - granddukeObj.hours) * 60);
        granddukeObj = convertToDyHrMn(0, granddukeObj.hours, granddukeObj.minutes);
        dukeObj = convertToDyHrMn(0, granddukeObj.hours + 24, granddukeObj.minutes);
        countObj = convertToDyHrMn(dukeObj.days + 1, dukeObj.hours + 10, dukeObj.minutes);
        baronObj = convertToDyHrMn(countObj.days + 1, countObj.hours, countObj.minutes);
        lordObj = convertToDyHrMn(baronObj.days, baronObj.hours + 18, baronObj.minutes);
        $(".toxicSpillGrandDukeLabel").text("Grand Duke in:");
        $(".toxicSpillDukeLabel").text("Duke in:");
        $(".toxicSpillCountLabel").text("Count in:");
        $(".toxicSpillBaronLabel").text("Baron in:");
        $(".toxicSpillLordLabel").text("Lord in:");
        toxicSpill.append($(".toxicSpillGrandDuke"));
        toxicSpill.append($(".toxicSpillDuke"));
        toxicSpill.append($(".toxicSpillCount"));
        toxicSpill.append($(".toxicSpillBaron"));
        toxicSpill.append($(".toxicSpillLord"));
        $(".toxicSpillHero").hide();
        $(".toxicSpillKnight").hide();
        $(".toxicSpillArchduke").hide();
        if ((granddukeObj.hours == 0) && (granddukeObj.minutes <= remindInterval) && (remind.search('G') >= 0) && (remind.search('N') < 0)) {
            if (confirm('It will be Grand Duke level soon at the toxic spill, travel there now?') == true) {
                travelToSpill("skip");
            }
            if (localStorage.getItem('KillSwitch') == 'Y') {
                $("#toxicSpillCb").click();
            }
        }
    } else if (partialrotation >= 163 && partialrotation < 187) {
        //Grand Duke Falling
        $(".toxicSpillHeaderValue").text("GD-FALLING");
        $(".toxicSpillHeaderValue").css({
            'color': 'green'
        });
        var timeDuke = (187 - partialrotation).toPrecision(4);
        dukeObj.hours = Math.floor(timeDuke);
        dukeObj.minutes = Math.ceil((timeDuke - dukeObj.hours) * 60);
        dukeObj = convertToDyHrMn(0, dukeObj.hours, dukeObj.minutes);
        countObj = convertToDyHrMn(dukeObj.days + 1, dukeObj.hours + 10, dukeObj.minutes);
        baronObj = convertToDyHrMn(countObj.days + 1, countObj.hours, countObj.minutes);
        lordObj = convertToDyHrMn(baronObj.days, baronObj.hours + 18, baronObj.minutes);
        knightObj = convertToDyHrMn(lordObj.days, lordObj.hours + 18, lordObj.minutes);
        $(".toxicSpillDukeLabel").text("Duke in:");
        $(".toxicSpillCountLabel").text("Count in:");
        $(".toxicSpillBaronLabel").text("Baron in:");
        $(".toxicSpillLordLabel").text("Lord in:");
        $(".toxicSpillKnightLabel").text("Knight in:");
        toxicSpill.append($(".toxicSpillDuke"));
        toxicSpill.append($(".toxicSpillCount"));
        toxicSpill.append($(".toxicSpillBaron"));
        toxicSpill.append($(".toxicSpillLord"));
        toxicSpill.append($(".toxicSpillKnight"));
        $(".toxicSpillHero").hide();
        $(".toxicSpillGrandDuke").hide();
        $(".toxicSpillArchduke").hide();
        if ((dukeObj.hours == 0) && (dukeObj.minutes <= remindInterval) && (remind.search('D') >= 0) && (remind.search('N') < 0)) {
            if (confirm('It will be Duke level soon at the toxic spill, travel there now?') == true) {
                travelToSpill("skip");
            }
            if (localStorage.getItem('KillSwitch') == 'Y') {
                $("#toxicSpillCb").click();
            }
        }
    } else if (partialrotation >= 187 && partialrotation < 211) {
        //Duke Falling
        $(".toxicSpillHeaderValue").text("DUKE-FALLING");
        $(".toxicSpillHeaderValue").css({
            'color': 'green'
        });
        var timeCount = (211 - partialrotation).toPrecision(4);
        countObj.hours = Math.floor(timeCount);
        countObj.minutes = Math.ceil((timeCount - countObj.hours) * 60);
        countObj = convertToDyHrMn(0, countObj.hours, countObj.minutes);
        baronObj = convertToDyHrMn(countObj.days + 1, countObj.hours, countObj.minutes);
        lordObj = convertToDyHrMn(baronObj.days, baronObj.hours + 18, baronObj.minutes);
        knightObj = convertToDyHrMn(lordObj.days, lordObj.hours + 18, lordObj.minutes);
        heroObj = convertToDyHrMn(knightObj.days, knightObj.hours + 16, knightObj.minutes);
        $(".toxicSpillCountLabel").text("Count in:");
        $(".toxicSpillBaronLabel").text("Baron in:");
        $(".toxicSpillLordLabel").text("Lord in:");
        $(".toxicSpillKnightLabel").text("Knight in:");
        $(".toxicSpillHeroLabel").text("Hero in:");
        toxicSpill.append($(".toxicSpillCount"));
        toxicSpill.append($(".toxicSpillBaron"));
        toxicSpill.append($(".toxicSpillLord"));
        toxicSpill.append($(".toxicSpillKnight"));
        toxicSpill.append($(".toxicSpillHero"));
        $(".toxicSpillDuke").hide();
        $(".toxicSpillGrandDuke").hide();
        $(".toxicSpillArchduke").hide();
        if ((countObj.hours == 0) && (countObj.minutes <= remindInterval) && (remind.search('C') >= 0) && (remind.search('N') < 0)) {
            if (confirm('It will be Count level soon at the toxic spill, travel there now?') == true) {
                travelToSpill("skip");
            }
            if (localStorage.getItem('KillSwitch') == 'Y') {
                $("#toxicSpillCb").click();
            }
        }
    } else if (partialrotation >= 211 && partialrotation < 235) {
        //Count Falling
        $(".toxicSpillHeaderValue").text("COUNT-FALLING");
        $(".toxicSpillHeaderValue").css({
            'color': 'green'
        });
        var timeBaron = (235 - partialrotation).toPrecision(4);
        baronObj.hours = Math.floor(timeBaron);
        baronObj.minutes = Math.ceil((timeBaron - baronObj.hours) * 60);
        baronObj = convertToDyHrMn(0, baronObj.hours, baronObj.minutes);
        lordObj = convertToDyHrMn(baronObj.days, baronObj.hours + 18, baronObj.minutes);
        knightObj = convertToDyHrMn(lordObj.days, lordObj.hours + 18, lordObj.minutes);
        heroObj = convertToDyHrMn(knightObj.days, knightObj.hours + 16, knightObj.minutes);
        countObj = convertToDyHrMn(heroObj.days + 3, heroObj.hours + 10, heroObj.minutes);
        $(".toxicSpillBaronLabel").text("Baron in:");
        $(".toxicSpillLordLabel").text("Lord in:");
        $(".toxicSpillKnightLabel").text("Knight in:");
        $(".toxicSpillHeroLabel").text("Hero in:");
        $(".toxicSpillCountLabel").text("Count Rising in:");
        toxicSpill.append($(".toxicSpillBaron"));
        toxicSpill.append($(".toxicSpillLord"));
        toxicSpill.append($(".toxicSpillKnight"));
        toxicSpill.append($(".toxicSpillHero"));
        toxicSpill.append($(".toxicSpillCount"));
        $(".toxicSpillDuke").hide();
        $(".toxicSpillGrandDuke").hide();
        $(".toxicSpillArchduke").hide();
        if ((baronObj.hours == 0) && (baronObj.minutes <= remindInterval) && (remind.search('B') >= 0) && (remind.search('N') < 0)) {
            if (confirm('It will be Baron level soon at the toxic spill, travel there now?') == true) {
                travelToSpill("skip");
            }
            if (localStorage.getItem('KillSwitch') == 'Y') {
                $("#toxicSpillCb").click();
            }
        }
    } else if (partialrotation >= 235 && partialrotation < 253) {
        //Baron Falling
        $(".toxicSpillHeaderValue").text("BARON-FALLING");
        $(".toxicSpillHeaderValue").css({
            'color': 'green'
        });
        var timeLord = (253 - partialrotation).toPrecision(4);
        lordObj.hours = Math.floor(timeLord);
        lordObj.minutes = Math.ceil((timeLord - lordObj.hours) * 60);
        lordObj = convertToDyHrMn(0, lordObj.hours, lordObj.minutes);
        knightObj = convertToDyHrMn(lordObj.days, lordObj.hours + 18, lordObj.minutes);
        heroObj = convertToDyHrMn(knightObj.days, knightObj.hours + 16, knightObj.minutes);
        baronObj = convertToDyHrMn(heroObj.days + 2, heroObj.hours + 16, heroObj.minutes);
        countObj = convertToDyHrMn(baronObj.days, baronObj.hours + 18, baronObj.minutes);
        $(".toxicSpillCountLabel").text("Count in:");
        $(".toxicSpillBaronLabel").text("Baron Rising in:");
        $(".toxicSpillLordLabel").text("Lord in:");
        $(".toxicSpillKnightLabel").text("Knight in:");
        $(".toxicSpillHeroLabel").text("Hero in:");
        toxicSpill.append($(".toxicSpillLord"));
        toxicSpill.append($(".toxicSpillKnight"));
        toxicSpill.append($(".toxicSpillHero"));
        toxicSpill.append($(".toxicSpillBaron"));
        toxicSpill.append($(".toxicSpillCount"));
        $(".toxicSpillDuke").hide();
        $(".toxicSpillGrandDuke").hide();
        $(".toxicSpillArchduke").hide();
        if ((lordObj.hours == 0) && (lordObj.minutes <= remindInterval) && (remind.search('L') >= 0) && (remind.search('N') < 0)) {
            if (confirm('It will be Lord level soon at the toxic spill, travel there now?') == true) {
                travelToSpill("skip");
            }
            if (localStorage.getItem('KillSwitch') == 'Y') {
                $("#toxicSpillCb").click();
            }
        }
    } else if (partialrotation >= 253 && partialrotation < 271) {
        //Lord Falling
        $(".toxicSpillHeaderValue").text("LORD-FALLING");
        $(".toxicSpillHeaderValue").css({
            'color': 'green'
        });
        var timeKnight = (271 - partialrotation).toPrecision(4);
        knightObj.hours = Math.floor(timeKnight);
        knightObj.minutes = Math.ceil((timeKnight - knightObj.hours) * 60);
        knightObj = convertToDyHrMn(0, knightObj.hours, knightObj.minutes);
        heroObj = convertToDyHrMn(knightObj.days, knightObj.hours + 16, knightObj.minutes);
        lordObj = convertToDyHrMn(heroObj.days + 1, heroObj.hours + 22, heroObj.minutes);
        baronObj = convertToDyHrMn(lordObj.days, lordObj.hours + 18, lordObj.minutes);
        countObj = convertToDyHrMn(baronObj.days, baronObj.hours + 18, baronObj.minutes);
        $(".toxicSpillCountLabel").text("Count in:");
        $(".toxicSpillBaronLabel").text("Baron in:");
        $(".toxicSpillLordLabel").text("Lord Rising in:");
        $(".toxicSpillKnightLabel").text("Knight in:");
        $(".toxicSpillHeroLabel").text("Hero in:");
        toxicSpill.append($(".toxicSpillKnight"));
        toxicSpill.append($(".toxicSpillHero"));
        toxicSpill.append($(".toxicSpillLord"));
        toxicSpill.append($(".toxicSpillBaron"));
        toxicSpill.append($(".toxicSpillCount"));
        $(".toxicSpillDuke").hide();
        $(".toxicSpillGrandDuke").hide();
        $(".toxicSpillArchduke").hide();
        if ((knightObj.hours == 0) && (knightObj.minutes <= remindInterval) && (remind.search('K') >= 0) && (remind.search('N') < 0)) {
            if (confirm('It will be Knight level soon at the toxic spill, travel there now?') == true) {
                travelToSpill("skip");
            }
            if (localStorage.getItem('KillSwitch') == 'Y') {
                $("#toxicSpillCb").click();
            }
        }
    } else if (partialrotation >= 271 && partialrotation < 287) {
        //Knight Falling
        $(".toxicSpillHeaderValue").text("KNIGHT-FALLING");
        $(".toxicSpillHeaderValue").css({
            'color': 'green'
        });
        var timeHero = (287 - partialrotation).toPrecision(4);
        heroObj.hours = Math.floor(timeHero);
        heroObj.minutes = Math.ceil((timeHero - heroObj.hours) * 60);
        heroObj = convertToDyHrMn(0, heroObj.hours, heroObj.minutes);
        knightObj = convertToDyHrMn(heroObj.days + 1, heroObj.hours + 6, heroObj.minutes);
        lordObj = convertToDyHrMn(knightObj.days, knightObj.hours + 16, knightObj.minutes);
        baronObj = convertToDyHrMn(lordObj.days, lordObj.hours + 18, lordObj.minutes);
        countObj = convertToDyHrMn(baronObj.days, baronObj.hours + 18, baronObj.minutes);
        $(".toxicSpillCountLabel").text("Count in:");
        $(".toxicSpillBaronLabel").text("Baron in:");
        $(".toxicSpillLordLabel").text("Lord in:");
        $(".toxicSpillKnightLabel").text("Knight Rising in:");
        $(".toxicSpillHeroLabel").text("Hero in:");
        toxicSpill.append($(".toxicSpillHero"));
        toxicSpill.append($(".toxicSpillKnight"));
        toxicSpill.append($(".toxicSpillLord"));
        toxicSpill.append($(".toxicSpillBaron"));
        toxicSpill.append($(".toxicSpillCount"));
        $(".toxicSpillDuke").hide();
        $(".toxicSpillGrandDuke").hide();
        $(".toxicSpillArchduke").hide();
        if ((heroObj.hours == 0) && (heroObj.minutes <= remindInterval) && (remind.search('H') >= 0) && (remind.search('N') < 0)) {
            if (confirm('It will be Hero level soon at the toxic spill, travel there now?') == true) {
                travelToSpill("skip");
            }
            if (localStorage.getItem('KillSwitch') == 'Y') {
                $("#toxicSpillCb").click();
            }
        }
    } else if (partialrotation >= 287 && partialrotation < 302) {
        //Hero Falling
        $(".toxicSpillHeaderValue").text("HERO-FALLING");
        $(".toxicSpillHeaderValue").css({
            'color': 'green'
        });
        var timeHero = (302 - partialrotation).toPrecision(4);
        heroObj.hours = Math.floor(timeHero);
        heroObj.minutes = Math.ceil((timeHero - heroObj.hours) * 60);
        heroObj = convertToDyHrMn(0, heroObj.hours, heroObj.minutes);
        knightObj = convertToDyHrMn(heroObj.days, heroObj.hours + 15, heroObj.minutes);
        lordObj = convertToDyHrMn(knightObj.days, knightObj.hours + 16, knightObj.minutes);
        baronObj = convertToDyHrMn(lordObj.days, lordObj.hours + 18, lordObj.minutes);
        countObj = convertToDyHrMn(baronObj.days, baronObj.hours + 18, baronObj.minutes);
        $(".toxicSpillCountLabel").text("Count in:");
        $(".toxicSpillBaronLabel").text("Baron in:");
        $(".toxicSpillLordLabel").text("Lord in:");
        $(".toxicSpillKnightLabel").text("Knight in:");
        $(".toxicSpillHeroLabel").text("Hero Rising in:");
        toxicSpill.append($(".toxicSpillHero"));
        toxicSpill.append($(".toxicSpillKnight"));
        toxicSpill.append($(".toxicSpillLord"));
        toxicSpill.append($(".toxicSpillBaron"));
        toxicSpill.append($(".toxicSpillCount"));
        $(".toxicSpillDuke").hide();
        $(".toxicSpillGrandDuke").hide();
        $(".toxicSpillArchduke").hide();
    } else {
        //WTF are we?
    }
    $(".toxicSpillArchdukeValue").text(formatOutput(archdukeObj.days, archdukeObj.hours, archdukeObj.minutes));
    $(".toxicSpillGrandDukeValue").text(formatOutput(granddukeObj.days, granddukeObj.hours, granddukeObj.minutes));
    $(".toxicSpillDukeValue").text(formatOutput(dukeObj.days, dukeObj.hours, dukeObj.minutes));
    $(".toxicSpillCountValue").text(formatOutput(countObj.days, countObj.hours, countObj.minutes));
    $(".toxicSpillBaronValue").text(formatOutput(baronObj.days, baronObj.hours, baronObj.minutes));
    $(".toxicSpillLordValue").text(formatOutput(lordObj.days, lordObj.hours, lordObj.minutes));
    $(".toxicSpillKnightValue").text(formatOutput(knightObj.days, knightObj.hours, knightObj.minutes));
    $(".toxicSpillHeroValue").text(formatOutput(heroObj.days, heroObj.hours, heroObj.minutes));
    //https://mhwiki.hitgrab.com/wiki/index.php/Toxic_Spill#Pollution_Levels
    $(".toxicSpillArchdukeValue").css({
        'float': 'right'
    })
    $(".toxicSpillGrandDukeValue").css({
        'float': 'right'
    })
    $(".toxicSpillDukeValue").css({
        'float': 'right'
    })
    $(".toxicSpillCountValue").css({
        'float': 'right'
    })
    $(".toxicSpillBaronValue").css({
        'float': 'right'
    })
    $(".toxicSpillLordValue").css({
        'float': 'right'
    })
    $(".toxicSpillKnightValue").css({
        'float': 'right'
    })
    $(".toxicSpillHeroValue").css({
        'float': 'right'
    })
}

function spillLevel(days, hours, minutes) {
    this.days = days;
    this.hours = hours;
    this.minutes = minutes;
}
$(document).on('change', '#toxicSpillCb', function() {
    if (this.checked) {
        this.checked = "Yes";
    } else {
        this.checked = "";
    }
    remindSpill(this.name, this.checked);
})

$(document).on('change', '#toxicSpillHeroCb', function() {
    if (this.checked) {
        this.checked = "Yes";
    } else {
        this.checked = "";
    }
    remindSpill(this.name, this.checked);
})

$(document).on('change', '#toxicSpillKnightCb', function() {
    if (this.checked) {
        this.checked = "Yes";
    } else {
        this.checked = "";
    }
    remindSpill(this.name, this.checked);
})

$(document).on('change', '#toxicSpillLordCb', function() {
    if (this.checked) {
        this.checked = "Yes";
    } else {
        this.checked = "";
    }
    remindSpill(this.name, this.checked);
})
$(document).on('change', '#toxicSpillBaronCb', function() {
    if (this.checked) {
        this.checked = "Yes";
    } else {
        this.checked = "";
    }
    remindSpill(this.name, this.checked);
})
$(document).on('change', '#toxicSpillCountCb', function() {
    if (this.checked) {
        this.checked = "Yes";
    } else {
        this.checked = "";
    }
    remindSpill(this.name, this.checked);
})
$(document).on('change', '#toxicSpillDukeCb', function() {
    if (this.checked) {
        this.checked = "Yes";
    } else {
        this.checked = "";
    }
    remindSpill(this.name, this.checked);
})
$(document).on('change', '#toxicSpillGrandDukeCb', function() {
    if (this.checked) {
        this.checked = "Yes";
    } else {
        this.checked = "";
    }
    remindSpill(this.name, this.checked);
})
$(document).on('change', '#toxicSpillArchdukeCb', function() {
    if (this.checked) {
        this.checked = "Yes";
    } else {
        this.checked = "";
    }
    remindSpill(this.name, this.checked);
})
//if master checked and no other - remind all
//if master not checked - no reminder
//if master checked and 1 or more checked - remind the ones checked.
// N none
// H Hero
// K Knight
// L Lord
// B Baron
// C Count
// D Duke
// G Grand Duke
// A Archduke
function remindSpill(cb, checked) {
    var main = $('#toxicSpillCb');
    var hero = $('#toxicSpillHeroCb');
    var knight = $('#toxicSpillKnightCb');
    var lord = $('#toxicSpillLordCb');
    var baron = $('#toxicSpillBaronCb');
    var count = $('#toxicSpillCountCb');
    var duke = $('#toxicSpillDukeCb');
    var gduke = $('#toxicSpillGrandDukeCb');
    var aduke = $('#toxicSpillArchdukeCb');
    const mainName = main.prop("name");
    const hName = hero.prop("name");
    const kName = knight.prop("name");
    const lName = lord.prop("name");
    const bName = baron.prop("name");
    const cName = count.prop("name");
    const dName = duke.prop("name");
    const gName = gduke.prop("name");
    const aName = aduke.prop("name");
    const mainChecked = main.prop("checked");
    const hChecked = hero.prop("checked");
    const kChecked = knight.prop("checked");
    const lChecked = lord.prop("checked");
    const bChecked = baron.prop("checked");
    const cChecked = count.prop("checked");
    const dChecked = duke.prop("checked");
    const gChecked = gduke.prop("checked");
    const aChecked = aduke.prop("checked");
    var remindSpill = localStorage.getItem('RemindSpill')
    var remindNone = remindSpill.search("N");
    var remindHero = remindSpill.search("H");
    var remindKnight = remindSpill.search("K");
    var remindLord = remindSpill.search("L");
    var remindBaron = remindSpill.search("B");
    var remindCount = remindSpill.search("C");
    var remindDuke = remindSpill.search("D");
    var remindGduke = remindSpill.search("G");
    var remindAduke = remindSpill.search("A");
    //main was checked
    if ((cb == mainName) && (checked == true)) {
        if ((hChecked == false) && (kChecked == false) && (lChecked == false) && (bChecked == false) && (cChecked == false) && (dChecked == false) && (gChecked == false) && (aChecked == false)) {
            remindSpill = "HKLBCDGA";
        } else if ((hChecked == true) && (kChecked == true) && (lChecked == true) && (bChecked == true) && (cChecked == true) && (dChecked == true) && (gChecked == true) && (aChecked == true)) {
            remindSpill = "HKLBCDGA";
        } else {
            remindSpill = remindSpill.replace("N", "");
            if ((hChecked == true) && (remindHero < 0)) {
                remindSpill = remindSpill.concat("H");
            }
            if ((kChecked == true) && (remindKnight < 0)) {
                remindSpill = remindSpill.concat("K");
            }
            if ((lChecked == true) && (remindLord < 0)) {
                remindSpill = remindSpill.concat("L");
            }
            if ((bChecked == true) && (remindBaron < 0)) {
                remindSpill = remindSpill.concat("B");
            }
            if ((cChecked == true) && (remindCount < 0)) {
                remindSpill = remindSpill.concat("C");
            }
            if ((dChecked == true) && (remindDuke < 0)) {
                remindSpill = remindSpill.concat("G");
            }
            if ((gChecked == true) && (remindGduke < 0)) {
                remindSpill = remindSpill.concat("G");
            }
            if ((aChecked == true) && (remindAduke < 0)) {
                remindSpill = remindSpill.concat("A");
            }
        }
        //main was unchecked
    } else if ((cb == mainName) && (checked == false)) {
        if ((hChecked == false) && (kChecked == false) && (lChecked == false) && (bChecked == false) && (cChecked == false) && (dChecked == false) && (gChecked == false) && (aChecked == false)) {
            remindSpill = 'N';
        } else if (remindNone < 0) {
            remindSpill = remindSpill.concat("N");
        }
        //hero was checked
    } else if ((cb == hName) && (checked == true)) {
        if (mainChecked == false) {
            if (remindHero < 0) {
                remindSpill = remindSpill.concat("H");
            }
        } else if ((kChecked == true) || (lChecked == true) || (bChecked == true) || (cChecked == true) || (dChecked == true) || (gChecked == true) || (aChecked == true)) {
            remindSpill = remindSpill.replace("N", "");
            if (remindHero < 0) {
                remindSpill = remindSpill.concat("H");
            }
        } else {
            remindSpill = "H";
        }
        //hero was unchecked
    } else if ((cb == hName) && (checked == false)) {
        if (mainChecked == false) {
            if (remindHero >= 0) {
                remindSpill = remindSpill.replace("H", "");
            }
        } else if ((kChecked == false) && (lChecked == false) && (bChecked == false) && (cChecked == false) && (dChecked == false) && (gChecked == false) && (aChecked == false)) {
            remindSpill = "HKLBCDGA";
        } else {
            if (remindHero >= 0) {
                remindSpill = remindSpill.replace("H", "");
            }
        }
        //knight was checked
    } else if ((cb == kName) && (checked == true)) {
        if (mainChecked == false) {
            if (remindKnight < 0) {
                remindSpill = remindSpill.concat("K");
            }
        } else if ((hChecked == true) || (lChecked == true) || (bChecked == true) || (cChecked == true) || (dChecked == true) || (gChecked == true) || (aChecked == true)) {
            remindSpill = remindSpill.replace("N", "");
            if (remindKnight < 0) {
                remindSpill = remindSpill.concat("K");
            }
        } else {
            remindSpill = "K";
        }
        //knight was unchecked
    } else if ((cb == kName) && (checked == false)) {
        if (mainChecked == false) {
            if (remindKnight >= 0) {
                remindSpill = remindSpill.replace("K", "");
            }
        } else if ((hChecked == false) && (lChecked == false) && (bChecked == false) && (cChecked == false) && (dChecked == false) && (gChecked == false) && (aChecked == false)) {
            remindSpill = "HKLBCDGA";
        } else {
            if (remindKnight >= 0) {
                remindSpill = remindSpill.replace("K", "");
            }
        }
        //lord was checked
    } else if ((cb == lName) && (checked == true)) {
        if (mainChecked == false) {
            if (remindLord < 0) {
                remindSpill = remindSpill.concat("L");
            }
        } else if ((hChecked == true) || (kChecked == true) || (bChecked == true) || (cChecked == true) || (dChecked == true) || (gChecked == true) || (aChecked == true)) {
            remindSpill = remindSpill.replace("N", "");
            if (remindLord < 0) {
                remindSpill = remindSpill.concat("L");
            }
        } else {
            remindSpill = "L";
        }
        //lord was unchecked
    } else if ((cb == lName) && (checked == false)) {
        if (mainChecked == false) {
            if (remindLord >= 0) {
                remindSpill = remindSpill.replace("L", "");
            }
        } else if ((hChecked == false) && (kChecked == false) && (bChecked == false) && (cChecked == false) && (dChecked == false) && (gChecked == false) && (aChecked == false)) {
            remindSpill = "HKLBCDGA";
        } else {
            if (remindLord >= 0) {
                remindSpill = remindSpill.replace("L", "");
            }
        }
        //baron was checked
    } else if ((cb == bName) && (checked == true)) {
        if (mainChecked == false) {
            if (remindBaron < 0) {
                remindSpill = remindSpill.concat("B");
            }
        } else if ((hChecked == true) || (kChecked == true) || (lChecked == true) || (cChecked == true) || (dChecked == true) || (gChecked == true) || (aChecked == true)) {
            remindSpill = remindSpill.replace("N", "");
            if (remindBaron < 0) {
                remindSpill = remindSpill.concat("B");
            }
        } else {
            remindSpill = "B";
        }
        //baron was unchecked
    } else if ((cb == bName) && (checked == false)) {
        if (mainChecked == false) {
            if (remindBaron >= 0) {
                remindSpill = remindSpill.replace("B", "");
            }
        } else if ((hChecked == false) && (kChecked == false) && (lChecked == false) && (cChecked == false) && (dChecked == false) && (gChecked == false) && (aChecked == false)) {
            remindSpill = "HKLBCDGA";
        } else {
            if (remindBaron >= 0) {
                remindSpill = remindSpill.replace("B", "");
            }
        }
        //count was checked
    } else if ((cb == cName) && (checked == true)) {
        if (mainChecked == false) {
            if (remindCount < 0) {
                remindSpill = remindSpill.concat("C");
            }
        } else if ((hChecked == true) || (kChecked == true) || (lChecked == true) || (bChecked == true) || (dChecked == true) || (gChecked == true) || (aChecked == true)) {
            remindSpill = remindSpill.replace("N", "");
            if (remindCount < 0) {
                remindSpill = remindSpill.concat("C");
            }
        } else {
            remindSpill = "C";
        }
        //count was unchecked
    } else if ((cb == cName) && (checked == false)) {
        if (mainChecked == false) {
            if (remindCount >= 0) {
                remindSpill = remindSpill.replace("C", "");
            }
        } else if ((hChecked == false) && (kChecked == false) && (lChecked == false) && (bChecked == false) && (dChecked == false) && (gChecked == false) && (aChecked == false)) {
            remindSpill = "HKLBCDGA";
        } else {
            if (remindCount >= 0) {
                remindSpill = remindSpill.replace("C", "");
            }
        }
        //duke was checked
    } else if ((cb == dName) && (checked == true)) {
        if (mainChecked == false) {
            if (remindDuke < 0) {
                remindSpill = remindSpill.concat("D");
            }
        } else if ((hChecked == true) || (kChecked == true) || (lChecked == true) || (bChecked == true) || (cChecked == true) || (gChecked == true) || (aChecked == true)) {
            remindSpill = remindSpill.replace("N", "");
            if (remindDuke < 0) {
                remindSpill = remindSpill.concat("D");
            }
        } else {
            remindSpill = "D";
        }
        //duke was unchecked
    } else if ((cb == dName) && (checked == false)) {
        if (mainChecked == false) {
            if (remindDuke >= 0) {
                remindSpill = remindSpill.replace("D", "");
            }
        } else if ((hChecked == false) && (kChecked == false) && (lChecked == false) && (bChecked == false) && (cChecked == false) && (gChecked == false) && (aChecked == false)) {
            remindSpill = "HKLBCDGA";
        } else {
            if (remindDuke >= 0) {
                remindSpill = remindSpill.replace("D", "");
            }
        }
        //grand duke was checked
    } else if ((cb == gName) && (checked == true)) {
        if (mainChecked == false) {
            if (remindGduke < 0) {
                remindSpill = remindSpill.concat("G");
            }
        } else if ((hChecked == true) || (kChecked == true) || (lChecked == true) || (bChecked == true) || (cChecked == true) || (dChecked == true) || (aChecked == true)) {
            remindSpill = remindSpill.replace("N", "");
            if (remindGduke < 0) {
                remindSpill = remindSpill.concat("G");
            }
        } else {
            remindSpill = "G";
        }
        //grand duke was unchecked
    } else if ((cb == gName) && (checked == false)) {
        if (mainChecked == false) {
            if (remindGduke >= 0) {
                remindSpill = remindSpill.replace("G", "");
            }
        } else if ((hChecked == false) && (kChecked == false) && (lChecked == false) && (bChecked == false) && (cChecked == false) && (dChecked == false) && (aChecked == false)) {
            remindSpill = "HKLBCDGA";
        } else {
            if (remindGduke >= 0) {
                remindSpill = remindSpill.replace("G", "");
            }
        }
        //archduke was checked
    } else if ((cb == aName) && (checked == true)) {
        if (mainChecked == false) {
            if (remindAduke < 0) {
                remindSpill = remindSpill.concat("A");
            }
        } else if ((hChecked == true) || (kChecked == true) || (lChecked == true) || (bChecked == true) || (cChecked == true) || (dChecked == true) || (gChecked == true)) {
            remindSpill = remindSpill.replace("N", "");
            if (remindGduke < 0) {
                remindSpill = remindSpill.concat("A");
            }
        } else {
            remindSpill = "G";
        }
        //archduke was unchecked
    } else if ((cb == gName) && (checked == false)) {
        if (mainChecked == false) {
            if (remindGduke >= 0) {
                remindSpill = remindSpill.replace("A", "");
            }
        } else if ((hChecked == false) && (kChecked == false) && (lChecked == false) && (bChecked == false) && (cChecked == false) && (dChecked == false) && (gChecked == false)) {
            remindSpill = "HKLBCDGA";
        } else {
            if (remindAduke >= 0) {
                remindSpill = remindSpill.replace("A", "");
            }
        }
    }
    localStorage.setItem('RemindSpill', remindSpill)
}

//============================================================================================
function todayNow() {
    var today = new Date();
    var todayEpoch = today.getTime() / 1000.0;
    return todayEpoch;
}

function convertToDyHrMn(days, hours, minutes) {
    if (minutes == 60) {
        hours++;
        minutes = 0;
    }
    if (hours >= 24) {
        var daysExact = hours / 24;
        var daysTrunc = Math.floor(daysExact);
        var partialDays = daysExact - daysTrunc;
        hours = Math.round(partialDays * 24);
        days = daysTrunc + days;
    }
    return {
        days,
        hours,
        minutes
    }
}

function formatOutput(days, hours, minutes) {
    var dayStr = "";
    var hourStr = "";
    var minuteStr = "";
    if (days > 0) {
        dayStr = days + "d";
    }
    if (hours > 0) {
        hourStr = hours + "h";
    }
    if (minutes > 0) {
        minuteStr = minutes + "m";
    }
    return dayStr + " " + hourStr + " " + minuteStr;
}

function travelToGrove(skip) {
    const disarm = localStorage.getItem('DAT');
    var origin = $('#hudLocationContent').attr('class').replace("hudLocationContent ", "");
    if ($('#hudLocationContent').hasClass('hudLocationContent forbidden_grove') == true) {
        //Do nothing you are already there
    } else if ($(".forbiddenGroveHeaderValue").text() == "CLOSED") {
        alert('The Forbiddengrove is closed now, you cannot travel there right now')
    } else if (skip == "skip") {
        localStorage.setItem('TravelOrigin', origin);
        app.pages.TravelPage.travel("forbidden_grove");
        if (disarm == "Y") {
            hg.utils.TrapControl.disarmBait().go()
        }
    } else if (confirm('Travel to the Forbidden Grove now?') == true) {
        localStorage.setItem('TravelOrigin', origin);
        app.pages.TravelPage.travel("forbidden_grove");
        if (disarm == "Y") {
            hg.utils.TrapControl.disarmBait().go()
        }
    }
}

function travelToCove(skip) {
    const disarm = localStorage.getItem('DAT');
    var origin = $('#hudLocationContent').attr('class').replace("hudLocationContent ", "");
    if ($('#hudLocationContent').hasClass('hudLocationContent balacks_cove') == true) {
        //Do nothing, you are already there
    } else if (skip == "skip") {
        localStorage.setItem('TravelOrigin', origin);
        app.pages.TravelPage.travel("balacks_cove");
        if (disarm == "Y") {
            hg.utils.TrapControl.disarmBait().go()
        }
    } else if (confirm("Travel to Balack's Cove now?") == true) {
        localStorage.setItem('TravelOrigin', origin);
        app.pages.TravelPage.travel("balacks_cove");
        if (disarm == "Y") {
            hg.utils.TrapControl.disarmBait().go()
        }
    }
}

function travelToGarden(skip) {
    const disarm = localStorage.getItem('DAT');
    var origin = $('#hudLocationContent').attr('class').replace("hudLocationContent ", "");
    if ($('#hudLocationContent').hasClass('hudLocationContent seasonal_garden') == true) {
        //Do nothing, you are already there
    } else if (skip == "skip") {
        localStorage.setItem('TravelOrigin', origin);
        app.pages.TravelPage.travel("seasonal_garden");
        if (disarm == "Y") {
            hg.utils.TrapControl.disarmBait().go()
        }
    } else if (confirm("Travel to the Seasonal Garden now?") == true) {
        localStorage.setItem('TravelOrigin', origin);
        app.pages.TravelPage.travel("seasonal_garden");
        if (disarm == "Y") {
            hg.utils.TrapControl.disarmBait().go()
        }
    }
}

function travelToSpill(skip) {
    const disarm = localStorage.getItem('DAT');
    var origin = $('#hudLocationContent').attr('class').replace("hudLocationContent ", "");
    if ($('#hudLocationContent').hasClass('hudLocationContent pollution_outbreak') == true) {
        //Do nothing, you are already there
    } else if (skip == "skip") {
        localStorage.setItem('TravelOrigin', origin);
        app.pages.TravelPage.travel("pollution_outbreak");
        if (disarm == "Y") {
            hg.utils.TrapControl.disarmBait().go()
        }
    } else if (confirm("Travel to the Toxic Spill now?") == true) {
        localStorage.setItem('TravelOrigin', origin);
        app.pages.TravelPage.travel("pollution_outbreak");
        if (disarm == "Y") {
            hg.utils.TrapControl.disarmBait().go()
        }
    }
}

function travelBack(skip) {
    const disarm = localStorage.getItem('DAT');
    var origin = localStorage.getItem('TravelOrigin');
    if ($('#hudLocationContent').hasClass(origin) == true) {
        //    //Do nothing, you are already there
    } else if (skip == "skip") {
        app.pages.TravelPage.travel(origin);
        if (disarm == "Y") {
            hg.utils.TrapControl.disarmBait().go()
        }
    } else if (confirm("Travel back to the " + origin + "?") == true) {
        app.pages.TravelPage.travel(origin);
        if (disarm == "Y") {
            hg.utils.TrapControl.disarmBait().go()
        }
    }
}
