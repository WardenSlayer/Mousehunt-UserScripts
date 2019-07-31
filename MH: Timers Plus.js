// ==UserScript==
// @name         MH Timers+
// @author       Warden Slayer - Warden Slayer#2302
// @namespace    https://greasyfork.org/en/users/227259-wardenslayer
// @version      1.0
// @description  Description Pending
// @include      https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @include      http://www.mousehuntgame.com/*
// @include      https://www.mousehuntgame.com/*
// @grant GM_setClipboard
// ==/UserScript==

$(document).ready(function() {
    console.log("Timers+");
    buildTimerBox();
    startTimers();
});

function buildTimerBox() {
    if ($(".timerBox").length > 0) return;
    var container = $("#mousehuntContainer");
    var timerBox = document.createElement("div");
    timerBox.classList.add("timerBox");
    $(timerBox).css({'background-image': 'url("https://image.freepik.com/free-vector/cool-blue-parchment_53876-86280.jpg")','background-size':'cover'});
    $(timerBox).css({ 'height': 50 + "px",'padding': 2+"px"});
    let forbiddenGrove = buildForbiddenGrove()
    timerBox.appendChild(forbiddenGrove)
    //LAST
    container.prepend(timerBox);
}

function startTimers() {
    localStorage.setItem("mainTimer", 0);
    runTimers();
}
function runTimers() {
    var myTimer = setInterval(updateText, 10000);
}
function updateText() {
    updateForbiddenGroveTimer()
    }
//========================================= Forbidden Grove =========================================
function buildForbiddenGrove() {
    var timerBox = $(".timerBox");
    var forbiddenGrove = document.createElement("div");
    forbiddenGrove.classList.add("forbiddenGrove");
    $(forbiddenGrove).css({'border': '1px solid black','width': '18%','height': '90%','padding': 2+"px"});
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
    $(forbiddenGroveHeaderLabel).css('float','left')
    $(forbiddenGroveHeaderValue).css("marginLeft","100px");
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
    $(forbiddenGroveClosesLabel).css('float','left')
    $(forbiddenGroveClosesValue).css("marginLeft","50px");
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
    $(forbiddenGroveOpensLabel).css('float','left')
    $(forbiddenGroveOpensValue).css("marginLeft","50px");
    forbiddenGroveOpens.appendChild(forbiddenGroveOpensLabel);
    forbiddenGroveOpens.appendChild(forbiddenGroveOpensValue);
    //Append
    forbiddenGrove.appendChild(forbiddenGroveHeader);
    forbiddenGrove.appendChild(forbiddenGroveCloses);
    forbiddenGrove.appendChild(forbiddenGroveOpens);
    return forbiddenGrove;
}
function updateForbiddenGroveTimer(){
    var now = new Date();
}
//============================================================================================
//    var n = localStorage.getItem("mainTimer");
//    var closeText = $(".forbiddenGroveClosesValue");
//    n++;
//    localStorage.setItem("mainTimer", n);
//    var units = null;
//    if (n==1){units = " Hour"}else{units =" Hours"}
//    var today = new Date();
//    $(closeText).text(today+units);



