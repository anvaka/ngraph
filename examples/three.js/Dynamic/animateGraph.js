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
      if (i > 0) { graph.addLink(node, i - 1 + j * n); }
      if (j > 0) { graph.addLink(node, i + (j - 1) * n); }
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
