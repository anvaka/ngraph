// For this example we will require layout algorithm:
module.exports.layout = require('ngraph.forcelayout');

// and graph generators, to create a predefined graph:
module.exports.createGraph = require('ngraph.generators');

// Just in case someone will need custom physics settings:
module.exports.physics = require('ngraph.physics.simulator');
