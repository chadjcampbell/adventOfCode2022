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
  }
}

const splitData = data.split("\n");
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
    for (let x = 0; x < i; x++) {
      if (grid[x][j].height >= node.height) {
        blocked++;
        break;
      }
    }
    for (let x = j + 1; x < 99; x++) {
      if (grid[i][x].height >= node.height) {
        blocked++;
        break;
      }
    }
    for (let x = i + 1; x < 99; x++) {
      if (grid[x][j].height >= node.height) {
        blocked++;
        break;
      }
    }
    for (let x = 0; x < j; x++) {
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
