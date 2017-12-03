const fs = require('fs');
const input = fs.readFileSync('./input', {encoding: 'utf-8'});

const numbers = [...input]
    .map(v => +v)
    .map((v, i, a) => {
      const nextIndex = i+2 > a.length ? 0 : i+1;
      return a[i] === a[nextIndex] ? a[i] : 0;
    })
    .reduce((a, b) => a+b);

console.log(numbers);