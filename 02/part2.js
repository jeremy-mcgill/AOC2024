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
  const lines = data.split('\n');

  let safeCount = 0;

  lines.forEach((value) => {
    const levels = value.split(' ');
    
    if (checkSafety(levels)) {
      // Check if the set of readings is safe without modification
      safeCount++;
    } else {
      // If not, we are allowed to ignore one reading
      for (let i = 0; i < levels.length; i++) {
        // Make a deep copy of the levels array and remove element i
        let tmpLevels = [...levels];
        tmpLevels.splice(i, 1);
        
        if (checkSafety(tmpLevels)) {
          safeCount++
          
          // Stop trying if removing level i resulted in safety
          break;
        }
      }
    }
  });

  console.debug(safeCount);
});