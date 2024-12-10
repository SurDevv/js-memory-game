window.onload = function () {
  const valuesArray = generateTiles();
  const valuesToShuffle = valuesGenerator(valuesArray);
  const shuffledValues = shuffleValues(valuesToShuffle);
  const readyBoard = assignValue(shuffledValues);
  console.log(readyBoard);
};

function generateTiles() {
  const numberOfTiles = 20;
  const boardGame = document.querySelector(".board");
  for (i = 0; i < numberOfTiles; i++) {
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
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile, index) => {
    tile.textContent = valuesToAssign[index];
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
