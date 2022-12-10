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

readTextFile1("./example.txt");

const splitData = data.split("\n");

const instructions = splitData.map((line) => {
  return line.split(" ");
});

function updateX() {}

let cycle = 0;
let X = 1;
let signalStrength = 0;
for (let i = 0; i < instructions.length; i++) {
  cycle++;
  let action = instructions[i][0];
  let value = parseInt(instructions[i][1]);
  if (cycle === 20) {
    signalStrength += cycle * X;
  }
  if (cycle % 40) {
    signalStrength += cycle * X;
  }
  if (action === "addx") {
    cycle++;
    X += value;
  }
  console.log(cycle, X);
}
console.log(signalStrength);
