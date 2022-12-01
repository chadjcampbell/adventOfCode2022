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
console.log(data);

let splitData = data.split("\n");
for (let i = 0; i < splitData.length; i++) {
  let line = splitData[i];
  console.log(line);
  //TODO
}
