module.exports = function (circle) {
  circle.left = circle.pos.x - circle.radius;
  circle.top = circle.pos.y - circle.radius;
}
