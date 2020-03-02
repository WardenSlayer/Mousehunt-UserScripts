// ==UserScript==
// @name         MH: Profile+
// @author       Warden Slayer - Warden Slayer#2302
// @namespace    https://greasyfork.org/en/users/227259-wardenslayer
// @version      1.9.1
// @description  Community requested features for the tabs on your MH profile.
// @include      https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @include      http://www.mousehuntgame.com/*
// @include      https://www.mousehuntgame.com/*
// @grant GM_setClipboard
// ==/UserScript==
$(document).ready(function() {
    var observerB = new MutationObserver(callback);
    var observerOptionsB = {
        childList: true,
        attributes: true,
        subtree: true
    };
    if ($('.mousehuntHud-page-tabHeader.kings_crowns').hasClass('active')) {
        //On king's crowns tab
        generate()
        observerB.observe($(".mousehuntHud-page-tabHeader-container").get(0), observerOptionsB);
    } else if ($('.mousehuntHud-page-tabHeader.items').hasClass('active')) {
        //On item tab
        generateItems()
        observerB.observe($(".mousehuntHud-page-tabHeader-container").get(0), observerOptionsB);
    } else if ($('#tabbarContent_page').find('.tabbarContent-tab.active').children().filter('.active').attr('data-template') == 'tab_profile') {
        //On profile tab
        observerB.observe($(".mousehuntHud-page-tabHeader-container").get(0), observerOptionsB);
    } else if ($('#tabbarContent_page').find('.tabbarContent-tab.active').children().filter('.active').attr('data-template') == 'tab_mice') {
        //On mouse Tab
        observerB.observe($(".mousehuntHud-page-tabHeader-container").get(0), observerOptionsB);
    } else if ($("#tabbarContent_page").get(0)) {
        //not on profile at all. probably at camp.
        observerB.observe($("#tabbarContent_page").get(0), observerOptionsB);
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
            } else if ($nodes.attr('data-template') == 'tab_items') {
                generateItems()
            }
        } else if (mutation.type == 'attributes') {
            let $nodes = $(mutation.target);
            if ($nodes.hasClass('mousehuntHud-page-tabHeader kings_crowns active')) {
                if (localStorage.getItem("crownsAlreadyRan") == "Y") {
                    localStorage.setItem("crownsAlreadyRan", "N");
                } else {
                    setTimeout(generate, 2000);
                    localStorage.setItem("crownsAlreadyRan", "Y");
                }
            } else if ($nodes.hasClass('mousehuntHud-page-tabHeader items active')) {
                if (localStorage.getItem("itemsAlreadyRan") == "Y") {
                    localStorage.setItem("itemsAlreadyRan", "N");
                } else {
                    setTimeout(generateItems, 1000);
                    localStorage.setItem("itemsAlreadyRan", "Y");
                }
            }
        }
    })
};

function generate() {
    buildToolbar();
    decorate();
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
    copyCrownsButton.addEventListener("click", copyCrowns)
    $(copyCrownsButton).attr('title', 'Copy Crowns to Clipboard');
    toolBar.appendChild(copyCrownsButton);
    $(copyCrownsButton).css({
        'background-image': "url('https://image.flaticon.com/icons/svg/1250/1250214.svg')",
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '25px',
        'height': '25px',
    });
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
    rankSummary.css({
        'font-size': '12px',
        'margin-bottom': '10px',
    });
    rankSummary.insertAfter(communityCrownHeader);
    var uncrownedText = document.createTextNode("Uncrowned: " + uncrowned + " (" + ((uncrowned / totalMice) * 100).toFixed(2) + "%) | ");
    $(rankSummary).attr('title', 'Mobster and Leprechaun excluded from counts');
    var bronzeText = document.createTextNode("Bronze: " + bronzeCrowns + " (" + ((bronzeCrowns / totalMice) * 100).toFixed(2) + "%) | ");
    var silverText = document.createTextNode("Silver: " + silverCrowns + " (" + ((silverCrowns / totalMice) * 100).toFixed(2) + "%) | ");
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
    var aGold = document.createElement('a');
    aGold.appendChild(goldText);
    aGold.title = "MHCC Elite Scoreboard";
    aGold.href = goldLink;
    $(aGold).attr("target", "_blank");
    $(rankSummary).append(uncrownedText).append(aBronze).append(aSilver).append(aGold).append(platText).append(diamondText);
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
    // need to sort uncrowned by # instead of Alpha
    let finalTable = miceArray.map(e => e.join(",")).join("\n");
    GM_setClipboard(finalTable);
    var copyCrownsButton = $("#copyCrownsButton")
    copyCrownsButton.css({
        'border-style': 'solid',
        'border-color': 'grey',
        'border-width': '1px',
    });
    setTimeout(function() {
        copyCrownsButton.css({
            'border-style': 'none',
        });
    }, 1000);
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

function decorate() {
    let uncrowned = $('.mouseCrownsView-group.none').find('.mouseCrownsView-crown.none');
    $(uncrowned).css({
        'background-image': "url('https://image.flaticon.com/icons/png/512/1604/1604467.png')",
        'background-repeat': 'no-repeat',
        'background-size': 'contain'
    });
    let favorites = $('.mouseCrownsView-group-mouse.highlight.favourite')
    $(favorites).each(function(i) {
        let image = $(this).find('.mouseCrownsView-group-mouse-image');
        let crown = $(this).find('.mouseCrownsView-crown');
        let top = "";
        let bottom = "";
        if ($(crown).hasClass('bronze')) {
            //bronze
            top = '#f0c693';
            bottom = '#8d4823';
        } else if ($(crown).hasClass('silver')) {
            //silver
            top = '#d1d7e9';
            bottom = '#66718b';
        } else if ($(crown).hasClass('gold')) {
            //gold
            top = '#ffe589';
            bottom = '#b67800';
        } else if ($(crown).hasClass('platinum')) {
            //plat
            top = '#9191ff';
            bottom = '#1d1781';
        } else if ($(crown).hasClass('diamond')) {
            //diamond
            top = '#c4eae6';
            bottom = '#63b9cf';
        } else {
            //no crown
            top = '#ab9f92';
            bottom = '#251B0A';
        }
        //Style all the favs
        $(image).css({
            'border-style': 'solid',
            'border-width': '3px',
            'border-radius': '4px',
            'border-top-color': top,
            'border-left-color': top,
            'border-bottom-color': bottom,
            'border-right-color': bottom,
        })
        //Stlye all the rest
        let diamond = $('.mouseCrownsView-group.diamond').find(".mouseCrownsView-group-mouse-image");
        if (diamond.get(0)) {
            $(diamond).css({
                'border-style': 'solid',
                'border-width': '3px',
                'border-radius': '4px',
                'border-top-color': '#c4eae6',
                'border-left-color': '#c4eae6',
                'border-bottom-color': '#63b9cf',
                'border-right-color': '#63b9cf',
            })
        }
        let platinum = $('.mouseCrownsView-group.platinum').find(".mouseCrownsView-group-mouse-image");
        if (platinum.get(0)) {
            $(platinum).css({
                'border-style': 'solid',
                'border-width': '3px',
                'border-radius': '4px',
                'border-top-color': '#9191ff',
                'border-left-color': '#9191ff',
                'border-bottom-color': '#1d1781',
                'border-right-color': '#1d1781',
            })
        }
        let gold = $('.mouseCrownsView-group.gold').find(".mouseCrownsView-group-mouse-image");
        if (gold.get(0)) {
            $(gold).css({
                'border-style': 'solid',
                'border-width': '3px',
                'border-radius': '4px',
                'border-top-color': '#ffe589',
                'border-left-color': '#ffe589',
                'border-bottom-color': '#b67800',
                'border-right-color': '#b67800',
            })
        }
        let silver = $('.mouseCrownsView-group.silver').find(".mouseCrownsView-group-mouse-image");
        if (silver.get(0)) {
            $(silver).css({
                'border-style': 'solid',
                'border-width': '3px',
                'border-radius': '4px',
                'border-top-color': '#d1d7e9',
                'border-left-color': '#d1d7e9',
                'border-bottom-color': '#66718b',
                'border-right-color': '#66718b',
            })
        }
        let bronze = $('.mouseCrownsView-group.bronze').find(".mouseCrownsView-group-mouse-image");
        if (bronze.get(0)) {
            $(bronze).css({
                'border-style': 'solid',
                'border-width': '3px',
                'border-radius': '4px',
                'border-top-color': '#f0c693',
                'border-left-color': '#f0c693',
                'border-bottom-color': '#8d4823',
                'border-right-color': '#8d4823',
            })
        }
        let none = $('.mouseCrownsView-group.none').find(".mouseCrownsView-group-mouse-image");
        if (none.get(0)) {
            $(none).css({
                'border-style': 'solid',
                'border-width': '3px',
                'border-radius': '4px',
                'border-top-color': '#ab9f92',
                'border-left-color': '#ab9f92',
                'border-bottom-color': '#251B0A',
                'border-right-color': '#251B0A',
            })
        }
    })
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ITEMS TAB
//
//
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function generateItems() {
    if ($('.hunterProfileItemsView-filter.collected').hasClass('active')) {
        manageCollected();
    }
}

function manageCollected() {
    let itemContainer = $('.hunterProfileItemsView-content-padding');
    //Custom item layout
    if ($('.layoutContainer').length == 0) {
        let layoutContainer = document.createElement("div");
        layoutContainer.classList.add("layoutContainer");
        let itemLayoutCb = document.createElement("input");
        itemLayoutCb.type = "checkbox";
        itemLayoutCb.name = "itemLayoutCb";
        itemLayoutCb.value = "";
        itemLayoutCb.id = "itemLayoutCb";
        itemLayoutCb.checked = "";
        if (localStorage.getItem("ShowItemLayout") == "Y") {
            itemLayoutCb.checked = "Yes";
        } else {
            itemLayoutCb.checked = "";
        }
        let itemLayoutLabel = document.createElement("label");
        itemLayoutLabel.htmlFor = "itemLayoutLabel";
        itemLayoutLabel.appendChild(document.createTextNode("Use New Layout"));
        layoutContainer.append(itemLayoutCb);
        layoutContainer.append(itemLayoutLabel);
        $(itemContainer).prepend(layoutContainer);
        $(layoutContainer).css({
            'width': '100%',
        });
        $(itemLayoutLabel).css({
            'fontSize': "14px",
            'width': '80%',
        });
        $(itemLayoutCb).css({
            'width': '5%'
        });
    }
    if (localStorage.getItem("ShowItemLayout") == "Y") {
        //Build group headers
        if ($(".unownedWeaponHeader").length == 0)  {
            let collectedContainer = $('.hunterProfileItemsView-categoryContent.active').filter("[data-category='weapon']");
            let firstItem = collectedContainer[0];
            let ownedWeaponHeader = document.createElement("div");
            ownedWeaponHeader.classList.add("ownedWeaponHeader");
            $(ownedWeaponHeader).text('Collected and Owned');
            $(ownedWeaponHeader).css({
                'font-size': '14px',
                'font-weight': 'bold',
                'width': '100%',
                'height': '15px',
                'padding': '3px',
            })
            //
            let ownedWeapons = document.createElement("div");
            ownedWeapons.classList.add("ownedWeapons");
            $(ownedWeapons).css({
                'width': '100%',
                'padding': '3px',
            })
            //last
            $(ownedWeaponHeader).insertAfter(firstItem);
            $(ownedWeapons).insertAfter(ownedWeaponHeader);
            //
            let unownedWeaponHeader = document.createElement("div");
            unownedWeaponHeader.classList.add("unownedWeaponHeader");
            $(unownedWeaponHeader).text('Collected but Unowned');
            unownedWeaponHeader.title = 'Limited Edition Hidden';
            $(unownedWeaponHeader).css({
                'font-size': '14px',
                'font-weight': 'bold',
                'width': '100%',
                'height': '15px',
                'padding': '3px',
            })
            let unownedWeapons = document.createElement("div");
            unownedWeapons.classList.add("unownedWeapons");
            $(unownedWeapons).css({
                'width': '100%',
                'padding': '3px',
            })
            //last
            $(unownedWeaponHeader).insertAfter(firstItem);
            $(unownedWeapons).insertAfter(unownedWeaponHeader);
            //
            let uncollectedWeaponHeader = document.createElement("div");
            uncollectedWeaponHeader.classList.add("uncollectedWeaponHeader");
            $(uncollectedWeaponHeader).text('Uncollected');
            uncollectedWeaponHeader.title = 'Limited Edition Hidden';
            $(uncollectedWeaponHeader).css({
                'font-size': '14px',
                'font-weight': 'bold',
                'width': '100%',
                'height': '15px',
                'padding': '3px',
            })
            let uncollectedWeapons = document.createElement("div");
            uncollectedWeapons.classList.add("uncollectedWeapons");
            $(uncollectedWeapons).css({
                'width': '100%',
                'padding': '3px',
            })
            //last
            $(uncollectedWeaponHeader).insertAfter(firstItem);
            $(uncollectedWeapons).insertAfter(uncollectedWeaponHeader);
            sortItems('weapons')
        }
        //
        if ($(".unownedBaseHeader").length == 0)  {
            let collectedContainer = $('.hunterProfileItemsView-categoryContent.active').filter("[data-category='base']");
            let firstItem = collectedContainer[0];
            let ownedBaseHeader = document.createElement("div");
            ownedBaseHeader.classList.add("ownedBaseHeader");
            $(ownedBaseHeader).text('Collected and Owned');
            $(ownedBaseHeader).css({
                'font-size': '14px',
                'font-weight': 'bold',
                'width': '100%',
                'height': '15px',
                'padding': '3px',
            })
            let ownedBases = document.createElement("div");
            ownedBases.classList.add("ownedBases");
            $(ownedBases).css({
                'width': '100%',
                'padding': '3px',
            })
            //last
            $(ownedBaseHeader).insertAfter(firstItem);
            $(ownedBases).insertAfter(ownedBaseHeader);
            //
            let unownedBaseHeader = document.createElement("div");
            unownedBaseHeader.classList.add("unownedBaseHeader");
            $(unownedBaseHeader).text('Collected but Unowned');
            unownedBaseHeader.title = 'Limited Edition Hidden';
            $(unownedBaseHeader).css({
                'font-size': '14px',
                'font-weight': 'bold',
                'width': '100%',
                'height': '15px',
                'padding': '3px',
            })
            let unownedBases = document.createElement("div");
            unownedBases.classList.add("unownedBases");
            $(unownedBases).css({
                'width': '100%',
                'padding': '3px',
            })
            //last
            $(unownedBaseHeader).insertAfter(firstItem);
            $(unownedBases).insertAfter(unownedBaseHeader);
            //
            let uncollectedBaseHeader = document.createElement("div");
            uncollectedBaseHeader.classList.add("uncollectedBaseHeader");
            $(uncollectedBaseHeader).text('Uncollected');
            uncollectedBaseHeader.title = 'Limited Edition Hidden';
            $(uncollectedBaseHeader).css({
                'font-size': '14px',
                'font-weight': 'bold',
                'width': '100%',
                'height': '15px',
                'padding': '3px',
            })
            let uncollectedBases = document.createElement("div");
            uncollectedBases.classList.add("uncollectedBases");
            $(uncollectedBases).css({
                'width': '100%',
                'padding': '3px',
            })
            //last
            $(uncollectedBaseHeader).insertAfter(firstItem);
            $(uncollectedBases).insertAfter(uncollectedBaseHeader);
        }
        //
        if ($(".unownedCollectHeader").length == 0)  {
            let collectedContainer = $('.hunterProfileItemsView-categoryContent.active').filter("[data-category='collectible']");
            let firstItem = collectedContainer[0];
            let ownedCollectHeader = document.createElement("div");
            ownedCollectHeader.classList.add("ownedCollectHeader");
            $(ownedCollectHeader).text('Collected and Owned');
            $(ownedCollectHeader).css({
                'font-size': '14px',
                'font-weight': 'bold',
                'width': '100%',
                'height': '15px',
                'padding': '3px',
            })
            let ownedCollects = document.createElement("div");
            ownedCollects.classList.add("ownedCollects");
            $(ownedCollects).css({
                'width': '100%',
                'padding': '3px',
            })
            //last
            $(ownedCollectHeader).insertAfter(firstItem);
            $(ownedCollects).insertAfter(ownedCollectHeader);
            //
            let unownedCollectHeader = document.createElement("div");
            unownedCollectHeader.classList.add("unownedCollectHeader");
            $(unownedCollectHeader).text('Collected but Unowned');
            unownedCollectHeader.title = 'Limited Edition Hidden';
            $(unownedCollectHeader).css({
                'font-size': '14px',
                'font-weight': 'bold',
                'width': '100%',
                'height': '15px',
                'padding': '3px',
            })
            let unownedCollects = document.createElement("div");
            unownedCollects.classList.add("unownedCollects");
            $(unownedCollects).css({
                'width': '100%',
                'padding': '3px',
            })
            //last
            $(unownedCollectHeader).insertAfter(firstItem);
            $(unownedCollects).insertAfter(unownedCollectHeader);
            //
            let uncollectedCollectHeader = document.createElement("div");
            uncollectedCollectHeader.classList.add("uncollectedCollectHeader");
            $(uncollectedCollectHeader).text('Uncollected');
            uncollectedCollectHeader.title = 'Limited Edition Hidden';
            $(uncollectedCollectHeader).css({
                'font-size': '14px',
                'font-weight': 'bold',
                'width': '100%',
                'height': '15px',
                'padding': '3px',
            })
            let uncollectedCollects = document.createElement("div");
            uncollectedCollects.classList.add("uncollectedCollects");
            $(uncollectedCollects).css({
                'width': '100%',
                'padding': '3px',
            })
            //last
            $(uncollectedCollectHeader).insertAfter(firstItem);
            $(uncollectedCollects).insertAfter(uncollectedCollectHeader);
        }
        //
        if ($(".unownedSkinHeader").length == 0)  {
            let collectedContainer = $('.hunterProfileItemsView-categoryContent.active').filter("[data-category='skin']");
            let firstItem = collectedContainer[0];
            let ownedSkinHeader = document.createElement("div");
            ownedSkinHeader.classList.add("ownedSkinHeader");
            $(ownedSkinHeader).text('Collected and Owned');
            $(ownedSkinHeader).css({
                'font-size': '14px',
                'font-weight': 'bold',
                'width': '100%',
                'height': '15px',
                'padding': '3px',
            })
            let ownedSkins = document.createElement("div");
            ownedSkins.classList.add("ownedSkins");
            $(ownedSkins).css({
                'width': '100%',
                'padding': '3px',
            })
            //last
            $(ownedSkinHeader).insertAfter(firstItem);
            $(ownedSkins).insertAfter(ownedSkinHeader);
            //
            let unownedSkinHeader = document.createElement("div");
            unownedSkinHeader.classList.add("unownedSkinHeader");
            $(unownedSkinHeader).text('Collected but Unowned');
            unownedSkinHeader.title = 'Limited Edition Hidden';
            $(unownedSkinHeader).css({
                'font-size': '14px',
                'font-weight': 'bold',
                'width': '100%',
                'height': '15px',
                'padding': '3px',
            })
            let unownedSkins = document.createElement("div");
            unownedSkins.classList.add("unownedSkins");
            $(unownedSkins).css({
                'width': '100%',
                'padding': '3px',
            })
            //last
            $(unownedSkinHeader).insertAfter(firstItem);
            $(unownedSkins).insertAfter(unownedSkinHeader);
            //
            let uncollectedSkinHeader = document.createElement("div");
            uncollectedSkinHeader.classList.add("uncollectedSkinHeader");
            $(uncollectedSkinHeader).text('Uncollected');
            uncollectedSkinHeader.title = 'Limited Edition Hidden';
            $(uncollectedSkinHeader).css({
                'font-size': '14px',
                'font-weight': 'bold',
                'width': '100%',
                'height': '15px',
                'padding': '3px',
            })
            let uncollectedSkins = document.createElement("div");
            uncollectedSkins.classList.add("uncollectedSkins");
            $(uncollectedSkins).css({
                'width': '100%',
                'padding': '3px',
            })
            //last
            $(uncollectedSkinHeader).insertAfter(firstItem);
            $(uncollectedSkins).insertAfter(uncollectedSkinHeader);
        }
    }
}

function sortItems(itemType) {
    let allTypes = $('.hunterProfileItemsView-categoryContent.active');
    let allCollected = $(allTypes).find('.hunterProfileItemsView-categoryContent-item.collected');
    let allUncollected = $(allTypes).find('.hunterProfileItemsView-categoryContent-item.uncollected');
    let activeTab = $('.hunterProfileItemsView-filter').filter('.active');
    //Weapons
    let uncollectedWeaponHeader = $('.uncollectedWeaponHeader');
    let uncollectedWeapons = $('.uncollectedWeapons');
    let unownedWeaponHeader = $('.unownedWeaponHeader');
    let unownedWeapons = $('.unownedWeapons');
    let ownedWeaponHeader = $('.ownedWeaponHeader');
    let ownedWeapons = $('.ownedWeapons');
    //Bases
    let uncollectedBaseHeader = $('.uncollectedBaseHeader');
    let uncollectedBases = $('.uncollectedBases');
    let unownedBaseHeader = $('.unownedBaseHeader');
    let unownedBases = $('.unownedBases');
    let ownedBaseHeader = $('.ownedBaseHeader');
    let ownedBases = $('.ownedBases');
    //Collectibles
    let uncollectedCollectHeader = $('.uncollectedCollectHeader');
    let uncollectedCollects = $('.uncollectedCollects');
    let unownedCollectHeader = $('.unownedCollectHeader');
    let unownedCollects = $('.unownedCollects');
    let ownedCollectHeader = $('.ownedCollectHeader');
    let ownedCollects = $('.ownedCollects')
    //Skins
    let uncollectedSkinHeader = $('.uncollectedSkinHeader');
    let uncollectedSkins = $('.uncollectedSkins');
    let unownedSkinHeader = $('.unownedSkinHeader');
    let unownedSkins = $('.unownedSkins');
    let ownedSkinHeader = $('.ownedSkinHeader');
    let ownedSkins = $('.ownedSkins');
    //
    if (itemType == 'weapons') {
        $(allCollected).each(function(i) {
            let qtyOwned =  parseInt($(this).find('.quantity').text().replace(',',""),10);
            if (qtyOwned == 0) {
                if ($(this).hasClass('limited_edition')) {
                    $(this).detach();
                    $(unownedWeapons).append(this);
                    $(this).hide();
                } else {
                    $(this).detach();
                    $(unownedWeapons).append(this);
                }
            } else {
                $(this).detach();
                $(ownedWeapons).append(this);
            }
        })
        $(allUncollected).each(function(i) {
            $(this).detach();
            $(uncollectedWeapons).append(this);
            $(uncollectedWeapons).children().css({
                'width': '20%',
                'padding': '3px',
                'display': 'inline-block',
            })
        })
        //
        if ($(activeTab).hasClass('collected')) {
            $(uncollectedWeaponHeader).hide();
            $(uncollectedWeapons).hide();
            $(unownedWeapons).find('.limited_edition').hide()
        } else if ($(activeTab).hasClass('uncollected')) {
            $(uncollectedWeaponHeader).show();
            $(uncollectedWeapons).show();
            $(unownedWeapons).find('.limited_edition').hide()
        } else if ($(activeTab).hasClass('limited_edition')) {
            $(uncollectedWeaponHeader).hide();
            $(uncollectedWeapons).hide();
        } else if ($(activeTab).hasClass('all')) {
            $(uncollectedWeaponHeader).show();
            $(uncollectedWeapons).show();
        }
        //hide empty sections
        if ($(uncollectedWeapons).children().not('.hidden').length < 1) {
            $(uncollectedWeaponHeader).hide();
        }
        if ($(unownedWeapons).children().not('.hidden').length < 1) {
            $(unownedWeaponHeader).hide();
        }
        if ($(ownedWeapons).children().not('.hidden').length < 1) {
            $(ownedWeaponHeader).hide();
        }
    } else if (itemType == 'bases') {
        $(allCollected).each(function(i) {
            let qtyOwned =  parseInt($(this).find('.quantity').text().replace(',',""),10);
            if (qtyOwned == 0) {
                if ($(this).hasClass('limited_edition')) {
                    $(this).detach();
                    $(unownedBases).append(this);
                    $(this).hide();
                } else {
                    $(this).detach();
                    $(unownedBases).append(this);
                }
            } else {
                $(this).detach();
                $(ownedBases).append(this);
            }
        })
        $(allUncollected).each(function(i) {
            $(this).detach();
            $(uncollectedBases).append(this);
            $(uncollectedBases).children().css({
                'width': '20%',
                'padding': '3px',
                'display': 'inline-block',
            })
        })
        //
        if ($(activeTab).hasClass('collected')) {
            $(uncollectedBaseHeader).hide();
            $(uncollectedBases).hide();
            $(unownedBases).find('.limited_edition').hide()
        } else if ($(activeTab).hasClass('uncollected')) {
            $(uncollectedBaseHeader).show();
            $(uncollectedBases).show();
            $(unownedBases).find('.limited_edition').hide()
        } else if ($(activeTab).hasClass('limited_edition')) {
            $(uncollectedBaseHeader).hide();
            $(uncollectedBases).hide();
        } else if ($(activeTab).hasClass('all')) {
            $(uncollectedBaseHeader).show();
            $(uncollectedBases).show();
        }
        //hide empty sections
        if ($(uncollectedBases).children().not('.hidden').length < 1) {
            $(uncollectedBaseHeader).hide();
        }
        if ($(unownedBases).children().not('.hidden').length < 1) {
            $(unownedBaseHeader).hide();
        }
        if ($(ownedBases).children().not('.hidden').length < 1) {
            $(ownedBaseHeader).hide();
        }
    } else if (itemType == 'collectibles') {
        $(allCollected).each(function(i) {
            let qtyOwned =  parseInt($(this).find('.quantity').text().replace(',',""),10);
            if (qtyOwned == 0) {
                if ($(this).hasClass('limited_edition')) {
                    $(this).detach();
                    $(unownedCollects).append(this);
                    $(this).hide();
                } else {
                    $(this).detach();
                    $(unownedCollects).append(this);
                }
            } else {
                $(this).detach();
                $(ownedCollects).append(this);
            }
        })
        $(allUncollected).each(function(i) {
            $(this).detach();
            $(uncollectedCollects).append(this);
            $(uncollectedCollects).children().css({
                'width': '20%',
                'padding': '3px',
                'display': 'inline-block',
            })
        })
        //
        if ($(activeTab).hasClass('collected')) {
            $(uncollectedCollectHeader).hide();
            $(uncollectedCollects).hide();
            $(unownedCollects).find('.limited_edition').hide()
        } else if ($(activeTab).hasClass('uncollected')) {
            $(uncollectedCollectHeader).show();
            $(uncollectedCollects).show();
            $(unownedCollects).find('.limited_edition').hide()
        } else if ($(activeTab).hasClass('limited_edition')) {
            $(uncollectedCollectHeader).hide();
            $(uncollectedCollects).hide();
        } else if ($(activeTab).hasClass('all')) {
            $(uncollectedCollectHeader).show();
            $(uncollectedCollects).show();
        }
        //hide empty sections
        if ($(uncollectedCollects).children().not('.hidden').length < 1) {
            $(uncollectedCollectHeader).hide();
        }
        if ($(unownedCollects).children().not('.hidden').length < 1) {
            $(unownedCollectHeader).hide();
        }
        if ($(ownedCollects).children().not('.hidden').length < 1) {
            $(ownedCollectHeader).hide();
        }
    } else if (itemType == 'skins') {
        $(allCollected).each(function(i) {
            let qtyOwned =  parseInt($(this).find('.quantity').text().replace(',',""),10);
            if (qtyOwned == 0) {
                if ($(this).hasClass('limited_edition')) {
                    $(this).detach();
                    $(unownedSkins).append(this);
                    $(this).hide();
                } else {
                    $(this).detach();
                    $(unownedSkins).append(this);
                }
            } else {
                $(this).detach();
                $(ownedSkins).append(this);
            }
        })
        $(allUncollected).each(function(i) {
            $(this).detach();
            $(uncollectedSkins).append(this);
            $(uncollectedSkins).children().css({
                'width': '20%',
                'padding': '3px',
                'display': 'inline-block',
            })
        })
        //
        if ($(activeTab).hasClass('collected')) {
            $(uncollectedSkinHeader).hide();
            $(uncollectedSkins).hide();
            $(unownedSkins).find('.limited_edition').hide()
        } else if ($(activeTab).hasClass('uncollected')) {
            $(uncollectedSkinHeader).show();
            $(uncollectedSkins).show();
            $(unownedSkins).find('.limited_edition').hide()
        } else if ($(activeTab).hasClass('limited_edition')) {
            $(uncollectedSkinHeader).hide();
            $(uncollectedSkins).hide();
        } else if ($(activeTab).hasClass('all')) {
            $(uncollectedSkinHeader).show();
            $(uncollectedSkins).show();
        }
        //hide empty sections
        if ($(uncollectedSkins).children().not('.hidden').length < 1) {
            $(uncollectedSkinHeader).hide();
        }
        if ($(unownedSkins).children().not('.hidden').length < 1) {
            $(unownedSkinHeader).hide();
        }
        if ($(ownedSkins).children().not('.hidden').length < 1) {
            $(ownedSkinHeader).hide();
        }
    }
}
//Weapons Tab
$(document).on('click', "[data-category='weapon']", function() {
    if (localStorage.getItem("ShowItemLayout") == "Y") {
        manageCollected()
        $('.unownedWeaponHeader,.unownedWeapons,.ownedWeaponHeader,.ownedWeapons,.uncollectedWeaponHeader,.uncollectedWeapons').show();
        $('.unownedBaseHeader,.unownedBases,.ownedBaseHeader,.ownedBases,.uncollectedBaseHeader,.uncollectedBases').hide();
        $('.unownedCollectHeader,.unownedCollects,.ownedCollectHeader,.ownedCollects,.uncollectedCollectHeader,.uncollectedCollects').hide();
        $('.unownedSkinHeader,.unownedSkins,.ownedSkinHeader,.ownedSkins,.uncollectedSkinHeader,.uncollectedSkins').hide();
        sortItems('weapons')
    }
});
//Bases Tab
$(document).on('click', "[data-category='base']", function() {
    if (localStorage.getItem("ShowItemLayout") == "Y") {
        manageCollected()
        $('.unownedWeaponHeader,.unownedWeapons,.ownedWeaponHeader,.ownedWeapons,.uncollectedWeaponHeader,.uncollectedWeapons').hide();
        $('.unownedBaseHeader,.unownedBases,.ownedBaseHeader,.ownedBases,.uncollectedBaseHeader,.uncollectedBases').show();
        $('.unownedCollectHeader,.unownedCollects,.ownedCollectHeader,.ownedCollects,.uncollectedCollectHeader,.uncollectedCollects').hide();
        $('.unownedSkinHeader,.unownedSkins,.ownedSkinHeader,.ownedSkins,.uncollectedSkinHeader,.uncollectedSkins').hide();
        sortItems('bases')
    }
});
//Maps Tab
$(document).on('click', "[data-category='map_piece']", function() {
    if (localStorage.getItem("ShowItemLayout") == "Y") {
        $('.unownedWeaponHeader,.unownedWeapons,.ownedWeaponHeader,.ownedWeapons,.uncollectedWeaponHeader,.uncollectedWeapons').hide();
        $('.unownedBaseHeader,.unownedBases,.ownedBaseHeader,.ownedBases,.uncollectedBaseHeader,.uncollectedBases').hide();
        $('.unownedCollectHeader,.unownedCollects,.ownedCollectHeader,.ownedCollects,.uncollectedCollectHeader,.uncollectedCollects').hide();
        $('.unownedSkinHeader,.unownedSkins,.ownedSkinHeader,.ownedSkins,.uncollectedSkinHeader,.uncollectedSkins').hide();
    }
});
//Collectible Tab
$(document).on('click', "[data-category='collectible']", function() {
    if (localStorage.getItem("ShowItemLayout") == "Y") {
        manageCollected()
        $('.unownedWeaponHeader,.unownedWeapons,.ownedWeaponHeader,.ownedWeapons,.uncollectedWeaponHeader,.uncollectedWeapons').hide();
        $('.unownedBaseHeader,.unownedBases,.ownedBaseHeader,.ownedBases,.uncollectedBaseHeader,.uncollectedBases').hide();
        $('.unownedCollectHeader,.unownedCollects,.ownedCollectHeader,.ownedCollects,.uncollectedCollectHeader,.uncollectedCollects').show();
        $('.unownedSkinHeader,.unownedSkins,.ownedSkinHeader,.ownedSkins,.uncollectedSkinHeader,.uncollectedSkins').hide();
        sortItems('collectibles')
    }
});
//Skin Tab
$(document).on('click', "[data-category='skin']", function() {
    if (localStorage.getItem("ShowItemLayout") == "Y") {
        manageCollected()
        $('.unownedWeaponHeader,.unownedWeapons,.ownedWeaponHeader,.ownedWeapons,.uncollectedWeaponHeader,.uncollectedWeapons').hide();
        $('.unownedBaseHeader,.unownedBases,.ownedBaseHeader,.ownedBases,.uncollectedBaseHeader,.uncollectedBases').hide();
        $('.unownedCollectHeader,.unownedCollects,.ownedCollectHeader,.ownedCollects,.uncollectedCollectHeader,.uncollectedCollects').hide();
        $('.unownedSkinHeader,.unownedSkins,.ownedSkinHeader,.ownedSkins,.uncollectedSkinHeader,.uncollectedSkins').show();
        sortItems('skins')
    }
});
//Collected tab
$(document).on('click', ".hunterProfileItemsView-filter.collected", function() {
    if (localStorage.getItem("ShowItemLayout") == "Y") {
        $('.unownedWeaponHeader,.unownedWeapons,.ownedWeaponHeader,.ownedWeapons,.uncollectedWeaponHeader,.uncollectedWeapons').hide();
        $('.unownedBaseHeader,.unownedBases,.ownedBaseHeader,.ownedBases,.uncollectedBaseHeader,.uncollectedBases').hide();
        $('.unownedCollectHeader,.unownedCollects,.ownedCollectHeader,.ownedCollects,.uncollectedCollectHeader,.uncollectedCollects').hide();
        $('.unownedSkinHeader,.unownedSkins,.ownedSkinHeader,.ownedSkins,.uncollectedSkinHeader,.uncollectedSkins').hide();
        let activeContainer = $('.hunterProfileItemsView-categoryContent.active').attr('data-category');
        if (activeContainer == 'weapon') {
            $('.unownedWeaponHeader,.unownedWeapons,.ownedWeaponHeader,.ownedWeapons').show();
            $('.uncollectedWeaponHeader,.uncollectedWeapons').hide();
            $('.unownedWeapons').find('.limited_edition').hide();
            sortItems('weapons')
        } else if (activeContainer == 'base') {
            $('.unownedBaseHeader,.unownedBases,.ownedBaseHeader,.ownedBases').show();
            $('.uncollectedBaseHeader,.uncollectedBases').hide();
            $('.unownedBases').find('.limited_edition').hide();
            sortItems('bases')
        } else if (activeContainer == 'map_piece') {
        } else if (activeContainer == 'collectible') {
            $('.unownedCollectHeader,.unownedCollects,.ownedCollectHeader,.ownedCollects').show();
            $('.uncollectedCollectHeader,.uncollectedCollects').hide();
            $('.unownedCollects').find('.limited_edition').hide();
            sortItems('collectibles')
        } else {
            $('.unownedSkinHeader,.unownedSkins,.ownedSkinHeader,.ownedSkins').show();
            $('.uncollectedCollectHeader,.uncollectedCollects').hide();
            $('.unownedSkins').find('.limited_edition').hide();
            sortItems('skins')
        }
    }
});
//Uncollected tab
$(document).on('click', ".hunterProfileItemsView-filter.uncollected", function() {
    if (localStorage.getItem("ShowItemLayout") == "Y") {
        $('.unownedWeaponHeader,.unownedWeapons,.ownedWeaponHeader,.ownedWeapons,.uncollectedWeaponHeader,.uncollectedWeapons').hide();
        $('.unownedBaseHeader,.unownedBases,.ownedBaseHeader,.ownedBases,.uncollectedBaseHeader,.uncollectedBases').hide();
        $('.unownedCollectHeader,.unownedCollects,.ownedCollectHeader,.ownedCollects,.uncollectedCollectHeader,.uncollectedCollects').hide();
        $('.unownedSkinHeader,.unownedSkins,.ownedSkinHeader,.ownedSkins,.uncollectedSkinHeader,.uncollectedSkins').hide();
        let activeContainer = $('.hunterProfileItemsView-categoryContent.active').attr('data-category');
        if (activeContainer == 'weapon') {
            $('.uncollectedWeaponHeader,.uncollectedWeapons').show();
            sortItems('weapons')
        } else if (activeContainer == 'base') {
            $('.uncollectedBaseHeader,.uncollectedBases').show();
            sortItems('bases')
        } else if (activeContainer == 'map_piece') {
        } else if (activeContainer == 'collectible') {
            $('.uncollectedCollectHeader,.uncollectedCollects').show();
            sortItems('collectibles')
        } else {
            $('.uncollectedSkinHeader,.uncollectedSkins').show();
            sortItems('skins')
        }
    }
});
//Limited Edition Tab
$(document).on('click', ".hunterProfileItemsView-filter.limited_edition", function() {
    if (localStorage.getItem("ShowItemLayout") == "Y") {
        $('.unownedWeaponHeader,.unownedWeapons,.ownedWeaponHeader,.ownedWeapons,.uncollectedWeaponHeader,.uncollectedWeapons').hide();
        $('.unownedBaseHeader,.unownedBases,.ownedBaseHeader,.ownedBases,.uncollectedBaseHeader,.uncollectedBases').hide();
        $('.unownedCollectHeader,.unownedCollects,.ownedCollectHeader,.ownedCollects,.uncollectedCollectHeader,.uncollectedCollects').hide();
        $('.unownedSkinHeader,.unownedSkins,.ownedSkinHeader,.ownedSkins,.uncollectedSkinHeader,.uncollectedSkins').hide();
        let activeContainer = $('.hunterProfileItemsView-categoryContent.active').attr('data-category');
        if (activeContainer == 'weapon') {
            $('.unownedWeaponHeader,.unownedWeapons,.ownedWeaponHeader,.ownedWeapons').show();
            $('.unownedWeapons').find('.limited_edition').show();
            $('.uncollectedWeaponHeader,.uncollectedWeapons').hide();
            sortItems('weapons')
        } else if (activeContainer == 'base') {
            $('.unownedBaseHeader,.unownedBases,.ownedBaseHeader,.ownedBases').show();
            $('.unownedBases').find('.limited_edition').show();
            $('.uncollectedBaseHeader,.uncollectedBases').hide();
            sortItems('bases')
        } else if (activeContainer == 'map_piece') {
        } else if (activeContainer == 'collectible') {
            $('.unownedCollectHeader,.unownedCollects,.ownedCollectHeader,.ownedCollects').show();
            $('.unownedCollects').find('.limited_edition').show();
            $('.uncollectedCollectHeader,.uncollectedCollects').hide();
            sortItems('collectibles')
        } else {
            $('.unownedSkinHeader,.unownedSkins,.ownedSkinHeader,.ownedSkins').show();
            $('.unownedSkins').find('.limited_edition').show();
            $('.uncollectedSkinHeader,.uncollectedSkins').hide();
            sortItems('skins')
        }
    }
});
//All Tab
$(document).on('click', ".hunterProfileItemsView-filter.all", function() {
    if (localStorage.getItem("ShowItemLayout") == "Y") {
        $('.unownedWeaponHeader,.unownedWeapons,.ownedWeaponHeader,.ownedWeapons,.uncollectedWeaponHeader,.uncollectedWeapons').hide();
        $('.unownedBaseHeader,.unownedBases,.ownedBaseHeader,.ownedBases,.uncollectedBaseHeader,.uncollectedBases').hide();
        $('.unownedCollectHeader,.unownedCollects,.ownedCollectHeader,.ownedCollects,.uncollectedCollectHeader,.uncollectedCollects').hide();
        $('.unownedSkinHeader,.unownedSkins,.ownedSkinHeader,.ownedSkins,.uncollectedSkinHeader,.uncollectedSkins').hide();
        let activeContainer = $('.hunterProfileItemsView-categoryContent.active').attr('data-category');
        if (activeContainer == 'weapon') {
            $('.unownedWeaponHeader,.unownedWeapons,.ownedWeaponHeader,.ownedWeapons').show();
            $('.unownedWeapons').find('.limited_edition').show();
            $('.uncollectedWeaponHeader,.uncollectedWeapons').show();
            sortItems('weapons')
        } else if (activeContainer == 'base') {
            $('.unownedBaseHeader,.unownedBases,.ownedBaseHeader,.ownedBases').show();
            $('.unownedBases').find('.limited_edition').show();
            $('.uncollectedBaseHeader,.uncollectedBases').show();
            sortItems('bases')
        } else if (activeContainer == 'map_piece') {
        } else if (activeContainer == 'collectible') {
            $('.unownedCollectHeader,.unownedCollects,.ownedCollectHeader,.ownedCollects').show();
            $('.unownedCollects').find('.limited_edition').show();
            $('.uncollectedCollectHeader,.uncollectedCollects').show();
            sortItems('collectibles')
        } else {
            $('.unownedSkinHeader,.unownedSkins,.ownedSkinHeader,.ownedSkins').show();
            $('.unownedSkins').find('.limited_edition').show();
            $('.uncollectedSkinHeader,.uncollectedSkins').show();
            sortItems('skins')
        }
    }
});
/********** Layout Opt-In **********/
$(document).on("change", "#itemLayoutCb", function() {
    // Check to see if the cb was JUST checked
    if (this.checked) {
        // Put the checked value into storage
        localStorage.setItem("ShowItemLayout", "Y");
        this.checked = "Yes";
        manageCollected();
    } else {
        // Put the checked value into storage
        localStorage.setItem("ShowItemLayout", "N");
        this.checked = "";
        //cheat for now
        window.location.reload(true);
    }
});
