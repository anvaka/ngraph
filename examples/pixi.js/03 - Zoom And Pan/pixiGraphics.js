module.exports = function (graph, layout) {
  var width = window.innerWidth,
      height = window.innerHeight;

  var stage = new PIXI.Stage(0xFFFFFF, true);
  var renderer = PIXI.autoDetectRenderer(width, height, null, false, true);
  renderer.view.style.display = "block";
  document.body.appendChild(renderer.view);

  var graphics = new PIXI.Graphics();
  graphics.position.x = width/2;
  graphics.position.y = height/2;

  graphics.scale.x = 0.2;
  graphics.scale.y = 0.2;
  stage.addChild(graphics);

  // Store node and link positions into arrays for quicker access within
  // animation loop:
  var nodePositions = [],
      linkPositions = [];

  graph.forEachNode(function(node) {
    nodePositions.push(layout.getNodePosition(node.id));
  });

  graph.forEachLink(function(link) {
    linkPositions.push(layout.getLinkPosition(link.id));
  });

  return {
    renderFrame: function () {
      layout.step();
      drawGraph(graphics, nodePositions, linkPositions);
      renderer.render(stage);
    },
    domContainer: renderer.view,
    graphGraphics: graphics,
    stage: stage
  };
}

function drawGraph(graphics, nodePositions, linkPositions) {
  // No magic at all: Iterate over positions array and render nodes/links
  graphics.clear();
  graphics.beginFill(0xFF3300);
  var i, x, y, x1, y1;

  graphics.lineStyle(1, 0xcccccc, 1);
  for(i = 0; i < linkPositions.length; ++i) {
    var link = linkPositions[i];
    graphics.moveTo(link.from.x, link.from.y);
    graphics.lineTo(link.to.x, link.to.y);
  }

  graphics.lineStyle(0);
  for (i = 0; i < nodePositions.length; ++i) {
    x = nodePositions[i].x - 5;
    y = nodePositions[i].y - 5;
    graphics.drawRect(x, y, 10, 10);
  }
}
