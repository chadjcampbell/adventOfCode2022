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

readTextFile1("./data13-2.txt");

const splitData = data.split("\n");

function inOrder(left, right) {
  if (left === undefined) return -1;
  if (right === undefined) return 1;
  if (typeof left === "number" && typeof right === "number") {
    if (left < right) return -1;
    if (left > right) return 1;
  }
  if (typeof left === "object" && typeof right === "object") {
    for (let i = 0; i < right.length + 1; i++) {
      if (left[i] === right[i]) {
        continue;
      } else if (!left.length && !right.length) {
        continue;
      } else if (inOrder(left[i], right[i]) === -1) {
        return -1;
      } else if (inOrder(left[i], right[i]) === 1) {
        return 1;
      } else {
        continue;
      }
    }
  }
  if (typeof left === "number" && typeof right === "object") {
    return inOrder([left], right);
  }
  if (typeof left === "object" && typeof right === "number") {
    return inOrder(left, [right]);
  }
}

let allArrays = [];
for (let i = 0; i < splitData.length; i++) {
  if (splitData[i] == "") continue;
  const packet = JSON.parse(splitData[i]);
  allArrays.push(packet);
}

allArrays.sort(inOrder);

console.log(allArrays);

let index1, index2;

for (let i = 0; i < allArrays.length; i++) {
  if (JSON.stringify(allArrays[i]) == "[[2]]") {
    index1 = i + 1;
  }
  if (JSON.stringify(allArrays[i]) == "[[6]]") {
    index2 = i + 1;
  }
}

console.log(index1 * index2);
