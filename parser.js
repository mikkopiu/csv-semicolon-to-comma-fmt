'use strict';

const fs = require('fs');
const through = require('through');

// File input & output given as arguments
const from = process.argv[2];
const to = process.argv[3];

// Benchmarking
const startTime = Date.now();

// Raise the buffer limits
const streamOpts = {highWaterMark: Math.pow(2, 16)};

// Create file streams
var source = fs.createReadStream(__dirname + '/' + from, streamOpts);
var destination = fs.createWriteStream(__dirname + '/' + to, streamOpts);

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
    console.log(`Parsing took (ms): ${(Date.now() - startTime)}`);
}
