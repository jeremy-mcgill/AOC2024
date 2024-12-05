const fs = require("node:fs");

fs.readFile("./input.short.txt", "utf8", (err, data) => {
  const rules = [...data.matchAll(/(^(\d+)\|(\d+))/gm)];
  const pageSets = [...data.matchAll(/(^\d+,(\d+,?)*)/gm)];

  pageSets.forEach((pageSet) => {
    let pages = pageSet[0].split(",");

    rules.forEach((rule) => {
      let ruleFirst = rule[2];
      let ruleSecond = rule[3];
    });
  });
});
