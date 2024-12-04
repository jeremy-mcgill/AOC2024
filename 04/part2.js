const fs = require('node:fs');

// Search functions
// Each one accepts a reference to the wordSearch array and the starting X and Y coordinates
// Returns true (1) if found in the named shape or false (0) otherwise
const find0 = (input, startX, startY) => {
  // M.S
  // .A.
  // M.S

  if (startX > input[startY].length - 3 || startY > input.length - 3) { return false; }

  if (input[startY][startX + 2] != 'S') { return false; }
  if (input[startY + 1][startX + 1] != 'A') { return false; }
  if (input[startY + 2][startX] != 'M') { return false; }
  if (input[startY + 2][startX + 2] != 'S') { return false;}

  return true;
}

const find90 = (input, startX, startY) => {
  // M.M
  // .A.
  // S.S

  if (startX > input[startY].length - 3 || startY > input.length - 3) { return false; }

  if (input[startY][startX + 2] != 'M') { return false; }
  if (input[startY + 1][startX + 1] != 'A') { return false; }
  if (input[startY + 2][startX] != 'S') { return false; }
  if (input[startY + 2][startX + 2] != 'S') { return false;}

  return true;
}

const find180 = (input, startX, startY) => {
  // S.M
  // .A.
  // S.M

  if (startX < 2 || startY > input.length - 3) { return false; }

  if (input[startY][startX - 2] != 'S') { return false; }
  if (input[startY + 1][startX - 1] != 'A') { return false; }
  if (input[startY + 2][startX] != 'M') { return false; }
  if (input[startY + 2][startX - 2] != 'S') { return false; }

  return true;
}

const find270 = (input, startX, startY) => {
  // S.S
  // .A.
  // M.M

  if (startX > input[startY].length - 3 || startY < 2) { return false; }

  if (input[startY][startX + 2] != 'M') { return false; }
  if (input[startY - 1][startX + 1] != 'A') { return false; }
  if (input[startY - 2][startX] != 'S') { return false; }
  if (input[startY - 2][startX + 2] != 'S') { return false; }

  return true;
}

const findFunctions = [find0, find90, find180, find270];
let totalCount = 0;

fs.readFile('./input.txt', 'utf8', (err, data) => {
  const wordSearch = [];
  const rows = data.split('\n');

  // Loop through input file rows, split by characters and push into 2D array
  // This is probably unnecessary? But it's nice to have a 2D array to pass to the search functions 
  for (let y = 0; y < rows.length; y++) {
    wordSearch.push(new Array());
    const cols = rows[y].split('');

    for (let x = 0; x < cols.length; x++) {
      wordSearch[y].push(cols[x]);
    }
  }

  // Loop through wordSearch array rows and columns
  for (let y = 0; y < wordSearch.length; y++) {
    for (let x = 0; x < wordSearch[y].length; x++) {
      if (wordSearch[y][x] === 'M') {
        // Each time we find an X, call all of our search functions and add the result to the total count
        findFunctions.forEach((fn) => totalCount += fn(wordSearch, x, y));
      }
    }
  }

  console.debug('Count: ' + totalCount);
});