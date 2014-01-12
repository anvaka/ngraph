# Basic rendering with PIXI

This example is slightghly refactored version of [01 - Basic](../01%20-%20Basic/). You can see final resut here: [02 - Basic No Inline](http://anvaka.github.io/ngraph/examples/pixi.js/02%20-%20Basic%20No%20Inline/index.html) It is still the
same code, but refactored into separate CommonJS files.

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

`index.js` is a simple bootstrap file which creates a graph, and configures layout arguments. Finally it starts animation loop.

At first this change may seem to be small and unimportant. But it has huge benefits:

1. We are no longer required to write one gigantic html file. Obviously separate `script` tags would solve it too, but
2. Unlike separate `script` tags we are not required to keep track of dependencies resolution order.
3. Furthermore, each file has now it's own isolated scope, which gives developers better opportunities to structure code. `require.js` would give us the same benefits, except:
4. We gained access to entire universe of npm packages. 
5. We can also share our module with other developers via npm.
