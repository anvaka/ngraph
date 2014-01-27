# Export ngraph to gexf

This is very small example shows how to export your `ngraph.graph` data structure
into `gexf`, a file consumable by [`gephi`](https://gephi.org/).

The code is extremely simple:

```
var gexf = require('ngraph.gexf'); // our gexf files manipulator

// let's create a binary tree:
var binTree = require('ngraph.generators').balancedBinTree(6);

// end print gexf representation of it to the console:
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
