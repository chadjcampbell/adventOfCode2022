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

readTextFile1("./data5.txt");

let stacks = {
  1: ["F", "C", "P", "G", "Q", "R"],
  2: ["W", "T", "C", "P"],
  3: ["B", "H", "P", "M", "C"],
  4: ["L", "T", "Q", "S", "M", "P", "R"],
  5: ["P", "H", "J", "Z", "V", "G", "N"],
  6: ["D", "P", "J"],
  7: ["L", "G", "P", "Z", "F", "J", "T", "R"],
  8: ["N", "L", "H", "C", "F", "P", "T", "J"],
  9: ["G", "V", "Z", "Q", "H", "T", "C", "W"],
};

const splitData = data.split("\n");

function getInstructions(string) {
  const array = string.split(" ");
  return [array[1], array[3], array[5]];
}

/*
for (let i = 0; i < splitData.length; i++) {
  let [howMany, startStack, endStack] = getInstructions(splitData[i]);
  howMany = parseInt(howMany);
  startStack = parseInt(startStack);
  endStack = parseInt(endStack);
  for (let i = 0; i < howMany; i++) {
    let movingCrate = stacks[`${startStack}`].pop();
    stacks[`${endStack}`].push(movingCrate);
  }
}
*/

//part1, uncomment first for loop for this part since it mutates data
/*
for (const crate in stacks) {
  console.log(`${stacks[crate].pop()}`);
}
*/

for (let i = 0; i < splitData.length; i++) {
  let [howMany, startStack, endStack] = getInstructions(splitData[i]);
  howMany = parseInt(howMany);
  startStack = parseInt(startStack);
  endStack = parseInt(endStack);

  let movingCrates = stacks[`${startStack}`].splice(-howMany);
  stacks[`${endStack}`] = stacks[`${endStack}`].concat(movingCrates);
}

//part2
for (const crate in stacks) {
  console.log(`${stacks[crate].pop()}`);
}
