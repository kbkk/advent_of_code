const fs = require('fs');
const input = fs.readFileSync('./input', {encoding: 'utf-8'});

let captcha = 0;

const numbers = [...input]
    .map(v => +v);

const numbersMatch = (a, b) => numbers[a] === numbers[b] ? numbers[a] : 0;

captcha += numbersMatch(0, numbers.length - 1);

for(let i = 1; i < numbers.length; i++) {
  captcha += numbersMatch(i - 1, i);
}

console.log(captcha);