import fs from 'fs';

const sampleInput = readFile('sample.txt');
const input = readFile('input.txt');

console.log("part1 sample", part1(sampleInput));
console.log("part1 sample", part1(sampleInput) == 2 ? "PASS" : "FAIL");
console.log('part1 answer:', part1(input));

console.log("part2 sample", part2(sampleInput));
console.log("part2 sample", part2(sampleInput) == 4 ? "PASS" : "FAIL");
console.log('part2 answer:', part2(input));

function part1(reports: string[]): number {
    let safeCount = 0;
    for (const report of reports) {
        const levels = report.split(' ').map(Number);
        if (isSafeReport(levels)) {
            safeCount++;
        }
    }
    return safeCount;
}

function part2(reports: string[]): number {
    let safeCount = 0;
    for (const report of reports) {
        const levels = report.split(' ').map(Number);
        if (isSafeWithDampener(levels)) {
            safeCount++;
        }
    }
    return safeCount;
}



function isSafeReport(levels: number[]): boolean {
    const isIncreasing = levels.every((level, index, array) => index === 0 || level >= array[index - 1]);
    const isDecreasing = levels.every((level, index, array) => index === 0 || level <= array[index - 1]);

    if (!(isIncreasing || isDecreasing)) {
        return false;
    }

    for (let i = 1; i < levels.length; i++) {
        const diff = Math.abs(levels[i] - levels[i - 1]);
        if (diff < 1 || diff > 3) {
            return false;
        }
    }

    return true;
}



function isSafeWithDampener(levels: number[]): boolean {
    if (isSafeReport(levels)) {
        return true;
    }

    for (let i = 0; i < levels.length; i++) {
        const newLevels = [...levels.slice(0, i), ...levels.slice(i + 1)];
        if (isSafeReport(newLevels)) {
            return true;
        }
    }

    return false;
}




function readFile(filename: string) {
    const text = fs.readFileSync(filename, 'utf8').trim();
    return text.split('\r\n');
}
