function send(item, name) {
  const receiver = monkeyList.find((monkey) => monkey.name == name);
  receiver.items.push(item);
}

let monkeyList = [
  {
    name: "Monkey 0",
    items: [79, 98],
    inspected: 0,
    operation: function (item) {
      return Math.floor(item * 19);
    },
    test: function (item) {
      if (item % 23 == 0) {
        send(item, "Monkey 2");
      } else {
        send(item, "Monkey 3");
      }
    },
  },
  {
    name: "Monkey 1",
    items: [54, 65, 75, 74],
    inspected: 0,
    operation: function (item) {
      return Math.floor(item + 6);
    },
    test: function (item) {
      if (item % 19 == 0) {
        send(item, "Monkey 2");
      } else {
        send(item, "Monkey 0");
      }
    },
  },
  {
    name: "Monkey 2",
    items: [79, 60, 97],
    inspected: 0,
    operation: function (item) {
      return Math.floor(item * item);
    },
    test: function (item) {
      if (item % 13 == 0) {
        send(item, "Monkey 1");
      } else {
        send(item, "Monkey 3");
      }
    },
  },
  {
    name: "Monkey 3",
    items: [74],
    inspected: 0,
    operation: function (item) {
      return Math.floor(item + 3);
    },
    test: function (item) {
      if (item % 17 == 0) {
        send(item, "Monkey 0");
      } else {
        send(item, "Monkey 1");
      }
    },
  },
];

console.log(...monkeyList);

for (let j = 0; j < 10000; j++) {
  for (let i = 0; i < monkeyList.length; i++) {
    monkeyList[i].items.forEach((item) => {
      let newItem = monkeyList[i].operation(item);
      monkeyList[i].test(newItem);
      monkeyList[i].inspected++;
      monkeyList[i].items = [];
    });
  }
}

console.log(monkeyList);
