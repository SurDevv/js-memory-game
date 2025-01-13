let userScore;
let userPoints = 0;
let clickNumber = 0;
let valuesToCompare = [];

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
    tile.textContent = valuesToAssign[index];
    tile.addEventListener("click", function () {
      getTileData(tile);
      tile.classList.add("clicked");
    });
  });
}

function getTileData(tile) {
  if (tile.classList.contains("clicked") || tile.classList.contains("done")) {
    console.log("Wybierz inny kafelek");
  } else {
    valuesToCompare[clickNumber] = parseInt(tile.textContent);
    clickNumber++;
    console.log(valuesToCompare);
    console.log(clickNumber);
  }

  if (clickNumber === 2) {
    if (valuesToCompare[0] == valuesToCompare[1]) {
      console.log("git");
      clickNumber = 0;
      valuesToCompare.length = 0;
      setTimeout(match, 1000);
    } else {
      clickNumber = 0;
      valuesToCompare.length = 0;
      setTimeout(clearClass, 1000);
      console.log("nie git");
    }
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
