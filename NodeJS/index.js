// console.log("Hello this is node js training.");
const http = require('http');

const server = (req, res) => {
    res.writeHead(200, {'content-type': 'application/json'})
    res.write(JSON.stringify({
        name: 'John',
        age: 22,
        city: 'london'
    }));
    res.end();
}
http.createServer(server).listen(5000);