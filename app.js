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
const winStateElement = document.getElementById("winState");
const restartBtn = document.getElementById("restartBtn");
const winStateTextElement = document.querySelector("[data-win-state-text]");
let circlesTurn;

gameStart();

restartBtn.addEventListener("click", gameStart);

function gameStart() {
  circlesTurn = false;
  tileElements.forEach((tile) => {
    tile.classList.remove(X_CLASS);
    tile.classList.remove(CIRCLE_CLASS);
    tile.removeEventListener("click", handleClick);
    tile.addEventListener("click", handleClick, { once: true });
  });
  setGameGrdHoverClass();
  winStateElement.classList.remove("display");
}

function handleClick(e) {
  const tile = e.target;
  const currentClass = circlesTurn ? CIRCLE_CLASS : X_CLASS;
  //placeMark
  placeInput(tile, currentClass);
  // Check For Winner
  if (isWinner(currentClass)) {
    endGame(false);
    // Check for Draw
  } else if (isDraw()) {
    endGame(true);
  } else {
    // Switch Turn
    switchTurns();
    setGameGrdHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winStateTextElement.innerText = "DRAW!";
  } else {
    winStateTextElement.innerText = `${
      circlesTurn ? "Player 2" : "Player 1"
    } WINS!`;
  }
  winStateElement.classList.add("display");
}

function isDraw() {
  return [...tileElements].every((tile) => {
    return (
      tile.classList.contains(X_CLASS) || tile.classList.contains(CIRCLE_CLASS)
    );
  });
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
