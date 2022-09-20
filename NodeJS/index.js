// console.log("Hello this is node js training.");
const http = require('http');

const server = (req, res) => {
    res.write('<h1>Hello Worlddd ...</h1>');
    res.end();
}
http.createServer(server).listen(5000);