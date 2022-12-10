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

const splitData = data.split("\n");

const instructions = splitData.map((line) => {
  return line.split(" ");
});

function checkTail(arr, arr2) {
  console.log(...snake);
  let grid = makeGrid(arr);
  if (grid.some((a) => arr2.every((v, i) => v === a[i]))) {
    return false;
  } else {
    return true;
  }
}

function makeGrid(arr) {
  let grid = [];
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      grid.push([arr[0] + i, arr[1] + j]);
    }
  }
  return grid;
}

function pullTail(direction, arr, arr2, x) {
  switch (direction) {
    case "U":
      if (arr[1] !== arr2[1]) {
        snake[x] = [arr[0] + 1, arr[1]];
        break;
      }
      snake[x][0] -= 1;
      break;
    case "R":
      if (arr[0] !== arr2[0]) {
        snake[x] = [arr[0], arr[1] - 1];
        break;
      }
      snake[x][1] += 1;
      break;
    case "D":
      if (arr[1] !== arr2[1]) {
        snake[x] = [arr[0] - 1, arr[1]];
        break;
      }
      snake[x][0] += 1;
      break;
    case "L":
      if (arr[0] !== arr2[0]) {
        snake[x] = [arr[0], arr[1] + 1];
        break;
      }
      snake[x][1] -= 1;
      break;
  }
}

let snake = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];
let tailVisitedCoords = [[0, 0]];

for (let i = 0; i < instructions.length; i++) {
  let direction = instructions[i][0];
  let spaces = parseInt(instructions[i][1]);
  for (let j = 0; j < spaces; j++) {
    switch (direction) {
      case "U":
        snake[0][0] -= 1;
        break;
      case "R":
        snake[0][1] += 1;
        break;
      case "D":
        snake[0][0] += 1;
        break;
      case "L":
        snake[0][1] -= 1;
        break;
    }
    for (let x = 0; x < snake.length - 1; x++) {
      let index = x + 1;
      if (checkTail(snake[x], snake[x + 1])) {
        pullTail(direction, snake[x], snake[x + 1], index);
      }
    }
    if (
      !tailVisitedCoords.some((a) =>
        snake[snake.length - 1].every((v, i) => v === a[i])
      )
    ) {
      tailVisitedCoords.push([
        snake[snake.length - 1][0],
        snake[snake.length - 1][1],
      ]);
    }
  }
}

console.log(tailVisitedCoords);
