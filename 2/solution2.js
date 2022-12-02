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

const splitData = data.split("\n");
let totalPoints = 0;
const xyzPoints = { X: 1, Y: 2, Z: 3 };

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

//part1
console.log(totalPoints);

function roundPts2(opponent, player) {
  if (opponent === "A") {
    if (player === "X") return 3;
    if (player === "Y") return 1;
    if (player === "Z") return 2;
  }
  if (opponent === "B") {
    if (player === "X") return 1;
    if (player === "Y") return 2;
    if (player === "Z") return 3;
  }
  if (opponent === "C") {
    if (player === "X") return 2;
    if (player === "Y") return 3;
    if (player === "Z") return 1;
  }
}

let totalPoints2 = 0;
const winLossPoints = { X: 0, Y: 3, Z: 6 };
for (let i = 0; i < splitData.length; i++) {
  let [opponent, player] = splitData[i].split(" ");
  totalPoints2 += winLossPoints[`${player}`];
  totalPoints2 += roundPts2(opponent, player);
}

//part2
console.log(totalPoints2);
