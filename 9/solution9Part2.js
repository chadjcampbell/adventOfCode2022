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

function checkTail(arr, arr2) {
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

function pullTail(x) {
  let [tailX, tailY] = snake[x];
  let [headX, headY] = snake[x - 1];

  let diffX = Math.abs(headX - tailX);
  let diffY = Math.abs(headY - tailY);

  if (diffX < 2 && diffY < 2) {
    return;
  }
  if (diffX > 1 && !diffY) {
    tailX += headX - tailX > 0 ? 1 : -1;
  } else if (diffY > 1 && !diffX) {
    tailY += headY - tailY > 0 ? 1 : -1;
  } else {
    tailX += headX - tailX > 0 ? 1 : -1;
    tailY += headY - tailY > 0 ? 1 : -1;
  }

  snake[x] = [tailX, tailY];
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
        pullTail(index);
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

//part2
console.log(tailVisitedCoords.length);
