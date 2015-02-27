# node-csv-parser-example
CSV parser implemented in Node.js.

Uses `through`-module to pipe data into parser function.

Used to parse semicolon-separated CSVs into comma-separated files.

## Usage
Give the parser a input file and an output file as arguments:

`node parser.js [input.file] [output.file]`

Output:

`$ node parser.js sample_large.csv output.csv`

`Parsing took (ms): 235`

`Finished parsing`
