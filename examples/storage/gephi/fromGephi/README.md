# Export Gephi to ngraph
This example shows how to export `gexf` files from Gephi and load them in your browser.

Here is a video showing it in action:

[![export from gephi](http://i.snag.gy/Fh0oN.jpg)](https://www.youtube.com/watch?v=9SWN54Q_vT4)

Click here to view [**interactive version**](http://anvaka.github.io/ngraph/examples/storage/gephi/fromGephi/)

Note: This demo is a basic example, under 40 lines of code. It does not support error handling. Please let me know if something is not working.

# How it's done?
As with everything in `ngraph` parser of `gexf` files is implemented as a separate package: [`ngraph.gexf`](https://github.com/anvaka/ngraph.gexf). It's sole responsibility is to convert xml string into [`ngraph.graph`](https://github.com/anvaka/ngraph.graph) data structure. 

This is the main part of the demo:

``` js
function renderGraph(gexfContent) {
  // parse gexf file:
  var gexf = require('ngraph.gexf');
  var graph = gexf.load(gexfContent);

  // and render it with a renderer:
  var graphics = require('ngraph.pixi')(graph);
  graphics.run(); 
}
```

Here we are using [`ngraph.pixi`](https://github.com/anvaka/ngraph/tree/master/examples/pixi.js/06%20-%20Packaging) as a renderer, but it could easily be [`ngraph.fabric`](https://github.com/anvaka/ngraph/tree/master/examples/fabric.js) or even [`ngraph.three`](https://github.com/anvaka/ngraph/tree/master/examples/three.js) for 3D graphs rendering.
