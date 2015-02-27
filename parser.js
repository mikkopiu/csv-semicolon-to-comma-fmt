var fs = require('fs');
var through = require('through');

var from = process.argv[2];
var to = process.argv[3];

var readOpts = {highWaterMark: Math.pow(2,16)};
var writeOpts = {highWaterMark: Math.pow(2,16)};

var source = fs.createReadStream(__dirname + '/' + from, readOpts);
var destiny = fs.createWriteStream(__dirname + '/' + to, writeOpts);

source.pipe(through(write, end));

function write (buf) {
    destiny.write(buf.toString().replace(/,/g, ';'));
}

function end () {
    console.log('Finished parsing');
}
