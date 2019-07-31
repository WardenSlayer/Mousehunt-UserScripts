// ==UserScript==
// @name         MH King's Crowns+
// @author       Warden Slayer - Warden Slayer#2302
// @namespace    https://greasyfork.org/en/users/227259-wardenslayer
// @version      1.6.12
// @description  Platinum Crowns, Locked Favorites, and More!
// @include      https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @include      http://www.mousehuntgame.com/*
// @include      https://www.mousehuntgame.com/*
// @grant GM_setClipboard
// ==/UserScript==
$(document).ready(function() {
    console.log("King's Crown+");
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

                if (localStorage.getItem("ShowAllCrowns") == "Y") {
                    buildCrownHeaders();
                    sortCrowns();
                }

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

    // All Crowns CB
    var showAllCrowns = document.createElement("input");
    showAllCrowns.type = "checkbox";
    showAllCrowns.name = "showAllCrowns";
    showAllCrowns.value = "";
    showAllCrowns.id = "showAllCrowns";
    showAllCrowns.checked = "";
    if (localStorage.getItem("ShowAllCrowns") == "Y") {
        showAllCrowns.checked = "Yes";
    } else {
        showAllCrowns.checked = "";
    }

    var showAllCrownsLabel = document.createElement("label");
    showAllCrownsLabel.htmlFor = "showAllCrownsLabel";
    showAllCrownsLabel.appendChild(
        document.createTextNode("Show Community Crowns")
    );
    toolBar.appendChild(showAllCrowns);
    toolBar.appendChild(showAllCrownsLabel);

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

/********** Crowns **********/
$(document).on("change", "#showAllCrowns", function() {
    if (
        window.location.href.includes("profile.php") &&
        $("#tabbarContent_page_2").hasClass("active")
    ) {
        // Check to see if the cb was JUST checked
        if (this.checked) {
            // Put the checked value into storage
            localStorage.setItem("ShowAllCrowns", "Y");
            showAllCrowns.checked = "Yes";
            buildCrownHeaders();
            sortCrowns();
        } else {
            // Put the checked value into storage
            localStorage.setItem("ShowAllCrowns", "N");
            showAllCrowns.checked = "";
            hideCrowns();
        }
    }
});

function buildCrownHeaders() {
    var crownBreak = $(".crownbreak").first();
    var spacer1 = $(".crownbreak")
        .last()
        .clone()
        .attr("id", "spacer1");
    var spacer2 = spacer1.clone().attr("id", "spacer2");
    var spacer3 = spacer1.clone().attr("id", "spacer3");
    var platinumHeader = $(
        "<div class='crownheader crownheaderplatinum'>Platinum Crowns <span class='crownquantity'></span> <div class='crownnote'>Earned at 1000 catches</div></div>"
    );
    var diamondHeader = $(
        "<div class='crownheader crownheaderdiamond'>Diamond Crowns <span class='crownquantity'></span> <div class='crownnote'>Earned at 2500 catches</div></div>"
    );
    var masterHeader = $(
        "<div class='crownheader crownheadermaster'>Master Crowns <span class='crownquantity'></span> <div class='crownnote'>Earned at 5000 catches</div></div>"
    );

    // Plat
    var allMice = $(".mousebox");
    var allGold = allMice.find(".numcatches.gold");
    if (
        allGold.filter(function(index) {
            if ($(this).text() >= 1000) {
                return true;
            } else {
                return false;
            }
        }).length > 0 &&
        $(".crownheader.crownheaderplatinum").length < 1
    ) {
        platinumHeader.insertAfter(crownBreak);
        spacer3.insertAfter(platinumHeader);
    }

    // Diamond
    if (
        allGold.filter(function(index) {
            if ($(this).text() >= 2500) {
                return true;
            } else {
                return false;
            }
        }).length > 0 &&
        $(".crownheader.crownheaderdiamond").length < 1
    ) {
        diamondHeader.insertAfter(crownBreak);
        spacer1.insertAfter(diamondHeader);
    }

    // Master
    if (
        allGold.filter(function(index) {
            if ($(this).text() >= 5000) {
                return true;
            } else {
                return false;
            }
        }).length > 0 &&
        $(".crownheader.crownheadermaster").length < 1
    ) {
        masterHeader.insertAfter(crownBreak);
        spacer2.insertAfter(masterHeader);
    }
}

function sortCrowns() {
    var boolean = false;

    // Platinum
    if ($(".crownheader.crownheaderplatinum").length > 0) {
        sortPlatinum();
        boolean = true;
    }

    // Diamond
    if ($(".crownheader.crownheaderdiamond").length > 0) {
        sortDiamond();
        boolean = true;
    }

    // Master
    if ($(".crownheader.crownheadermaster").length > 0) {
        sortMaster();
        boolean = true;
    }

    // Favorites
    if ($(".crownheader.crownheadertop").length > 0) {
        sortFavotitesAfterSort();
    }

    if (boolean == true) {
        if ($(".mousebox").find(".numcatches.diamond").length < 1) {
            $(".crownheader.crownheaderdiamond").remove();
        } else if ($(".mousebox").find(".numcatches.plat").length < 1) {
            $(".crownheader.crownheaderplatinum").remove();
        } else if ($(".mousebox").find(".numcatches.gold").length < 1) {
            $(".crownheader.crownheadergold").remove();
        }
    }

    if ($(".crownheader.crownheadercommunity").length > 0) {
        var crownBreak = $(".crownbreak").first();
        $(".crownheader.crownheadercommunity").insertAfter(crownBreak);
        $("#spacer4").insertAfter($(".crownheader.crownheadercommunity"));
        $(".rank.summary").insertAfter($(".crownheader.crownheadercommunity"));
    }
}

function sortPlatinum() {
    var allMice = $(".mousebox");
    var allGold = allMice.find(".numcatches.gold");
    var allPlatinum = allGold.filter(function(index) {
        if ($(this).text() >= 1000 && $(".mousebox").length > 0) {
            return true;
        } else {
            return false;
        }
    });

    if ($(".favoriteCrownToggle.crownAction").length > 0) {
        allPlatinum = allPlatinum
            .parent()
            .parent()
            .not(".mousebox.favorite")
            .parent();
    } else {
        allPlatinum = allPlatinum
            .parent()
            .parent()
            .not(".mousebox.favorite");
    }

    var platinumHeader = $(".crownheader.crownheaderplatinum");
    var goldHeader = $(".crownheader.crownheadergold");
    allPlatinum.insertAfter(platinumHeader);
    allPlatinum
        .find(".numcatches.gold")
        .removeClass("numcatches gold")
        .addClass("numcatches plat");
    localStorage.setItem("PlatCrownCount", allPlatinum.length);
    var goldQuantity = goldHeader
        .find(".crownquantity")
        .text()
        .replace(/[{()}]/g, "");
    goldHeader
        .find(".crownquantity")
        .text(
            "(" +
            (parseInt(goldQuantity, 10) - localStorage.getItem("PlatCrownCount")) +
            ")"
        );
    platinumHeader
        .find(".crownquantity")
        .text("(" + localStorage.getItem("PlatCrownCount") + ")");
    platinumHeader.css("background", platinumCrown + "no-repeat left top");
    $(".numcatches.plat").css(
        "background",
        platinumCrown + "no-repeat right top"
    );
}

function sortDiamond() {
    var allMice = $(".mousebox");
    var allPlat = allMice.find(".numcatches.plat");
    var allDiamond = allPlat.filter(function(index) {
        if ($(this).text() >= 2500 && $(".mousebox").length > 0) {
            return true;
        } else {
            return false;
        }
    });

    if ($(".favoriteCrownToggle.crownAction").length > 0) {
        allDiamond = allDiamond
            .parent()
            .parent()
            .not(".mousebox.favorite")
            .parent();
    } else {
        allDiamond = allDiamond
            .parent()
            .parent()
            .not(".mousebox.favorite");
    }

    var diamondHeader = $(".crownheader.crownheaderdiamond");
    var platinumHeader = $(".crownheader.crownheaderplatinum");
    allDiamond.insertAfter(diamondHeader);
    allDiamond
        .find(".numcatches.plat")
        .removeClass("numcatches plat")
        .addClass("numcatches diamond");
    localStorage.setItem("DiamondCrownCount", allDiamond.length);
    localStorage.setItem(
        "PlatCrownCount",
        parseInt(localStorage.getItem("PlatCrownCount"), 10) - allDiamond.length
    );
    platinumHeader
        .find(".crownquantity")
        .text("(" + parseInt(localStorage.getItem("PlatCrownCount"), 10) + ")");
    diamondHeader
        .find(".crownquantity")
        .text("(" + parseInt(localStorage.getItem("DiamondCrownCount"), 10) + ")");
    diamondHeader.css("background", diamondCrown + "no-repeat left top");
    $(".numcatches.diamond").css(
        "background",
        diamondCrown + "no-repeat right top"
    );
}

function sortMaster() {
    var allMice = $(".mousebox");
    var allDiamond = allMice.find(".numcatches.diamond");
    var allMaster = allDiamond.filter(function(index) {
        if ($(this).text() >= 5000 && $(".mousebox").length > 0) {
            return true;
        } else {
            return false;
        }
    });

    if ($(".favoriteCrownToggle.crownAction").length > 0) {
        allMaster = allMaster
            .parent()
            .parent()
            .not(".mousebox.favorite")
            .parent();
    } else {
        allMaster = allMaster
            .parent()
            .parent()
            .not(".mousebox.favorite");
    }

    var masterHeader = $(".crownheader.crownheadermaster");
    var diamondHeader = $(".crownheader.crownheaderdiamond");
    allMaster.insertAfter(masterHeader);
    allMaster
        .find(".numcatches.diamond")
        .removeClass("numcatches diamond")
        .addClass("numcatches master");
    localStorage.setItem("MasterCrownCount", allMaster.length);
    localStorage.setItem(
        "DiamondCrownCount",
        parseInt(localStorage.getItem("DiamondCrownCount"), 10) - allMaster.length
    );
    diamondHeader
        .find(".crownquantity")
        .text("(" + parseInt(localStorage.getItem("DiamondCrownCount"), 10) + ")");
    masterHeader
        .find(".crownquantity")
        .text("(" + parseInt(localStorage.getItem("MasterCrownCount"), 10) + ")");
    masterHeader.css("background", masterCrown + "no-repeat left top");
    $(".numcatches.master").css(
        "background",
        masterCrown + "no-repeat right top"
    );
}

function sortFavotitesAfterSort() {
    var topHeader = $(".crownheader.crownheadertop");
    var allMice = $(".mousebox.favorite");
    var allFavorites = allMice.find(".numcatches.gold");
    var nonFavs = $(".mousebox").not(".mousebox favorite");
    var goldHeader = $(".crownheader.crownheadergold");
    var platinumHeader = $(".crownheader.crownheaderplatinum");
    var diamondHeader = $(".crownheader.crownheaderdiamond");
    var masterHeader = $(".crownheader.crownheadermaster");
    var seen = {};

    allFavorites.each(function() {
        var txt = $(this).text();
        if (seen[txt]) {
            //move  fav to new crown class
            if (txt >= 5000) {
                if ($(".favoriteCrownToggle.crownAction").length > 0) {
                    $(this)
                        .parent()
                        .parent()
                        .parent()
                        .insertAfter(masterHeader);
                } else {
                    $(this)
                        .parent()
                        .parent()
                        .insertAfter(masterHeader);
                }
                $(this)
                    .removeClass("numcatches gold")
                    .addClass("numcatches master");
                localStorage.setItem(
                    "MasterCrownCount",
                    parseInt(localStorage.getItem("MasterCrownCount"), 10) + 1
                );
                var goldQuantity = goldHeader
                    .find(".crownquantity")
                    .text()
                    .replace(/[{()}]/g, "");
                goldHeader
                    .find(".crownquantity")
                    .text("(" + (parseInt(goldQuantity, 10) - 1) + ")");
                masterHeader
                    .find(".crownquantity")
                    .text("(" + localStorage.getItem("MasterCrownCount") + ")");
                $(".numcatches.master").css(
                    "background",
                    masterCrown + "no-repeat right top"
                );
                var masterResult = filterOutTopFavs(
                    $(".numcatches.master")
                    .parent()
                    .find(".name")
                );
                masterResult = masterResult.parent().find(".numcatches.master");
                var masterArray = sortAcsending(masterResult);
                masterArray.every(function(cell) {
                    if ($(".favoriteCrownToggle.crownAction").length > 0) {
                        $(cell)
                            .parent()
                            .parent()
                            .parent()
                            .detach()
                            .insertAfter(masterHeader);
                    } else {
                        $(cell)
                            .parent()
                            .parent()
                            .detach()
                            .insertAfter(masterHeader);
                    }
                    return true;
                });
            } else if (txt >= 2500) {
                if ($(".favoriteCrownToggle.crownAction").length > 0) {
                    $(this)
                        .parent()
                        .parent()
                        .parent()
                        .insertAfter(diamondHeader);
                } else {
                    $(this)
                        .parent()
                        .parent()
                        .insertAfter(diamondHeader);
                }
                $(this)
                    .removeClass("numcatches gold")
                    .addClass("numcatches diamond");
                localStorage.setItem(
                    "DiamondCrownCount",
                    parseInt(localStorage.getItem("DiamondCrownCount"), 10) + 1
                );
                var goldQuantity = goldHeader
                    .find(".crownquantity")
                    .text()
                    .replace(/[{()}]/g, "");
                goldHeader
                    .find(".crownquantity")
                    .text("(" + (parseInt(goldQuantity, 10) - 1) + ")");
                diamondHeader
                    .find(".crownquantity")
                    .text("(" + localStorage.getItem("DiamondCrownCount") + ")");
                $(".numcatches.diamond").css(
                    "background",
                    diamondCrown + "no-repeat right top"
                );
                var diamondResult = filterOutTopFavs(
                    $(".numcatches.diamond")
                    .parent()
                    .find(".name")
                );
                diamondResult = diamondResult.parent().find(".numcatches.diamond");
                var diamondArray = sortAcsending(diamondResult);
                diamondArray.every(function(cell) {
                    if ($(".favoriteCrownToggle.crownAction").length > 0) {
                        $(cell)
                            .parent()
                            .parent()
                            .parent()
                            .detach()
                            .insertAfter(diamondHeader);
                    } else {
                        $(cell)
                            .parent()
                            .parent()
                            .detach()
                            .insertAfter(diamondHeader);
                    }
                    return true;
                });
            } else if (txt >= 1000) {
                if ($(".favoriteCrownToggle.crownAction").length > 0) {
                    $(this)
                        .parent()
                        .parent()
                        .parent()
                        .insertAfter(platinumHeader);
                } else {
                    $(this)
                        .parent()
                        .parent()
                        .insertAfter(platinumHeader);
                }
                $(this)
                    .removeClass("numcatches gold")
                    .addClass("numcatches plat");
                localStorage.setItem(
                    "PlatCrownCount",
                    parseInt(localStorage.getItem("PlatCrownCount"), 10) + 1
                );
                var goldQuantity = goldHeader
                    .find(".crownquantity")
                    .text()
                    .replace(/[{()}]/g, "");
                goldHeader
                    .find(".crownquantity")
                    .text("(" + (parseInt(goldQuantity, 10) - 1) + ")");
                platinumHeader
                    .find(".crownquantity")
                    .text("(" + localStorage.getItem("PlatCrownCount") + ")");
                $(".numcatches.plat").css(
                    "background",
                    platinumCrown + "no-repeat right top"
                );
                var platResult = filterOutTopFavs(
                    $(".numcatches.plat")
                    .parent()
                    .find(".name")
                );
                platResult = platResult.parent().find(".numcatches.plat");
                var platArray = sortAcsending(platResult);
                platArray.every(function(cell) {
                    if ($(".favoriteCrownToggle.crownAction").length > 0) {
                        $(cell)
                            .parent()
                            .parent()
                            .parent()
                            .detach()
                            .insertAfter(platinumHeader);
                    } else {
                        $(cell)
                            .parent()
                            .parent()
                            .detach()
                            .insertAfter(platinumHeader);
                    }
                    return true;
                });
            }
        } else {
            // Change top fav to new crown class only
            if (txt >= 5000) {
                $(this)
                    .removeClass("numcatches gold")
                    .addClass("numcatches master");
                $(".numcatches.master").css(
                    "background",
                    masterCrown + "no-repeat right top"
                );
            } else if (txt >= 2500) {
                $(this)
                    .removeClass("numcatches gold")
                    .addClass("numcatches diamond");
                $(".numcatches.diamond").css(
                    "background",
                    diamondCrown + "no-repeat right top"
                );
            } else if (txt >= 1000) {
                $(this)
                    .removeClass("numcatches gold")
                    .addClass("numcatches plat");
                $(".numcatches.plat").css(
                    "background",
                    platinumCrown + "no-repeat right top"
                );
            }
            seen[txt] = true;
        }
    });
}

/********** Hide **********/
function hideCrowns() {
    var allMice = $(".mousebox");
    var allPlat = allMice.find(".numcatches.plat");
    var allDiamond = allMice.find(".numcatches.diamond");
    var allMaster = allMice.find(".numcatches.master");
    var goldHeader = $(".crownheader.crownheadergold");
    var platinumHeader = $(".crownheader.crownheaderplatinum");
    var diamondHeader = $(".crownheader.crownheaderdiamond");
    var masterHeader = $(".crownheader.crownheadermaster");
    removeTheseCrowns(allMaster);
    removeTheseCrowns(allDiamond);
    removeTheseCrowns(allPlat);
    allPlat.removeClass("numcatches plat").addClass("numcatches gold");
    allDiamond.removeClass("numcatches diamond").addClass("numcatches gold");
    allMaster.removeClass("numcatches master").addClass("numcatches gold");
    var result = filterOutTopFavs(
        $(".numcatches.gold")
        .parent()
        .find(".name")
    );
    result = result.parent().find(".numcatches.gold");
    var array = sortAcsending(result);
    array.every(function(cell) {
        if ($(".favoriteCrownToggle.crownAction").length > 0) {
            $(cell)
                .parent()
                .parent()
                .parent()
                .detach()
                .insertAfter(goldHeader);
        } else {
            $(cell)
                .parent()
                .parent()
                .detach()
                .insertAfter(goldHeader);
        }
        return true;
    });
    $(".numcatches.gold").css(
        "background",
        "url('https://www.mousehuntgame.com/images/ui/badges/gold.png') no-repeat right top"
    );
    goldHeader.find(".crownquantity").text("(" + result.length + ")");
    $(".crownheader.crownheaderplatinum").remove();
    $(".crownheader.crownheaderdiamond").remove();
    $(".crownheader.crownheadermaster").remove();
    $("#spacer1").remove();
    $("#spacer2").remove();
    $("#spacer3").remove();
}

function removeTheseCrowns(elements) {
    var goldHeader = $(".crownheader.crownheadergold");
    var crown = elements.attr("class");
    if (crown == "numcatches plat") {
        crown = ".numcatches.plat";
    } else if (crown == "numcatches diamond") {
        crown = ".numcatches.diamond";
    } else if (crown == "numcatches master") {
        crown = ".numcatches.master";
    }
    var result = filterOutTopFavs(elements.parent().find(".name"));
    result = result.parent().find(crown);
    if ($(".favoriteCrownToggle.crownAction").length > 0) {
        result
            .parent()
            .parent()
            .parent()
            .detach()
            .insertAfter(goldHeader);
    } else {
        result
            .parent()
            .parent()
            .detach()
            .insertAfter(goldHeader);
    }
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
        "<div class='crownheader crownheadercommunity'>Community Ranks <div class='crownnote'>Set by the MH Community Groups</div></div>"
    );
    communityCrownHeader.css(
        "background",
        "url('https://image.flaticon.com/icons/svg/478/478941.svg') no-repeat left top"
    );
    communityCrownHeader.insertAfter(crownBreak);
    spacer4.insertAfter(communityCrownHeader);
    var allMice = $(".mousebox");
    var allBronze = allMice.find(
        ".numcatches.bronze,.numcatches.silver,.numcatches.gold,.numcatches.plat,.numcatches.diamond,.numcatches.master"
    );
    allBronze = filterOutTopFavs(allBronze);
    var allSilver = allMice.find(
        ".numcatches.silver,.numcatches.gold,.numcatches.plat,.numcatches.diamond,.numcatches.master"
    );
    allSilver = filterOutTopFavs(allSilver);
    var allGold = allMice.find(
        ".numcatches.gold,.numcatches.plat,.numcatches.diamond,.numcatches.master"
    );
    allGold = filterOutTopFavs(allGold);
    var bronzeHeader = $(".crownheader.crownheaderbronze");
    var silverHeader = $(".crownheader.crownheadersilver");
    var goldHeader = $(".crownheader.crownheadergold");
    var bronzeCrowns = allBronze.length;
    var silverCrowns = allSilver.length;
    var goldCrowns = allGold.length;
    var bronzeLink = "https://docs.google.com/spreadsheets/d/19_wHCkwiT5M6LS7XNLt4NYny98fjpg4UlHbgOD05ijw/pub?fbclid=IwAR3a1Ku2xTl1mIDksUr8Lk5ORMEnuv7jnvIy9K6OBeziG6AyvYYlZaIQkHY"
    var silverLink = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQG5g3vp-q7LRYug-yZR3tSwQzAdN7qaYFzhlZYeA32vLtq1mJcq7qhH80planwei99JtLRFAhJuTZn/pubhtml?fbclid=IwAR3sPXNLloGnFk324a0HShroP1E-sNcnQBlRTjJ7gScWTWosqmXv5InB_Ns'
    var goldLink = 'https://docs.google.com/spreadsheets/d/10OGD5OYkGIEAbiez7v92qU5Fdul0ZtCRgEjlECkwZJE/pubhtml?gid=478731024&single=true&fbclid=IwAR28w7IQyMp91I62CR3GOILpbeLwgKaydIoQimMNm7j3S0DL8Mj_IsRpGD4'
    var rankSummary = $(
        "<div class='rank summary' style='font-size: 14px'></div>"
    );
    rankSummary.insertAfter(communityCrownHeader);
    var bronzeText = document.createTextNode("Bronze Crowns: "+ getRankBronze(bronzeCrowns)+" | ");
    var silverText = document.createTextNode("Silver Crowns: "+ getRankSilver(silverCrowns)+" | ");
    var goldText = document.createTextNode("Gold Crowns: " + goldCrowns + " or " + ((goldCrowns / totalMice) * 100).toFixed(2) + "%");
    var aBronze = document.createElement('a');
    aBronze.appendChild(bronzeText);
    aBronze.title = "90% Crowned Scoreboard";
    aBronze.href = bronzeLink;
    $(aBronze).attr("target", "_blank");
    var aSilver = document.createElement('a');
    aSilver.appendChild(silverText);
    aSilver.title = "MHCC Scoreboard";
    aSilver.href = silverLink;
    $(aSilver).attr("target", "_blank");
    var aGold = document.createElement('a');
    aGold.appendChild(goldText);
    aGold.title = "MHCC Elite Scoreboard";
    aGold.href = goldLink;
    $(aGold).attr("target", "_blank");
    $(rankSummary).append(aBronze).append(aSilver).append(aGold);
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

    return rank + " (" + crowns + " or " + crownPrecent + ")";
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

    return rank + " (" + crowns + " or " + crownPrecent + ")";
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
    var allCrowns = allMice.find(".numcatches.bronze,.numcatches.silver,.numcatches.gold,.numcatches.plat,.numcatches.diamond,.numcatches.master");
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
    else {newMouseName = mouseName}
return newMouseName;
}

// Base64 image assets
var platinumCrown =
    "url('data:image/png;base64,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')";
var diamondCrown =
    "url('data:image/png;base64,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')";
var masterCrown =
    "url('data:image/png;base64,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')";
