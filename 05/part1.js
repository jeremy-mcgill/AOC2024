const fs = require("node:fs");

let accumulator = 0;

fs.readFile("./input.txt", "utf8", (err, data) => {
  // Find lines that look like a rule (n|n)
  const rules = [...data.matchAll(/(^(\d+)\|(\d+))/gm)];

  // Find lines that look like a pageset (comma-delimited numbers)
  const pageSets = [...data.matchAll(/(^\d+,(\d+,?)*)/gm)];

  // Loop through pagesets
  pageSets.forEach((pageSet) => {
    let pageSetValid = true;
    let pages = pageSet[0].split(",");

    // Loop through each rule
    for (let i = 0; i < rules.length; i++) {      
      let ruleFirst = rules[i][2];
      let ruleSecond = rules[i][3];

      // If both page numbers in the rule are in this pageset...
      if (pages.includes(ruleFirst) && pages.includes(ruleSecond)) {
        // Check if their order is reversed from what it's supposed to be
        if (pages.indexOf(ruleFirst) > pages.indexOf(ruleSecond)) {
          // Note that the pageset is invalid
          pageSetValid = false;
        }
      }
    }

    // If the pageset is valid, find the middle page number and add it to the global accumulator
    if (pageSetValid) {
      accumulator += parseInt(pages[(pages.length-1)/2]);
    }
  });

  console.debug(accumulator);
});
