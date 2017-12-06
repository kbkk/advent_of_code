const fs = require('fs');

const banks = fs
    .readFileSync('./input', {encoding: 'utf-8'})
    .split('\t')
    .map(Number);

const banksHistory = {};

function hashBanks(banks) {
  let str = '';

  for(let i = 0; i < banks.length; i++)
    str += String.fromCharCode(banks[i]);

  return str;
}

function calculateSteps() {
  let steps = 0;

  while (true) {

    banksHistory[hashBanks(banks)] = true;
    steps++;

    const busiestBank = banks.indexOf(Math.max(...banks));
    let remainder = banks[busiestBank];
    banks[busiestBank] = 0;

    for (let i = busiestBank + 1; remainder > 0; i++) {
      const bank = (i >= banks.length) ? i % banks.length : i;
      banks[bank] += 1;
      remainder--;
    }

    if(banksHistory[hashBanks(banks)])
      return steps;
  }
}

console.log(calculateSteps());
/*
console.log(Math.max(...banksHistory
    .map(row => Math.max(...row))));*/
