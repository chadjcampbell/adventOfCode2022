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

readTextFile1("./data12.txt");

const splitData = data.split("\r\n");

// A Queue class for queue-like functionality over JavaScript arrays.
class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(obj) {
    this.items.push(obj);
  }
  dequeue() {
    return this.items.shift();
  }
  isEmpty() {
    return this.items.length === 0;
  }
}

// Class for storing a cell's data
class Cell {
  constructor(x, y, z, dis = 0, previous = null) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.dis = dis;
    this.previous = previous;
  }
}

function charToNum(char) {
  if (char == "S") return 1;
  if (char == "E") return 26;
  return char.charCodeAt(0) - 96;
}

function buildGameBoard() {
  let gameBoard = [];
  for (let i = 0; i < splitData.length; i++) {
    let row = splitData[i].split("");
    for (let j = 0; j < row.length; j++) {
      let z = charToNum(row[j]);
      gameBoard.push(new Cell(i, j, z));
    }
  }
  return gameBoard;
}

const gameBoard = buildGameBoard();

console.log(gameBoard);
const knightSteps = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function findCell(x, y) {
  let found = gameBoard.find((cell) => cell.x == x && cell.y == y);
  if (found == undefined) return false;
  return found;
}

function validMoves(cell) {
  let validMoves = [];
  knightSteps.forEach((move) => {
    if (findCell(cell.x + move[0], cell.y + move[1])) {
      let thisMove = findCell(cell.x + move[0], cell.y + move[1]);
      gameBoard.forEach((square) => {
        if (
          thisMove.x == square.x &&
          thisMove.y == square.y &&
          thisMove.z - cell.z <= 1
        ) {
          validMoves.push(thisMove);
        }
      });
    }
  });
  return validMoves;
}

function findStart() {
  return gameBoard.find((cell) => cell.x == 20 && cell.y == 0);
}

function findPath() {
  let queue = new Queue();
  queue.enqueue(findStart());
  while (!queue.isEmpty()) {
    let currentMove = queue.dequeue();
    if (currentMove.x == 20 && currentMove.y == 55) {
      return `=> You made it in ${currentMove.dis} moves!`;
    }
    validMoves(currentMove).forEach((move) => {
      if (move.previous == null) {
        move.previous = currentMove;
        move.dis = currentMove.dis + 1;
        queue.enqueue(move);
      }
    });
  }
}

console.log(findPath());
