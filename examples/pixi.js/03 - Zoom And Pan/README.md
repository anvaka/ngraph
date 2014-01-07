Zoom and Pan on nodes
---------------------

This example shows how to zoom in/zoom out on particular node of a graph using mouse cursor. 

Final results are here: **[Zoom & Pan](http://anvaka.github.io/ngraph/examples/pixi.js/03%20-%20Zoom%20And%20Pan/)**

# How this works?
First of all we have abstracted all mouse input logic related to the graph into a separate file `globalInput.js`. Actuall input binding happens inside `index.js`:

``` js
// Listen to mouse events and update graph acoordingly:
var bindGlobalInput = require('./globalInput');
bindGlobalInput(graphics);
```

`globalInput.js` starts listening to mouse input events and delegates all transforms back to PIXI. 
