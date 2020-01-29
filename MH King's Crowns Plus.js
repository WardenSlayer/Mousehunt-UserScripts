// ==UserScript==
// @name         MH King's Crowns+
// @author       Warden Slayer - Warden Slayer#2302
// @namespace    https://greasyfork.org/en/users/227259-wardenslayer
// @version      1.8
// @description  Locked Favorites, Community Ranks, and Copy Crowns Button
// @include      https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @include      http://www.mousehuntgame.com/*
// @include      https://www.mousehuntgame.com/*
// @grant GM_setClipboard
// ==/UserScript==
$(document).ready(function() {
    var observerA = new MutationObserver(callback);
    var observerB = new MutationObserver(callback);
    var observerOptionsA = {
        childList: true,
        attributes: false,
        subtree: false
    };
    var observerOptionsB = {
        childList: true,
        attributes: true,
        subtree: true
    };
    if ($('.mousehuntHud-page-tabHeader.kings_crowns').hasClass('active')) {
        generate()
    } else if ($('#tabbarContent_page').find('.tabbarContent-tab.active').children().filter('.active').attr('data-template') == 'tab_profile') {
        observerB.observe($(".mousehuntHud-page-tabHeader-container").get(0), observerOptionsB);
        //is 2 of these active at once a bad idea?
        observerA.observe($("#tabbarContent_page").get(0), observerOptionsA);
    } else if ($("#tabbarContent_page").get(0)) {
        observerA.observe($("#tabbarContent_page").get(0), observerOptionsA);
    } else {
        return false
    }
});

function callback(mutationList, observer) {
    mutationList.forEach(mutation => {
        if (mutation.type == 'childList') {
            let $nodes = $(mutation.addedNodes).filter('.active');
            if ($nodes.attr('data-template') == 'tab_kings_crowns') {
                generate()
            }
        } else if (mutation.type == 'attributes') {
            let $nodes = $(mutation.target);
            if ($nodes.hasClass('mousehuntHud-page-tabHeader kings_crowns active')) {
                if (localStorage.getItem("haltCode") == "Y") {
                    localStorage.setItem("haltCode", "N");
                } else {
                    setTimeout(generate, 2000);
                    localStorage.setItem("haltCode", "Y");
                }
            }
        }
    })
};

function generate() {
    buildToolbar();
    if (localStorage.getItem("Lock Favorites") == "Y" && $(".mouseCrownsView-group-mouse-favouriteButton").length > 0) {
        lockFavorites();
    }
    if (localStorage.getItem("ShowCommunityRanks") == "Y") {
        showCommunityRanks();
    }
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
    if ($(".mouseCrownsView-group-mouse-favouriteButton").length > 0) {
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
    let crownBreak = $('.mouseCrownsView-group.favourite');
    crownBreak.append(toolBar);
    $(".toolBar").css({
        'float': "right",
    });
}

/********** Lock Favs **********/
$(document).on("change", "#lockFavs", function() {
    if (
        window.location.href.includes("profile.php") &&
        $(".mousehuntHud-page-tabHeader.kings_crowns").hasClass("active")
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
    if ($(".mouseCrownsView-group-mouse-favouriteButton").length < 0) {
        localStorage.setItem("LockFavs", "N");
        lockFavs.checked = "";
        return;
    }
    var allMice = $(".mouseCrownsView-group-mouse").find('.mouseCrownsView-group-mouse-favouriteButton');
    allMice.css("pointer-events", "none");
    $(".mouseCrownsView-crown.favourite").css(
        "background",
        "url('https://image.flaticon.com/icons/svg/204/204310.svg') no-repeat left top"
    );
}

function unlockFavorites() {
    localStorage.setItem("Lock Favorites", "N");
    var allMice = $(".mouseCrownsView-group-mouse").find('.mouseCrownsView-group-mouse-favouriteButton');
    allMice.css("pointer-events", "auto");
    $(".mouseCrownsView-crown.favourite").css({
        'background-image': "url('https://www.mousehuntgame.com/images/ui/camp/trap/star_favorite.png')",
        'display': 'inline-block',
        'vertical-align': 'middle',
        'width': '50px',
        'height': '50px',
        'margin-right': '5px',
        'background-repeat': 'no-repeat',
        'background-position': '50% 50%',
        'background-size': 'contain'
    });
}

/********** Community Ranks **********/
$(document).on("change", "#communityRanks", function() {
    if (
        window.location.href.includes("profile.php") &&
        $(".mousehuntHud-page-tabHeader.kings_crowns").hasClass("active")
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
    var totalMice = 1007;
    if ($(".crownheader.crownheadercommunity").length > 0) {
        return;
    }
    var crownBreak = $(".mouseCrownsView-group.favourite");
    var communityCrownHeader = $(
        "<div class='crownheader crownheadercommunity'>Community Ranks <div class='crownnote'>Crown Summary</div></div>"
    );
    communityCrownHeader.css({
        'background-image': "url('https://image.flaticon.com/icons/svg/478/478941.svg')",
        'background-repeat': 'no-repeat',
    });
    communityCrownHeader.insertAfter(crownBreak);
    var allUncrowned = $(".mouseCrownsView-group.none").find(".mouseCrownsView-group-mouse");
    var allBronze = $(".mouseCrownsView-group.bronze,.mouseCrownsView-group.silver,.mouseCrownsView-group.gold,.mouseCrownsView-group.platinum,.mouseCrownsView-group.diamond").find(".mouseCrownsView-group-mouse");
    var allSilver = $(".mouseCrownsView-group.silver,.mouseCrownsView-group.gold,.mouseCrownsView-group.platinum,.mouseCrownsView-group.diamond").find(".mouseCrownsView-group-mouse");
    var allGold = $(".mouseCrownsView-group.gold,.mouseCrownsView-group.platinum,.mouseCrownsView-group.diamond").find(".mouseCrownsView-group-mouse");
    var allPlat = $(".mouseCrownsView-group.platinum,.mouseCrownsView-group.diamond").find(".mouseCrownsView-group-mouse");
    var allDiamond = $(".mouseCrownsView-group.diamond").find(".mouseCrownsView-group-mouse");
    var bronzeCrowns = allBronze.length;
    var silverCrowns = allSilver.length;
    var goldCrowns = allGold.length;
    var platCrowns = allPlat.length;
    var diamondCrowns = allDiamond.length;
    var uncrowned = totalMice-bronzeCrowns;
    var bronzeLink = "https://docs.google.com/spreadsheets/d/19_wHCkwiT5M6LS7XNLt4NYny98fjpg4UlHbgOD05ijw/pub?fbclid=IwAR3a1Ku2xTl1mIDksUr8Lk5ORMEnuv7jnvIy9K6OBeziG6AyvYYlZaIQkHY"
    var silverLink = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQG5g3vp-q7LRYug-yZR3tSwQzAdN7qaYFzhlZYeA32vLtq1mJcq7qhH80planwei99JtLRFAhJuTZn/pubhtml?fbclid=IwAR3sPXNLloGnFk324a0HShroP1E-sNcnQBlRTjJ7gScWTWosqmXv5InB_Ns'
    var goldLink = 'https://docs.google.com/spreadsheets/d/10OGD5OYkGIEAbiez7v92qU5Fdul0ZtCRgEjlECkwZJE/pubhtml?gid=478731024&single=true&fbclid=IwAR28w7IQyMp91I62CR3GOILpbeLwgKaydIoQimMNm7j3S0DL8Mj_IsRpGD4'
    var rankSummary = $("<div class='rank summary'</div>");
    $(rankSummary).append("<div class='lineOne'</div>");
    $(rankSummary).append("<div class='lineTwo'</div>");
    rankSummary.css({
        'font-size': '16px',
        'padding': '5px',
    });
    rankSummary.insertAfter(communityCrownHeader);
    var uncrownedText = document.createTextNode("Uncrowned: " + uncrowned + " (" + ((uncrowned / totalMice) * 100).toFixed(2) + "%) | ");
    $(rankSummary).attr('title', 'Mobster and Leprechaun excluded from counts');
    var bronzeText = document.createTextNode("Bronze: " + bronzeCrowns + " (" + ((bronzeCrowns / totalMice) * 100).toFixed(2) + "%) | ");
    var silverText = document.createTextNode("Silver: " + silverCrowns + " (" + ((silverCrowns / totalMice) * 100).toFixed(2) + "%)");
    var goldText = document.createTextNode("Gold: " + goldCrowns + " (" + ((goldCrowns / totalMice) * 100).toFixed(2) + "%) | ");
    var platText = document.createTextNode("Platinum: " + platCrowns + " (" + ((platCrowns / totalMice) * 100).toFixed(2) + "%) | ");
    var diamondText = document.createTextNode("Diamond: " + diamondCrowns + " (" + ((diamondCrowns / totalMice) * 100).toFixed(2) + "%)");
    var aBronze = document.createElement('a');
    aBronze.appendChild(bronzeText);
    var bronzeRank = getRankBronze(allBronze.length)
    aBronze.title = "90% Crowned Scoreboard: " + bronzeRank;
    aBronze.href = bronzeLink;
    $(aBronze).attr("target", "_blank");
    var aSilver = document.createElement('a');
    aSilver.appendChild(silverText);
    var silverRank = getRankSilver(allSilver.length)
    aSilver.title = "MHCC Scoreboard: " + silverRank;
    aSilver.href = silverLink;
    $(aSilver).attr("target", "_blank");
    $('.lineOne').append(uncrownedText).append(aBronze).append(aSilver);
    var aGold = document.createElement('a');
    aGold.appendChild(goldText);
    aGold.title = "MHCC Elite Scoreboard";
    aGold.href = goldLink;
    $(aGold).attr("target", "_blank");
    $('.lineTwo').append(aGold).append(platText).append(diamondText);
    $('.lineOne,.lineTwo').css({
        'width': '100%',
        'margin-bottom': '2px',
    });
}

function getRankBronze(crowns) {
    var totalMice = 1007;
    var crownPrecent = ((crowns / totalMice) * 100).toFixed(2) + "%";
    var rank = "";
    if (crowns >= totalMice) {
        rank = "Hepatizon";
    } else if (crowns >= 997) {
        rank = "Electrum";
    } else if (crowns >= 987) {
        rank = "Palladium";
    } else if (crowns >= 957) {
        rank = "Cobalt";
    } else if (crowns >= 907) {
        rank = "Bronze (full)";
    } else if (crowns >= 856) {
        rank = "Titanium";
    } else if (crowns >= 806) {
        rank = "Pewter";
    } else if (crowns >= 756) {
        rank = "Brass";
    } else if (crowns >= 705) {
        rank = "Copper";
    } else if (crowns >= 655) {
        rank = "Tin";
    } else {
        rank = "Rust";
    }

    return rank;
}

function getRankSilver(crowns) {
    var totalMice = 1007;
    var crownPrecent = ((crowns / totalMice) * 100).toFixed(2) + "%";
    var rank = "";
    if (crowns >= 906) {
        rank = "Super Secret Squirrel";
    } else if (crowns >= 856) {
        rank = "Grizzled Squirrel";
    } else if (crowns >= 806) {
        rank = "Flying Squirrel";
    } else if (crowns >= 755) {
        rank = "Chinchilla";
    } else if (crowns >= 705) {
        rank = "Meerkat";
    } else if (crowns >= 655) {
        rank = "Ferret";
    } else if (crowns >= 604) {
        rank = "Prairie Dog";
    } else if (crowns >= 554) {
        rank = "Marmot";
    } else if (crowns >= 504) {
        rank = "Woodchuck";
    } else if (crowns >= 453) {
        rank = "Wombat";
    } else if (crowns >= 403) {
        rank = "Pine Marten";
    } else if (crowns >= 352) {
        rank = "Chipmunk";
    } else if (crowns >= 302) {
        rank = "Bandicoot";
    } else {
        rank = "Weasel";
    }
    return rank;
}

function hideCommunityRanks() {
    if ($(".crownheader.crownheadercommunity").length > 0) {
        $(".crownheader.crownheadercommunity").remove();
        $(".rank.summary").remove();
    }
}

function copyCrowns() {
    var allMice = $(".mouseCrownsView-group.none,.mouseCrownsView-group.bronze,.mouseCrownsView-group.silver,.mouseCrownsView-group.gold,.mouseCrownsView-group.platinum,.mouseCrownsView-group.diamond").find(".mouseCrownsView-group-mouse");
    var miceArray = [];
    allMice.each(function(i) {
        let $mouse = correctMouseName($(this).find('.mouseCrownsView-group-mouse-name').text());
        let $count = parseInt($(this).find('.mouseCrownsView-group-mouse-catches').text().replace(',',""),10);
        miceArray[i] = [$mouse,$count];
    })
    let finalTable = miceArray.map(e => e.join(",")).join("\n");
    GM_setClipboard(finalTable);
    var copyCrownsButton = $("#copyCrownsButton")
    copyCrownsButton.text("---------Copied!---------")
    setTimeout(function() {
        copyCrownsButton.text("Copy Crowns to Clipboard")
    }, 1500);
}

function correctMouseName(mouseName) {
    let newMouseName = "";
    if (mouseName == "Ful'Mina, The Mountain Queen") {
        newMouseName = "Ful'mina the Mountain Queen"
    } else if (mouseName == "Inferna, The Engulfed") {
        newMouseName = "Inferna the Engulfed"
    } else if (mouseName == "Nachous, The Molten") {
        newMouseName = "Nachous the Molten"
    } else if (mouseName == "Stormsurge, the Vile Tempest") {
        newMouseName = "Stormsurge the Vile Tempest"
    } else if (mouseName == "Bruticus, the Blazing") {
        newMouseName = "Bruticus the Blazing"
    } else if (mouseName == "Vincent, The Magnificent") {
        newMouseName = "Vincent The Magnificent"
    } else if (mouseName == "Corky, the Collector") {
        newMouseName = "Corky the Collector"
    } else {
        newMouseName = mouseName
    }
    return newMouseName;
}
