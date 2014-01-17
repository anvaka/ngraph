# Basic rendering with PIXI

This example is slightghly refactored version of [01 - Basic](../01%20-%20Basic/). It is still the
same code, but refactored into separate CommonJS file.

Let's look at `index.html`:

``` html
<!DOCTYPE HTML>
<html>
<head>
	<title>pixi.js and graphs</title>

	<script src="pixi.js"></script>
	<script src="bundle.js"></script>
</head>
<body onload='ngraph.main()'>
</body>
</html>
```

It invokes `ngraph.main()` function, which is the only export of [`index.js`](index.js).
`index.js` is compiled with [`browserify`](http://browserify.org/):

```
browserify -s ngraph index.js > bundle.js
```

`index.js` is a simple bootstrap file which creates a graph, and configures
layout arguments. Finally it starts animation loop.
