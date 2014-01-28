module.exports.main = main;

var gexf = require('ngraph.gexf');

function main() {
  $('.renderForm').submit(function(e) {
    e.preventDefault();
    var graph = renderGraph($('#gexfContent').val().trim());
    showGraphStats(graph);
  });
}

function renderGraph(gexfContent) {
  var graph = gexf.load(gexfContent);

  var graphics = require('ngraph.pixi')(graph, {
    container: document.getElementById('scene'),
    physics: {
      dragCoeff: 0.3,
      timeStep: 5
    }
  });
  // just for the sake of beautiy, let's make graph appearance a little bit different:
  require('./customUI')(graphics);
  graphics.run(); // begin animation loop
  return graph;
}

function showGraphStats(graph){
  $('.renderForm').replaceWith(
    '<div class="renderForm">' +
    '<p>Nodes count: <b>' + graph.getNodesCount() + '</b></p>' +
    '<p>Links count: <b>' + graph.getLinksCount() + '</b></p>' +
    '</div>'
  );
}
