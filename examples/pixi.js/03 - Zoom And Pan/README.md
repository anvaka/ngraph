Zoom and Pan on nodes
---------------------

This example shows how to zoom in/zoom out on particular node of a graph using mouse cursor. 

Final results are here: **[Zoom & Pan](http://anvaka.github.io/ngraph/examples/pixi.js/03%20-%20Zoom%20And%20Pan/)**

# How this works?
First of all we have abstracted all graph related mouse input logic into a separate file `globalInput.js`. Actual input binding happens inside `index.js`:

``` js
// Listen to mouse events and update graph acoordingly:
var bindGlobalInput = require('./globalInput');
bindGlobalInput(graphics);
```

`globalInput.js` starts listening to mouseevents and updates PIXI's graphic transformations.
