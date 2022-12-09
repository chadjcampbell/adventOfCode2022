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

readTextFile1("./example.txt");

const splitData = data.split("\r\n");

const instructions = splitData.map((line) => {
  return line.split(" ");
});

function checkTail(headCoords) {
  const headGrid = makeHeadGrid(headCoords);
  if (headGrid.includes(currentTailCoords)) {
    return;
  } else {
    pullTail();
  }
}

function makeHeadGrid(headCoords) {
  let headGrid = [];
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      headGrid.push([headCoords[0] + i, headCoords[1] + j]);
    }
  }
  return headGrid;
}

function pullTail() {
  return;
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
    checkTail(currentHeadCoords);
  }
}
