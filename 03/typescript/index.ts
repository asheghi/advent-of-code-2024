import fs from 'fs';

const sampleInput = readFile('sample.txt');
const input = readFile('input.txt');

console.log("part1 sample", execute(sampleInput));
console.log("part1 sample", execute(sampleInput) == 161 ? "PASS" : "FAIL");
console.log('part1 answer:', execute(input));

const sample2 = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

console.log("part2 sample", execute(sample2));
console.log("part2 sample", execute(sample2) == 48 ? "PASS" : "FAIL");
console.log('part2 answer:', execute(input));


function readFile(filename: string) {
  const text = fs.readFileSync(filename, 'utf8').trim();
  return text;
}



function execute(memory: string): number {
  const mulRegex = /mul\((\d+),(\d+)\)/g;
  const doRegex = /do\(\)/g;
  const dontRegex = /don't\(\)/g;

  let lock = true;
  let sum = 0;

  const instructions = memory.match(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g) || [];

  for (const instruction of instructions) {
    if (doRegex.test(instruction)) {
      lock = true;
    } else if (dontRegex.test(instruction)) {
      lock = false;
    } else if (lock && mulRegex.test(instruction)) {
      const match = instruction.match(mulRegex);
      if (match) {
        const [, x, y] = instruction.match(/mul\((\d+),(\d+)\)/) || [];
        const product = parseInt(x) * parseInt(y);
        sum += product;
      }
    }
  }

  return sum;
}