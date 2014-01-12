# Packaging

In past five examples we've created a graph renderer using PIXI.js. In this
example we've made a separate package out of it: [ngraph.pixi](https://github.com/anvaka/ngraph.pixi). Interactive demo: **[Pixies tree](http://anvaka.github.io/ngraph/examples/pixi.js/06%20-%20Packaging/)**

![Pixies tree](http://i.snag.gy/XNxJV.jpg)

# Code

The [main file](index.js) of this example takes less than 20 lines of code, and 
nicely abstracts complexity away:

``` js
var graph = require('ngraph.generators').balancedBinTree(6);
var createPixiGraphics = require('ngraph.pixi');

var pixiGraphics = createPixiGraphics(graph);

// setup our custom looking nodes and links:
pixiGraphics.createNodeUI(require('./lib/createNodeUI'))
  .renderNode(require('./lib/renderNode'))
  .createLinkUI(require('./lib/createLinkUI'))
  .renderLink(require('./lib/renderLink'));

// just make sure first node does not move:
var layout = pixiGraphics.layout;
layout.pinNode(graph.getNode(1), true);

// begin animation loop:
pixiGraphics.run();
```

The most important part is:

```
var createPixiGraphics = require('ngraph.pixi');
```

This allows other developers use our pixi renderer.

