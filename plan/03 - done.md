# Serialization
* Dot files serializer [from](https://github.com/anvaka/ngraph.fromdot)/[to](https://github.com/anvaka/ngraph.todot)
* (Gephi) `gexf` file - [Source](https://github.com/anvaka/ngraph.gexf); [Demo](https://github.com/anvaka/ngraph/tree/master/examples/storage/gephi)
* [Binary format](https://github.com/anvaka/ngraph.tobinary) - space-efficient
format for large graphs. E.g. 5 million edges, 1 million nodes requires only 23 MB of space.

# Offline layout
Sometimes doing layout in the browser is not feasible (e.g. the graph is too large
to achive decent performance). In that case we can compute layout offline and
provide static positions to the browser.

* [ngraph.offline.layout](https://github.com/anvaka/ngraph.offline.layout) is an
npm module to perform such layout. If this module is too slow, you can also
try:
* [ngraph.native](https://github.com/anvaka/ngraph.native) which is fully implemented
in C++ and is 9x faster than javasript version.


# Chore
* Update README file for [ngraph.forcelayout](https://github.com/anvaka/ngraph.forcelayout) - Done. Repo has updated readme.
* Update README file for [ngraph.forcelayout3d](https://github.com/anvaka/ngraph.forcelayout3d) - Done. Repo has updated readme.
* Update README file for [ngraph.quadtreebh3d](https://github.com/anvaka/ngraph.quadtreebh3d) - Done. Repo has updated readme.
* Update README file for [ngraph.generators](https://github.com/anvaka/ngraph.generators) - Done. Repo has updated readme.
* Update README file for [ngraph.physics.simulator](https://github.com/anvaka/ngraph.physics.simulator) - Done. Repo has updated readme.

# Gephi

# Three.js
* Fast graph renderer based on low level ShaderMaterial: [ngraph.pixel](https://github.com/anvaka/ngraph.pixel)
* Show how to render graph in 3D - [results](https://github.com/anvaka/ngraph/tree/master/examples/three.js)
* Implement 3D force based layout - [results](https://github.com/anvaka/ngraph.forcelayout3d)
* Implement 3D quad tree - [results](https://github.com/anvaka/ngraph.forcelayout3d)
* Show how to render huge graphs with particles - [results](https://github.com/anvaka/pm)


# Fabric.js
* Render graph with [fabric.js](https://github.com/kangax/fabric.js) - [results](https://github.com/anvaka/ngraph/tree/master/examples/fabric.js/Node%20and%20Browser)

# Terminal
* Show how to render a graph using ASCII art - [results](https://github.com/anvaka/ngraph/tree/master/examples/terminal/01%20-%20ASCII)
* Render graph into a static image - [results](https://github.com/anvaka/ngraph/tree/master/examples/fabric.js/Node%20and%20Browser)

# PIXI.JS
* Show custom node shapes, make dynamic graph change. Something like [this](http://www.webgl.com/2012/07/webgl-demo-dynamic-graph-test-vivagraph/) - [results](https://github.com/anvaka/ngraph/tree/master/examples/pixi.js/05%20-%20Dynamic)
* Show how to share what [we have done so far](https://github.com/anvaka/ngraph/tree/master/examples/pixi.js) using npm. [results](https://github.com/anvaka/ngraph/tree/master/examples/pixi.js/06%20-%20Packaging)

# SVG
I am using [simplesvg](https://github.com/anvaka/simplesvg) for now. [ngraph.svg](https://github.com/anvaka/ngraph.svg)
is the module which renders with svg and is part of [vivagraph](https://github.com/anvaka/VivaGraphJS).
