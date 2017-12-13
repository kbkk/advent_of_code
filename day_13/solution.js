const fs = require('fs');
const input = fs
    .readFileSync('input', {encoding: 'utf-8'})
    .split('\n');

const firewalls = [];

input.forEach(line => {
  const [index, depth] = line.split(': ').map(Number);
  firewalls[index] = depth;
});

function calculateSeverity(firewalls, delay = 0) {
  let severity = 0;
  let detected = false;

  for(let picosecond = 0; picosecond < firewalls.length; picosecond++)
  {
    const depth = firewalls[picosecond];

    if(!depth) {
      continue;
    }

    const scannerPosition = (picosecond + delay) % (2 * (depth - 1));
    if(scannerPosition === 0)
    {
      detected = true;
      severity += picosecond * depth;
    }
  }

  return {severity, detected};
}

console.log(`Part one: ${calculateSeverity(firewalls, 0).severity}`);

for(let delay = 0; delay < Number.MAX_SAFE_INTEGER; delay++)
{
  if(calculateSeverity(firewalls, delay).detected)
    continue;

  console.log(`Part two: ${delay}`);
  break;
}