var fs = require('fs');

var fileInput = process.argv[2];
var fileOutput = process.argv[3];

var readStream = fs.createReadStream(__dirname + '/' + fileInput, {flags: 'r'});
var writeStream = fs.createWriteStream(__dirname + '/' + fileOutput);
var buf = '';
var writeBuf = '';

readStream.on('data', function (data) {
    buf += data.toString(); // When data is read, set it into a string buffer
    pump(); // Process the buffer
});

/**
 * Pump buffer data to parser
 */
function pump() {
    var pos;

    // Keep going while there's a newline somewhere in the buffer
    while ((pos = buf.indexOf('\n')) >= 0) {
        // If there's more than one newline in a row, the buffer will now start with a newline
        if (pos === 0) {
            buf = buf.slice(1); // Discard it
            continue; // So that the next iteration will start with data
        }

        parse(buf.slice(0, pos)); // Hand off the line
        buf = buf.slice(pos + 1); // Slice the processed data off the buffer
    }
}

/**
 * Parse a line string
 * Calls write when parsed
 * @param {String} line Line to parse
 */
function parse (line) {
    if (line[line.length - 1] == '\r') {
        line = line.substr(0, line.length - 1); // Discard CD (0x0D)
    }

    // Ignore empty lines
    if (line.length > 0) {
        var parsedLine = line.replace(/,/g, ';'); // Parse the line
        writeBuf += parsedLine + '\n';
        write();
    }
}

/**
 * Write to file
 */
function write() {
    var pos;

    // Keep going while there's a newline somewhere in the buffer
    while ((pos = writeBuf.indexOf('\n')) >= 0) {
        // If there's more than one newline in a row, the buffer will now start with a newline
        if (pos === 0) {
            writeBuf = writeBuf.slice(1); // Discard it
            continue; // So that the next iteration will start with data
        }

        writeStream.write(writeBuf.slice(0, pos)); // Hand off the line
        writeBuf = writeBuf.slice(pos + 1); // Slice the processed data off the buffer
    }
}
