# Node and Browser
This example shows how to reuse code to render interactive graphs in your browser and how to save them as images from node.js

# Demo
These images were created from node.js ([1]):

<a href='http://anvaka.github.io/ngraph/examples/fabric.js/Node%20and%20Browser/index.html?graph=grid'><img alt='grid 10x10' src='https://raw.github.com/anvaka/ngraph/master/examples/fabric.js/Node%20and%20Browser/assets/grid.png' width='128px'></img></a>
<a href='http://anvaka.github.io/ngraph/examples/fabric.js/Node%20and%20Browser/index.html?graph=balancedBinTree&n=6'><img alt='balancedBinTree, depth=6' src='https://raw.github.com/anvaka/ngraph/master/examples/fabric.js/Node%20and%20Browser/assets/balancedBinTree.png' width='128px'></img></a>
<a href='http://anvaka.github.io/ngraph/examples/fabric.js/Node%20and%20Browser/index.html?graph=circularLadder'><img alt='circularLadder, length=10' src='https://raw.github.com/anvaka/ngraph/master/examples/fabric.js/Node%20and%20Browser/assets/circularLadder.png' width='128px'></img></a>
<a href='http://anvaka.github.io/ngraph/examples/fabric.js/Node%20and%20Browser/index.html?graph=path'><img alt='path, length=10' src='https://raw.github.com/anvaka/ngraph/master/examples/fabric.js/Node%20and%20Browser/assets/path.png' width='128px'></img></a>
<a href='http://anvaka.github.io/ngraph/examples/fabric.js/Node%20and%20Browser/index.html?graph=complete&n=5'><img alt='complete, n=5' src='https://raw.github.com/anvaka/ngraph/master/examples/fabric.js/Node%20and%20Browser/assets/complete.png' width='128px'></img></a>

Click any of them to render corresponding graph in your browser. Use mouse wheel to zoom. Drag nodes around with left button.

# How does this work

First of all, [fabric.js](http://fabricjs.com/) is used as a 2d rendering engine. I created [`ngraph.fabric`](https://github.com/anvaka/ngraph.fabric) on top of it to make graph rendering easier:

``` js
var graph = require('ngraph.graph')();
graph.addLink(1, 2);

var fabricGraphics = require('ngraph.fabric')(graph);

fabricGraphics.run(); // Launch animation loop
```

This will render a graph with two rectangular nodes. To customize its appearance we need to tell API how we want to render nodes and where:

``` js
var fabricGraphics = require('ngraph.fabric')(graph);
fabricGraphics.createNodeUI(function (node) {
    // Now each node will be rendered as a circle
    return new fabric.Circle({ radius: Math.random() * 20, fill: getNiceColor() });
  });

// We also want to update circle position on each frame:
fabricGraphcs.renderNode(function (circle) {
    // fabric.js uses left/top to position primitives.
    circle.left = circle.pos.x - circle.radius;
    circle.top = circle.pos.y - circle.radius;
    // `pos` property is automatically added by `ngraph.fabric` to tell where 
    // element should be according to layout algorithm
  });
```

If we look closer, all we need to customize appearance of a graph is instance of `fabricGraphics` and instance of `fabric` itself. This can be extracted into a separate file: [`ui.js`](https://github.com/anvaka/ngraph/blob/master/examples/fabric.js/Node%20and%20Browser/ui.js). Then anyone who wants to render nodes as circles with a nice color can require this file. And this is exactly what [`index.js`](https://github.com/anvaka/ngraph/blob/bfc08575ba9c0bb83387813d87c3a41f0124ecb0/examples/fabric.js/Node%20and%20Browser/index.js#L8) is doing.

To use this from a browser we [browserify](http://browserify.org/) `index.js` and include produced script into [html file](https://github.com/anvaka/ngraph/blob/05ba2ad483409be5b5dca12624c9819306b6c51e/examples/fabric.js/Node%20and%20Browser/index.html#L9-L10).

## How to render from node.js
`fabric.js` has two awesome parts:

1. Rich API
2. Support of rendering from node.js

By virtue of the last part, `ngraph.fabric` can render to static images for free. 

When rendering from node we don't need to update scene on each frame. Instead we manually calculate good layout:

``` js
var layout = require('ngraph.forcelayout')(graph);
for (var i = 0; i < iterationsCount; ++i) {
  layout.step();
}
```

And initialize `ngraph.fabric` with our own layout:

``` js
var fabricGraphics = require('ngraph.fabric')(graph, { 
  layout: layout
});

// We want custom UI from `ui.js`:
require('./ui')(fabricGraphics, fabric);

// Ask renderer to render just one frame:
fabricGraphics.renderOneFrame();
```

Finally we save `fabric.js` canvas into a file:

``` js
var fs = require('fs');
fabricGraphics.canvas.createPNGStream()
   .pipe(fs.createWriteStream('graphFile.png'));
```

# Thank you for reading!

I hope you enjoyed this little introduction into `ngraph.fabric`. Please let me know if something is not described well enough and I'll do my best to improve this :).

[1]: https://github.com/anvaka/ngraph/blob/master/examples/fabric.js/Node%20and%20Browser/assets/create.js
