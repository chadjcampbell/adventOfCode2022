class Directory {
  constructor(name, parent = null, children = []) {
    this.name = name;
    this.parent = parent;
    this.children = children;
  }
}

class File {
  constructor(name, size, parent) {
    this.name = name;
    this.size = size;
    this.parent = parent;
  }
}

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

readTextFile1("./data7.txt");

const splitData = data.split("\n");

let currentDir = new Directory(root);

function changeDirectory(dir) {
  if (dir === '/') {
    currentDir = 
  }
}

for (let i = 0; i < splitData.length; i++) {
  let currentInstruction = splitData[i].split(" ");
  if (currentInstruction[0] === "$") {
    if (currentInstruction[1] === "cd") {
      changeDirectory(currentInstruction[2]);
    }
    if (currentInstruction[1] === "ls") {
      continue;
    }
  }
  if (typeof parseInt(currentInstruction[0]) === "number") {
    new File(currentInstruction[1], parseInt(currentInstruction[0]), currentDir)
  }
  if (currentInstruction[0] === "dir") {
    new Directory(currentInstruction[1], currentDir)
  }
}
