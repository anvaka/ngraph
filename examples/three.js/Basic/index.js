module.exports.main = function () {
  var query = require('query-string').parse(window.location.search.substring(1));
  var graph = getGraphFromQueryString(query);
  var createThree = require('ngraph.three');
  var graphics = createThree(graph, {interactive: true});

  graphics.run(); // begin animation loop:
  graphics.camera.position.z = getNumber(query.z, 400);
};

function getGraphFromQueryString(query) {
  var graphGenerators = require('ngraph.generators');
  var createGraph = graphGenerators[query.graph] || graphGenerators.grid;
  return createGraph(getNumber(query.n), getNumber(query.m), getNumber(query.k));
}

function getNumber(string, defaultValue) {
  var number = parseFloat(string);
  return (typeof number === 'number') && !isNaN(number) ? number : (defaultValue || 10);
}
