module.exports.main = function () {
  var graph = require('ngraph.graph')();
  var threeGraphics = require('ngraph.three')(graph, { interactive: false });
  var THREE = threeGraphics.THREE;

  // tell graphics we want custom UI
  threeGraphics.createNodeUI(function () {
    var size = Math.random() * 10 + 1;
    var nodeGeometry = new THREE.SphereGeometry(size);
    var nodeMaterial = new THREE.MeshBasicMaterial({ color: getNiceColor() });
    return new THREE.Mesh(nodeGeometry, nodeMaterial);
  }).createLinkUI(function() {
    var linkGeometry = new THREE.Geometry();
    // we don't care about position here. linkRenderer will update it
    linkGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
    linkGeometry.vertices.push(new THREE.Vector3(0, 0, 0));

    var linkMaterial = new THREE.LineBasicMaterial({ color: getNiceColor() });
    return new THREE.Line(linkGeometry, linkMaterial);
  });

  // begin graph modification (add/remove nodes):
  var graphChange = require('./animateGraph');
  graphChange.animate(graph);

  var camera = threeGraphics.camera;
  // begin rendering loop:
  threeGraphics.run();

  var scene = threeGraphics.scene;
  // Just for fun let's rotate around our scene:
  animateCamera();

  function animateCamera() {
    requestAnimationFrame(animateCamera);
    var timer = Date.now() * 0.0002;
    camera.position.x = Math.cos(timer) * 1500;
    camera.position.z = Math.sin(timer) * 1500;
    camera.lookAt(scene.position);
  }
};

var niceColors = [
 0x1f77b4, 0xaec7e8,
 0xff7f0e, 0xffbb78,
 0x2ca02c, 0x98df8a,
 0xd62728, 0xff9896,
 0x9467bd, 0xc5b0d5,
 0x8c564b, 0xc49c94,
 0xe377c2, 0xf7b6d2,
 0x7f7f7f, 0xc7c7c7,
 0xbcbd22, 0xdbdb8d,
 0x17becf, 0x9edae5
];

function getNiceColor() {
  return niceColors[(Math.random() * niceColors.length)|0];
}
