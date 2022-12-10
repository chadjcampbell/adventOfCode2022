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

for (let i = 0; i < instructions.length; i++) {
  let action = instructions[i][0];
  let value = parseInt(instructions[i][1]);
  console.log(action, value);
}
