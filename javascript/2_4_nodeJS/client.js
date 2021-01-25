let http = require('http')

let client = http.request({
    hostname: 'localhost',
    port: 8080
});

client.on('response', function (response) {
    let message = '';

    response.on('data', function(chunk) {
        message += chunk;
    });

    response.on('end', function() {
      console.log(message);  
    });
});

client.end()

console.log('Client start');