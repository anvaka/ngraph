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

[VivaGraph](https://github.com/anvaka/VivaGraphJS), one of the [fastest](https://www.youtube.com/watch?v=Ax7KSQZ0_hk) graph drawing libraries is now [constructed](https://github.com/anvaka/VivaGraphJS/blob/master/package.json) from ngraph modules.


# Video
Here is an introduction video to this library: [Browserify Monolith](https://www.youtube.com/watch?v=Kp377p-NSFc). This library has also appeared in TEDx talk at Stanford: [The Beauty I See in Algebra](https://www.youtube.com/watch?v=8CX-Q0gtSp8) by Margot Gerritsen

# Why?
I built [vivagraph](https://github.com/anvaka/VivaGraphJS) to learn javascript two years ago.
I definitely learned a lot and vivagraph itself is a pretty decent graph drawing library.

However vivagraph is built in monolithic way. For example, if I wanted to add new streaming
traversal API I could not justify it inside monolithical "graph drawing" library.

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
