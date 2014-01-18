// This file generates thumbnails for several graphs from generator.
// It duplicates lot of code from `../doItFromNode.js`.
// I tried to make `doItFromNode.js` as very simple example without splitting
// it into multiple files to show how small it is.  But it
// might make more sense to just split that further...

saveGraph('grid', {n: 10, m: 10});
saveGraph('ladder', { n: 10 });
saveGraph('complete', { n: 5 });
saveGraph('balancedBinTree', {n: 6, iterationsCount: 400});
saveGraph('path', {n: 10 });
saveGraph('circularLadder', { n: 10 });

function saveGraph(graphName, options) {
  var graph = require('ngraph.generators')[graphName](options.n, options.m);

  console.log('Running layout for ' + graphName);
  var layout = layoutGraph(graph, options.iterationsCount);
  console.log('Done. Rendering graph...');

  var canvas = renderToCanvas(graph, layout);
  saveCanvasToFile(canvas, graphName + '.png');
}

function layoutGraph(graph, iterationsCount) {
  iterationsCount = iterationsCount || 200;
  // we are going to use our own layout:
  var layout = require('ngraph.forcelayout')(graph);
  for (var i = 0; i < iterationsCount; ++i) {
    layout.step();
  }
  return layout;
}

function renderToCanvas(graph, layout) {
  var graphRect = layout.getGraphRect();
  var size = Math.max(graphRect.x2 - graphRect.x1, graphRect.y2 - graphRect.y1) + 200;

  var fabricGraphics = require('ngraph.fabric')(graph, { width: size, height: size, layout: layout });
  var fabric = require('fabric').fabric;

  require('../ui')(fabricGraphics, fabric);

  var scale = 1;
  fabricGraphics.setTransform(size/2, size/2, scale);
  fabricGraphics.renderOneFrame(); // One frame is enough

  return fabricGraphics.canvas;
}

function saveCanvasToFile(canvas, fileName) {
  var fs = require('fs');
  var path = require('path');
  var fullName = path.join(__dirname, fileName);

  canvas.createPNGStream().pipe(fs.createWriteStream(fullName));
}
