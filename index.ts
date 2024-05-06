let tds = document.querySelectorAll<HTMLElement>("td");
let player1 = 0;
let player2 = 0;
let number = 0;
let result = 0;
let LockPlay1 = false;
let LockPlay2 = false;
let player1Queue: Point[] = [];
let player2Queue: Point[] = [];
let table = document.querySelector<HTMLElement>("table");


console.log(tds.length);
for (let td = 0; td < tds.length; td++) {
   console.log(tds[td]);
   tds[td].addEventListener("click", ChangeBackground);
   tds[td].addEventListener("transitionend", DidWin);
}

localStorage.getItem("P1Now") ?? localStorage.setItem("P1Now", "player 1")
localStorage.getItem("P2Now") ?? localStorage.setItem("P2Now", "player 2");
localStorage.getItem("player 1") ?? localStorage.setItem("player 1", "0,0");
localStorage.getItem("player 2") ?? localStorage.setItem("player 2", "0,0");
let player1Now = localStorage.getItem("P1Now");
let player2Now = localStorage.getItem("P2Now");
getScores();



function ChangeBackground(event) {
   if (LockPlay1 == false && LockPlay2 == false) {
      disableEdit();
      if (event.target.children.length == 1 && number == 1) {
         number = 0;
         event.target.innerHTML += "<img src='assets/xTic.png'></img>";
         if (player2Queue.length == 3) {
            player2 -= Number((player2Queue[0].Element.previousSibling! as HTMLElement).innerText);
            result--;
            player2Queue[0].ParentElement.removeChild(player2Queue[0].Element);
            player2Queue.shift()
         }
         if (player1Queue.length == 3) Change1stOpacity(1);
         let point = new Point();
         point.Element = event.target.children[1];
         point.ParentElement = event.target;
         player2Queue.push(point);
         event.target.children[1].style.width = `${parseInt(window.getComputedStyle(event.target).getPropertyValue("width")) - 25}px`;
         event.target.children[1].style.height = `${parseInt(window.getComputedStyle(event.target).getPropertyValue("height")) - 25}px`;
         player2 += Number(event.target.children[0].innerText);
      }
      else if (event.target.children.length == 1 && number == 0) {
         number = 1;
         event.target.innerHTML += "<img src='assets/oTic.png'></img>";
         if (player1Queue.length == 3) {
            player1 -= Number((player1Queue[0].Element.previousSibling! as HTMLElement).innerText);
            result--;
            player1Queue[0].ParentElement.removeChild(player1Queue[0].Element);
            player1Queue.shift()
         }
         if (player2Queue.length == 3) Change1stOpacity(2);
         let point = new Point();
         point.Element = event.target.children[1];
         point.ParentElement = event.target;
         player1Queue.push(point);
         event.target.children[1].style.width = `${parseInt(window.getComputedStyle(event.target).getPropertyValue("width")) - 25}px`;
         event.target.children[1].style.height = `${parseInt(window.getComputedStyle(event.target).getPropertyValue("height")) - 25}px`;
         player1 += Number(event.target.children[0].innerText);
      }
      console.log(`Player 1 : ${player1} , Player 2 : ${player2}`)
      result++;
   }
   else {
      document.querySelector(".modal-title")!.innerHTML = "<span class='text-warning'>Warning</span>";
      document.querySelector(".modal-body")!.innerHTML = "Finish editing players names";
      document.querySelector(".modal-footer button")!.innerHTML = "Return";
      document.querySelector<HTMLElement>(".modalLaunch")!.click();
   }
}

function DidWin() {
   if (player1 == 15 && player1Queue.length == 3) {
      player1 = player2 = 0;
      document.querySelector(".modal-title")!.innerHTML = "Success";
      document.querySelector(".modal-body")!.innerHTML = `${player1Now} Wins !!`;
      document.querySelector(".modal-footer button")!.innerHTML = "Reset";
      p1Win();
      document.querySelector<HTMLElement>(".modalLaunch")!.click();
   }
   else if (player2 == 15 && player2Queue.length == 3) {
      player1 = player2 = 0;
      document.querySelector(".modal-title")!.innerHTML = "Success";
      document.querySelector(".modal-body")!.innerHTML = `${player2Now} Wins !!`;
      document.querySelector(".modal-footer button")!.innerHTML = "Reset";
      p2Win();
      document.querySelector<HTMLElement>(".modalLaunch")!.click();
   }
}

function p1Win() {
   let p1Scores = localStorage.getItem(player1Now!)
   let p1Score = p1Scores!.split(",");
   p1Score[0] = `${parseInt(p1Score[0]) + 1}`;
   let p1FinalScore = p1Score.join(",");
   let p2Scores = localStorage.getItem(player2Now!)
   let p2Score = p2Scores!.split(",");
   p2Score[1] = `${parseInt(p2Score[1]) + 1}`;
   let p2FinalScore = p2Score.join(",");

   localStorage.setItem(player1Now!,p1FinalScore);
   localStorage.setItem(player2Now!,p2FinalScore);

   console.log(`Player 1 : ${p1FinalScore} , Player 2 : ${p2FinalScore}`)
}

function p2Win() {
   let p1Scores = localStorage.getItem(player1Now!)
   let p1Score = p1Scores!.split(",");
   p1Score[1] = `${parseInt(p1Score[1]) + 1}`;
   let p1FinalScore = p1Score.join(",");
   let p2Scores = localStorage.getItem(player2Now!)
   let p2Score = p2Scores!.split(",");
   p2Score[0] = `${parseInt(p2Score[0]) + 1}`;
   let p2FinalScore = p2Score.join(",");

   localStorage.setItem(player1Now!, p1FinalScore);
   localStorage.setItem(player2Now!, p2FinalScore);

   console.log(`Player 1 : ${p1FinalScore} , Player 2 : ${p2FinalScore}`)
}

function Reset() {
   result = 0;
   for (let td = 0; td < tds.length; td++) {
      if (tds[td].children.length > 1)
         tds[td].removeChild(tds[td].children[1]);
   }
   enableEdit();
   getScores()
   player1 = 0;
   player2 = 0;
   player1Queue = [];
   player2Queue = [];
}

function getScores() {
   player1Now = localStorage.getItem("P1Now");
   player2Now = localStorage.getItem("P2Now");

   document.querySelector(".p1Name")!.innerHTML = `${player1Now}`
   document.querySelector(".p2Name")!.innerHTML = `${player2Now}`
   
   let p1Score = localStorage.getItem(player1Now!);
   let p2Score = localStorage.getItem(player2Now!);

   let p1Wins = document.querySelector<HTMLElement>(".P1W");
   let p1Loss = document.querySelector<HTMLElement>(".P1L");
   p1Wins!.innerText = `W : ${p1Score?.split(",")[0]}`;
   p1Loss!.innerText = `L : ${p1Score?.split(",")[1]}`;

   let p2Wins = document.querySelector<HTMLElement>(".P2W");
   let p2Loss = document.querySelector<HTMLElement>(".P2L");
   p2Wins!.innerText = `W : ${p2Score?.split(",")[0]}`;
   p2Loss!.innerText = `L : ${p2Score?.split(",")[1]}`;
}

function disableEdit() {
   let buttons = document.querySelectorAll<HTMLButtonElement>("label button");
   let inputs = document.querySelectorAll<HTMLInputElement>("label input");
   for (let i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
   }
   for (let i = 0; i < inputs.length; i++) {
      inputs[i].disabled = true;
   }
}

function enableEdit() {
   let EditButtons = document.querySelectorAll<HTMLInputElement>("label button");
   for (let i = 0; i < EditButtons.length; i++) {
      EditButtons[i].disabled = false;
   }
}

function Change1stOpacity(player: number) {
   if (player == 1) {
      player1Queue[0].Element.style.opacity = ".4"
   }
   else if (player == 2) {
      player2Queue[0].Element.style.opacity = ".4"
   }
}

function editName(event, player) {
   console.log(event.previousElementSibling);
   event.previousElementSibling.classList.remove("disabled");
   event.previousElementSibling.previousElementSibling.disabled = false;
   event.classList.add("disabled");
   if (player == 1) LockPlay1 = true;
   if (player == 2) LockPlay2 = true;
}

function saveName(event, player) {
   let name = event.previousElementSibling.value.toLowerCase();
   console.log(name);
   if (player == 1 && name == player2Now) {
      document.querySelector(".modal-title")!.innerHTML = "<span class='text-warning'>Warning</span>";
      document.querySelector(".modal-body")!.innerHTML = `"${name}" is already chosen by player 2`;
      document.querySelector(".modal-footer button")!.innerHTML = "Return";
      document.querySelector<HTMLElement>(".modalLaunch")!.click();
   }
   else if (player == 2 && name == player1Now) {
      document.querySelector(".modal-title")!.innerHTML = "<span class='text-warning'>Warning</span>";
      document.querySelector(".modal-body")!.innerHTML = `"${name}" is already chosen by player 1`;
      document.querySelector(".modal-footer button")!.innerHTML = "Return";
      document.querySelector<HTMLElement>(".modalLaunch")!.click();
   }
   else {
      if (name == "") {
         localStorage.setItem(`P${player}Now`, `player ${player}`);
      }
      else {
         localStorage.getItem(name) ?? localStorage.setItem(name,"0,0");
         localStorage.setItem(`P${player}Now`, `${name}`);
         event.previousElementSibling.value = "";
      }
      event.nextElementSibling.classList.remove("disabled");
      event.previousElementSibling.disabled = true;
      event.classList.add("disabled")
      if (player == 1) LockPlay1 = false;
      if (player == 2) LockPlay2 = false;
      getScores();
   }
   event.previousElementSibling.value = "";

}

class Point {
   Element: HTMLElement;
   ParentElement: HTMLElement;
}