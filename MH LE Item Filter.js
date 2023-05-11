// ==UserScript==
// @name         MH: LE Item Filter
// @author       Warden Slayer - Warden Slayer#2302
// @namespace    https://greasyfork.org/en/users/227259-wardenslayer
// @version      1.4.5
// @description  Adds a checkbox that allows you to hide LE items on your profile
// @include      https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @include      http://www.mousehuntgame.com/*
// @include      https://www.mousehuntgame.com/*
// ==/UserScript==
//===================================================================================
$(document).ready(function() {
    if (localStorage.getItem('IsChecked') == "Y") {
        "";
    } else {
        localStorage.setItem('IsChecked', "N")
    }
    var observer = new MutationObserver(callback);
    var observerOptions = {
        childList: true,
        attributes: false,
        subtree: false,
    };
    if ($("#tabbarContent_page_3").get(0)) {
    observer.observe($("#tabbarContent_page_3").get(0), observerOptions)
    }
});
//
$(document).on('change', '#hideLeCb', function() {
    if ((window.location.href).includes("profile.php") && $("#tabbarContent_page_3").hasClass("active")) {
        //
        //check to see if the cb was JUST checked
        if (this.checked) {
            // Put the checked value into storage
            localStorage.setItem('IsChecked', "Y");
            hideLeCb.checked = "Yes";
            sortItemsByLE("Hide")
        } else {
            // Put the checked value into storage
            localStorage.setItem('IsChecked', "N");
            hideLeCb.checked = "";
            sortItemsByLE("Show")
        }
    }
});

function callback(mutationList, observer) {
    mutationList.forEach((mutation) => {
        switch (mutation.type) {
            case 'childList':
                if ($(".itemImageBoxes").children().length > 0) {
                    //default landing page is collected
                    page = 2;
                    if (localStorage.getItem('IsChecked') == "Y") {
                        sortItemsByLE("Hide");
                    } else {
                        sortItemsByLE("Show");
                    }
                    break;
                }
        }
    })
}
$(document).on('click', "[data-filter='showAllItems']", function() {
    if (page == 1) {
        return false;
    } else if (localStorage.getItem('IsChecked') == "Y") {
        resetTab("Show");
        sortItemsByLE("Hide");
    } else if (localStorage.getItem('IsChecked') == "N") {
        sortItemsByLE("Show");
    }
});
$(document).on('click', "[data-filter='showGotItems']", function() {
    if (page == 2) {
        return false;
    } else if (localStorage.getItem('IsChecked') == "Y") {
        resetTab("Show");
        sortItemsByLE("Hide");
    } else if (localStorage.getItem('IsChecked') == "N") {
        sortItemsByLE("Show");
    }

});
$(document).on('click', "[data-filter='showNotGotItems']", function() {
    if (page == 3) {
        return false;
    } else if (localStorage.getItem('IsChecked') == "Y") {
        resetTab("Show");
        sortItemsByLE("Hide");
    } else if (localStorage.getItem('IsChecked') == "N") {
        sortItemsByLE("Show", "showNotGotItems");
    }
});
$(document).on('click', "[data-filter='showLimitedItems']", function() {
    if (page == 4) {
        return false;
    } else if (localStorage.getItem('IsChecked') == "Y") {
        sortItemsByLE("Show", "showLimitedItems");
    } else if (localStorage.getItem('IsChecked') == "N") {
        //do nothing
    }
});

function resetTab(reset) {
    //Reset Current Tab
    if (page == 1) {
        sortItemsByLE(reset, "showAllItems");
    } else if (page == 2) {
        sortItemsByLE(reset, "showGotItems");
    } else if (page == 3) {
        sortItemsByLE(reset, "showNotGotItems");
    } else if (page == 4) {
        sortItemsByLE(reset, "showLimitedItems")
    }
}
//========================================
function sortItemsByLE(showHide, statusOverride) {
    var displayBox = $(".itemImageBoxes");
    buildHideLe(displayBox)
    //==========================================
    var status = 0;
    if (statusOverride !== undefined) {
        status = statusOverride;
    } else if ($(".itemImageBoxes.showAllItems").length > 0) {
        status = "showAllItems";
    } else if ($(".itemImageBoxes.showGotItems").length > 0) {
        status = "showGotItems";
    } else if ($(".itemImageBoxes.showNotGotItems").length > 0) {
        status = "showNotGotItems";
    } else if ($(".itemImageBoxes.showLimitedItems").length > 0) {
        status = "showLimitedItems";
    }
    //==========================================
    var allItems = null;
    var leItems = null;
    if (showHide == "Hide") {
        if (status == "showAllItems") {
            allItems = $(".itemImageBoxes.showAllItems").children();
            var allLeItems = allItems.find(".limitedEdition").parent().parent();
            var allNonLeItems = allItems.filter(allLeItems);
            page = 1;
            allLeItems.hide();
            leItems = allLeItems;
            //
        } else if (status == "showGotItems") {
            allItems = $(".itemImageBoxes.showGotItems").children();
            var allLeItems = allItems.find(".limitedEdition").parent().parent();
            var leItemsGot = allLeItems.filter("div.itemImageBox.gotItem");
            var leItemsNotGot = allLeItems.filter("div.itemImageBox.noItem");
            if (page == 4) {
                leItemsNotGot.hide();
            }
            page = 2;
            leItemsGot.hide();
            leItems = leItemsGot;
        } else if (status == "showNotGotItems") {
            allItems = $(".itemImageBoxes.showNotGotItems").children();
            var allLeItems = allItems.find(".limitedEdition").parent().parent();
            var leItemsNotGot = allLeItems.filter("div.itemImageBox.noItem");
            var leItemsGot = allLeItems.filter("div.itemImageBox.gotItem");
            if (page == 4) {
                leItemsGot.hide();
            }
            page = 3;
            leItemsNotGot.hide();
            leItems = leItemsNotGot;
        } else if (status == "showLimitedItems") {
            allItems = $(".itemImageBoxes.showLimitedItems").children();
            var allLeItems = allItems.find(".limitedEdition").parent().parent();
            leItems = allLeItems;
            page = 4;
        }
        //==================================================================== Hide^ Show V
    } else if (showHide == "Show") {
        if (status == "showAllItems") {
            allItems = $(".itemImageBoxes.showAllItems").children();
            var allLeItems = allItems.find(".limitedEdition").parent().parent();
            var allNonLeItems = allItems.filter(allLeItems);
            page = 1;
            allLeItems.show();
            leItems = allLeItems;
            //
        } else if (status == "showGotItems") {
            allItems = $(".itemImageBoxes.showGotItems").children();
            var allLeItems = allItems.find(".limitedEdition").parent().parent();
            var leItemsGot = allLeItems.filter("div.itemImageBox.gotItem");
            var leItemsNotGot = allLeItems.filter("div.itemImageBox.noItem");
            page = 2;
            leItemsGot.show();
            leItemsNotGot.hide();
            leItems = leItemsGot;
            //
        } else if (status == "showNotGotItems") {
            allItems = $(".itemImageBoxes.showNotGotItems").children();
            var allLeItems = allItems.find(".limitedEdition").parent().parent();
            var leItemsNotGot = allLeItems.filter("div.itemImageBox.noItem");
            var leItemsGot = allLeItems.filter("div.itemImageBox.gotItem");
            page = 3;
            leItemsNotGot.show();
            leItemsGot.hide();
            leItems = leItemsNotGot;
        } else if (status == "showLimitedItems") {
            allItems = $(".itemImageBoxes.showLimitedItems").children();
            var allLeItems = allItems.find(".limitedEdition").parent().parent();
            var leItemsNotGot = allLeItems.filter("div.itemImageBox.noItem");
            var leItemsGot = allLeItems.filter("div.itemImageBox.gotItem");
            if (page == 1) {
                allLeItems.show();
                leItems = allLeItems;
            } else if (page == 2) {
                leItemsGot.show();
                leItemsNotGot.hide();
                leItems = leItemsGot;
            } else if (page == 3) {
                leItemsGot.hide();
                leItemsNotGot.show();
                leItems = leItemsNotGot;
            }
            page = 4;
        }
    } else {
        //do nothing
    }
    return leItems;
}

function buildHideLe(displayBox) {
    //If we already have an hideLe Section, do not make another
    if ($('.hideLe').length > 0)
        return;
    var hideLe = document.createElement("div");
    hideLe.classList.add('hideLe');
    var hideLeCb = document.createElement('input');
    hideLeCb.type = "checkbox";
    hideLeCb.name = "hideLeCb";
    hideLeCb.value = "value";
    hideLeCb.id = "hideLeCb";
    if (localStorage.getItem('IsChecked') == "Y") {
        hideLeCb.checked = "Yes";
    } else {
        hideLeCb.checked = "";
    }
    var hideLeLabel = document.createElement('label')
    hideLeLabel.htmlFor = "hideLeLabel";
    hideLeLabel.appendChild(document.createTextNode('Hide '));
    $("hideLeLabel").css("fontSize", "20px");
    //
    hideLe.appendChild(hideLeCb);
    hideLe.appendChild(hideLeLabel);
    var leImage = document.createElement("IMG");
    leImage.src = "https://www.mousehuntgame.com/images/icons/limited_edition.gif";
    hideLe.appendChild(leImage);
    //=====
    displayBox.prepend(hideLe)
    return hideLe;
}
