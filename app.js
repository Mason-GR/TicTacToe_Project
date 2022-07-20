const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const tileElements = document.querySelectorAll("[data-tile]");
const gameGrd = document.getElementById("gameGrd");
let circlesTurn;

tileElements.forEach((tile) => {
  tile.addEventListener("click", handleClick, { once: true });
});

function handleClick(e) {
  const cell = e.target;
  const currentClass = circlesTurn ? CIRCLE_CLASS : X_CLASS;
  //placeMark
  placeMark(cell, currentClass);
  // Check For Winner
  // Check for Draw
  // Switch Turn
  swapTurns();
  setGameGrdHoverClass();
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circlesTurn = !circlesTurn;
}

function setGameGrdHoverClass() {}
