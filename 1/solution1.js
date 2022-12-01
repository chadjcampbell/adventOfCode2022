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

readTextFile1("./data1.txt");

let splitData = data.split("\n");
let total = 0;
let chunkTotal = 0;
let elf = 1;
let biggest = 0;
let allChunkTotals = [];
for (let i = 0; i < splitData.length; i++) {
  let line = splitData[i];
  if (line == "") {
    chunkTotal = total;
    if (chunkTotal > biggest) {
      biggest = chunkTotal;
    }
    elf++;
    total = 0;
    allChunkTotals.push(chunkTotal);
  } else {
    let int = parseInt(line);
    total += int;
  }
}

let sorted = allChunkTotals.sort((a, b) => b - a);

let topThreeTotal = 0;
for (let i = 0; i < 3; i++) {
  topThreeTotal += sorted[i];
}

console.log(biggest);
console.log(sorted);
console.log(topThreeTotal);

//TODO 205,590 is the current top 3, thats wrong! too low?
