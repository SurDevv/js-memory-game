window.onload = function () {
  const boardDiv = document.querySelector(".board");
  const counter = document.querySelector(".score");
  const stattBtn = document.querySelector(".start");

  boardDiv.addEventListener("click", getTileData);
  stattBtn.addEventListener("click", () => {
    const valueFromInput = document.querySelector(".tileNumbers").value;
    const numericValue = Number(valueFromInput);
    if (!isNaN(numericValue)) {
      if (Number.isInteger(numericValue)) {
        let table = createdTable(numericValue);
        let shuffledTable = shufflingTable(table);
        divGenerator(shuffledTable);
      } else {
        alert("Proszę podać liczbę całkowitą.");
      }
    } else {
      alert("Proszę podać liczbę.");
    }
  });

  function shufflingTable(table) {
    for (let i = table.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let k = table[i];
      table[i] = table[j];
      table[j] = k;
    }
    return table;
  }

  function createdTable(inputValue) {
    let tiles = [];
    for (let i = 1; i <= inputValue / 2; i++) {
      tiles.push(i);
      tiles.push(i);
    }
    return tiles;
  }

  function divGenerator(generatedTable) {
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
  const table = document.createElement("p");
  table.textContent = `Twoje punkty: ${userScore}`;
  counter.appendChild(table);

  function getTileData(event) {
    const target = event.target;
    if (target.classList.contains("clicked")) {
      console.log("Wybierz inny kafelek");
    } else if (target.classList.contains("tile")) {
      const selectedTile = target.textContent;
      console.log("wybrano kafelek:", selectedTile);
      tilesData.push(selectedTile);
      target.classList.add("clicked");

      if (tilesData.length > 2) {
        compareValue();
        tilesData.length = 0;
        const resetClass = document.querySelectorAll(".tile.clicked");
        resetClass.forEach((tile) => {
          tile.classList.remove("clicked");
        });
      }
      console.log("Kafelki w tablicy:", tilesData);
      console.log("----------------");
    }
  }

  function compareValue() {
    if (tilesData[0] == tilesData[1]) {
      userScore++;
      console.log("git, punkt");
    }
  }
};
