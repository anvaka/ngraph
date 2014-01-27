var gexf = require('ngraph.gexf');
var binTree = require('ngraph.generators').balancedBinTree(6);
var gexfFileContent = gexf.save(binTree);
console.log(gexfFileContent);
