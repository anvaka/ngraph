module.exports = function (pixiGraphics) {
  pixiGraphics.renderNode(function (node, ctx) {
    ctx.lineStyle(0);
    ctx.beginFill(0xFF9800, 1);
    ctx.drawCircle(node.pos.x, node.pos.y, 5);
  }).renderLink(function (link, ctx) {
    ctx.lineStyle(2, 0x263248, 1);
    ctx.moveTo(link.from.x, link.from.y);
    ctx.lineTo(link.to.x, link.to.y);
  });
}
