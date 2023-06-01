function getSelectedText() {
    var text = "";
    if (typeof window.getSelection != "undefined") {
        text = window.getSelection().toString();
    } else if (
        typeof document.selection != "undefined" &&
        document.selection.type == "Text"
    ) {
        text = document.selection.createRange().text;
    }
    return text;
}

function clearSelection() {
    if (window.getSelection) {
        if (window.getSelection().empty) {  // Chrome
            window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) {  // Firefox
            window.getSelection().removeAllRanges();
        }
    } else if (document.selection) {  // IE?
        document.selection.empty();
    }
}

let intervalId = -1;
let chameleonTxt = "---";

function checkSelection() {
    let txt = getSelectedText();
    if (txt) {
        txt = txt.replace(/\s+/g, "");
    }

    // everything is selected
    if (txt == chameleonTxt) {
        clearInterval(intervalId);
        $("#chameleon").hide();
        $("#showyourself").show();
        $("#chameleon-header").show();

        clearSelection();
    }
}

function listenToSelection() {
    intervalId = setInterval(checkSelection, 1000);
    chameleonTxt = $("#chameleon").text().replace(/\s+/g, "");
}

function clear() {
    $("#chameleon").show();
    $("#showyourself").hide();
    $("#chameleon-header").hide();
    listenToSelection();
}