# Terminal

Modular design is a powerful thing. We've seen how to integrate force layout with
PIXI.js ([1]). Here we have fun example, showing how to integrate force
layout... with terminal:

[![http://i.snag.gy/XiQMS.jpg](http://i.snag.gy/XiQMS.jpg)](https://www.youtube.com/watch?v=tCPwCAZ8xFE)

# How it's made?

Amount of code required to render this grid in terminal is very small:

``` js
var graph = require('ngraph.generators').grid(10, 10);
var asciiGraphics = require('ngraph.ascii').graphics(graph);

// most likely you will see squares here if your browser does not know these
// unicode symbols:
var symbols = ['👰','👱','👲','👳','👴','👵','👶','👷','👸'];

// Override default text ('*' symbol) with our own symbols:
asciiGraphics.createNodeUI(function (node) {
  return symbols[node.id % symbols.length];
});

// and begin animation:
asciiGraphics.run();
```

All rendering is done with [ngraph.ascii](https://github.com/anvaka/ngraph.ascii).
`ngraph.ascii` uses [`ngraph.forcelayout`](https://github.com/anvaka/ngraph.forcelayout)
to determine node positions and then via simple transforms scales graph down to available screen space. These [6 lines of 
code](https://github.com/anvaka/ngraph.ascii/blob/62c2a9540986539e07421d20a822bcf1374c4c9d/lib/graphics.js#L56-L61)
do all job for us:

``` js
  layout.step(); // layout is instance of ngraph.forcelayout
  updateTransform(); // scale graph coordinates to screen coordinates

  screen.clear();
  graph.forEachNode(renderNode);
  screen.flush();
```

Only missing part is `renderNode()` function, which uses transform to render node on a screen:

``` js
  var pos = layout.getNodePosition(node.id);

  var x = (pos.x - minx) * sx;
  var y = (pos.y - miny) * sy;

  screen.put(x, y, '*');
```

Easy, right?

# Bonus

By the way, since we also have abstracted screen itself, we can easily implement one which does not necessary render to terminal. `ngraph.ascii` comes with a screen which renders into array of characters ([2]). We can easily leverage this fact and render ascii graph inside `pre` tag in your browser. **[Here is live demo](http://anvaka.github.io/ngraph/examples/terminal/01%20-%20ASCII/)**.

Hope you enjoy :)


[1]: https://github.com/anvaka/ngraph/tree/master/examples/pixi.js
[2]: https://github.com/anvaka/ngraph.ascii/blob/master/lib/arrayScreen.js
