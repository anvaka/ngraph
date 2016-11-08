# Basic 3D graph rendering

This example shows how to render graphs in 3d

# Demo

Click any of these images to view interactive animation:

<a href='http://anvaka.github.io/ngraph/examples/three.js/Basic/index.html?graph=balancedBinTree&n=6'><img alt='balancedBinTree, depth=6' src='https://raw.github.com/anvaka/ngraph/master/examples/three.js/Basic/assets/BinTree.png' height='128px'></img></a>
<a href='http://anvaka.github.io/ngraph/examples/three.js/Basic/index.html?graph=grid3&z=800'><img alt='grid 10x10x10' src='https://raw.github.com/anvaka/ngraph/master/examples/three.js/Basic/assets/grid3d.png' height='128px'></img></a>
<a href='http://anvaka.github.io/ngraph/examples/three.js/Basic/index.html?graph=grid'><img alt='grid 10x10' src='https://raw.github.com/anvaka/ngraph/master/examples/three.js/Basic/assets/grid.png' height='128px'></img></a>
<a href='http://anvaka.github.io/ngraph/examples/three.js/Basic/index.html?graph=circularLadder'><img alt='circularLadder, length=10' src='https://raw.github.com/anvaka/ngraph/master/examples/three.js/Basic/assets/circularLadder.png' height='128px'></img></a>
<a href='http://anvaka.github.io/ngraph/examples/three.js/Basic/index.html?graph=complete&n=5'><img alt='complete, n=5' src='https://raw.github.com/anvaka/ngraph/master/examples/three.js/Basic/assets/complete6.png' height='128px'></img></a>

You can control camera position by using mouse:

* Mouse wheel to zoom in/zoom out
* Left mouse button to rotate
* Right mouse button to pan

All graphs from graphs generators are available. Click any image in the [ngraph.generators](https://github.com/anvaka/ngraph.generators#graph-generators) repository to see interactive version.

**Note:** WebGL is required for best performance

# How does this work

As it often happens with npm modules entire program is 20 lines long, 10 lines of which are query string parsing. Main part is this:

``` js
module.exports.main = function () {
  var graph = getGraphFromQueryString(window.location.search.substring(1));
  var createThree = require('ngraph.three');
  var graphics = createThree(graph);

  graphics.run(); // begin animation loop
}
```

[`ngraph.three`](https://github.com/anvaka/ngraph.three) is a higher level abstraction which provides convenient API to initialize scene, control layout, and render graph. 

All rendering examples here ([ngraph.pixi](https://github.com/anvaka/ngraph/tree/master/examples/pixi.js/06%20-%20Packaging), [ngraph.fabric](https://github.com/anvaka/ngraph/tree/master/examples/fabric.js/Node%20and%20Browser), [ngraph.ascii](https://github.com/anvaka/ngraph/tree/master/examples/terminal/01%20-%20ASCII), etc.) are following the same pattern in their rendering loop:

1. Calculate graph layout
2. Render scene

What makes `ngraph.three` different from other renderers is its layout algorithm. It uses [`ngraph.forcelayout3d`](https://github.com/anvaka/ngraph.forcelayout3d) a three dimensional cousin of [`ngraph.forcelayout`](https://github.com/anvaka/ngraph.forcelayout).

Both force layout algorithms are using non-recursive [quad-tree](http://en.wikipedia.org/wiki/Quadtree) to solve [n-body problem](http://en.wikipedia.org/wiki/N-body_problem). Unfortunately 3d layout is slower than 2d. From my experiments it can render at 30+fps graphs with 1k nodes, 3k edges. I'm sure this will be improved in future.

# Rendering scene
When layout is calculated [`three.js`](http://threejs.org/) is used to show graph. `ngraph.three` creates default UI objects for each element of a graph. At each frame it updates their positions and asks three.js to rerender scene. 

We'll see in greater detail how to customize appearance of a graph in nearest future. Please stay tuned. And for now, let me ask you for...

# Feedback

This is all work in progress at its very early stage. If you feel like API is missing something, please feel free to open issue in corresponding repository or shoot me an email. I'd really love to hear from you :)!
