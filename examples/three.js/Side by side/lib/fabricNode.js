module.exports = function (node) {
  return new fabric.Circle({
    radius: node.data.size,
    fill: '#' + node.data.color.toString(16)
  });
}
