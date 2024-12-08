window.onload = function () {
  const boardDiv = document.querySelector(".board");
  const counter = document.querySelector(".score");
  const startBtn = document.querySelector(".start");

  boardDiv.addEventListener("click", getTileData);
  startBtn.addEventListener("click", () => {
    const valueFromInput = document.querySelector(".tileNumbers").value;
    const numericValue = Number(valueFromInput);
    if (!isNaN(numericValue)) {
      if (Number.isInteger(numericValue)) {
        let table = createTable(numericValue);
        let shuffledTable = shuffleTable(table);
        generateDivs(shuffledTable);
      } else {
        alert("Proszę podać liczbę całkowitą.");
      }
    } else {
      alert("Proszę podać liczbę.");
    }
  });

  function shuffleTable(table) {
    for (let i = table.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = table[i];
      table[i] = table[j];
      table[j] = temp;
    }
    return table;
  }

  function createTable(inputValue) {
    let tiles = [];
    for (let i = 1; i <= inputValue / 2; i++) {
      tiles.push(i);
      tiles.push(i);
    }
    return tiles;
  }

  function generateDivs(generatedTable) {
    console.log(generatedTable);
    boardDiv.innerHTML = "";
    for (let i = 0; i < generatedTable.length; i++) {
      const tileDiv = document.createElement("div");
      tileDiv.className = "tile";
      boardDiv.appendChild(tileDiv);
      tileDiv.textContent = generatedTable[i];
    }
  }

  let tilesData = [];
  let userScore = 0;
  const score = document.createElement("p");
  score.className = "user-score";
  score.textContent = `Twoje punkty: ${userScore}`;
  counter.appendChild(score);

  function getTileData(event) {
    const target = event.target;
    if (target.classList.contains("clicked")) {
      alert("Wybierz inny kafelek");
    } else if (target.classList.contains("tile")) {
      const selectedTile = target.textContent;
      tilesData.push(selectedTile);
      target.classList.add("clicked");

      if (tilesData.length >= 2) {
        compareValues();
        tilesData.length = 0;

        const resetClass = document.querySelectorAll(".tile.clicked");
        setTimeout(() => {
          resetClass.forEach((tile) => {
            tile.classList.remove("clicked");
          });
        }, 1000);
      }
    }
  }

  function compareValues() {
    if (tilesData[0] == tilesData[1]) {
      userScore++;
      const playerScore = document.querySelector(".user-score");
      playerScore.innerHTML = `Twoje punkty: ${userScore}`;
      removeTiles();
      console.log("git");
    } else {
      console.log("źle");
    }
  }

  function removeTiles() {
    const clickedTiles = document.querySelectorAll(".tile.clicked");
    clickedTiles.forEach((tile) => {
      tile.classList.add("none");
    });
  }
};
