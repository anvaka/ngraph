# Dynamic rendering

This example shows how a renderer can update scene when graph is changed.

Final results are here: **[Dynamic Graph](http://anvaka.github.io/ngraph/examples/pixi.js/05%20-%20Dynamic/)**

# How this works?

[pixiGraphics.js](pixiGraphics.js) now listens to changes of a `graph` object ([learn more](https://github.com/anvaka/ngraph.graph#listening-to-events)):

``` js
function listenToGraphEvents() {
  graph.on('changed', onGraphChanged);
}
```

Graph is modified by [animateGraph.js](lib/animateGraph.js) every 100ms. As soon as graph is changed, the code creates new UI objects for added nodes or links, or removes old UI objects of removed graph elements.

Finally, each graph element now has custom color and size. To achieve this we slightly refactored `pixiGraphics.js` file and exposed four new methods:

* `createNodeUI`/`renderNode`
* `createLinkUI`/`renderLink`

Via these methods [index.js](index.js) customizes how each node and link are rendered to the screen.

Once again, final results are here: **[Dynamic Graph](http://anvaka.github.io/ngraph/examples/pixi.js/05%20-%20Dynamic/)**
