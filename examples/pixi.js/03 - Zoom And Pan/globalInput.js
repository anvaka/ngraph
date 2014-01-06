module.exports = function (graphics) {
  var addWheelListener = require('./lib/addWheelListener');
  var graphGraphics = graphics.graphGraphics;

  addWheelListener(graphics.domContainer, function (e) {
    zoom(e.clientX, e.clientY, e.wheelDelta > 0);
  });

  addDragNDrop();

  function zoom(x, y, isZoomIn) {
    direction = isZoomIn ? 1 : -1;
    graphGraphics.scale.x *= (1 + direction * 0.1);
    graphGraphics.scale.y *= (1 + direction * 0.1);
  }

  function addDragNDrop() {
    var stage = graphics.stage;
    stage.setInteractive(true);

    var isDragging = false,
        prevX, prevY;

    stage.mousedown = function (moveData) {
      var pos = moveData.global;
      prevX = pos.x; prevY = pos.y;
      isDragging = true;
    };

    stage.mousemove = function (moveData) {
      if (!isDragging) {
        return;
      }
      var pos = moveData.global;
      var dx = pos.x - prevX;
      var dy = pos.y - prevY;

      graphGraphics.position.x += dx;
      graphGraphics.position.y += dy;
      prevX = pos.x; prevY = pos.y;
    };

    stage.mouseup = function (moveDate) {
      isDragging = false;
    };
  }
}
