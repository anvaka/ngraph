module.exports = getSymbolsSize;

function getSymbolsSize() {
  var gauge = document.createElement('pre');
  gauge.innerHTML = ' ';
  gauge.style.position = 'absolute';
  gauge.style.top = '-1000px'; // hide it from the screen

  document.body.appendChild(gauge);
  var size = {
    width: gauge.offsetWidth,
    height: gauge.offsetHeight
  };

  document.body.removeChild(gauge);
  return size;
}
