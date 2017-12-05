const fs = require('fs');
const input = fs
  .readFileSync('./input', {encoding: 'utf-8'})
  .split('\n')
  .map(Number);

let i = 0, steps = 0;

while(i < input.length) {
  i += input[i] ++;
  steps++;
}

console.log(steps);