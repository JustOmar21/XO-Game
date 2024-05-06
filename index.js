var _a, _b, _c, _d;
var tds = document.querySelectorAll("td");
var player1 = 0;
var player2 = 0;
var number = 0;
var result = 0;
var LockPlay1 = false;
var LockPlay2 = false;
var player1Queue = [];
var player2Queue = [];
var table = document.querySelector("table");
console.log(tds.length);
for (var td = 0; td < tds.length; td++) {
    console.log(tds[td]);
    tds[td].addEventListener("click", ChangeBackground);
    tds[td].addEventListener("transitionend", DidWin);
}
(_a = localStorage.getItem("P1Now")) !== null && _a !== void 0 ? _a : localStorage.setItem("P1Now", "player 1");
(_b = localStorage.getItem("P2Now")) !== null && _b !== void 0 ? _b : localStorage.setItem("P2Now", "player 2");
(_c = localStorage.getItem("player 1")) !== null && _c !== void 0 ? _c : localStorage.setItem("player 1", "0,0");
(_d = localStorage.getItem("player 2")) !== null && _d !== void 0 ? _d : localStorage.setItem("player 2", "0,0");
var player1Now = localStorage.getItem("P1Now");
var player2Now = localStorage.getItem("P2Now");
getScores();
function ChangeBackground(event) {
    if (LockPlay1 == false && LockPlay2 == false) {
        disableEdit();
        if (event.target.children.length == 1 && number == 1) {
            number = 0;
            event.target.innerHTML += "<img src='assets/xTic.png'></img>";
            if (player2Queue.length == 3) {
                player2 -= Number(player2Queue[0].Element.previousSibling.innerText);
                result--;
                player2Queue[0].ParentElement.removeChild(player2Queue[0].Element);
                player2Queue.shift();
            }
            if (player1Queue.length == 3)
                Change1stOpacity(1);
            var point = new Point();
            point.Element = event.target.children[1];
            point.ParentElement = event.target;
            player2Queue.push(point);
            event.target.children[1].style.width = "".concat(parseInt(window.getComputedStyle(event.target).getPropertyValue("width")) - 25, "px");
            event.target.children[1].style.height = "".concat(parseInt(window.getComputedStyle(event.target).getPropertyValue("height")) - 25, "px");
            player2 += Number(event.target.children[0].innerText);
        }
        else if (event.target.children.length == 1 && number == 0) {
            number = 1;
            event.target.innerHTML += "<img src='assets/oTic.png'></img>";
            if (player1Queue.length == 3) {
                player1 -= Number(player1Queue[0].Element.previousSibling.innerText);
                result--;
                player1Queue[0].ParentElement.removeChild(player1Queue[0].Element);
                player1Queue.shift();
            }
            if (player2Queue.length == 3)
                Change1stOpacity(2);
            var point = new Point();
            point.Element = event.target.children[1];
            point.ParentElement = event.target;
            player1Queue.push(point);
            event.target.children[1].style.width = "".concat(parseInt(window.getComputedStyle(event.target).getPropertyValue("width")) - 25, "px");
            event.target.children[1].style.height = "".concat(parseInt(window.getComputedStyle(event.target).getPropertyValue("height")) - 25, "px");
            player1 += Number(event.target.children[0].innerText);
        }
        console.log("Player 1 : ".concat(player1, " , Player 2 : ").concat(player2));
        result++;
    }
    else {
        document.querySelector(".modal-title").innerHTML = "<span class='text-warning'>Warning</span>";
        document.querySelector(".modal-body").innerHTML = "Finish editing players names";
        document.querySelector(".modal-footer button").innerHTML = "Return";
        document.querySelector(".modalLaunch").click();
    }
}
function DidWin() {
    if (player1 == 15 && player1Queue.length == 3) {
        player1 = player2 = 0;
        document.querySelector(".modal-title").innerHTML = "Success";
        document.querySelector(".modal-body").innerHTML = "".concat(player1Now, " Wins !!");
        document.querySelector(".modal-footer button").innerHTML = "Reset";
        p1Win();
        document.querySelector(".modalLaunch").click();
    }
    else if (player2 == 15 && player2Queue.length == 3) {
        player1 = player2 = 0;
        document.querySelector(".modal-title").innerHTML = "Success";
        document.querySelector(".modal-body").innerHTML = "".concat(player2Now, " Wins !!");
        document.querySelector(".modal-footer button").innerHTML = "Reset";
        p2Win();
        document.querySelector(".modalLaunch").click();
    }
}
function p1Win() {
    var p1Scores = localStorage.getItem(player1Now);
    var p1Score = p1Scores.split(",");
    p1Score[0] = "".concat(parseInt(p1Score[0]) + 1);
    var p1FinalScore = p1Score.join(",");
    var p2Scores = localStorage.getItem(player2Now);
    var p2Score = p2Scores.split(",");
    p2Score[1] = "".concat(parseInt(p2Score[1]) + 1);
    var p2FinalScore = p2Score.join(",");
    localStorage.setItem(player1Now, p1FinalScore);
    localStorage.setItem(player2Now, p2FinalScore);
    console.log("Player 1 : ".concat(p1FinalScore, " , Player 2 : ").concat(p2FinalScore));
}
function p2Win() {
    var p1Scores = localStorage.getItem(player1Now);
    var p1Score = p1Scores.split(",");
    p1Score[1] = "".concat(parseInt(p1Score[1]) + 1);
    var p1FinalScore = p1Score.join(",");
    var p2Scores = localStorage.getItem(player2Now);
    var p2Score = p2Scores.split(",");
    p2Score[0] = "".concat(parseInt(p2Score[0]) + 1);
    var p2FinalScore = p2Score.join(",");
    localStorage.setItem(player1Now, p1FinalScore);
    localStorage.setItem(player2Now, p2FinalScore);
    console.log("Player 1 : ".concat(p1FinalScore, " , Player 2 : ").concat(p2FinalScore));
}
function Reset() {
    result = 0;
    for (var td = 0; td < tds.length; td++) {
        if (tds[td].children.length > 1)
            tds[td].removeChild(tds[td].children[1]);
    }
    enableEdit();
    getScores();
    player1 = 0;
    player2 = 0;
    player1Queue = [];
    player2Queue = [];
}
function getScores() {
    player1Now = localStorage.getItem("P1Now");
    player2Now = localStorage.getItem("P2Now");
    document.querySelector(".p1Name").innerHTML = "".concat(player1Now);
    document.querySelector(".p2Name").innerHTML = "".concat(player2Now);
    var p1Score = localStorage.getItem(player1Now);
    var p2Score = localStorage.getItem(player2Now);
    var p1Wins = document.querySelector(".P1W");
    var p1Loss = document.querySelector(".P1L");
    p1Wins.innerText = "W : ".concat(p1Score === null || p1Score === void 0 ? void 0 : p1Score.split(",")[0]);
    p1Loss.innerText = "L : ".concat(p1Score === null || p1Score === void 0 ? void 0 : p1Score.split(",")[1]);
    var p2Wins = document.querySelector(".P2W");
    var p2Loss = document.querySelector(".P2L");
    p2Wins.innerText = "W : ".concat(p2Score === null || p2Score === void 0 ? void 0 : p2Score.split(",")[0]);
    p2Loss.innerText = "L : ".concat(p2Score === null || p2Score === void 0 ? void 0 : p2Score.split(",")[1]);
}
function disableEdit() {
    var buttons = document.querySelectorAll("label button");
    var inputs = document.querySelectorAll("label input");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true;
    }
}
function enableEdit() {
    var EditButtons = document.querySelectorAll("label button");
    for (var i = 0; i < EditButtons.length; i++) {
        EditButtons[i].disabled = false;
    }
}
function Change1stOpacity(player) {
    if (player == 1) {
        player1Queue[0].Element.style.opacity = ".4";
    }
    else if (player == 2) {
        player2Queue[0].Element.style.opacity = ".4";
    }
}
function editName(event, player) {
    console.log(event.previousElementSibling);
    event.previousElementSibling.classList.remove("disabled");
    event.previousElementSibling.previousElementSibling.disabled = false;
    event.classList.add("disabled");
    if (player == 1)
        LockPlay1 = true;
    if (player == 2)
        LockPlay2 = true;
}
function saveName(event, player) {
    var _a;
    var name = event.previousElementSibling.value.toLowerCase();
    console.log(name);
    if (player == 1 && name == player2Now) {
        document.querySelector(".modal-title").innerHTML = "<span class='text-warning'>Warning</span>";
        document.querySelector(".modal-body").innerHTML = "\"".concat(name, "\" is already chosen by player 2");
        document.querySelector(".modal-footer button").innerHTML = "Return";
        document.querySelector(".modalLaunch").click();
    }
    else if (player == 2 && name == player1Now) {
        document.querySelector(".modal-title").innerHTML = "<span class='text-warning'>Warning</span>";
        document.querySelector(".modal-body").innerHTML = "\"".concat(name, "\" is already chosen by player 1");
        document.querySelector(".modal-footer button").innerHTML = "Return";
        document.querySelector(".modalLaunch").click();
    }
    else {
        if (name == "") {
            localStorage.setItem("P".concat(player, "Now"), "player ".concat(player));
        }
        else {
            (_a = localStorage.getItem(name)) !== null && _a !== void 0 ? _a : localStorage.setItem(name, "0,0");
            localStorage.setItem("P".concat(player, "Now"), "".concat(name));
            event.previousElementSibling.value = "";
        }
        event.nextElementSibling.classList.remove("disabled");
        event.previousElementSibling.disabled = true;
        event.classList.add("disabled");
        if (player == 1)
            LockPlay1 = false;
        if (player == 2)
            LockPlay2 = false;
        getScores();
    }
    event.previousElementSibling.value = "";
}
var Point = /** @class */ (function () {
    function Point() {
    }
    return Point;
}());
