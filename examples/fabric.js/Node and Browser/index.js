module.exports.main = function () {
  var queryString = typeof window !== 'undefined' ? window.location.search.substring(1) : '';
  var graph = getGraphFromQueryString(queryString); 
  var fabricGraphics = require('ngraph.fabric')(graph);

  // this is a power of fabric. Shared ui settings can be used both on the
  // server side inside node.js application and in the browser. Checkout
  // `doItFromNode.js` example to see how it's used inside node
  require('./ui')(fabricGraphics, fabric);

  // begin animation loop:
  fabricGraphics.run();
};

function getGraphFromQueryString(queryString) {
  var query = require('query-string').parse(queryString);
  var n = parseInt(query.n, 10) || 10;
  var m = parseInt(query.m, 10) || 10;

  var graphGenerators = require('ngraph.generators')
  var createGraph = graphGenerators[query.graph] || graphGenerators.grid;
  return createGraph(n, m);
}
