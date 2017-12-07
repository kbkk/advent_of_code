const fs = require('fs');
const regex = /(.*) \(([0-9]*)\)(?: -> )?(.*)/g;

const programs = fs
    .readFileSync('./input', {encoding: 'utf-8'})
    .split('\r\n')
    .map(line => {
      regex.lastIndex = 0;
      return regex.exec(line).slice(1, 4);
    })
    .map(([name, weight, child]) => ({
      name: name,
      weight: +weight,
      children: child.length > 0 ? child.split(', ') : null
    }));

const parentPrograms = programs.filter(p => p.children !== null);

const mainProgram =
    parentPrograms
        .filter(pp => !parentPrograms.find(p => p.children.includes(pp.name))).pop();

console.log(`main program's name is ${mainProgram.name}`)

function calcTowerWeight(program) {
  if(!program.children)
    return program.weight;

  const childrenPrograms = program.children
      .map(c => programs.find(p => p.name === c));

  const weights = childrenPrograms.map(p => calcTowerWeight(p));

  for(let w = 1; w < weights.length; w++)
  {
    let diff = weights[w] - weights[w-1];
    if(diff !== 0) {

      console.log(`${program.name}'s (${program.weight}) children are unbalanced!`,
          `${childrenPrograms[w].name}'s weight should be ${childrenPrograms[w].weight - diff}`);

      break;
    }
  }

  return program.weight + weights.reduce((a, b) => a + b, 0);
}

console.log(calcTowerWeight(mainProgram));