const fs = require('fs');
const input = fs.readFileSync('./input', {encoding: 'utf-8'});

const numbers = [...input]
    .map(v => +v)
    .map((v, i, a) => {
      const nextIndex = i + a.length/2;
      return a[i] === a[nextIndex] ? a[i] : 0;
    })
    .reduce((a, b) => a + b) * 2;

console.log(numbers);