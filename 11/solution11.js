function send(item, name) {
  const receiver = monkeyList.find((monkey) => monkey.name == name);
  receiver.items.push(item);
}

let monkeyList = [
  {
    name: "Monkey 0",
    items: [83, 62, 93],
    inspected: 0,
    operation: function (item) {
      return Math.floor((item * 17) / 3);
    },
    test: function (item) {
      if (item % 2 == 0) {
        send(item, "Monkey 1");
      } else {
        send(item, "Monkey 6");
      }
      this.items.shift();
    },
  },
  {
    name: "Monkey 1",
    items: [90, 55],
    inspected: 0,
    operation: function (item) {
      return Math.floor((item + 1) / 3);
    },
    test: function (item) {
      if (item % 17 == 0) {
        send(item, "Monkey 6");
      } else {
        send(item, "Monkey 3");
      }
      this.items.shift();
    },
  },
  {
    name: "Monkey 2",
    items: [91, 78, 80, 97, 79, 88],
    inspected: 0,
    operation: function (item) {
      return Math.floor((item + 3) / 3);
    },
    test: function (item) {
      if (item % 19 == 0) {
        send(item, "Monkey 7");
      } else {
        send(item, "Monkey 5");
      }
      this.items.shift();
    },
  },
  {
    name: "Monkey 3",
    items: [64, 80, 83, 89, 59],
    inspected: 0,
    operation: function (item) {
      return Math.floor((item + 5) / 3);
    },
    test: function (item) {
      if (item % 3 == 0) {
        send(item, "Monkey 7");
      } else {
        send(item, "Monkey 5");
      }
      this.items.shift();
    },
  },
  {
    name: "Monkey 4",
    items: [98, 92, 99, 51],
    inspected: 0,
    operation: function (item) {
      return Math.floor((item * item) / 3);
    },
    test: function (item) {
      if (item % 5 == 0) {
        send(item, "Monkey 0");
      } else {
        send(item, "Monkey 1");
      }
      this.items.shift();
    },
  },
  {
    name: "Monkey 5",
    items: [68, 57, 95, 85, 98, 75, 98, 75],
    inspected: 0,
    operation: function (item) {
      return Math.floor((item + 2) / 3);
    },
    test: function (item) {
      if (item % 13 == 0) {
        send(item, "Monkey 4");
      } else {
        send(item, "Monkey 0");
      }
      this.items.shift();
    },
  },
  {
    name: "Monkey 6",
    items: [74],
    inspected: 0,
    operation: function (item) {
      return Math.floor((item + 4) / 3);
    },
    test: function (item) {
      if (item % 7 == 0) {
        send(item, "Monkey 3");
      } else {
        send(item, "Monkey 2");
      }
      this.items.shift();
    },
  },
  {
    name: "Monkey 7",
    items: [68, 64, 60, 68, 87, 80, 82],
    inspected: 0,
    operation: function (item) {
      return Math.floor((item * 19) / 3);
    },
    test: function (item) {
      if (item % 11 == 0) {
        send(item, "Monkey 4");
      } else {
        send(item, "Monkey 5");
      }
      this.items.shift();
    },
  },
];

console.log(monkeyList);

for (let i = 0; i < 20; i++) {
  monkeyList.forEach((monkey) => {
    monkey.items.forEach((item) => {
      monkey.operation(item);
      monkey.test(item);
    });
  });
}

console.log(monkeyList);
