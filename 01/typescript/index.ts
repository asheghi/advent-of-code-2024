import fs from 'fs';

const sampleInput = readFile('sample.txt');
const input = readFile('input.txt');

console.log("part1 sample",part1(sampleInput));
console.log("part1 sample",part1(sampleInput) == 11 ? "PASS" : "FAIL");
console.log('part1 answer:', part1(input));

console.log("part2 sample",part2(sampleInput));
console.log("part2 sample",part2(sampleInput) == 31 ? "PASS" : "FAIL");
console.log('part2 answer:', part2(input));


function part1(lines: string[]) {
  const data = parseInput(lines);

  const sortedFirst = data.map(([a, _]) => a).sort((a, b) => a - b);
  const sortedSecond = data.map(([_, b]) => b).sort((a, b) => a - b);

  return sortedFirst.reduce((sum, a, index) => sum + Math.abs(a - sortedSecond[index]), 0);
}


function part2(lines: string[]) {
  const data = parseInput(lines);

  const frequencies: { [key: number]: number } = {};
  data.forEach(([_, b]) => {
    frequencies[b] = (frequencies[b] || 0) + 1;
  });

  return data.reduce((sum, [a, _]) => sum + a * (frequencies[a] || 0), 0);
}



function readFile(filename: string) {
  const text = fs.readFileSync(filename, 'utf8').trim();
  return text.split('\r\n');
}

function parseInput(lines: string[]) {
  return lines.map(line => {
    const [first, second] = line.split('   ').map(Number);
    return [first, second];
  });
}