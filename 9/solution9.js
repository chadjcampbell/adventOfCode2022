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

readTextFile1("./data9.txt");

const splitData = data.split("\n");

const instructions = splitData.map((line) => {
  return line.split(" ");
});

function checkTail() {
  let headGrid = makeHeadGrid();
  if (headGrid.some((a) => currentTailCoords.every((v, i) => v === a[i]))) {
    return false;
  } else {
    return true;
  }
}

function makeHeadGrid() {
  let headGrid = [];
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      headGrid.push([currentHeadCoords[0] + i, currentHeadCoords[1] + j]);
    }
  }
  return headGrid;
}

function pullTail(direction) {
  switch (direction) {
    case "U":
      if (currentHeadCoords[1] !== currentTailCoords[1]) {
        currentTailCoords = [currentHeadCoords[0] + 1, currentHeadCoords[1]];
        break;
      }
      currentTailCoords[0] -= 1;
      break;
    case "R":
      if (currentHeadCoords[0] !== currentTailCoords[0]) {
        currentTailCoords = [currentHeadCoords[0], currentHeadCoords[1] - 1];
        break;
      }
      currentTailCoords[1] += 1;
      break;
    case "D":
      if (currentHeadCoords[1] !== currentTailCoords[1]) {
        currentTailCoords = [currentHeadCoords[0] - 1, currentHeadCoords[1]];
        break;
      }
      currentTailCoords[0] += 1;
      break;
    case "L":
      if (currentHeadCoords[0] !== currentTailCoords[0]) {
        currentTailCoords = [currentHeadCoords[0], currentHeadCoords[1] + 1];
        break;
      }
      currentTailCoords[1] -= 1;
      break;
  }
  if (
    !tailVisitedCoords.some((a) =>
      currentTailCoords.every((v, i) => v === a[i])
    )
  ) {
    tailVisitedCoords.push([currentTailCoords[0], currentTailCoords[1]]);
  }
}

let currentHeadCoords = [0, 0];
let currentTailCoords = [0, 0];
let tailVisitedCoords = [[0, 0]];

for (let i = 0; i < instructions.length; i++) {
  let direction = instructions[i][0];
  let spaces = parseInt(instructions[i][1]);
  for (let j = 0; j < spaces; j++) {
    switch (direction) {
      case "U":
        currentHeadCoords[0] -= 1;
        break;
      case "R":
        currentHeadCoords[1] += 1;
        break;
      case "D":
        currentHeadCoords[0] += 1;
        break;
      case "L":
        currentHeadCoords[1] -= 1;
        break;
    }
    if (checkTail()) pullTail(direction);
  }
}

console.log(tailVisitedCoords.length);
