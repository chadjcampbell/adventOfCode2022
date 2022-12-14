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

readTextFile1("./data13.txt");

const splitData = data.split("\n\n");

let index = 1;
let sumIndex = 0;

function inOrder(left, right) {
  if (left === undefined) return true;
  if (right === undefined) return false;
  if (typeof left === "number" && typeof right === "number") {
    if (left < right) return true;
    if (left > right) return false;
  }
  if (typeof left === "object" && typeof right === "object") {
    for (let i = 0; i < right.length + 1; i++) {
      if (left[i] === right[i]) {
        continue;
      } else if (!left.length && !right.length) {
        continue;
      } else if (inOrder(left[i], right[i]) === true) {
        return true;
      } else if (inOrder(left[i], right[i]) === false) {
        return false;
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

for (let i = 0; i < splitData.length; i++) {
  const packet = splitData[i].split("\n");
  const leftPacket = JSON.parse(packet[0]);
  const rightPacket = JSON.parse(packet[1]);
  console.log(inOrder(leftPacket, rightPacket));
  if (inOrder(leftPacket, rightPacket)) {
    sumIndex += index;
  }
  index += 1;
}

//part1
console.log(sumIndex);
