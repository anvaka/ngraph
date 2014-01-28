# Fabric.js and Three.js

This demo shows side by side rendering of the same graph with [`ngraph.fabric`](https://github.com/anvaka/ngraph.fabric) and [`ngraph.three`](https://github.com/anvaka/ngraph.three):

Run: [**2D and 3D side by side**](http://anvaka.github.io/ngraph/examples/three.js/Side%20by%20side/index.html)

View:

[![video](http://i.snag.gy/7gQh4.jpg)](https://www.youtube.com/watch?v=VPHr2ufPgGE)

Note: this is not a comparisson of rendering engines speed. Both `ngraph.fabric` and `ngraph.three` are using exactly the same information about graph layout. Only difference is that `ngraph.fabric` uses two coordinates to render nodes, whereas `ngraph.three` uses three.

# How it's done?

We've already seen how to make custom looking nodes in [three.js](https://github.com/anvaka/ngraph/tree/master/examples/three.js/Dynamic) and [fabric](https://github.com/anvaka/ngraph/tree/master/examples/fabric.js/Node%20and%20Browser) renderers. This example is using the same technique to customize appearance of graph elements. 

Take a closer look, do you see both renderers are using the same colors?

![colors are the same](http://i.snag.gy/Vns7l.jpg)

To achieve this we treat color/size as an actual graph node property:

``` js
// ngraph.graph allows you to associate aribtrary data with nodes:
graph.addNode(nodeId, {
  size: Math.random() * 20 + 1,
  color: getNiceColor()
});

// and links:
graph.addLink(from, to, { color: getNiceColor() });
```

Now both renderers are using this data to construct their UI primitives:

``` js
// lib/fabricNode.js: 
module.exports = function (node) {
  return new fabric.Circle({
    radius: node.data.size,
    fill: '#' + node.data.color.toString(16)
  });
};

// lib/threeNode.js:
module.exports = function (node) {
  var nodeGeometry = new THREE.SphereGeometry(node.data.size);
  var nodeMaterial = new THREE.MeshPhongMaterial({
    color: node.data.color
  });
  return new THREE.Mesh(nodeGeometry, nodeMaterial);
};
```

`node.data` is the way to access our associated data from renderer's code.

# Layout

Both renderers are sharing the same instance of layout algorithm (in this case it is [`ngraph.forcelayout3d`](https://github.com/anvaka/ngraph.forcelayout3d)):

``` js
// first create ngraph three renderer:
var threeGraphics = require('ngraph.three')(graph);

// Now create ngraph.fabric and tell it to use the same layout algorithm:
var fabricGraphics = require('ngraph.fabric')(graph, {
    layout: threeGraphics.layout
  });
```

# Animation loop

Both renderers provide `run()` method to perform animation loop. `run` internally asks layout to recalculate positions of graph elements. But in our example this would result in double recalculation on each frame. Remember, we are sharing exactly the same instance of layout algorithm between two renderers.

Good news, it's fairly easy to setup our own animation loop:

``` js
// index.js
function animate() {
  requestAnimationFrame(animate);

  threeGraphics.layout.step();     // update layout once
  threeGraphics.renderOneFrame();  // render 3d graph
  fabricGraphics.renderOneFrame(); // render 2d graph

  rotateCamera(); // just for fun, rotate 3d camera
}
