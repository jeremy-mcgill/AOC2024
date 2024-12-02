const fs = require('node:fs');

let safeCount = 0;

function checkSafety(levels) {
  let direction = 0;

  for (let i = 1; i < levels.length; i++) {
    let previous = levels[i - 1];
    let current = levels[i];

    let difference = previous - current;

    // Direction is 0 if reading is unchanged, -1 if reading is lower than previous, 1 if reading is higher than previous
    let currentDirection = (difference < 0) ? -1 : (difference > 0) ? 1 : 0;

    // Set the direction if we haven't previously determined it
    if (direction === 0) {
      direction = currentDirection; 
    }

    // Return if reading is unchanged, has changed directions, or has changed by more than 3
    if ((currentDirection === 0) || (direction != currentDirection) || (Math.abs(difference) > 3) ) {
      return false;
    }     
  }

  return true;
}

fs.readFile('./input.txt', 'utf8', (err, data) => {
  // Split input at linebreaks
  const lines = data.split('\n');

  lines.forEach((value, i) => {
    // Input has one space between readings
    const levels = value.split(' ');

    if (checkSafety(levels)) {
      safeCount++;
    }
  });

  console.debug(safeCount);
});