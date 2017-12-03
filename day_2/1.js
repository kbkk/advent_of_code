const fs = require('fs');
const input = fs.readFileSync('./input', {encoding: 'utf-8'});

const checksum = input
    .split('\n')
    .map(v => v.split('\t').map(Number))
    .map(row => Math.max(...row) - Math.min(...row))
    .reduce((a, b) => a + b);

console.log(checksum);