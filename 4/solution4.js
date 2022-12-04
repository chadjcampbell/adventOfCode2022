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

readTextFile1("./data4.txt");

const splitData = data.split("\n");

function makeArrays(string) {
  const commaSplit = string.split(",");
  const fullArray = commaSplit.map((string) => {
    return string.split("-");
  });
  return fullArray;
}

let counter = 0;
for (let i = 0; i < splitData.length; i++) {
  const [arr1, arr2] = makeArrays(splitData[i]);

  if (
    parseInt(arr1[0]) <= parseInt(arr2[0]) &&
    parseInt(arr1[1]) >= parseInt(arr2[1])
  ) {
    counter++;
    continue;
  }
  if (
    parseInt(arr1[0]) >= parseInt(arr2[0]) &&
    parseInt(arr1[1]) <= parseInt(arr2[1])
  ) {
    counter++;
    continue;
  }
}

//part1
console.log(counter);
