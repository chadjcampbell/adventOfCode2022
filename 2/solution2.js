let data;
function readTextFile1(file) {
  let rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        data = rawFile.responseText;
      }
    }
  };
  rawFile.send(null);
}

readTextFile1("./data2.txt");

let splitData = data.split("\n");
let totalPoints = 0;
let abc = [0, 1, 2];
let xyzPoints = { X: 1, Y: 2, Z: 3 };

function roundPts(opponent, player) {
  if (opponent === "A") {
    if (player === "X") return 3;
    if (player === "Y") return 6;
    if (player === "Z") return 0;
  }
  if (opponent === "B") {
    if (player === "X") return 0;
    if (player === "Y") return 3;
    if (player === "Z") return 6;
  }
  if (opponent === "C") {
    if (player === "X") return 6;
    if (player === "Y") return 0;
    if (player === "Z") return 3;
  }
}

for (let i = 0; i < splitData.length; i++) {
  let [opponent, player] = splitData[i].split(" ");
  totalPoints += xyzPoints[`${player}`];
  totalPoints += roundPts(opponent, player);
}

console.log(totalPoints);
