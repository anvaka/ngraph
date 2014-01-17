// this code changes appearance of nodes and links for fabricGraphics.
// It is used in `index.js` to render interactive graphs in a browser
// and in `doItFromNode` example to save graph as image from node.js
module.exports = function (fabricGraphics, fabric) {
  fabricGraphics.createNodeUI(createNode)
    .renderNode(renderNode)
    .createLinkUI(createLink)
    .renderLink(renderLink);

  return;

  function createNode(node) {
    return new fabric.Circle({ radius: Math.random() * 20, fill: getNiceColor() });
  }

  function renderNode(circle) {
    circle.left = circle.pos.x - circle.radius;
    circle.top = circle.pos.y - circle.radius;
  }

  function createLink(link) {
    // lines in fabric are odd... Probably I don't understand them.
    return new fabric.Line([0, 0, 0, 0], {
      stroke: getNiceColor(),
      originX: 'center',
      originY: 'center'
    });
  }

  function renderLink(line) {
    line.set({
      x1: line.from.x,
      y1: line.from.y,
      x2: line.to.x,
      y2: line.to.y
    });
  }
}

var niceColors = [
 '#1f77b4', '#aec7e8',
 '#ff7f0e', '#ffbb78',
 '#2ca02c', '#98df8a',
 '#d62728', '#ff9896',
 '#9467bd', '#c5b0d5',
 '#8c564b', '#c49c94',
 '#e377c2', '#f7b6d2',
 '#7f7f7f', '#c7c7c7',
 '#bcbd22', '#dbdb8d',
 '#17becf', '#9edae5'
];

function getNiceColor() {
  return niceColors[(Math.random() * niceColors.length)|0];
}
