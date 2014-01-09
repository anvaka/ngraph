var NODE_WIDTH = 10;

module.exports = function (graph, layout) {
  var width = window.innerWidth,
      height = window.innerHeight;

  var stage = new PIXI.Stage(0x000000, true);
  var renderer = PIXI.autoDetectRenderer(width, height, null, false, true);
  renderer.view.style.display = "block";
  document.body.appendChild(renderer.view);

  var graphics = new PIXI.Graphics();
  graphics.position.x = width/2;
  graphics.position.y = height/2;
  stage.addChild(graphics);

  // Default callbacks to build/render nodes
  var nodeUIBuilder = defaultCreateNodeUI,
      nodeRenderer  = defaultNodeRenderer,
      linkUIBuilder = defaultCreateLinkUI,
      linkRenderer  = defaultLinkRenderer;

  // Storage for UI of nodes/links:
  var nodeUI = {}, linkUI = {};

  graph.forEachNode(initNode);
  graph.forEachLink(initLink);

  return {
    renderFrame: function () {
      layout.step();
      drawGraph();
      renderer.render(stage);
    },

    createNodeUI : function (createNodeUICallback) {
      nodeUI = {};
      nodeUIBuilder = createNodeUICallback;
      graph.forEachNode(initNode);
      return this;
    },

    renderNode: function (renderNodeCallback) {
      nodeRenderer = renderNodeCallback;
      return this;
    },

    createLinkUI : function (createLinkUICallback) {
      linkUI = {};
      linkUIBuilder = createLinkUICallback;
      graph.forEachLink(initLink);
      return this;
    },

    renderLink: function (renderLinkCallback) {
      linkRenderer = renderLinkCallback;
      return this;
    },

    domContainer: renderer.view,
    graphGraphics: graphics,
    stage: stage,

    getNodeAt: getNodeAt 
  };

  function drawGraph() {
    graphics.clear();

    Object.keys(linkUI).forEach(renderLink);
    Object.keys(nodeUI).forEach(renderNode);
  }

  function renderLink(linkId) {
    linkRenderer(linkUI[linkId], graphics);
  }

  function renderNode(nodeId) {
    nodeRenderer(nodeUI[nodeId], graphics);
  }

  function initNode(node) {
    var ui = nodeUIBuilder(node);
    // augment it with position data:
    ui.pos = layout.getNodePosition(node.id);
    // and store for subsequent use:
    nodeUI[node.id] = ui;
  }

  function initLink(link) {
    var ui = linkUIBuilder(link);
    ui.from = layout.getNodePosition(link.fromId);
    ui.to = layout.getNodePosition(link.toId);
    linkUI[link.id] = ui;
  }

  function defaultCreateNodeUI(node) {
    return {};
  }

  function defaultCreateLinkUI(link) {
    return {};
  }

  function defaultNodeRenderer(node) {
    var x = node.pos.x - NODE_WIDTH/2,
        y = node.pos.y - NODE_WIDTH/2;

    graphics.beginFill(0xFF3300);
    graphics.drawRect(x, y, NODE_WIDTH, NODE_WIDTH);
  }

  function defaultLinkRenderer(link) {
    graphics.lineStyle(1, 0xcccccc, 1);
    graphics.moveTo(link.from.x, link.from.y);
    graphics.lineTo(link.to.x, link.to.y);
  }

  function getNodeAt(x, y) {
    var half = NODE_WIDTH/2;
    // currently it's a linear search, but nothing stops us from refactoring
    // this into spatial lookup data structure in future:
    for (var nodeId in nodeUI) {
      if (nodeUI.hasOwnProperty(nodeId)) {
        var node = nodeUI[nodeId];
        var pos = node.pos;
        var width = node.width || NODE_WIDTH;
        var half = width/2;
        var insideNode = pos.x - half < x && x < pos.x + half &&
                         pos.y - half < y && y < pos.y + half;

        if (insideNode) {
          return graph.getNode(nodeId);
        }
      }
    }
  }
}

