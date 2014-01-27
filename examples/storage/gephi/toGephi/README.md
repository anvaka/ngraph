# Export ngraph to Gephi

This is very small example shows how to export your `ngraph.graph` data structure
into `gexf`, a file consumable by [`gephi`](https://gephi.org/).

Video shows this README in action:

[![export ngraph to gephi](http://i.snag.gy/90vg1.jpg)](https://www.youtube.com/watch?v=m-aLEoAVUv0)

The code is extremely simple:

``` js
var gexf = require('ngraph.gexf'); // our gexf files manipulator

// let's create a binary tree:
var binTree = require('ngraph.generators').balancedBinTree(6);

// And print gexf content to the console:
var gexfFileContent = gexf.save(binTree);
console.log(gexfFileContent);
```

Now if you run this:
```
node index.js > bintree.gexf
```

You'll get bintree.gexf file in your folder, and it can be opened in `gephi`.

Simple as is, it shows incredible power of small modules. Now any project which
uses `ngraph.graph` can be easily integrated with `gephi`
