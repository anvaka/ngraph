module.exports = function (link) {
  return new fabric.Line([0, 0, 0, 0], {
    stroke: '#' + link.data.color.toString(16),
    originX: 'center',
    originY: 'center'
  });
}
