window.onload = function () {
  const valuesArray = generateTiles();
  const valuesToShuffle = valuesGenerator(valuesArray);
  const shuffledValues = shuffleValues(valuesToShuffle);
  const readyBoard = assignValue(shuffledValues);
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

function shuffleValues(valuesToShuffle) {
  for (let i = valuesToShuffle.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = valuesToShuffle[i];
    valuesToShuffle[i] = valuesToShuffle[j];
    valuesToShuffle[j] = temp;
  }
  return valuesToShuffle;
}

let clickNumber = 0;
let valuesToCompare = [];
function getTileData(tile) {
  if (tile.classList.contains("clicked")) {
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
      setTimeout(clearClass, 1000);
    } else {
      clickNumber = 0;
      valuesToCompare.length = 0;
      setTimeout(clearClass, 1000);
      console.log("nie giut");
    }
  }
}

function clearClass() {
  const elementsToClear = document.querySelectorAll(".clicked");
  elementsToClear.forEach((elementsToClear) =>
    elementsToClear.classList.remove("clicked")
  );
}
