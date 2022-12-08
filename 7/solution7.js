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

function changeDirectory(dir) {
  if (dir === "..") {
    currentDir = currentDir.parent;
  } else {
    currentDir = currentDir.children.find((singleDir) => singleDir.name == dir);
  }
}

function addFileSize(dir, file) {
  if (dir.parent == null) {
    dir.size += file.size;
    return;
  }
  dir.size += file.size;
  addFileSize(dir.parent, file);
}

for (let i = 1; i < splitData.length; i++) {
  let currentInstruction = splitData[i].split(" ");
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
    addFileSize(currentDir, newFile);
  }
  if (currentInstruction[0] === "dir") {
    let newDir = new Directory(currentInstruction[1], currentDir);
    currentDir.children.push(newDir);
    continue;
  }
}

let total = 0;

function getTotal(dir) {
  if (dir.size <= 100000) {
    total += dir.size;
  }
  if (dir.children === []) return;
  dir.children.forEach((child) => {
    getTotal(child);
  });
}

getTotal(rootDir);

//part1
console.log(total);

const amountNeeded = (70000000 - rootDir.size - 30000000) * -1;

console.log(amountNeeded);

let eligableDirs = [];

function findEligableDirs(dir) {
  if (dir.size >= amountNeeded) {
    eligableDirs.push(dir);
  }
  if (dir.children === []) return;
  dir.children.forEach((child) => {
    findEligableDirs(child);
  });
}

findEligableDirs(rootDir);

eligableDirs.sort((a, b) => (a.size > b.size ? 1 : -1));

//part2
console.log(eligableDirs[0].size);
