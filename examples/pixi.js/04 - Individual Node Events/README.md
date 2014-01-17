Node Interactions
---------------------

This example shows how to drag a node under cursor.

Final results are here: **[Node Interactions](http://anvaka.github.io/ngraph/examples/pixi.js/04%20-%20Individual%20Node%20Events/)**

# How this works?
PIXI does not support interactivity on low-level `PIXI.Graphics` primitives. This
example uses linear search to identify which node is at `(x, y)` coordinates:

``` js
var NODE_WIDTH = 10;

function getNodeAt(x, y) {
  var half = NODE_WIDTH/2;

  // currently it's a linear search, but nothing stops us from refactoring
  // this into spatial lookup data structure in future:
  for (var i = 0; i < nodePositions.length; ++i) {
    var pos = nodePositions[i];
    var insideNode = pos.x - half < x && x < pos.x + half &&
                     pos.y - half < y && y < pos.y + half;

    if (insideNode) {
      return getNodeByIndex[i];
    }
  }
}
```

While it's easy to implement, it may not be efficient when graph has too many
nodes. On practice however, this code is only executed when user clicks a button
or moves a mouse cursor. Compared to frame rendering, which happens every 16ms,
mouse movement is an extremely rare event, and it is usually not a performance bottleneck.

`getNodeAt()` is exposed inside [pixiGraphics](pixiGraphics.js) and is consumed
by [globalInput.js](https://github.com/anvaka/ngraph/blob/a9efa4995c19785fb1f4ed90d21f1482989f6dc2/examples/pixi.js/04%20-%20Individual%20Node%20Events/globalInput.js#L39),
which we inherited from [Example 3 - Zoom And Pan](../03 - Zoom And Pan/)

As soon as user clicks on a node, we pin it:
``` js
// just to make sure layout algorithm will not attempt to move this node
// based on physical forces. Now it's completely under our control:
layout.pinNode(nodeUnderCursor, true);
```

And when user moves mouse with pinned node, we transform mouse coordinates to
graph coordinates, and update node's position via `setNodePosition()`:

``` js
var graphPos = getGraphCoordinates(mousePos.x, mousePos.y);
layout.setNodePosition(nodeUnderCursor.id, graphPos.x, graphPos.y);
```

The rest is remained to layout algorithm. It will update positions of other nodes
according to current situation, and PIXI's renderer will reflect this on stage.

Once again, you can play with final results here: **[Node Interactions](http://anvaka.github.io/ngraph/examples/pixi.js/04%20-%20Individual%20Node%20Events/)**
