window.onload = function () {
  const boardDiv = document.querySelector(".board");
  const counter = document.querySelector(".score");
  const stattBtn = document.querySelector(".start");
  let inputValue = 8;
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
    const valueToNumber = Number(valueFromInput);
    console.log(typeof valueToNumber);
    // tutaj trzba dodać funkcje, która sprawdzi wartość wprowadzoną do inputa
    if (typeof valueToNumber === "number") {
      console.log("git");
    } else {
      console.log("nie działa");
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

  divGenerator(inputValue);
};
