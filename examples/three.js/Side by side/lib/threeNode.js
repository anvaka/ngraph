module.exports = function (node) {
  var nodeGeometry = new THREE.SphereGeometry(node.data.size);
  var nodeMaterial = new THREE.MeshPhongMaterial({
    color: node.data.color
  });
  return new THREE.Mesh(nodeGeometry, nodeMaterial);
}
