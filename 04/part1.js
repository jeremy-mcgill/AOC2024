const fs = require('node:fs');

// Search functions
// Each one accepts a reference to the wordSearch array and the starting X and Y coordinates
// Returns true (1) if found in the named direction or false (0) otherwise
const findUp = (input, startX, startY) => {
  if (startY < 3) { return false; }

  if (input[startY - 1][startX] != 'M') { return false; }
  if (input[startY - 2][startX] != 'A') { return false; }
  if (input[startY - 3][startX] != 'S') { return false; }

  return true;
}

const findDown = (input, startX, startY) => {
  if (startY > input.length - 4) { return false; }
  
  if (input[startY + 1][startX] != 'M') { return false; }
  if (input[startY + 2][startX] != 'A') { return false; }
  if (input[startY + 3][startX] != 'S') { return false; }

  return true;
}

const findLeft = (input, startX, startY) => {
  if (startX < 3) { return false; }

  if (input[startY][startX - 1] != 'M') { return false; }
  if (input[startY][startX - 2] != 'A') { return false; }
  if (input[startY][startX - 3] != 'S') { return false; }

  return true;
}

const findRight = (input, startX, startY) => {
  if (startX > input[startY].length) { return false; }

  if (input[startY][startX + 1] != 'M') { return false; }
  if (input[startY][startX + 2] != 'A') { return false; }
  if (input[startY][startX + 3] != 'S') { return false; }

  return true;
}

const findUpLeft = (input, startX, startY) => {
  if (startX < 3 || startY < 3) { return false; }

  if (input[startY - 1][startX - 1] != 'M') { return false; }
  if (input[startY - 2][startX - 2] != 'A') { return false; }
  if (input[startY - 3][startX - 3] != 'S') { return false; }

  return true;
}

const findUpRight = (input, startX, startY) => {
  if (startX > input[startY].length || startY < 3) { return false; }

  if (input[startY - 1][startX + 1] != 'M') { return false; }
  if (input[startY - 2][startX + 2] != 'A') { return false; }
  if (input[startY - 3][startX + 3] != 'S') { return false; }

  return true;
}

const findDownLeft = (input, startX, startY) => {
  if (startX < 3 || startY > input.length - 4) { return false; }

  if (input[startY + 1][startX - 1] != 'M') { return false; }
  if (input[startY + 2][startX - 2] != 'A') { return false; }
  if (input[startY + 3][startX - 3] != 'S') { return false; }

  return true;
}

const findDownRight = (input, startX, startY) => {
  if (startX > input[startY].length || startY > input.length - 4) { return false; }

  if (input[startY + 1][startX + 1] != 'M') { return false; }
  if (input[startY + 2][startX + 2] != 'A') { return false; }
  if (input[startY + 3][startX + 3] != 'S') { return false; }

  return true;
}

const findFunctions = [findUp, findDown, findLeft, findRight, findUpLeft, findUpRight, findDownLeft, findDownRight];
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
      if (wordSearch[y][x] === 'X') {
        // Each time we find an X, call all of our search functions and add the result to the total count
        findFunctions.forEach((fn) => totalCount += fn(wordSearch, x, y));
      }
    }
  }

  console.debug('Count: ' + totalCount);
});