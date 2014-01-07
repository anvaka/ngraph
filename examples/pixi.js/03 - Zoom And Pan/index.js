module.exports.main = function () {
  var graph = require('ngraph.generators').grid(40, 40),
      layout = createLayout(graph);

  var createPixiGraphics = require('./pixiGraphics');
  var graphics = createPixiGraphics(graph, layout);

  // Listen to mouse events and update graph acoordingly:
  var bindGlobalInput = require('./globalInput');
  bindGlobalInput(graphics);

  // begin animation loop:
  renderFrame();

  function renderFrame() {
    graphics.renderFrame();
    requestAnimFrame(renderFrame);
  }
}

function createLayout(graph) {
  var layout = require('ngraph.forcelayout'),
      physics = require('ngraph.physics.simulator');

  return layout(graph, physics({
          springLength: 30,
          springCoeff: 0.0008,
          dragCoeff: 0.01,
          gravity: -1.2,
          theta: 1
        }));
}
