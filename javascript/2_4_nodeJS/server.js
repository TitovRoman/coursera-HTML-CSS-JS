let http = require('http')

let server = new http.Server();

server.on('request', function (req, res) {
    console.log(req);
    res.write('Hello, User!');
    res.end()
});

server.listen(8080);

console.log('Server start');