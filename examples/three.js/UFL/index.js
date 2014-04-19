var query, z, layout;

module.exports.main = function () {
  query = require('query-string').parse(window.location.search.substring(1));
  getGraphFromQueryString(query, renderGraph);
};

function renderGraph(graph) {
  var renderer = require('ngraph.three')(graph);
  var scene = renderer.scene;
  var lights = addLights(scene);
  var camera = renderer.camera;
  z = getNumber(query.z, 400);

  renderer.onFrame(animateScene(scene, camera, lights));
  renderer.createNodeUI(nodeUI).createLinkUI(linkUI);

  layout = renderer.layout;
  renderer.run(); // begin animation loop:
  var maxDegreeNode = getMaxDegree(graph);
  renderer.layout.pinNode(maxDegreeNode, true);

}

function getMaxDegree(graph) {
  var foundNode, max = -1;
  graph.forEachNode(function (node) {
    if (node.links.length > max) {
      max = node.links.length;
      foundNode = node;
    }
  });

  return foundNode;
}

function getGraphFromQueryString(query, cb) {
  var urlIsValid = query.url && query.url.match(/^http:\/\/s3.amazonaws.com\/yasiv_uf\/out\//);
  var url = (urlIsValid && query.url) || 'http://s3.amazonaws.com/yasiv_uf/out/Meszaros/p0040/index.js';

  require('./lib/http').get(url, function (err, data) {
    if (err) return;
    cb(require('ngraph.serialization/mtx').loadFromObject(data));
  });
}

function getNumber(string, defaultValue) {
  return parseInt(string, 10) || defaultValue || 10;
}


function nodeUI(node) {
  var nodeGeometry = new THREE.SphereGeometry(2);
  var nodeMaterial = new THREE.MeshPhongMaterial({
    color: 0xFF0100
  });
  return new THREE.Mesh(nodeGeometry, nodeMaterial);
}

var links = [];
function linkUI(link) {
  var linkGeometry = new THREE.Geometry();
  linkGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
  linkGeometry.vertices.push(new THREE.Vector3(0, 0, 0));

  var linkMaterial = new THREE.LineBasicMaterial({ color: 0x333333 });
  link.color = linkMaterial.color;
  links.push(link);
  return new THREE.Line(linkGeometry, linkMaterial);
}

function addLights(scene) {
  var light = new THREE.DirectionalLight(0xffffff);
  scene.add(light);

  return light;
}

function animateScene(scene, camera, lights) { 
  return function () {
    updateColors();
    var timer = Date.now() * 0.0002;
    camera.position.x = Math.cos(timer) * z;
    camera.position.z = Math.sin(timer) * z;
    lights.position.x = Math.cos(timer);
    lights.position.z = Math.sin(timer);
    camera.lookAt(scene.position);
  };
}

function updateColors() {
  if (!links.length) return;

  // first calculate avg link length:
  var minLength = Number.POSITIVE_INFINITY, maxLength = 0;
  var link;
  var avgDistance = 0;
  for (var i = 0; i < links.length; ++i) {
    link = links[i];

    var pos = layout.getLinkPosition(link.id);
    var from = pos.from;
    var to = pos.to;
    link.distance = Math.sqrt((from.x - to.x) * (from.x - to.x) + (from.y - to.y) * (from.y - to.y) + (from.z - to.z) * (from.z - to.z));
    avgDistance += link.distance;

    if (link.distance < minLength) minLength = link.distance;
    if (link.distance > maxLength) maxLength = link.distance;
  }

  avgDistance /= links.length;

  for (i = 0; i < links.length; ++i) {
    link = links[i];
    var dt = link.distance - avgDistance;
    var hue = 90 * (dt * 4/(avgDistance) + 1);
    hue = Math.min(Math.max(hue, 0), 180);
    var c = hsbToRgb(hue, 100, 100);
    link.color.r = c.r;
    link.color.g = c.g;
    link.color.b = c.b;
  }
}

function hsbToRgb(h, s, b){
  var r, g;
  var br = Math.round(b / 100 * 255);
  if (s === 0){
    r = br; g =  br; b = br;
  } else {
    var hue = h % 360;
    var f = hue % 60;
    var p = Math.round((b * (100 - s)) / 10000 * 255);
    var q = Math.round((b * (6000 - s * f)) / 600000 * 255);
    var t = Math.round((b * (6000 - s * (60 - f))) / 600000 * 255);
    switch(Math.floor(hue / 60)){
      case 0: r = br; g = t; b = p; break;
      case 1: r = q; g = br; b = p; break;
      case 2: r = p; g = br; b = t; break;
      case 3: r = p; g =  q; b = br; break;
      case 4: r = t; g = p; b = br; break;
      case 5: r = br; g =  p; b = q; break;
    }
  }
  return {r : r/255, g: g/255, b: b/255};
}
