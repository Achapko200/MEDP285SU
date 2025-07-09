/*
 * @name Car Instances
 * @arialabel Vertical pale sage background with three rectangles--blue, yellow, and grey--moving across the screen horizontally at different speeds 
 * @frame 400,400
 * @description contributed by <a href="https://www.rit.edu/directory/wmhics-w-michelle-harris"><b>Prof WM Harris,</b></a> 
 * How to create three instances of Car Class and invoke class methods.
 * A function is created for the canvas setup, and 3 car instances are initialized with different colors and canvas positions. 
 * The speed of each car is set by passing value to the instance’s start method. A second function calls class methods to display and move the cars.
 */

class Car {
  constructor(cColor, x, y) {
    this.color = cColor;
    this.doors = 4;
    this.isConvertible = false;
    this.x = x;
    this.y = y;
    this.speed = 0;
  }

  start(speed) {
    this.speed = speed;
  }

  display() {
    fill(this.color);
    rect(this.x, this.y, 40, 20); // made cars a bit bigger for visibility
  }

  move() {
    this.x += this.speed;

    // Wrap around screen edges horizontally
    if (this.x > width) {
      this.x = -40;
    } else if (this.x < -40) {
      this.x = width;
    }
  }
}

let blueCar;
let yellowCar;
let greyCar;

function setup() {
  createCanvas(400, 400);
  background('#C6D8B8'); // pale sage background

  // Create three cars with color, initial x and y
  blueCar = new Car("blue", 50, 100);
  yellowCar = new Car("yellow", 0, 200);
  greyCar = new Car("grey", 150, 300);

  greyCar.doors = 2; // update doors for greyCar

  // Set speeds for each car (pixels per frame)
  blueCar.start(2.5);
  yellowCar.start(4);
  greyCar.start(-3);
}

function draw() {
  background('#C6D8B8'); // keep background fresh every frame

  // Display all cars
  blueCar.display();
  yellowCar.display();
  greyCar.display();

  // Move all cars
  blueCar.move();
  yellowCar.move();
  greyCar.move();
}
