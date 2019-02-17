# ngraph

Ngraph is a set of graph related algorithms. It can be used in a browser
or on the server side. This repository is a collection of examples, which show
how to use some of them or build your own.

# What is available?

At the core of the library is [ngraph.graph](https://github.com/anvaka/ngraph.graph)
package, which simply represents a graph data structure.

## Serialization
* Dot files serializer [from](https://github.com/anvaka/ngraph.fromdot)/[to](https://github.com/anvaka/ngraph.todot)
* (Gephi) `gexf` file - [Source](https://github.com/anvaka/ngraph.gexf); [Demo](https://github.com/anvaka/ngraph/tree/master/examples/storage/gephi)
* [Binary format](https://github.com/anvaka/ngraph.tobinary) - space-efficient
format for large graphs. E.g. 5 million edges, 1 million nodes requires only 23 MB of space.

## Offline layout
Sometimes doing layout in the browser is not feasible (e.g. the graph is too large
to achive decent performance). In that case we can compute layout offline and
provide static positions to the browser.

* [ngraph.offline.layout](https://github.com/anvaka/ngraph.offline.layout) is an
npm module to perform such layout. If this module is too slow, you can also
try:
* [ngraph.native](https://github.com/anvaka/ngraph.native) which is fully implemented
in C++ and is 9x faster thant javascript version.

## Interactive renderer

This is set of libraries that use ngraph modules to provide rendering in the
browser:

* [VivaGraph](https://github.com/anvaka/VivaGraphJS), one of the [fastest](https://www.youtube.com/watch?v=Ax7KSQZ0_hk)
graph drawing libraries is now [constructed](https://github.com/anvaka/VivaGraphJS/blob/master/package.json)
from ngraph modules. It is an opinionated set of modules packed together.
* [ngraph.pixel](https://github.com/anvaka/ngraph.pixel) - Fast 3D graph renderer
based on low level ShaderMaterial from three.js

## Clusters/Community Detection

* [ngraph.cw](https://github.com/anvaka/ngraph.cw) - fast community detection algorithm, based on label propagation
* [ngraph.louvain](https://github.com/anvaka/ngraph.louvain) - another state of the art algorithm, uses modularity optimization.

## Graph metrics

* [ngraph.pagerank](https://github.com/anvaka/ngraph.pagerank) - computes PageRank of a graph.
* [ngraph.hits](https://github.com/anvaka/ngraph.hits) - alternative to PageRank. Implements Hubs and authorities (HITS) algorithm

## Other

There are plenty modules within ngraph family: [this npm search](https://www.npmjs.com/search?q=ngraph)
shows most of them

## Playground

You can quickly start a new project with core ngraph modules using this template project: https://github.com/anvaka/graph-start

# Building your own modules

This repository has multiple examples how to build your own module which suits
your needs best:

* [Rendering graphs with PIXI.js](https://github.com/anvaka/ngraph/tree/master/examples/pixi.js)
* [Rendering graphs with fabric.js](https://github.com/anvaka/ngraph/tree/master/examples/fabric.js)
* [Rendering graph from terminal](https://github.com/anvaka/ngraph/tree/master/examples/terminal)
* [Rendering 3D graphs](https://github.com/anvaka/ngraph/tree/master/examples/three.js)

# Video
Here is an introduction video to this library: [Browserify Monolith](https://www.youtube.com/watch?v=Kp377p-NSFc). This library has also appeared in TEDx talk at Stanford: [The Beauty I See in Algebra](https://www.youtube.com/watch?v=8CX-Q0gtSp8) by Margot Gerritsen

# Why?
I built [vivagraph](https://github.com/anvaka/VivaGraphJS) to learn javascript two years ago.
I definitely learned a lot and vivagraph itself is a pretty decent graph drawing library.

However vivagraph is built in monolithic way. For example, if I wanted to add new streaming
traversal API I could not justify it inside monolithic "graph drawing" library.

Ngraph opens huge possibilities, with each module being available on [npm](https://npmjs.org/).
Now you can pick just what you need and swap out parts which are not relevant to
your project.

I'm not abandoning vivagraph by any means. Quite the opposite, this repository is
a next step of evolution.

# How to run examples locally?
`ngraph` is powered by `npm`.  All examples require a `bundle.js` file, which is produced by executing `npm start` command inside folder with example. Make sure you have all modules installed inside a folder (`npm install` inside folder with example will download all dependencies). 

Looking for alternatives?
-------------------------

I'm trying to put up a list of all known graph drawing libraries.
Please [find it here](http://anvaka.github.io/graph-drawing-libraries/#/all)

# license

MIT
