var NODE_WIDTH = 10;

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

  graphics.scale.x = 1;
  graphics.scale.y = 1;
  stage.addChild(graphics);

  // Store node and link positions into arrays for quicker access within
  // animation loop:
  var nodePositions = [],
      getNodeByIndex = {},
      linkPositions = [];

  graph.forEachNode(function(node) {
    nodePositions.push(layout.getNodePosition(node.id));
    getNodeByIndex[nodePositions.length - 1] = node;
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
    stage: stage,

    getNodeAt: function (x, y) {
      var half = NODE_WIDTH/2;
      // currently it's a linear search, but nothing stops us from refactoring
      // this into spatial lookup data structure in future:
      for (var i = 0; i < nodePositions.length; ++i) {
        var pos = nodePositions[i];
        var insideNode = pos.x - half < x && x < pos.x + half &&
                         pos.y - half < y && y < pos.y + half;

        if (insideNode) {
          return getNodeByIndex[i];
        }
      }
    }
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
  var half = NODE_WIDTH/2;
  for (i = 0; i < nodePositions.length; ++i) {
    x = nodePositions[i].x - half;
    y = nodePositions[i].y - half;
    graphics.drawRect(x, y, NODE_WIDTH, NODE_WIDTH);
  }
}
