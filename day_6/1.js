const fs = require('fs');

const banks = fs
    .readFileSync('./input', {encoding: 'utf-8'})
    .split('\t')
    .map(Number);

const bankHistory = [[...banks]];

function calculateSteps() {
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

    for (let bankIndex = 0; bankIndex < bankHistory.length; bankIndex++) {
      const bank = bankHistory[bankIndex];
      let isEqual = true;

      for (let i = 0; i < bank.length; i++) {
        if (bank[i] !== banks[i]) {
          isEqual = false;
          break;
        }
      }

      if (isEqual) return steps;
    }
    bankHistory.push([...banks]);
  }
}

console.log(calculateSteps());
/*
console.log(Math.max(...bankHistory
    .map(row => Math.max(...row))));*/
