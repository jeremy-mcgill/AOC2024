const fs = require("node:fs");

// Match any of the following:
//   mul(n,n) where n is a 1-3 digit number
//   do()
//   don't()
// Capture each number in a group
const regex = /mul\((\d{1,3})\,(\d{1,3})\)|do\(\)|don't\(\)/g;

// Mul instructions are enabled until we receive a don't() instruction
let mulEnabled = true;
let total = 0;

fs.readFile("./input.txt", "utf8", (err, data) => {
  // Spread iterable into an array that can be reduced
  const matches = [...data.matchAll(regex)];

  matches.forEach((instruction) => {
    switch (instruction[0]) {
      case "do()":
        mulEnabled = true;
        break;
      case "don't()":
        mulEnabled = false;
        break;
      default:
        // Multiply and add captured regex groups only if mul instructions are currently enabled
        total += mulEnabled ? instruction[1] * instruction[2] : 0;
        break;
    }
  });

  console.debug(total);
});
