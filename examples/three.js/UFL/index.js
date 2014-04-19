var query, z;

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
  var nodeGeometry = new THREE.SphereGeometry(4);
  var nodeMaterial = new THREE.MeshPhongMaterial({
    color: 0x00BFFF
  });
  return new THREE.Mesh(nodeGeometry, nodeMaterial);
}

function linkUI(link) {
  var linkGeometry = new THREE.Geometry();
  linkGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
  linkGeometry.vertices.push(new THREE.Vector3(0, 0, 0));

  var linkMaterial = new THREE.LineBasicMaterial({ color: 0x333333 });
  return new THREE.Line(linkGeometry, linkMaterial);
}

function addLights(scene) {
  var light = new THREE.DirectionalLight(0xffffff);
  scene.add(light);

  return light;
}

function animateScene(scene, camera, lights) { 
  return function () {
    var timer = Date.now() * 0.0002;
    camera.position.x = Math.cos(timer) * z;
    camera.position.z = Math.sin(timer) * z;
    lights.position.x = Math.cos(timer);
    lights.position.z = Math.sin(timer);
    camera.lookAt(scene.position);
  };
}
