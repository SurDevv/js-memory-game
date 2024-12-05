window.onload = function () {
  const boardDiv = document.querySelector(".board");
  const counter = document.querySelector(".score");
  const stattBtn = document.querySelector(".start");
  function divGenerator(inputValue) {
    for (let i = 0; i <= inputValue - 1; i++) {
      const tileDiv = document.createElement("div");
      tileDiv.className = "tile";
      tileDiv.id = `${i + 1}`;
      boardDiv.appendChild(tileDiv);
      tileDiv.textContent = i + 1;
    }
  }

  boardDiv.addEventListener("click", getTileData);
  stattBtn.addEventListener("click", () => {
    const valueFromInput = document.querySelector(".tileNumbers").value;
    const numericValue = Number(valueFromInput);
    if (!isNaN(numericValue)) {
      if (Number.isInteger(numericValue)) {
        divGenerator(numericValue);
      } else {
        alert("Proszę podać liczbę całkowitą.");
      }
    } else {
      alert("Proszę podać liczbę.");
    }
  });

  let tilesData = [];
  let userScore = 0;

  const points = document.createElement("p");
  points.textContent = `Twoje punkty: ${userScore}`;
  counter.appendChild(points);

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
};
