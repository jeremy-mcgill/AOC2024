const fs = require("node:fs");

// Match instructions in the format mul(n,n) where n is a 1-3 digit number
// Capture each number in a group
const regex = /mul\((\d{1,3})\,(\d{1,3})\)/g;

fs.readFile("./input.txt", "utf8", (err, data) => {
  // Spread iterable into an array that can be reduced
  const matches = [...data.matchAll(regex)];

  let total = matches.reduce((previous, current) => {
    // Matched groups are accessible as current[1] and current[2]
    // Multiply them and add to the returned accumulator
    return previous + current[1] * current[2];
  }, 0);

  console.debug(total);
});
