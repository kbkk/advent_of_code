const fs = require('fs');

const banks = fs
    .readFileSync('./input', {encoding: 'utf-8'})
    .split('\t')
    .map(Number);

const bankHistory = [[...banks]];
let steps = 0;

while (true) {
  steps++;

  const busiestBank = banks.indexOf(Math.max(...banks));
  let remainder = banks[busiestBank];
  banks[busiestBank] = 0;

  for (let i = busiestBank + 1; remainder > 0; i++) {
    const bank = (i >= banks.length) ? i % banks.length : i;
    banks[bank] += 1;
    remainder--;
  }

  if (!bankHistory.every(function (v) {
        for (let i = 0; i < v.length; i++) {
          if (v[0] !== banks[0])
            return false;
        }
      })) break;

  bankHistory.push([...banks]);
}

console.log(steps);