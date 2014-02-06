# ngraph

Ngraph is a set of graph related algorithms. It can be used in a browser
or on the server side. This repository is a collection of examples, which show
how to use some of them or build your own.

# What is available?
Currently this library is work in progress. I will add demos as quickly as I can.

* [Rendering graphs with PIXI.js](https://github.com/anvaka/ngraph/tree/master/examples/pixi.js)
* [Rendering graphs with fabric.js](https://github.com/anvaka/ngraph/tree/master/examples/fabric.js)
* [Rendering graph from terminal](https://github.com/anvaka/ngraph/tree/master/examples/terminal)
* [Rendering 3D graphs](https://github.com/anvaka/ngraph/tree/master/examples/three.js)
* [Integration with Gephi](https://github.com/anvaka/ngraph/tree/master/examples/storage/gephi)

# Why?
I built [vivagraph](https://github.com/anvaka/VivaGraphJS) to learn javascript two years ago.
I definitely learned a lot and vivagraph itself is a pretty decent graph drawing library.

However vivagraph is built in monolithic way. For example, if I wanted to add new streaming
traversal API I could not justify it inside monlithical "graph drawing" library.

Ngraph opens huge possibilities, with each module being available on [npm](https://npmjs.org/).
Now you can pick just what you need and swap out parts which are not relevant to
your project.

I'm not abandoning vivagraph by any means. Quite the oposite, this repository is
a next step of evolution.

# license

MIT
