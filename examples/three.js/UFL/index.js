var query, z, layout;
var THREE;

module.exports.main = function () {
  query = require('query-string').parse(window.location.search.substring(1));
  getGraphFromQueryString(query, renderGraph);
};

function renderGraph(graph) {
  var timeStep = parseFloat(query.t);
  if (!timeStep || timeStep <= 0) {
    timeStep = 5;
  }
  var renderer = require('ngraph.three')(graph, {
    physicsSettings: { timeStep: timeStep},
    interactive: true
  });

  THREE = renderer.THREE;

  var scene = renderer.scene;
  var lights = addLights(scene);
  var camera = renderer.camera;
  z = getNumber(query.z, 400);

  var controls = renderer.controls;
  controls.rotateSpeed = 3;
	controls.zoomSpeed = 4;
	controls.panSpeed = 3;

  setupScene(scene, camera, lights);

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
  var url = (urlIsValid && query.url) || 'http://s3.amazonaws.com/yasiv_uf/out/HB/494_bus/index.js';

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

function setupScene(scene, camera, lights) { 
  var timer = Date.now() * 0.0002;
  camera.position.x = Math.cos(timer) * z;
  camera.position.z = Math.sin(timer) * z;
  lights.position.x = Math.cos(timer);
  lights.position.z = Math.sin(timer);
  camera.lookAt(scene.position);
}
