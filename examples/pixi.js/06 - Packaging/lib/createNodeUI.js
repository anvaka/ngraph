module.exports = function (node) {
  return new AnimatedNode();
}

var colorLookup = [0x00FFFF, 0xFF5552];

function AnimatedNode() {
  this.color = colorLookup[(Math.random() * colorLookup.length)|0];
  this.frame = Math.random();
  this.width = Math.random() * 5 + 5;
  this.v = 1 - Math.random() * 0.01;
}

AnimatedNode.prototype.renderFrame = function() {
  if (this.frame < 0.6) {
    this.frame = 1;
    this.color = colorLookup[(Math.random() * colorLookup.length)|0];
    this.width = Math.random() * 5 + 5;
    this.v = 0.99999 - Math.random() * 0.01;
  }

  this.frame *= this.v;
  this.width *= this.v;
}
