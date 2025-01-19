let userScore;
let userPoints = 0;
let clickNumber = 0;
let valuesToCompare = [];
const obrazki = [
  "./icons/bee.png",
  "./icons/butterfly.png",
  "./icons/chicken.png",
  "./icons/clown-fish.png",
  "./icons/cow.png",
  "./icons/elephant.png",
  "./icons/frog.png",
  "./icons/lion.png",
  "./icons/mouse.png",
  "./icons/pig.png",
];

window.onload = function () {
  const startButton = document.querySelector("button");
  startButton.addEventListener("click", () => {
    if (startButton.textContent === "Start") {
      startGame();
      startButton.textContent = "Reset";
    } else {
      resetGame();
    }
  });

  function startGame() {
    const valuesArray = generateTiles();
    const valuesToShuffle = valuesGenerator(valuesArray);
    const shuffledValues = shuffleValues(valuesToShuffle);
    assignValue(shuffledValues);
    userScore = document.querySelector(".score");
    userScore.textContent = userPoints;
  }

  function resetGame() {
    userPoints = 0;
    clickNumber = 0;
    valuesToCompare = [];
    userScore.textContent = userPoints;
    const boardGame = document.querySelector(".board");
    boardGame.innerHTML = "";
    startGame();
  }
};

function generateTiles() {
  const numberOfTiles = 20;
  const boardGame = document.querySelector(".board");
  for (let i = 0; i < numberOfTiles; i++) {
    const generatedTile = document.createElement("div");
    generatedTile.className = "tile";
    boardGame.appendChild(generatedTile);
  }

  return numberOfTiles;
}

function valuesGenerator(numberOfTiles) {
  const tiles = [];
  for (let i = 1; i <= numberOfTiles / 2; i++) {
    tiles.push(i);
    tiles.push(i);
  }
  return tiles;
}

function shuffleValues(valuesToShuffle) {
  for (let i = valuesToShuffle.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = valuesToShuffle[i];
    valuesToShuffle[i] = valuesToShuffle[j];
    valuesToShuffle[j] = temp;
  }
  return valuesToShuffle;
}

function assignValue(valuesToAssign) {
  const allTiles = document.querySelectorAll(".tile");

  allTiles.forEach((tile, index) => {
    const imageIndex = valuesToAssign[index] - 1;
    const imageUrl = obrazki[imageIndex];

    tile.style.backgroundImage = `url(${imageUrl})`;
    tile.dataset.value = valuesToAssign[index];

    tile.addEventListener("click", function () {
      getTileData(tile);
      tile.classList.add("clicked");
    });
  });
}

function getTileData(tile) {
  if (tile.classList.contains("clicked") || tile.classList.contains("done")) {
    return;
  }

  valuesToCompare[clickNumber] = tile.dataset.value;
  clickNumber++;

  if (clickNumber === 2) {
    if (valuesToCompare[0] === valuesToCompare[1]) {
      setTimeout(match, 1000);
    } else {
      setTimeout(clearClass, 1000);
    }
    clickNumber = 0;
    valuesToCompare.length = 0;
  }
}

function clearClass() {
  const elementsToClear = document.querySelectorAll(".clicked");
  elementsToClear.forEach((element) => element.classList.remove("clicked"));
}

function match() {
  userPoints++;
  userScore.textContent = userPoints;

  const elementsToClear = document.querySelectorAll(".clicked");
  elementsToClear.forEach((element) => {
    element.classList.remove("clicked");
    element.classList.add("done");
  });
}
