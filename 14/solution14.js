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

readTextFile1("./data14.txt");

const splitData = data.split("\n");

let nodeList = [];
class Node {
  constructor(x, y, falling = false) {
    this.x = x;
    this.y = y;
    this.falling = falling;
  }
}

for (let i = 0; i < splitData.length; i++) {
  const instructions = splitData[i].split(" -> ");
  for (let j = 0; j < instructions.length - 1; j++) {
    let k;
    if (j === 0) {
      k = 0;
    } else {
      k = 1;
    }
    const [x1, y1] = [
      parseInt(instructions[j].split(",")[0]),
      parseInt(instructions[j].split(",")[1]),
    ];
    const [x2, y2] = [
      parseInt(instructions[j + 1].split(",")[0]),
      parseInt(instructions[j + 1].split(",")[1]),
    ];
    if (x1 == x2) {
      if (y2 > y1) {
        const difference = Math.abs(y2 - y1);
        for (; k <= difference; k++) {
          nodeList.push(new Node(x1, y1 + k));
        }
      }
      if (y2 < y1) {
        const difference = Math.abs(y2 - y1);
        for (; k <= difference; k++) {
          nodeList.push(new Node(x1, y1 - k));
        }
      }
    }
    if (y1 == y2) {
      if (x2 < x1) {
        const difference = Math.abs(x2 - x1);
        for (; k <= difference; k++) {
          nodeList.push(new Node(x1 - k, y1));
        }
      }
      if (x2 > x1) {
        const difference = Math.abs(x2 - x1);
        for (; k <= difference; k++) {
          nodeList.push(new Node(x1 + k, y1));
        }
      }
    }
  }
}

let abyss = false;
let sandTotal = 0;

function sandFall() {
  let Sand = new Node(500, 0, true);
  while (Sand.falling) {
    if (nodeList.find((node) => node.x == Sand.x && node.y == Sand.y + 1)) {
      if (
        !nodeList.find((node) => node.x == Sand.x - 1 && node.y == Sand.y + 1)
      ) {
        Sand.x--;
        Sand.y++;
        continue;
      } else if (
        !nodeList.find((node) => node.x == Sand.x + 1 && node.y == Sand.y + 1)
      ) {
        Sand.x++;
        Sand.y++;
        continue;
      } else {
        Sand.falling = false;
        nodeList.push(Sand);
        sandTotal++;
        break;
      }
    }
    Sand.y++;
    if (Sand.y > 1000) {
      abyss = true;
      break;
    }
  }
}

while (!abyss) {
  sandFall();
}

console.log(sandTotal);
