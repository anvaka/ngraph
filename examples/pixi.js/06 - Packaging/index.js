module.exports.main = function () {
  var graph = require('ngraph.generators').balancedBinTree(6);
  var createPixiGraphics = require('ngraph.pixi');

  var pixiGraphics = createPixiGraphics(graph);

  // setup our custom looking nodes and links:
  pixiGraphics.createNodeUI(require('./lib/createNodeUI'))
    .renderNode(require('./lib/renderNode'))
    .createLinkUI(require('./lib/createLinkUI'))
    .renderLink(require('./lib/renderLink'));

  // just make sure first node does not move:
  var layout = pixiGraphics.layout;
  layout.pinNode(graph.getNode(1), true);

  // begin animation loop:
  pixiGraphics.run();
}
