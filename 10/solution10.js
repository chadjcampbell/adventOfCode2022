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

readTextFile1("./data10.txt");

const splitData = data.split("\n");

const instructions = splitData.map((line) => {
  return line.split(" ");
});

function part1() {
  function updateX() {
    if (cycle === 20) {
      signalStrength += cycle * X;
    } else if ((cycle - 20) % 40 === 0) {
      signalStrength += cycle * X;
    }
  }
  let cycle = 0;
  let X = 1;
  let signalStrength = 0;
  for (let i = 0; i < instructions.length; i++) {
    let action = instructions[i][0];
    let value = parseInt(instructions[i][1]);
    if (action === "noop") {
      cycle++;
      updateX();
    }
    if (action === "addx") {
      cycle++;
      updateX();
      cycle++;
      updateX();
      X += value;
    }
  }
  console.log(signalStrength);
}

//part1
part1();

//part2

function part2() {
  function checkLine() {
    sprite = [X - 1, X, X + 1];
    if (sprite.includes(cycle)) {
      line.push("#");
    } else {
      line.push(" ");
    }
    cycle++;
    if (cycle % 40 === 0) {
      console.log(line);
      line = [];
      X += 40;
    }
  }
  let cycle = 0;
  let X = 1;
  let sprite = [];
  let line = [];
  for (let i = 0; i < instructions.length; i++) {
    let action = instructions[i][0];
    let value = parseInt(instructions[i][1]);
    if (action === "noop") {
      checkLine();
    }
    if (action === "addx") {
      checkLine();
      checkLine();
      X += value;
    }
  }
}

part2();
