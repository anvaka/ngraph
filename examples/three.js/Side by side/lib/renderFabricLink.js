module.exports = function (line) {
  line.set({
    x1: line.from.x,
    y1: line.from.y,
    x2: line.to.x,
    y2: line.to.y
  });
};
