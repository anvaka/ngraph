module.exports = function (link, ctx) {
  ctx.lineStyle(link.width, 0x333333, 1);
  ctx.moveTo(link.from.x, link.from.y);
  ctx.lineTo(link.to.x, link.to.y);
}
