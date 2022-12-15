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

function extractCoords(string) {
  let sXStart = string.indexOf("=");
  let sXEnd = string.indexOf(",", sXStart + 1);
  let sX = parseInt(string.slice(sXStart + 1, sXEnd));
  let sYStart = string.indexOf("=", sXEnd + 1);
  let sYEnd = string.indexOf(":", sYStart + 1);
  let sY = parseInt(string.slice(sYStart + 1, sYEnd));

  let bXStart = string.indexOf("=", sYEnd + 1);
  let bXEnd = string.indexOf(",", bXStart + 1);
  let bX = parseInt(string.slice(bXStart + 1, bXEnd));
  let bYStart = string.indexOf("=", bXEnd + 1);
  let bY = parseInt(string.slice(bYStart + 1));

  return [sX, sY, bX, bY];
}

function diamond(number, x, y) {
  let n = number;
  let string = "";
  // Upside pyramid
  for (let i = 1; i <= n; i++) {
    // printing spaces
    for (let j = n; j > i; j--) {
      string += " ";
    }
    // printing star
    for (let k = 0; k < i * 2 - 1; k++) {
      string += "*";
    }
    string += "\n";
  }
  // downside pyramid
  for (let i = 1; i <= n - 1; i++) {
    // printing spaces
    for (let j = 0; j < i; j++) {
      string += " ";
    }
    // printing star
    for (let k = (n - i) * 2 - 1; k > 0; k--) {
      string += "*";
    }
    string += "\n";
  }
  console.log(string);
}

let yPostions = new Set();

//example taxiCab = 9 for sensor at 8,7
for (let i = 0; i < splitData.length; i++) {
  const [sX, sY, bX, bY] = extractCoords(splitData[i]);
  const taxiCab = Math.abs(sX - bX) + Math.abs(sY - bY);
  diamond(taxiCab + 1, sX, sY);
  console.log(taxiCab);
}
