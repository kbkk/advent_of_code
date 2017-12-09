const fs = require('fs');

const instructions = fs
    .readFileSync('./input', {encoding: 'utf-8'})
    .split('\r\n')
    .map(row => row.split(' if ').map(x => x.split(' ')));

const registers = {};
const registersMax = {};

function init(reg) {
  if(registers[reg] === undefined)
    registers[reg] = 0;

  if(registersMax[reg] === undefined)
    registersMax[reg] = 0;
}

function cmp(reg, op, val) {
  val = Number(val);
  cval = registers[reg] || 0;

  switch (op) {
    case '==': {
      return cval === val;
    }
    case '!=': {
      return cval !== val;
    }
    case '>=': {
      return cval >= val;
    }
    case '>': {
      return cval > val;
    }
    case '<=': {
      return cval <= val;
    }
    case '<': {
      return cval < val;
    }
  }
}

function exec(reg, op, val) {
  val = Number(val);
  init(reg);

  switch(op) {
    case 'inc': {
      registers[reg] += val;
      break;
    }
    case 'dec': {
      registers[reg] -= val;
      break;
    }
  }
}

for (let i = 0; i < instructions.length; i++) {
  const [instruction, condition] = instructions[i];
  const [reg] = instruction;

  if(cmp(...condition)) {
    exec(...instruction);

    if(registers[reg] > registersMax[reg])
      registersMax[reg] = registers[reg];
  }
}

const arr = Object.keys(registers).map(key => ({value: registers[key], max: registersMax[key], name: key}));

console.log(arr.reduce((a, b) => Math.max(a, b.value), arr[0].value));
console.log(arr.reduce((a, b) => Math.max(a, b.max), arr[0].max));