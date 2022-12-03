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

function findItem(arr) {
  const first = arr.slice(0, arr.length / 2);
  const second = arr.slice(arr.length / 2);
  const splitFirst = first.split("");
  const splitSecond = second.split("");
  const letter = splitFirst.filter((letter) => splitSecond.includes(letter));
  return Array.from(new Set([...letter]))[0];
}

readTextFile1("./data3.txt");

const splitData = data.split("\n");

let points = 0;
let totalPoints = 0;
for (let i = 0; i < splitData.length; i++) {
  let letter = findItem(splitData[i]);
  if (letter == letter.toUpperCase()) {
    points = letter.charCodeAt(0) - 38;
  } else {
    points = letter.charCodeAt(0) - 96;
  }
  totalPoints += points;
}

console.log(totalPoints);
