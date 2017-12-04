const fs = require('fs');
const input = fs.readFileSync('./input', {encoding: 'utf-8'});

const out = input
    .split('\r\n')
    .map(row => row.split(' '))
    .map(row => +[...new Set(row)].length === row.length)
    .reduce((a, b) => a + b);

console.log(out);