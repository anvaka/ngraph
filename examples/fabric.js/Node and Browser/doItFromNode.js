// This example renders graph into an image
var graph = require('ngraph.generators').grid(10, 10);

// Perform 500 iterations of graph layout:
var layout = layoutGraph(graph, 500);

// Ask fabric to render graph with given layout into a canvas
var canvas = renderToCanvas(graph, layout);

// And finally save it to a file
saveCanvasToFile(canvas, 'outGraph.png');

function layoutGraph(graph, iterationsCount) {
  // we are going to use our own layout:
  var layout = require('ngraph.forcelayout')(graph);
  console.log('Running layout...');
  for (var i = 0; i < iterationsCount; ++i) {
    layout.step();
  }
  console.log('Done. Rendering graph...');
  return layout;
}

function renderToCanvas(graph, layout) {
  var graphRect = layout.getGraphRect();
  var size = Math.max(graphRect.x2 - graphRect.x1, graphRect.y2 - graphRect.y1) + 200;

  var fabricGraphics = require('ngraph.fabric')(graph, { width: size, height: size, layout: layout });
  var fabric = require('fabric').fabric;

  // This line customize appearance of each node and link. The best part of it -
  // it is the same code which renders graph in `index.js`
  require('./ui')(fabricGraphics, fabric);

  var scale = 1;
  fabricGraphics.setTransform(size/2, size/2, scale);
  fabricGraphics.renderOneFrame(); // One frame is enough

  return fabricGraphics.canvas;
}

function saveCanvasToFile(canvas, fileName) {
  var fs = require('fs');
  var path = require('path');
  var fullName = path.join(__dirname, fileName);
  var outFile = fs.createWriteStream(fullName);

  canvas.createPNGStream().on('data', function(chunk) {
    outFile.write(chunk);
  }).on('end', function () {
    console.log('Graph saved to: ' + fullName);
  });
}
