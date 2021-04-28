// ==UserScript==
// @name         MH: Profile+
// @author       Warden Slayer - Warden Slayer#2010
// @namespace    https://greasyfork.org/en/users/227259-wardenslayer
// @version      1.15
// @description  Community requested features for the tabs on your MH profile.
// @grant        GM_xmlhttpRequest
// @include      https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @include      http://www.mousehuntgame.com/*
// @include      https://www.mousehuntgame.com/*
// @connect      http://www.mousehuntgame.com/*
// @connect      https://www.mousehuntgame.com/*
// @grant GM_setClipboard
// ==/UserScript==
$(document).ready(function() {
    const debug = localStorage.getItem('ws.debug');
    if (debug == true) {
        console.log('Profile+ Started');
    };
    localStorage.setItem('ws.pfp.skip.fetch',"");
    loadFunction();
});

function loadFunction(){
    if ($('.mousehuntHud-page-tabHeader.kings_crowns').hasClass('active')) {
        //On king's crowns tab
        generateCrowns();
    } else if ($('.mousehuntHud-page-tabHeader.items').hasClass('active')) {
        //On item tab
        generateItems();
    } else if ($('.mousehuntHud-page-tabHeader.profile').hasClass('active')) {
        //On profile tab
        generateProfile();
    } else if ($('.mousehuntHud-page-tabHeader.mice').hasClass('active')) {
        //On mouse Tab
    } else {
        return false
    }
}

$(document).ajaxStop(function(){
    loadFunction();
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Profile TAB
//
//
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function generateProfile() {
    //With the mhcc level, an egg, a checkmark, a crown, a star
    const debug = localStorage.getItem('ws.debug');
    let userID = "";
    const myProfileLink = $('.mousehuntHud-shield').attr('href');
    let maybeYourFriend = "";
    if ($('.userInteractionButtonsView-relationship').get(0)) {
        userID = $('.userInteractionButtonsView-relationship').attr('data-recipient-snuid');
        maybeYourFriend = userID;
    } else if (myProfileLink) {
        if (myProfileLink.search('snuid=')==-1) {
            if (debug == true) {
                console.log('Your SNUID Not Found',myProfileLink);
            };
            return false;
        } else {
            userID = myProfileLink.split('snuid=')[1].split('&tab=')[0];
        }
    } else {
        if (debug == true) {
            console.log('SNUID Not Found',myProfileLink,userID);
        };
        return false;
    }
    const snuidOld = localStorage.getItem('ws.pfp.snuid');
    localStorage.setItem('ws.pfp.snuid',userID);
    let skipFetch = localStorage.getItem('ws.pfp.skip.fetch');
    if (snuidOld == userID) {
        //do nothing
    } else {
        skipFetch = "";
    }
    const dataItemOfInterest = ['is_egg_master','not_a_real_field'];
    if (skipFetch) {
        //dont trigger another ajax and start an infinite loop
    } else {
        localStorage.setItem('ws.pfp.eggMaster',"")
        hg.utils.User.getUserData([userID],dataItemOfInterest,function(data) {
            localStorage.setItem('ws.pfp.eggMaster',data[0].is_egg_master);
        });
    }
    const eggMaster = localStorage.getItem('ws.pfp.eggMaster');
    if (debug == true) {
        console.log('Profile Tab',snuidOld,userID,eggMaster);
    };
    if (eggMaster == 'true') {
        if ($(".eggMasterIcon").length > 0) return;
        const hunterID = $('.friendsPage-friendRow-titleBar');
        const eggMasterIcon = document.createElement("div");
        eggMasterIcon.classList.add("eggMasterIcon");
        $(eggMasterIcon).attr('title', 'Is an Egg Master')
        $(eggMasterIcon).css({
            'background-size': '25px 25px',
            'background-image': "url('https://i.ibb.co/qj01CGk/image-removebg-preview-35.png')",
            'width': '25px',
            'height': '25px',
            'float': 'right',
            'margin-right': '7px',
        });
        hunterID.append(eggMasterIcon)
    }
    localStorage.setItem('ws.pfp.skip.fetch',"Y");
    //stop the silly hyperlink on the hunter ID
    const hunterID = $('.hunterInfoView-idCardBlock-secondaryHeader').children();
    hunterID.removeAttr("href").removeAttr("onclick");
    //
    //tipping/misc
    if (maybeYourFriend) {
        const yourFriendsProfile = $('.friendsPage-friendRow-content');
        if ($('#tipButton').get(0)) {
            return false;
        } else {
            $('.friendsPage-friendRow-content').css({
                'padding-top': '0px',
            });
            const tipButton = document.createElement("button");
            tipButton.id = "tipButton";
            $(tipButton).attr('title', 'Tip this hunter 10 SB+');
            $(tipButton).text('Send Tip');
            yourFriendsProfile.prepend(tipButton);
            $(tipButton).css({
                'background-image': "url('https://www.toptal.com/designers/subtlepatterns/patterns/interlaced.png')",
                'background-repeat': 'no-repeat',
                'background-size': 'contain',
                'position': 'relative',
                'left': '37px',
                'width': '75px',
                'height': '20px',
            });
        }

    } else if ($('.friendsProfileView-selfStats').get(0)) {
        const randomFriend = $('.friendsProfileView-randomFriend');
        const randoSNUID = randomFriend.attr('href').split('snuid=')[1].split('&tab=')[0];
        hg.utils.User.getUserData([randoSNUID],['not_a_real_field'],function(data) {
            randomFriend.text('Visit Random Friend ('+data[0].name+')');
        });
    }
}

$(document).on('click', '#tipButton', function() {
    const debug = localStorage.getItem('ws.debug');
    const receivingHunter = $('.userInteractionButtonsView-relationship').attr('data-recipient-snuid');
    const sendingHunter = user.unique_hash;
    const url = 'https://www.mousehuntgame.com/managers/ajax/users/supplytransfer.php?/sn=Hitgrab&hg_is_ajax=1&receiver='+receivingHunter+'&uh='+sendingHunter+'&item=super_brie_cheese&item_quantity=10';
    GM_xmlhttpRequest({
        method: "POST",
        url: url,
        onload: function(response) {
            if (debug == true) {
                console.log('Tip Sent',receivingHunter);
            }
        },
        onerror: function(response) {
            if (debug == true) {
                console.log('Tip No Good, Error',receivingHunter,url);
            }
        }
    });
})

$(document).on('click', '.hunterInfoView-idCardBlock-secondaryHeader', function() {
    const debug = localStorage.getItem('ws.debug');
    const copiedID = $('.hunterInfoView-hunterId').find('span').text();
    if (debug == true) {
        console.log('ID Copied',copiedID)
    };
    GM_setClipboard(copiedID);
})

function generateCrowns() {
    const debug = localStorage.getItem('ws.debug');
    if (debug == true) {
        console.log('Crowns Tab',localStorage.getItem("Lock Favorites"),localStorage.getItem("ShowCommunityRanks"));
    };
    buildToolbar();
    decorate();
    if (localStorage.getItem("Lock Favorites") == "Y" && $(".mouseCrownsView-group-mouse-favouriteButton").length > 0) {
        lockFavorites();
    }
    if (localStorage.getItem("ShowCommunityRanks") == "Y") {
        localStorage.setItem('ws.mh.pfp.numMice',"");
        hg.utils.MouseUtil.getMouseNames(function (data) {
            const numMice = Object.keys($(data)[0]).length-2;
            localStorage.setItem('ws.mh.pfp.numMice',numMice);
            if (debug == true) {
                console.log('Total Mice',numMice);
            };
        })
        setTimeout(showCommunityRanks, 1000)
    }
}

function generateItems() {
    if ($('.hunterProfileItemsView-filter.collected').hasClass('active')) {
        manageCollected();
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Crowns TAB
//
//
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function buildToolbar() {
    if ($(".toolBar").length > 0) return;
    const toolBar = document.createElement("div");
    toolBar.classList.add("toolBar");

    // Lock Favs CB
    const lockFavs = document.createElement("input");
    lockFavs.type = "checkbox";
    lockFavs.name = "lockFavs";
    lockFavs.value = "";
    lockFavs.id = "lockFavs";
    if (localStorage.getItem("LockFavs") == "Y") {
        lockFavs.checked = "Yes";
    } else {
        lockFavs.checked = "";
    }

    const lockFavsLabel = document.createElement("label");
    lockFavsLabel.htmlFor = "lockFavsLabel";
    lockFavsLabel.appendChild(document.createTextNode("Lock Favorites"));
    if ($(".mouseCrownsView-group-mouse-favouriteButton").length > 0) {
        toolBar.appendChild(lockFavs);
        toolBar.appendChild(lockFavsLabel);
    }
    // Community Ranks CB
    const communityRanks = document.createElement("input");
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

    const communityRanksLabel = document.createElement("label");
    communityRanksLabel.htmlFor = "communityRanksLabel";
    communityRanksLabel.appendChild(
        document.createTextNode("Show Community Ranks  ")
    );
    toolBar.appendChild(communityRanks);
    toolBar.appendChild(communityRanksLabel);

    //Copy Crown Button
    const copyCrownsButton = document.createElement("button");
    copyCrownsButton.id = "copyCrownsButton";
    if ($(".mouseCrownsView-group-mouse-favouriteButton").length > 0) {
        copyCrownsButton.addEventListener("click", copyMyCrowns)
    } else {
        copyCrownsButton.addEventListener("click", copyCrowns)
    }
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
    const allMice = $(".mouseCrownsView-group-mouse").find('.mouseCrownsView-group-mouse-favouriteButton');
    allMice.css("pointer-events", "none");
    $(".mouseCrownsView-crown.favourite").css(
        "background",
        "url('https://image.flaticon.com/icons/svg/204/204310.svg') no-repeat left top"
    );
}

function unlockFavorites() {
    localStorage.setItem("Lock Favorites", "N");
    const allMice = $(".mouseCrownsView-group-mouse").find('.mouseCrownsView-group-mouse-favouriteButton');
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
    const debug = localStorage.getItem('ws.debug');
    const totalMice = localStorage.getItem('ws.mh.pfp.numMice');
    if ($(".crownheader.crownheadercommunity").length > 0) {
        return;
    }
    const crownBreak = $(".mouseCrownsView-group.favourite");
    const communityCrownHeader = $(
        "<div class='crownheader crownheadercommunity'>Community Ranks</div>"
    );
    communityCrownHeader.css({
        'background-image': "url('https://image.flaticon.com/icons/svg/478/478941.svg')",
        'background-repeat': 'no-repeat',
    });
    communityCrownHeader.insertAfter(crownBreak);
    const allUncrowned = $(".mouseCrownsView-group.none").find(".mouseCrownsView-group-mouse");
    const allBronze = $(".mouseCrownsView-group.bronze,.mouseCrownsView-group.silver,.mouseCrownsView-group.gold,.mouseCrownsView-group.platinum,.mouseCrownsView-group.diamond").find(".mouseCrownsView-group-mouse");
    const allSilver = $(".mouseCrownsView-group.silver,.mouseCrownsView-group.gold,.mouseCrownsView-group.platinum,.mouseCrownsView-group.diamond").find(".mouseCrownsView-group-mouse");
    const allGold = $(".mouseCrownsView-group.gold,.mouseCrownsView-group.platinum,.mouseCrownsView-group.diamond").find(".mouseCrownsView-group-mouse");
    const allPlat = $(".mouseCrownsView-group.platinum,.mouseCrownsView-group.diamond").find(".mouseCrownsView-group-mouse");
    const allDiamond = $(".mouseCrownsView-group.diamond").find(".mouseCrownsView-group-mouse");
    const bronzeCrowns = allBronze.length;
    const silverCrowns = allSilver.length;
    const goldCrowns = allGold.length;
    const platCrowns = allPlat.length;
    const diamondCrowns = allDiamond.length;
    const uncrowned = totalMice - bronzeCrowns;
    if (debug == true) {
        console.log('Crown Counts',uncrowned,bronzeCrowns,silverCrowns,goldCrowns,platCrowns,diamondCrowns);
    };
    const bronzeLink = "https://docs.google.com/spreadsheets/d/19_wHCkwiT5M6LS7XNLt4NYny98fjpg4UlHbgOD05ijw/pub?fbclid=IwAR3a1Ku2xTl1mIDksUr8Lk5ORMEnuv7jnvIy9K6OBeziG6AyvYYlZaIQkHY"
    const silverLink = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQG5g3vp-q7LRYug-yZR3tSwQzAdN7qaYFzhlZYeA32vLtq1mJcq7qhH80planwei99JtLRFAhJuTZn/pubhtml?fbclid=IwAR3sPXNLloGnFk324a0HShroP1E-sNcnQBlRTjJ7gScWTWosqmXv5InB_Ns'
    const goldLink = 'https://docs.google.com/spreadsheets/d/10OGD5OYkGIEAbiez7v92qU5Fdul0ZtCRgEjlECkwZJE/pubhtml?gid=478731024&single=true&fbclid=IwAR28w7IQyMp91I62CR3GOILpbeLwgKaydIoQimMNm7j3S0DL8Mj_IsRpGD4'
    const rankSummary = $("<div class='rank summary'</div>");
    rankSummary.css({
        'font-size': '12px',
        'margin-bottom': '10px',
    });
    rankSummary.insertAfter(communityCrownHeader);
    const uncrownedText = document.createTextNode("Uncrowned: " + uncrowned + " (" + ((uncrowned / totalMice) * 100).toFixed(2) + "%) | ");
    $(rankSummary).attr('title', 'Mobster and Leprechaun excluded from counts');
    const bronzeText = document.createTextNode("Bronze: " + bronzeCrowns + " (" + ((bronzeCrowns / totalMice) * 100).toFixed(2) + "%) | ");
    const silverText = document.createTextNode("Silver: " + silverCrowns + " (" + ((silverCrowns / totalMice) * 100).toFixed(2) + "%) | ");
    const goldText = document.createTextNode("Gold: " + goldCrowns + " (" + ((goldCrowns / totalMice) * 100).toFixed(2) + "%) | ");
    const platText = document.createTextNode("Platinum: " + platCrowns + " (" + ((platCrowns / totalMice) * 100).toFixed(2) + "%) | ");
    const diamondText = document.createTextNode("Diamond: " + diamondCrowns + " (" + ((diamondCrowns / totalMice) * 100).toFixed(2) + "%)");
    const aBronze = document.createElement('a');
    aBronze.appendChild(bronzeText);
    //const bronzeRank = getRankBronze(allBronze.length)
    //aBronze.title = "90% Crowned Scoreboard: " + bronzeRank;
    aBronze.title = "90% Crowned Scoreboard";
    aBronze.href = bronzeLink;
    $(aBronze).attr("target", "_blank");
    const aSilver = document.createElement('a');
    aSilver.appendChild(silverText);
    //const silverRank = getRankSilver(allSilver.length)
    //aSilver.title = "MHCC Scoreboard: " + silverRank;
    aSilver.title = "MHCC Scoreboard";
    aSilver.href = silverLink;
    $(aSilver).attr("target", "_blank");
    const aGold = document.createElement('a');
    aGold.appendChild(goldText);
    aGold.title = "MHCC Elite Scoreboard";
    aGold.href = goldLink;
    $(aGold).attr("target", "_blank");
    $(rankSummary).append(uncrownedText).append(aBronze).append(aSilver).append(aGold).append(platText).append(diamondText);
}

function getRankBronze(crowns) {
    const totalMice = localStorage.getItem('ws.mh.pfp.numMice');
    let rank = "";
    if (crowns >= totalMice) {
        rank = "Hepatizon";
    } else if (crowns >= 1057) {
        rank = "Electrum";
    } else if (crowns >= 1046) {
        rank = "Palladium";
    } else if (crowns >= 1014) {
        rank = "Cobalt";
    } else if (crowns >= 961) {
        rank = "Bronze (full)";
    } else if (crowns >= 907) {
        rank = "Titanium";
    } else if (crowns >= 854) {
        rank = "Pewter";
    } else if (crowns >= 801) {
        rank = "Brass";
    } else if (crowns >= 747) {
        rank = "Copper";
    } else if (crowns >= 694) {
        rank = "Tin";
    } else {
        rank = "Rust";
    }

    return rank;
}

function getRankSilver(crowns) {
    const totalMice = localStorage.getItem('ws.mh.pfp.numMice');
    let rank = "";
    if (crowns >= 960) {
        rank = "Super Secret Squirrel";
    } else if (crowns >= 906) {
        rank = "Grizzled Squirrel";
    } else if (crowns >= 853) {
        rank = "Flying Squirrel";
    } else if (crowns >= 800) {
        rank = "Chinchilla";
    } else if (crowns >= 746) {
        rank = "Meerkat";
    } else if (crowns >= 693) {
        rank = "Ferret";
    } else if (crowns >= 640) {
        rank = "Prairie Dog";
    } else if (crowns >= 586) {
        rank = "Marmot";
    } else if (crowns >= 533) {
        rank = "Woodchuck";
    } else if (crowns >= 480) {
        rank = "Wombat";
    } else if (crowns >= 426) {
        rank = "Pine Marten";
    } else if (crowns >= 373) {
        rank = "Chipmunk";
    } else if (crowns >= 320) {
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

function copyMyCrowns() {
    const debug = localStorage.getItem('ws.debug');
    hg.utils.MouseUtil.getHuntingStats(function(data) {
        let statArray = [];
        data.forEach(function(arrayItem, index) {
            const mouseName = correctMouseName(arrayItem.name);
            const catches = arrayItem.num_catches;
            const misses = arrayItem.num_misses;
            statArray[index] = [mouseName, catches, misses];
        })
        if (debug == true) {
            console.log('My Mice Array',statArray);
        };
        let finalTable = statArray.map(e => e.join(",")).join("\n");
        GM_setClipboard(finalTable);
        const copyCrownsButton = $("#copyCrownsButton")
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
    })
}


function copyCrowns() {
    const debug = localStorage.getItem('ws.debug');
    const allMice = $(".mouseCrownsView-group.none,.mouseCrownsView-group.bronze,.mouseCrownsView-group.silver,.mouseCrownsView-group.gold,.mouseCrownsView-group.platinum,.mouseCrownsView-group.diamond").find(".mouseCrownsView-group-mouse");
    let miceArray = [];
    allMice.each(function(i) {
        let $mouse = correctMouseName($(this).find('.mouseCrownsView-group-mouse-name').text());
        let $count = parseInt($(this).find('.mouseCrownsView-group-mouse-catches').text().replace(',', ""), 10);
        miceArray[i] = [$mouse, $count];
    })
    // need to sort uncrowned by # instead of Alpha
    if (debug == true) {
        console.log('Their Mice Array',miceArray);
    };
    let finalTable = miceArray.map(e => e.join(",")).join("\n");
    GM_setClipboard(finalTable);
    const copyCrownsButton = $("#copyCrownsButton")
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
    mouseName = mouseName.replace(" Mouse", "");
    let newMouseName = "";
    if (mouseName == "Ful'Mina, The Mountain Queen") {
        newMouseName = "Ful'mina the Mountain Queen";
    } else if (mouseName == "Inferna, The Engulfed") {
        newMouseName = "Inferna the Engulfed";
    } else if (mouseName == "Nachous, The Molten") {
        newMouseName = "Nachous the Molten";
    } else if (mouseName == "Stormsurge, the Vile Tempest") {
        newMouseName = "Stormsurge the Vile Tempest";
    } else if (mouseName == "Bruticus, the Blazing") {
        newMouseName = "Bruticus the Blazing";
    } else if (mouseName == "Vincent, The Magnificent") {
        newMouseName = "Vincent The Magnificent";
    } else if (mouseName == "Corky, the Collector") {
        newMouseName = "Corky the Collector";
    } else {
        newMouseName = mouseName;
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
function manageCollected() {
    let itemContainer = $('.hunterProfileItemsView-content-padding');
    //Hide LE Layout
    if ($('.hideLeContainer').length == 0) {
        let hideLeContainer = document.createElement("div");
        hideLeContainer.classList.add("hideLeContainer");
        let hideLeCb = document.createElement("input");
        hideLeCb.type = "checkbox";
        hideLeCb.name = "hideLeCb";
        hideLeCb.value = "";
        hideLeCb.id = "hideLeCb";
        hideLeCb.checked = "";
        if (localStorage.getItem("hideLeItems") == "Y") {
            hideLeCb.checked = "Yes";
        } else {
            hideLeCb.checked = "";
        }
        let hideLeLabel = document.createElement("label");
        hideLeLabel.htmlFor = "hideLeLabel";
        hideLeLabel.appendChild(document.createTextNode("Hide LE  Items"));
        hideLeContainer.append(hideLeCb);
        hideLeContainer.append(hideLeLabel);
        $(itemContainer).prepend(hideLeContainer);
        $(hideLeContainer).css({
            'width': '100%',
        });
        $(hideLeLabel).css({
            'fontSize': "14px",
            'width': '80%',
        });
        $(hideLeCb).css({
            'width': '5%'
        });
    }
    if (localStorage.getItem("hideLeItems") == "Y") {
        hideLeItems()
    }
    let allTypes = $('.hunterProfileItemsView-categoryContent');
    let allItems = $(allTypes).children();
    allItems.click(function() {
        hg.views.ItemView.show($(this).attr('data-type'))
    });
}

function hideLeItems() {
    let allTypes = $('.hunterProfileItemsView-categoryContent.active');
    let allCollected = $(allTypes).find('.hunterProfileItemsView-categoryContent-item.collected').not('.limited_edition');
    let allUncollected = $(allTypes).find('.hunterProfileItemsView-categoryContent-item.uncollected');
    let collectedLe = $(allTypes).find('.hunterProfileItemsView-categoryContent-item.collected.limited_edition');
    let activeTab = $('.hunterProfileItemsView-filter').filter('.active');
    if ($(activeTab).hasClass('collected')) {
        $(allCollected).show();
        $(allUncollected).hide();
        $(collectedLe).hide();
    } else if ($(activeTab).hasClass('uncollected')) {
        $(allCollected).hide();
        $(allUncollected).show();
        $(collectedLe).hide();
    } else if ($(activeTab).hasClass('limited_edition')) {
        $(allCollected).hide();
        $(allUncollected).hide();
        $(collectedLe).show();
    } else if ($(activeTab).hasClass('all')) {
        $(allCollected).show();
        $(allUncollected).show();
        $(collectedLe).hide();
    }
}

function showLeItems() {
    let allTypes = $('.hunterProfileItemsView-categoryContent.active');
    let allCollected = $(allTypes).find('.hunterProfileItemsView-categoryContent-item.collected').not('.limited_edition');
    let allUncollected = $(allTypes).find('.hunterProfileItemsView-categoryContent-item.uncollected');
    let collectedLe = $(allTypes).find('.hunterProfileItemsView-categoryContent-item.collected.limited_edition');
    let activeTab = $('.hunterProfileItemsView-filter').filter('.active');
    if ($(activeTab).hasClass('collected')) {
        $(allCollected).show();
        $(allUncollected).hide();
        $(collectedLe).show();
    } else if ($(activeTab).hasClass('uncollected')) {
        $(allCollected).hide();
        $(allUncollected).show();
        $(collectedLe).hide();
    } else if ($(activeTab).hasClass('limited_edition')) {
        $(allCollected).hide();
        $(allUncollected).hide();
        $(collectedLe).show();
    } else if ($(activeTab).hasClass('all')) {
        $(allCollected).show();
        $(allUncollected).show();
        $(collectedLe).show();
    }
}


//Weapons Tab
$(document).on('click', "[data-category='weapon']", function() {
    if (localStorage.getItem("hideLeItems") == "Y") {
        hideLeItems()
    } else {
        showLeItems();
    }
});
//Bases Tab
$(document).on('click', "[data-category='base']", function() {
    if (localStorage.getItem("hideLeItems") == "Y") {
        hideLeItems()
    } else {
        showLeItems();
    }
});
//Maps Tab
$(document).on('click', "[data-category='map_piece']", function() {
    if (localStorage.getItem("hideLeItems") == "Y") {
        hideLeItems()
    } else {
        showLeItems();
    }
});
//Collectible Tab
$(document).on('click', "[data-category='collectible']", function() {
    if (localStorage.getItem("hideLeItems") == "Y") {
        hideLeItems()
    } else {
        showLeItems();
    }
});
//Skin Tab
$(document).on('click', "[data-category='skin']", function() {
    if (localStorage.getItem("hideLeItems") == "Y") {
        hideLeItems()
    } else {
        showLeItems();
    }
});
//Collected tab
$(document).on('click', ".hunterProfileItemsView-filter.collected", function() {
    if (localStorage.getItem("hideLeItems") == "Y") {
        hideLeItems()
    } else {
        showLeItems();
    }
});
//Uncollected tab
$(document).on('click', ".hunterProfileItemsView-filter.uncollected", function() {
    if (localStorage.getItem("hideLeItems") == "Y") {
        hideLeItems()
    } else {
        showLeItems();
    }
});
//Limited Edition Tab
$(document).on('click', ".hunterProfileItemsView-filter.limited_edition", function() {
    if (localStorage.getItem("hideLeItems") == "Y") {
        hideLeItems()
    } else {
        showLeItems();
    }
});
//All Tab
$(document).on('click', ".hunterProfileItemsView-filter.all", function() {
    if (localStorage.getItem("hideLeItems") == "Y") {
        hideLeItems()
    } else {
        showLeItems();
    }
});

/********** Layout Opt-In **********/
$(document).on("change", "#hideLeCb", function() {
    // Check to see if the cb was JUST checked
    if (this.checked) {
        // Put the checked value into storage
        localStorage.setItem("hideLeItems", "Y");
        this.checked = "Yes";
        manageCollected();
    } else {
        // Put the checked value into storage
        localStorage.setItem("hideLeItems", "N");
        this.checked = "";
        showLeItems();
    }
});
