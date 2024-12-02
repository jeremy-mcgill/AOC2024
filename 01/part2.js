const fs = require('node:fs');

const leftList = [];
const rightList = [];

let totalSimilarity = 0;

fs.readFile('./input.txt', 'utf8', (err, data) => {
  // Split input at linebreaks
  const lines = data.split('\n');

  lines.forEach(element => {
    // Input has 3 spaces between columns
    let line = element.split('   ');

    // Push first column into leftList, second column into rightList
    leftList.push(line[0]);
    rightList.push(line[1]);
  });

  // Requirement: "Pair up the smallest number in the left list with the smallest number in the right list, then the second-smallest left number with the second-smallest right number, and so on."
  // Easiest way to do that is sort both lists.
  leftList.sort();
  rightList.sort();

  leftList.forEach(value => {
    // Count the number of instances of value in rightList
    rightCount = rightList.filter(x => x === value).length;

    // Similarity is the value multiplied by the count from rightList
    totalSimilarity += value * rightCount;
  })

  console.debug(totalSimilarity);
});