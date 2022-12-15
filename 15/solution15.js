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

const splitData = data.split("\r\n");

for (let i = 0; i < splitData.length; i++) {
  let sXStart = splitData[i].indexOf("=");
  let sXEnd = splitData[i].indexOf(",", sXStart + 1);
  let sX = parseInt(splitData[i].slice(sXStart + 1, sXEnd));
  let sYStart = splitData[i].indexOf("=", sXEnd + 1);
  let sYEnd = splitData[i].indexOf(":", sYStart + 1);
  let sY = parseInt(splitData[i].slice(sYStart + 1, sYEnd));

  console.log(sX, sY);
}
