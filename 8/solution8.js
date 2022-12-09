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

readTextFile1("./data8.txt");

class TreeNode {
  constructor(height) {
    this.height = height;
    this.visible = true;
    this.scene = 0;
  }
}

const splitData = data.split("\r\n");
let grid = splitData.map((line) => {
  let nodes = line.split("");
  return nodes.map((node) => {
    return new TreeNode(parseInt(node));
  });
});

let blocked = 0;
for (let i = 0; i < grid.length; i++) {
  const line = grid[i];
  for (let j = 0; j < line.length; j++) {
    const node = grid[i][j];
    for (let x = i - 1; x >= 0; x--) {
      if (grid[x][j].height >= node.height) {
        blocked++;
        break;
      }
    }
    for (let x = j + 1; x < line.length; x++) {
      if (grid[i][x].height >= node.height) {
        blocked++;
        break;
      }
    }
    for (let x = i + 1; x < line.length; x++) {
      if (grid[x][j].height >= node.height) {
        blocked++;
        break;
      }
    }
    for (let x = j - 1; x >= 0; x--) {
      if (grid[i][x].height >= node.height) {
        blocked++;
        break;
      }
    }
    if (blocked === 4) {
      node.visible = false;
    }
    blocked = 0;
  }
}

let visibleTreeCount = 0;
grid.forEach((line) => {
  line.forEach((element) => {
    if (element.visible === true) {
      visibleTreeCount++;
    }
  });
});

//part1
console.log(visibleTreeCount);

for (let i = 0; i < grid.length; i++) {
  const line = grid[i];
  for (let j = 0; j < line.length; j++) {
    let viewN = 0;
    let viewE = 0;
    let viewS = 0;
    let viewW = 0;
    const node = grid[i][j];
    for (let x = i - 1; x >= 0; x--) {
      viewN++;
      if (grid[x][j].height >= node.height) {
        break;
      }
    }
    for (let x = j + 1; x < line.length; x++) {
      viewE++;
      if (grid[i][x].height >= node.height) {
        break;
      }
    }
    for (let x = i + 1; x < line.length; x++) {
      viewS++;
      if (grid[x][j].height >= node.height) {
        break;
      }
    }
    for (let x = j - 1; x >= 0; x--) {
      viewW++;
      if (grid[i][x].height >= node.height) {
        break;
      }
    }
    node.scene = viewN * viewE * viewS * viewW;
  }
}

let highScore = 0;
grid.forEach((line) => {
  line.forEach((element) => {
    if (element.scene > highScore) {
      highScore = element.scene;
    }
  });
});

//part2
console.log(highScore);
