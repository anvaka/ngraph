# Fabric.js and Three.js

This demo shows side by side rendering of the same graph with [`ngraph.fabric`](https://github.com/anvaka/ngraph.fabric) and [`ngraph.three`](https://github.com/anvaka/ngraph.three):

[**Demo**](http://anvaka.github.io/ngraph/examples/three.js/Side%20by%20side/index.html)

Note: this is not a comparisson of rendering engines speed. Both `ngraph.fabric` and `ngraph.three` are using exactly the same information about graph layout. Only difference is that `ngraph.fabric` uses two coordinates to render nodes, whereas `ngraph.three` uses three.

# How it's done?

We've already seen how to make custom looking nodes in [three.js](https://github.com/anvaka/ngraph/tree/master/examples/three.js/Dynamic) and [fabric](https://github.com/anvaka/ngraph/tree/master/examples/fabric.js/Node%20and%20Browser) renderers. This example is using the same technique to customize appearance of graph elements. 

Take a closer look, do you see both renderer are using the same colors?

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

`node.data` is the way to access our associated data.
