// ==UserScript==
// @name         MH King's Crowns+
// @author       Warden Slayer - Warden Slayer#2302
// @namespace    https://greasyfork.org/en/users/227259-wardenslayer
// @version      1.7.5
// @description  Locked Favorites, Community Ranks, and Copy Crowns Button
// @include      https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @include      http://www.mousehuntgame.com/*
// @include      https://www.mousehuntgame.com/*
// @grant GM_setClipboard
// ==/UserScript==
$(document).ready(function() {
    var observer = new MutationObserver(callback);
    var observerOptions = {
        childList: true,
        attributes: false,
        subtree: false
    };
    if ($("#tabbarContent_page_2").get(0)) {
        observer.observe($("#tabbarContent_page_2").get(0), observerOptions);
    }
});

function callback(mutationList, observer) {
    mutationList.forEach(mutation => {
        switch (mutation.type) {
            case "childList":
                if (localStorage.getItem("haltCode") == "Y") {
                    localStorage.setItem("haltCode", "N");
                    break;
                }
                buildToolbar();
                if (localStorage.getItem("ShowCommunityRanks") == "Y") {
                    showCommunityRanks();
                }

                if (
                    localStorage.getItem("Lock Favorites") == "Y" &&
                    $(".favoriteCrownToggle.crownAction").length > 0
                ) {
                    lockFavorites();
                } else {
                    $(".crownheader.crownheadertop").css(
                        "background",
                        "url('https://image.flaticon.com/icons/svg/189/189671.svg') no-repeat left top"
                    );
                }

                localStorage.setItem("haltCode", "Y");
                break;
        }
    });
}

function buildToolbar() {
    if ($(".toolBar").length > 0) return;
    var toolBar = document.createElement("div");
    toolBar.classList.add("toolBar");

    // Lock Favs CB
    var lockFavs = document.createElement("input");
    lockFavs.type = "checkbox";
    lockFavs.name = "lockFavs";
    lockFavs.value = "";
    lockFavs.id = "lockFavs";
    if (localStorage.getItem("LockFavs") == "Y") {
        lockFavs.checked = "Yes";
    } else {
        lockFavs.checked = "";
    }

    var lockFavsLabel = document.createElement("label");
    lockFavsLabel.htmlFor = "lockFavsLabel";
    lockFavsLabel.appendChild(document.createTextNode("Lock Favorites"));
    if ($(".favoriteCrownToggle.crownAction").length > 0) {
        toolBar.appendChild(lockFavs);
        toolBar.appendChild(lockFavsLabel);
    }
    // Community Ranks CB
    var communityRanks = document.createElement("input");
    communityRanks.type = "checkbox";
    communityRanks.name = "communityRanks";
    communityRanks.value = "";
    communityRanks.id = "communityRanks";
    communityRanks.checked = "";
    if (localStorage.getItem("ShowCommunityRanks") == "Y") {
        communityRanks.checked = "Yes";
    } else {
        communityRanks.checked = "";
    }

    var communityRanksLabel = document.createElement("label");
    communityRanksLabel.htmlFor = "communityRanksLabel";
    communityRanksLabel.appendChild(
        document.createTextNode("Show Community Ranks  ")
    );
    toolBar.appendChild(communityRanks);
    toolBar.appendChild(communityRanksLabel);

    //Copy Crown Button
    var copyCrownsButton = document.createElement("button");
    copyCrownsButton.id = "copyCrownsButton";
    copyCrownsButton.innerText = "Copy Crowns to Clipboard";
    copyCrownsButton.addEventListener("click", copyCrowns)
    toolBar.appendChild(copyCrownsButton);

    // Last
    var crownBreak = $(".crownbreak").first();
    if ($(".crownheader.crownheadertop").length < 1) {
        var header = $(".crownbreak")
            .last()
            .clone();
        header.insertBefore($(".crownheader.crownheadergold"));
        crownBreak = $(header);
    }
    crownBreak.append(toolBar);
    $(".toolBar").css({
        float: "right"
    });
}

/********** Lock Favs **********/
$(document).on("change", "#lockFavs", function() {
    if (
        window.location.href.includes("profile.php") &&
        $("#tabbarContent_page_2").hasClass("active")
    ) {
        // Check to see if the cb was JUST checked
        if (this.checked) {
            // Put the checked value into storage
            localStorage.setItem("LockFavs", "Y");
            lockFavs.checked = "Yes";
            lockFavorites();
        } else {
            // Put the checked value into storage
            localStorage.setItem("LockFavs", "N");
            lockFavs.checked = "";
            unlockFavorites();
        }
    }
});

function lockFavorites() {
    localStorage.setItem("Lock Favorites", "Y");
    if ($(".mousebox.favorite").length < 0) {
        localStorage.setItem("LockFavs", "N");
        lockFavs.checked = "";
        return;
    }
    var allMice = $(".favoriteCrownToggle.crownAction");
    allMice.css("pointer-events", "none");
    $(".nocrowns.crownAction").css("pointer-events", "none");
    $(".crownheader.crownheadertop").css(
        "background",
        "url('https://image.flaticon.com/icons/svg/204/204310.svg') no-repeat left top"
    );
    $(":submit").last().css("pointer-events", "none");
}

function unlockFavorites() {
    localStorage.setItem("Lock Favorites", "N");
    var allMice = $(".favoriteCrownToggle.crownAction");
    allMice.css("pointer-events", "auto");
    $(".nocrowns.crownAction").css("pointer-events", "auto");
    $(".crownheader.crownheadertop").css(
        "background",
        "url('https://image.flaticon.com/icons/svg/189/189671.svg') no-repeat left top"
    );
    $(":submit").last().css("pointer-events", "auto");
}

function filterOutTopFavs(elements) {
    var seen = {};
    var result = elements.filter(function() {
        var txt = $(this).siblings().last().text();
        if (seen[txt]) {
            return true;
        } else {
            seen[txt] = true;
            if (
                $(this)
                .parent()
                .parent()
                .hasClass("mousebox favorite")
            ) {
                return false;
            } else {
                return true;
            }
        }
    });
    return result;
}

function sortAcsending(result) {
    var array = result.toArray();
    array = array.sort(function(a, b) {
        a = parseInt($(a).text(), 10);
        b = parseInt($(b).text(), 10);
        return a - b;
    });
    return array;
}

/********** Community Ranks **********/
$(document).on("change", "#communityRanks", function() {
    if (
        window.location.href.includes("profile.php") &&
        $("#tabbarContent_page_2").hasClass("active")
    ) {
        // Check to see if the cb was JUST checked
        if (this.checked) {
            // Put the checked value into storage
            localStorage.setItem("ShowCommunityRanks", "Y");
            communityRanks.checked = "Yes";
            showCommunityRanks();
        } else {
            // Put the checked value into storage
            localStorage.setItem("ShowCommunityRanks", "N");
            communityRanks.checked = "";
            hideCommunityRanks();
        }
    }
});

function showCommunityRanks() {
    var totalMice = 979;
    if ($(".crownheader.crownheadercommunity").length > 0) {
        return;
    }
    var crownBreak = $(".crownbreak").first();
    var spacer4 = $(".crownbreak")
        .last()
        .clone()
        .attr("id", "spacer4");
    var communityCrownHeader = $(
        "<div class='crownheader crownheadercommunity'>Community Ranks <div class='crownnote'>Crown Summary</div></div>"
    );
    communityCrownHeader.css(
        "background",
        "url('https://image.flaticon.com/icons/svg/478/478941.svg') no-repeat left top"
    );
    communityCrownHeader.insertAfter(crownBreak);
    spacer4.insertAfter(communityCrownHeader);
    var allMice = $(".mousebox");
    var allBronze = allMice.find(
        ".numcatches.bronze,.numcatches.silver,.numcatches.gold,.numcatches.platinum,.numcatches.diamond"
    );
    allBronze = filterOutTopFavs(allBronze);
    var allSilver = allMice.find(
        ".numcatches.silver,.numcatches.gold,.numcatches.platinum,.numcatches.diamond"
    );
    allSilver = filterOutTopFavs(allSilver);
    var allGold = allMice.find(
        ".numcatches.gold,.numcatches.platinum,.numcatches.diamond"
    );
    allGold = filterOutTopFavs(allGold);
    var allPlat = allMice.find(
        ".numcatches.platinum,.numcatches.diamond"
    );
    allPlat = filterOutTopFavs(allPlat);
    var allDiamond = allMice.find(
        ".numcatches.diamond"
    );
    allDiamond = filterOutTopFavs(allDiamond);
    var bronzeCrowns = allBronze.length;
    var silverCrowns = allSilver.length;
    var goldCrowns = allGold.length;
    var platCrowns = allPlat.length;
    var diamondCrowns = allDiamond.length;
    var bronzeLink = "https://docs.google.com/spreadsheets/d/19_wHCkwiT5M6LS7XNLt4NYny98fjpg4UlHbgOD05ijw/pub?fbclid=IwAR3a1Ku2xTl1mIDksUr8Lk5ORMEnuv7jnvIy9K6OBeziG6AyvYYlZaIQkHY"
    var silverLink = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQG5g3vp-q7LRYug-yZR3tSwQzAdN7qaYFzhlZYeA32vLtq1mJcq7qhH80planwei99JtLRFAhJuTZn/pubhtml?fbclid=IwAR3sPXNLloGnFk324a0HShroP1E-sNcnQBlRTjJ7gScWTWosqmXv5InB_Ns'
    var goldLink = 'https://docs.google.com/spreadsheets/d/10OGD5OYkGIEAbiez7v92qU5Fdul0ZtCRgEjlECkwZJE/pubhtml?gid=478731024&single=true&fbclid=IwAR28w7IQyMp91I62CR3GOILpbeLwgKaydIoQimMNm7j3S0DL8Mj_IsRpGD4'
    var rankSummary = $(
        "<div class='rank summary' style='font-size: 14px'></div>"
    );
    rankSummary.insertAfter(communityCrownHeader);
    var bronzeText = document.createTextNode("Bronze: " + bronzeCrowns + " (" + ((bronzeCrowns / totalMice) * 100).toFixed(2) + "%) | ");
    var silverText = document.createTextNode("Silver: " + silverCrowns + " (" + ((silverCrowns / totalMice) * 100).toFixed(2) + "%) | ");
    var goldText = document.createTextNode("Gold: " + goldCrowns + " (" + ((goldCrowns / totalMice) * 100).toFixed(2) + "%) | ");
    var platText = document.createTextNode("Platinum: " + platCrowns + " (" + ((platCrowns / totalMice) * 100).toFixed(2) + "%) | ");
    var diamondText = document.createTextNode("Diamond: " + diamondCrowns + " (" + ((diamondCrowns / totalMice) * 100).toFixed(2) + "%)");
    var aBronze = document.createElement('a');
    aBronze.appendChild(bronzeText);
    var bronzeRank = getRankBronze(allBronze.length)
    aBronze.title = "90% Crowned Scoreboard: "+bronzeRank;
    aBronze.href = bronzeLink;
    $(aBronze).attr("target", "_blank");
    var aSilver = document.createElement('a');
    aSilver.appendChild(silverText);
    var silverRank = getRankSilver(allSilver.length)
    aSilver.title = "MHCC Scoreboard: "+silverRank;
    aSilver.href = silverLink;
    $(aSilver).attr("target", "_blank");
    var aGold = document.createElement('a');
    aGold.appendChild(goldText);
    aGold.title = "MHCC Elite Scoreboard";
    aGold.href = goldLink;
    $(aGold).attr("target", "_blank");
    $(rankSummary).append(aBronze).append(aSilver).append(aGold).append(platText).append(diamondText);
}

function getRankBronze(crowns) {
    var totalMice = 979;
    var crownPrecent = ((crowns / totalMice) * 100).toFixed(2) + "%";
    var rank = "";
    if (crowns >= totalMice) {
        rank = "Hepatizon";
    } else if (crowns >= 970) {
        rank = "Electrum";
    } else if (crowns >= 960) {
        rank = "Palladium";
    } else if (crowns >= 931) {
        rank = "Cobalt";
    } else if (crowns >= 882) {
        rank = "Bronze (full)";
    } else if (crowns >= 833) {
        rank = "Titanium";
    } else if (crowns >= 784) {
        rank = "Pewter";
    } else if (crowns >= 735) {
        rank = "Brass";
    } else if (crowns >= 686) {
        rank = "Copper";
    } else if (crowns >= 637) {
        rank = "Tin";
    } else {
        rank = "Rust";
    }

    return rank;
}

function getRankSilver(crowns) {
    var totalMice = 979;
    var crownPrecent = ((crowns / totalMice) * 100).toFixed(2) + "%";
    var rank = "";
    if (crowns >= 881) {
        rank = "Super Secret Squirrel";
    } else if (crowns >= 832) {
        rank = "Grizzled Squirrel";
    } else if (crowns >= 783) {
        rank = "Flying Squirrel";
    } else if (crowns >= 734) {
        rank = "Chinchilla";
    } else if (crowns >= 685) {
        rank = "Meerkat";
    } else if (crowns >= 636) {
        rank = "Ferret";
    } else if (crowns >= 587) {
        rank = "Prairie Dog";
    } else if (crowns >= 538) {
        rank = "Marmot";
    } else if (crowns >= 489) {
        rank = "Woodchuck";
    } else if (crowns >= 440) {
        rank = "Wombat";
    } else if (crowns >= 391) {
        rank = "Pine Marten";
    } else if (crowns >= 342) {
        rank = "Chipmunk";
    } else if (crowns >= 293) {
        rank = "Bandicoot";
    } else {
        rank = "Weasel";
    }
    return rank;
}


function hideCommunityRanks() {
    if ($(".crownheader.crownheadercommunity").length > 0) {
        $(".crownheader.crownheadercommunity").remove();
        $("#spacer4").remove();
        $(".rank.summary").remove();
    }
}

function copyCrowns() {
    var allMice = $(".mousebox,.mousebox.favorite");
    var allCrowns = allMice.find(".numcatches.bronze,.numcatches.silver,.numcatches.gold,.numcatches.platinum,.numcatches.diamond");
    var results = filterOutTopFavs(allCrowns.parent().find(".name"));
    var array = $(results).toArray();
    var miceArray = [];
    var catchArray = [];
    array.forEach(function(elements, i) {
        var mouseName = $(elements).parent().parent().find('img').attr('title');
        mouseName = correctMouseName(mouseName);
        var mouseCatches = $(elements).siblings().text();
        miceArray.push(mouseName);
        catchArray.push(mouseCatches);
    })
    var combinedArray = [],
        i = -1;
    while (miceArray[++i]) {
        combinedArray.push([miceArray[i], catchArray[i]]);
    }
    var remainingMiceArray = $(".remainingMouse").children().toArray();
    remainingMiceArray.forEach(function(elements, i) {
        var txt = $(elements).text();
        if (txt == " - Select a mouse -"){}
        else {
        txt = txt.replace("(",",(").replace("(","").replace(")","").replace(/\s*,\s*/g, ",");
        txt = txt.split(",");
        let mouseName = txt[0];
        mouseName = correctMouseName(mouseName);
        let catches = txt[1];
        combinedArray.push([mouseName,catches])
        }
    })
    let finalTable = combinedArray.sort().map(e => e.join(",")).join("\n");
    GM_setClipboard(finalTable);
    var copyCrownsButton = $("#copyCrownsButton")
    copyCrownsButton.text("---------Copied!---------")
    setTimeout(function() {
    copyCrownsButton.text("Copy Crowns to Clipboard")
     }, 1500);
}
function correctMouseName(mouseName){
let newMouseName = "";
 if (mouseName == "Ful"){newMouseName = "Ful'mina the Mountain Queen"}
    else if (mouseName == "Kalor"){newMouseName = "Kalor'Ignis of the Geyser"}
    else if (mouseName == "Inferna, The Engulfed"){newMouseName = "Inferna the Engulfed"}
    else if (mouseName == "Nachous, The Molten"){newMouseName = "Nachous the Molten"}
    else if (mouseName == "Stormsurge, the Vile Tempest"){newMouseName = "Stormsurge the Vile Tempest"}
    else if (mouseName == "Bruticus, the Blazing"){newMouseName = "Bruticus the Blazing"}
    else if (mouseName == "Vincent, The Magnificent"){newMouseName = "Vincent The Magnificent"}
    else if (mouseName == "Corky, the Collector Mouse"){newMouseName = "Corky the Collector Mouse"}
    else if (mouseName == "Record Keeper"){newMouseName = "Record Keeper's Assistant"}
    else if (mouseName == "Keeper"){newMouseName = "Keeper's Assistant"}
    else {newMouseName = mouseName}
return newMouseName;
}
