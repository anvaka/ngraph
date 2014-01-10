module.exports = function (link) {
  return {
    width: 7 - Math.log(link.toId)
  }
};
