var fs = require('fs');
var through = require('through');

// File input & output given as arguments
var from = process.argv[2];
var to = process.argv[3];

// Benchmarking
var startTime = Date.now();

// Raise the buffer limits
var readOpts = {highWaterMark: Math.pow(2,16)};
var writeOpts = {highWaterMark: Math.pow(2,16)};

// Create file streams
var source = fs.createReadStream(__dirname + '/' + from, readOpts);
var destination = fs.createWriteStream(__dirname + '/' + to, writeOpts);

// Pipe data from read-stream to write- and end-functions
source.pipe(through(write, end));

/**
 * Write buffer data to file
 * @param {Buffer} buf Buffer of a readable stream's data
 */
function write (buf) {
    destination.write(parse(buf));
}

/**
 * Parse buffer data.
 * Replaces semicolons with commas.
 * @param {Buffer} buf Buffer of a readable stream's data
 * @return {String} Parsed Buffer as a String
 */
function parse (buf) {
    return buf.toString().replace(/;/g, ',');
}

/**
 * Finished writing
 */
function end () {
    console.log('Finished parsing');
    console.log('Parsing took (ms): ' + (Date.now() - startTime));
}
