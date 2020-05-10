
/**
 * Import libraries & get some metadata
 */
const p5 = require('p5');
const pageWidth = window.innerWidth;
const pageHeight = window.innerHeight;


/**
 * Handle user input for selecting the kernal
 */
let currentKernal = 'gaussian'; // You can reference this variable inside of the P5 sketches
const kernelSelector = document.getElementById('kernel-selector'); // Get a reference to the select element
kernelSelector.onchange = () => { // Called whenever user changes the selectbox
  currentKernal = kernelSelector.value
  console.log('Kernel set to ', currentKernal);
};

/**
 * Data for the timeseries
 */
const NUMBER_OF_POINTS = 30;
const timeseriesData = [...Array(NUMBER_OF_POINTS)].map((d) => Math.random()) // 30 random values, in range [0, 1]


// ------------------------  P5 sketches below ------------------


/**
 * Sketch for the timeseries
 */
const timeseriesSketch = ( p ) => {

  let x1, x2, y1, y2, previousPoint;
  p.setup = function() {
    p.createCanvas(pageWidth, 300);
    p.background('#ddd');
    p.fill('#000000');
    timeseriesData.forEach((currentPoint, index) => {
      if (index === 0) return;
      previousPoint = timeseriesData[index - 1];

      x1 = p.map(index - 1, 0, NUMBER_OF_POINTS, 0, pageWidth);
      x2 = p.map(index, 0, NUMBER_OF_POINTS, 0, pageWidth);
      y1 = p.map(previousPoint, 0, 1, 0, 300);
      y2 = p.map(currentPoint, 0, 1, 0, 300);

      p.line(x1, y1, x2, y2);
    })
  };

  p.draw = function() {
    // this one isn't interactive
  };
};


/**
 * Sketch for the kernel
 */
const kernalSketch = ( p ) => {
  let x = 100;
  let y = 100;

  p.setup = function() {
    p.createCanvas(700, 410);
  };

  p.draw = function() {
    p.background(0);
    if (currentKernal === 'gaussian') {
      p.fill(255);
    } else {
      p.fill('#00ff00');
    }
    p.rect(x,y,50,50);
  };
};


/**
 * Sketch for the outpue
 */
const outputSketch = ( p ) => {
  let x = 100;
  let y = 100;

  let x1, y1, x2, y2, previousPoint;

  p.setup = function() {
    p.createCanvas(pageWidth, 300);
  };

  p.draw = function() {
    p.background('#ddd');
    p.fill('#000000');
    timeseriesData.forEach((currentPoint, index) => {
      if (index === 0) return;
      previousPoint = timeseriesData[index - 1];
      x1 = p.map(index - 1, 0, NUMBER_OF_POINTS, 0, pageWidth);
      x2 = p.map(index, 0, NUMBER_OF_POINTS, 0, pageWidth);
      y1 = p.map(previousPoint, 0, 1, 0, 300);
      y2 = p.map(currentPoint, 0, 1, 0, 300);
      p.line(x1, y1, x2, y2);
    })
    if (currentKernal === 'gaussian') {
      p.fill(255);
    } else {
      p.fill('#00ff00');
    }
    p.rect(x,y,50,50);
  };
};




/**
 * Add the P5 sketches to the DOM.
 */
new p5(timeseriesSketch, 'p5-timeseries'); // p5-timeseries is the "id" of a div in the HTML file.
new p5(kernalSketch, 'p5-kernel'); // p5-kernel is the "id" of a div in the HTML file.
new p5(outputSketch, 'p5-output'); // p5-output is the "id" of a div in the HTML file.