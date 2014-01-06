# Basic rendering with PIXI

This examples shows how to render 800 nodes graph with PIXI and `ngraph`. Our final result is:

![final result](https://raw.github.com/anvaka/ngraph/master/examples/pixi.js/01%20-%20Basic/media/Result.png)

You can see live example here: [01 - Basic](http://anvaka.github.io/ngraph/examples/pixi.js/01%20-%20Basic/).

# How it's made?

Example uses these npm modules:

* [ngraph.forcelayout](https://github.com/anvaka/ngraph.forcelayout) - Force directed layout algorithm;
* [ngraph.physics.simulator](https://github.com/anvaka/ngraph.physics.simulator) - To adjust force directed layout;
* [ngraph.generators](https://github.com/anvaka/ngraph.generators) -  Graph generators, to create a predefined graph;

All these modules are exported inside `index.js` file:

``` js
module.exports.layout = require('ngraph.forcelayout');
module.exports.createGraph = require('ngraph.generators');
module.exports.physics = require('ngraph.physics.simulator');
```

And are built into browser-compatible script with:

```
browserify -s ngraph index.js > bundle.js
```

Now any page which includes `bundle.js` file has access to modules via `ngraph`
namespace:

```
// You'll find this code inside index.html:
// It creates a grid-graph, with 40 columns and 40 rows
var graph = ngraph.createGraph.grid(40, 40);
```

# Rendering

Last step is showing graph on the screen. Our animation looks like this (pseudocode):

``` js
function animate() {
  layout.step(); // Update positions of each node according to layout algorithm
  drawGraph();   // Render each link and node of our graph 
  
  requestAnimationFrame(animate); // schedule next frame rendering
}
```

PIXI abstracts rendering behind `renderer` object, which can use WebGL or fallback to regular 2d canvas context.

``` js
var renderer = PIXI.autoDetectRenderer(width, height, null, false, true);

// We are using single `PIXI.Graphics` instance to render nodes and edges
var graphics = new PIXI.Graphics();

// somewhere inside drawGraph():
function drawGraph() {
  graphics.clear();
  graphics.beginFill(0xFF3300);
  var i, x, y, x1, y1;
  
  graphics.lineStyle(1, 0xcccccc, 1);
  for(i = 0; i < linkPositions.length; ++i) {
    var link = linkPositions[i];
    graphics.moveTo(link.from.x, link.from.y);
    graphics.lineTo(link.to.x, link.to.y);
  }
  
  graphics.lineStyle(0);
  for (i = 0; i < nodePositions.length; ++i) {
    x = nodePositions[i].x - 5;
    y = nodePositions[i].y - 5;
    graphics.drawRect(x, y, 10, 10);
  }
}
