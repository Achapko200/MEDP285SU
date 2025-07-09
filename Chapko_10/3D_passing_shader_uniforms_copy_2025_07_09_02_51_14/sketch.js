/*
 * @name Passing Shader Uniforms
 * @arialabel Rotating rainbow polygon in the center with glowing edges, on a dark purple background. MouseX controls the number of sides; MouseY controls the polygon size.
 * @description Uniforms are used to pass dynamic input from p5.js to the shader, allowing interaction and animation effects.
 */

let theShader;

function preload() {
  // Load the vertex and fragment shaders from the assets folder
  theShader = loadShader('assets/uniforms.vert', 'assets/uniforms.frag');
}

function setup() {
  // WEBGL mode is required for shaders
  createCanvas(710, 400, WEBGL);
  noStroke();

  describe('Rotating rainbow polygon with glow. MouseX changes sides, mouseY changes size.');
}

function draw() {
  // Apply our custom shader
  shader(theShader);

  // Pass data to the shader
  theShader.setUniform('resolution', [width * displayDensity(), height * displayDensity()]);
  theShader.setUniform('mouse', mouseX);   // used for number of sides
  theShader.setUniform('mouseY', mouseY);  // used for polygon size
  theShader.setUniform('time', frameCount * 0.01); // animate over time

  // Draw full-screen rectangle (for shader to fill)
  rect(0, 0, width, height);
}
