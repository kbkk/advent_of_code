const fs = require('fs');
const input = fs
    .readFileSync('./input', {encoding: 'utf-8'});

const stack = [];

const CHARS = {
  GROUP_OPEN: '{',
  GROUP_CLOSE: '}',
  IGNORE: '!',
  GARBAGE_OPEN: '<',
  GARBAGE_CLOSE: '>',
};

let depth = 0;
let score = 0;
let garbage = 0;

for (let i = 0; i < input.length; i++) {
  const char = input[i];

  const lastChar = stack.length && stack[stack.length - 1];

  if (lastChar === CHARS.IGNORE) {
    stack.pop();
    continue;
  }

  else if (lastChar === CHARS.GARBAGE_OPEN
      && char !== CHARS.GARBAGE_CLOSE
      && char !== CHARS.IGNORE) {

    garbage++;
    continue;
  }

  if (char === CHARS.GROUP_OPEN) {
    depth++;
    stack.push(CHARS.GROUP_OPEN);
  }

  else if (char === CHARS.GROUP_CLOSE) {
    score += depth;
    depth--;
    stack.push(CHARS.GROUP_CLOSE);
  }

  else if (char === CHARS.IGNORE)
    stack.push(CHARS.IGNORE);

  else if (char === CHARS.GARBAGE_OPEN)
    stack.push(CHARS.GARBAGE_OPEN);

  else if (char === CHARS.GARBAGE_CLOSE)
    stack.push(CHARS.GARBAGE_CLOSE);

}

console.log(`part one: ${score}`);
console.log(`part two: ${garbage}`);