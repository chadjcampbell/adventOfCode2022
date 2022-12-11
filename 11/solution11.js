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

let monkeyList = [
  {
    name: "Monkey 0",
    items: [83, 62, 93],
    operation: function (item) {
      return item * 17;
    },
    test: function (item) {
      if (item % 2 == 0) {
        throw item;
      }
    },
  },
];

const splitData = data.split("\n\n");
const monkeyArr = splitData.map((data) => data.split("\n"));

console.log(monkeyList);
