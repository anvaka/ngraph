exports.get = function get(url, cb) {
  request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400){
      // Success!
      data = JSON.parse(request.responseText);
      cb(null, data);
    } else {
      // We reached our target server, but it returned an error
      cb(request.status);
    }
  };

  request.send();
};
