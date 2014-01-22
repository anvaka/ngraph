module.exports.main = function () {
  var graph = getGraphFromQueryString(window.location.search.substring(1));
  var createThree = require('ngraph.three');
  var graphics = createThree(graph);

  // begin animation loop:
  graphics.run();
}

function getGraphFromQueryString(queryString) {
  var query = require('query-string').parse(queryString);
  var n = parseInt(query.n, 10) || 10;
  var m = parseInt(query.m, 10) || 10;
  var k = parseInt(query.k, 10) || 10;

  var graphGenerators = require('ngraph.generators');
  var createGraph = graphGenerators[query.graph] || graphGenerators.grid;
  return createGraph(n, m, k);
}
