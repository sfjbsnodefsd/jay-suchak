let PensionerDetail = require('./pensionerDetail');
let fs = require("fs"),
    readline = require("readline");

let file = "pensionerDataList.csv";

let rl = readline.createInterface({
    input: fs.createReadStream(file),
    output: null,
    terminal: false
})

rl.on("line", function(line) {
    console.log("Got line: " + line);
});

rl.on("close", function() {
    console.log("All data processed.");
});