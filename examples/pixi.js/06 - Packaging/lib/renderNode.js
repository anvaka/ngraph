module.exports = function (animatedNode, ctx) {
  animatedNode.renderFrame();
  ctx.lineStyle(0);
  ctx.beginFill(animatedNode.color,1);
  ctx.drawCircle(animatedNode.pos.x, animatedNode.pos.y, animatedNode.width);
}
