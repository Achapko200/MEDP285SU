/*
 * @name Bubble Sort
 * @arialabel Dark grey bars of different heights on a light grey background are sorted from shortest to tallest from left to right
 * @description Sorts an array of random heights using bubble sort while visualizing the process in real-time.
 * Adapted from The Coding Train's bubble sort challenge.
 */

let values = [];
let i = 0; // Number of passes completed
let j = 0; // Current comparison index
const w = 8; // Width of each bar

function setup() {
  createCanvas(720, 400);
  frameRate(60);
  reset();
}

function reset() {
  // Fill the array with random heights
  values = [];
  for (let k = 0; k < width / w; k++) {
    values[k] = random(height);
  }
  i = 0;
  j = 0;
  loop(); // Restart the draw loop if it was stopped
}

function draw() {
  background(240);
  bubbleSortStep();
  drawBars();
}

function bubbleSortStep() {
  // Do up to 8 steps per frame for smooth animation
  for (let n = 0; n < 8; n++) {
    if (i < values.length) {
      // Make sure j+1 doesn't go out of bounds
      let nextIndex = constrain(j + 1, 0, values.length - 1);
      
      if (values[j] > values[nextIndex]) {
        // Swap values
        let temp = values[j];
        values[j] = values[nextIndex];
        values[nextIndex] = temp;
      }
      j++;

      // When one pass is done, reset j and increment i
      if (j >= values.length - i - 1) {
        j = 0;
        i++;
      }
    } else {
      noLoop(); // Stop once sorted
    }
  }
}

function drawBars() {
  for (let k = 0; k < values.length; k++) {
    stroke(80, 120, 120);
    
    // Highlight the bars currently being compared
    if (k === j || k === j + 1) {
      fill(200, 100, 50); // highlight color (orange-ish)
    } else {
      fill(50); // normal color
    }
    
    rect(k * w, height, w, -values[k], 5);
  }
}

// Optional: reset sorting when pressing 'r'
function keyPressed() {
  if (key === 'r' || key === 'R') {
    reset();
  }
}
