const http = require('http');

function startHttpServer(port) {
  return new Promise((resolve, reject) => {
    let server = http.createServer(app).listen(port, function () {
      console.error("###################### Express connected ##################", app.get('port'), app.get('env'));
      resolve(server);
    });
  });
}

module.exports = { startHttpServer }