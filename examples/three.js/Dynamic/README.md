# Custom UI + Animation

This example shows how to render dynamic 3d graphs with custom UI

[**Interactive Demo**](http://anvaka.github.io/ngraph/examples/three.js/Dynamic/index.html)

Video:

[![Video demo](http://i.snag.gy/EOWgQ.jpg)](http://www.youtube.com/watch?v=ZcxVTY_0SJA)

# How it's made?

Each renderer in `ngraph` family supports two methods: One tells renderer how we want to render each graph element, and the other is called on each frame to let you update element's position according to layout algorithm.

[`ngraph.three`](https://github.com/anvaka/ngraph.three) is not different:
``` js

// First, create instance of `ngraph.three` renderer:
var threeGraphics = require('ngraph.three')(graph);

// tell it how we want to render graph nodes:
threeGraphics.createNodeUI( function (node) {
  var size = Math.random() * 10 + 1;
  var nodeGeometry = new THREE.SphereGeometry(size);
  var nodeMaterial = new THREE.MeshBasicMaterial({ color: getNiceColor() });
  // use regular three.js mesh to render sphere:
  return new THREE.Mesh(nodeGeometry, nodeMaterial);
})
// We also want to have custom looking UI for links:
.createLinkUI(function() {
    var linkGeometry = new THREE.Geometry();
    // We don't care about position here, renderLink() callback will update it
    linkGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
    linkGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
    
    var linkMaterial = new THREE.LineBasicMaterial({ color: getNiceColor() });
    // Again, no magic, regular three.js object is returned:
    return new THREE.Line(linkGeometry, linkMaterial);
  });
```

If we would want to place node/links at a different position (think of custom shapes), we would have to tell this to renderer:

``` js
threeGraphics.renderNode(function (node) {
  // here node is instance of THREE.Mesh;
  // ngraph.three augments it with `pos` attribute which reflects
  // layout algorithm's proposed position:
  node.position.x = node.pos.x;
  node.position.y = node.pos.y;
  node.position.z = node.pos.z;
});

// Same is true for link rendering:
threeGraphics.renderNode(function (link) {
  var from = link.from;
  var to = link.to;
  link.geometry.vertices[0].set(from.x, from.y, from.z);
  link.geometry.vertices[1].set(to.x, to.y, to.z);
  link.geometry.verticesNeedUpdate = true;
});
```

# Dynamic changes
Similar to other renderers of `ngraph` family, `ngraph.three` listens to graph events ([learn more](https://github.com/anvaka/ngraph.graph#listening-to-events)). When graph is changed, `ngraph.three` adds or removes corresponding UI elements to the scene.
