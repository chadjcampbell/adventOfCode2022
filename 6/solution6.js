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

readTextFile1("./data6.txt");

const splitData = data.split("");

//part1
for (let i = 3; i < splitData.length; i++) {
  let temp = [];
  for (let j = 0; j < 4; j++) {
    temp.push(splitData[i + j]);
  }
  let noDups = Array.from(new Set([...temp]));
  if (temp.length === noDups.length) {
    console.log(i + 4);
    break;
  }
}
