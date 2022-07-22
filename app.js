const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WIN_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const tileElements = document.querySelectorAll("[data-tile]");
const gameGrd = document.getElementById("gameGrd");
let circlesTurn;

gameStart();

function gameStart() {
  circlesTurn = false;
  tileElements.forEach((tile) => {
    tile.addEventListener("click", handleClick, { once: true });
  });
  setGameGrdHoverClass();
}

function handleClick(e) {
  const tile = e.target;
  const currentClass = circlesTurn ? CIRCLE_CLASS : X_CLASS;
  //placeMark
  placeInput(tile, currentClass);
  // Check For Winner
  if (isWinner(currentClass)) {
    endGame(false);
  }
  // Check for Draw
  // Switch Turn
  switchTurns();
  setGameGrdHoverClass();
}

function placeInput(tile, currentClass) {
  tile.classList.add(currentClass);
}

function switchTurns() {
  circlesTurn = !circlesTurn;
}

function setGameGrdHoverClass() {
  gameGrd.classList.remove(X_CLASS);
  gameGrd.classList.remove(CIRCLE_CLASS);
  if (circlesTurn) {
    gameGrd.classList.add(CIRCLE_CLASS);
  } else {
    gameGrd.classList.add(X_CLASS);
  }
}

function isWinner(currentClass) {
  return WIN_COMBOS.some((combination) => {
    return combination.every((index) => {
      return tileElements[index].classList.contains(currentClass);
    });
  });
}
