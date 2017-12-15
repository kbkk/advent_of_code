const GEN_A_FACTOR = 16807;
const GEN_B_FACTOR = 48271;
const GEN_A_START = 703;
const GEN_B_START = 516;
const MASK = 0xFFFF;

class Generator {
  constructor(startValue, factor) {
    this.startValue = startValue;
    this.lastValue = startValue;
    this.factor = factor;
  }

  reset() {
    this.lastValue = this.startValue;
  }
}

class StandardGenerator extends Generator {
  generate() {
    this.lastValue = (this.lastValue * this.factor) % 2147483647;
    return this.lastValue;
  }
}

class BitDivisibleGenerator extends Generator {
  constructor(startValue, factor, condition) {
    super(startValue, factor);
    this.condition = condition;
  }

  generate() {
    do {
      this.lastValue = (this.lastValue * this.factor) % 2147483647;
    } while (this.lastValue & this.condition);

    return this.lastValue;
  }
}

class PairMatcher {
  constructor(genA, genB, mask) {
    this.genA = genA;
    this.genB = genB;
    this.mask = mask;
  }

  find(pairs) {
    let matches = 0;
    this.genA.reset();
    this.genB.reset();

    for (let i = 0; i < pairs; i++) {
      const valA = this.genA.generate();
      const valB = this.genB.generate();

      if ((valA & this.mask) === (valB & this.mask))
        matches++;
    }

    return matches;
  }
}

const pairMatcherFactory = ({aStart, aFactor, aCondition, bStart, bFactor, bCondition, bitMask}) => {
  const firstGenerator =
      aCondition !== undefined ?
          new BitDivisibleGenerator(aStart, aFactor, aCondition)
          : new StandardGenerator(aStart, aFactor);

  const secondGenerator = bCondition !== undefined ?
      new BitDivisibleGenerator(bStart, bFactor, bCondition)
      : new StandardGenerator(bStart, bFactor);

  return new PairMatcher(firstGenerator, secondGenerator, bitMask);
};

const part1 = {
  aStart: GEN_A_START,
  aFactor: GEN_A_FACTOR,
  bStart: GEN_B_START,
  bFactor: GEN_B_FACTOR,
  bitMask: MASK
};

const part2 = {
  ...part1,
  aCondition: 3,
  bCondition: 7
};

console.log(pairMatcherFactory(part1).find(40000000));
console.log(pairMatcherFactory(part2).find(5000000));
//console.log(findMatches2(5000000));

