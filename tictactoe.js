// Colors
var successColor = "#8af542";
var redColor = "#8f200d";
var blueColor = "#10027a";

var tableCell = document.querySelectorAll("td");
var button = document.querySelector("button");
var table = document.querySelector("table");
var turnTracker = document.querySelector("h3");

var turn = "X"; // Keep track of turns

// Defining functions for event handling

// Content based click handler
function clickHandler(){
  if(this.innerText === ""){
    this.innerText = "X";
  } else if (this.innerText == "X") {
    this.innerText = "O";
  } else if (this.innerText === "O") {
    this.innerText = "";
  };
}

// turn based click handler
function turnClickHandler(){
  if (turn === "X"){
    if (this.innerText === "") {
      this.innerText = "X";
      this.style.color = redColor;
      turn = "O";
    }
  }
  else if (turn === "O") {
    if (this.innerText === ""){
      this.innerText = "O";
      this.style.color = blueColor;
      turn = "X"
    }
  }

  turnTracker.innerText = turn + "'s turn";

}

function clearBoard(){
  for (var cell of tableCell) {
    cell.innerText = "";
    turn = "X";
    turnTracker.innerText = turn + "'s turn";
  }
}

/*
Assume grid is

0, 1, 2;
3, 4, 5;
6, 7, 8;

To find winner we have to check all rows, columns, and diagonals

*/

function checkWinner(){
  var cellInnerText = []; // list of current inner Text of table cells

  for (var cell of tableCell){
    cellInnerText.push(cell.innerText);
  }

  for (var i = 0; i<9; i+=3) {
    var checkRows = cellInnerText[i] + cellInnerText[i+1] + cellInnerText[i+2];

    if (checkRows === "XXX" || checkRows === "OOO") {
      tableCell[i].style.backgroundColor = successColor;
      tableCell[i+1].style.backgroundColor = successColor;
      tableCell[i+2].style.backgroundColor = successColor;

      alertWinner(checkRows[0]);
    }
  }

  for (var i = 0; i<3; i+=1) {
    var checkColumns = cellInnerText[i] + cellInnerText[i+3] + cellInnerText[i+6];

    if (checkColumns === "XXX" || checkColumns === "OOO") {
      tableCell[i].style.backgroundColor = successColor;
      tableCell[i+3].style.backgroundColor = successColor;
      tableCell[i+6].style.backgroundColor = successColor;

      alertWinner(checkColumns[0]);
    }
  }

  for (var i = 0; i<3; i+=2) {
    if (i===0){
      var checkDiagonal = cellInnerText[i] + cellInnerText[i+4] + cellInnerText[i+8];

      if (checkDiagonal === "XXX" || checkDiagonal === "OOO") {
        tableCell[i].style.backgroundColor = successColor;
        tableCell[i+4].style.backgroundColor = successColor;
        tableCell[i+8].style.backgroundColor = successColor;

        alertWinner(checkDiagonal[0]);
      }

    } else if (i===2) {
      var checkDiagonal = cellInnerText[i] + cellInnerText[i+2] + cellInnerText[i+4];

      if (checkDiagonal === "XXX" || checkDiagonal === "OOO") {
        tableCell[i].style.backgroundColor = successColor;
        tableCell[i+2].style.backgroundColor = successColor;
        tableCell[i+4].style.backgroundColor = successColor;

        alertWinner(checkDiagonal[0]);
      }
    }
  }
}

function alertWinner(winner) {
  var jumbotron = document.querySelector(".jumbotron");
  var jumbotronHeader = jumbotron.querySelector("h1");

  jumbotronHeader.innerText = "Thanks For Playing!";

  button.innerText = "Reload";

  button.removeEventListener("click", clearBoard);

  button.addEventListener("click", function(){
    location.reload();
  });

  // table is now unclickable
  for (var cell of tableCell) {
    cell.removeEventListener("click", turnClickHandler);
  }

  turnTracker.innerText = winner + " has won!";

}

// Adding Event Listeners

for (var cell of tableCell) {
  cell.addEventListener("click", turnClickHandler);
}

button.addEventListener("click", clearBoard);

table.addEventListener('click', checkWinner);
