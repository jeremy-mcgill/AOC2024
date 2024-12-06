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
    let failed = false;
    let failedCount = 0;   

    let pages = pageSet[0].split(",");

    // Sort the rulesets, not sure if this matters but it feels right;
    rules.sort();

    do {
      failed = false;
      failedCount = 0;

      // Loop through each rule
      for (let i = 0; i < rules.length; i++) {      
        let ruleFirst = rules[i][2];
        let ruleSecond = rules[i][3];
  
        // If both page numbers in the rule are in this pageset...
        if (pages.includes(ruleFirst) && pages.includes(ruleSecond)) {
          // Check if their order is reversed from what it's supposed to be
          if (pages.indexOf(ruleFirst) > pages.indexOf(ruleSecond)) {
            // Note that we had to fix it
            pageSetValid = false;
            let a = pages[pages.indexOf(ruleFirst)];
            let b = pages[pages.indexOf(ruleSecond)];
  
            // And then flip their positions
            pages[pages.indexOf(ruleFirst)] = b;
            pages[pages.indexOf(ruleSecond)] = a;
          }
        }
      }
  
      // Run through the ruleset again, count the number of rules that didn't pass
      for (let i = 0; i < rules.length; i++) {      
        let ruleFirst = rules[i][2];
        let ruleSecond = rules[i][3];
  
        if (pages.includes(ruleFirst) && pages.includes(ruleSecond)) {
          if (pages.indexOf(ruleFirst) > pages.indexOf(ruleSecond)) {
            failed = true;
          }
        }
      }
     
      if (failed) {
        failedCount++;
      }

      // Just keep trying again until all of the rules have passed
      // This feels gross
    } while( failedCount > 0);

    // If we had to fix it, find the middle page number and add it to the global accumulator
    if (!pageSetValid) {
      accumulator += parseInt(pages[(pages.length-1)/2]);
    }
  });

  console.debug(accumulator);
});
