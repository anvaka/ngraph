module.exports = function (canvasId) {
  var domCanvas = document.getElementById(canvasId);
  return new fabric.StaticCanvas(canvasId, {
    renderOnAddRemove: false,
    width: domCanvas.clientWidth,
    height: domCanvas.clientHeight
  });
}
