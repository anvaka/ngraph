module.exports.animate = function (graph) {
  beginAddNodesLoop(graph);
}

function beginRemoveNodesLoop(graph){
  var nodesLeft = [];
  graph.forEachNode(function(node){
   nodesLeft.push(node.id);
  });

  var removeInterval = setInterval(function(){
    var nodesCount = nodesLeft.length;

    if (nodesCount > 0) {
      var nodeToRemove = Math.min((Math.random() * nodesCount) << 0, nodesCount - 1);

      graph.removeNode(nodesLeft[nodeToRemove]);
      nodesLeft.splice(nodeToRemove, 1);
    }

    if (nodesCount === 0) {
      clearInterval(removeInterval);
      setTimeout(function(){
        beginAddNodesLoop(graph);
      }, 100);
    }
  }, 100);
}

function beginAddNodesLoop(graph){
  var i = 0, m = 10, n = 40;
  var addInterval = setInterval(function(){
    graph.beginUpdate();

    for (var j = 0; j < m; ++j){
      var node = i + j * n;
      if (i > 0) { addLink(graph, node, i - 1 + j * n); }
      if (j > 0) { addLink(graph, node, i + (j - 1) * n); }
    }
    i++;
    graph.endUpdate();

    if (i >= n) {
      clearInterval(addInterval);
      setTimeout(function() {
          beginRemoveNodesLoop(graph);
      }, 10000);
    }
  }, 100);
}

function addLink(graph, from, to) {
  initializeNode(graph, from);
  initializeNode(graph, to);
  graph.addLink(from, to, { color: getNiceColor() });
}

function initializeNode(graph, nodeId) {
  if (graph.getNode(nodeId)) {
    // already initialized
    return;
  }
  graph.addNode(nodeId, {
    size: Math.random() * 20 + 1,
    color: getNiceColor()
  })
}

var niceColors = [
  0x1f77b4, 0xaec7e8,
  0xff7f0e, 0xffbb78,
  0x2ca02c, 0x98df8a,
  0xd62728, 0xff9896,
  0x9467bd, 0xc5b0d5,
  0x8c564b, 0xc49c94,
  0xe377c2, 0xf7b6d2,
  0x7f7f7f, 0xc7c7c7,
  0xbcbd22, 0xdbdb8d,
  0x17becf, 0x9edae5
];

function getNiceColor() {
  return niceColors[(Math.random() * niceColors.length)|0];
}

