class Directory {
  constructor(name, parent = null, children = [], files = [], size = 0) {
    this.name = name;
    this.parent = parent;
    this.children = children;
    this.files = files;
    this.size = size;
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

const rootDir = new Directory("root");

let currentDir = rootDir;
let dirArray = [rootDir];

function changeDirectory(dir) {
  if (dir === "..") {
    currentDir = currentDir.parent;
  } else {
    currentDir = currentDir.children.find((singleDir) => singleDir.name == dir);
  }
}

for (let i = 1; i < splitData.length; i++) {
  console.log(currentDir);
  console.log(i);
  let currentInstruction = splitData[i].split(" ");
  console.log(currentInstruction);
  if (currentInstruction[0] === "$") {
    if (currentInstruction[1] === "cd") {
      changeDirectory(currentInstruction[2]);
      continue;
    }
    if (currentInstruction[1] === "ls") {
      continue;
    }
  }
  if (!isNaN(currentInstruction[0])) {
    let newFile = new File(
      currentInstruction[1],
      parseInt(currentInstruction[0]),
      currentDir
    );
    currentDir.files.push(newFile);
    currentDir.size += newFile.size;
    //while (currentDir.parent !== null) {};
  }
  if (currentInstruction[0] === "dir") {
    let newDir = new Directory(currentInstruction[1], currentDir);
    currentDir.children.push(newDir);
    continue;
  }
}

console.log(rootDir);
