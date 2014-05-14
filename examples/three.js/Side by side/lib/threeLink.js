module.exports = function (THREE) {
  return function (link) {
    var linkGeometry = new THREE.Geometry();
    // we don't care about position here. linkRenderer will update it
    linkGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
    linkGeometry.vertices.push(new THREE.Vector3(0, 0, 0));

    var linkMaterial = new THREE.LineBasicMaterial({ color: link.data.color });
    return new THREE.Line(linkGeometry, linkMaterial);
  }
}
