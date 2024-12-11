const input = '5688 62084 2 3248809 179 79 0 172169';

const map = {};
const frequencies = new Map();


part2(input, 75);

function part2(input: string, times: number) {
    let list = input.split(' ').map(Number);

    const total = list.reduce((acc, it) => {
        const result = countTimeForNumber(it, times);
        console.log('it', it, 'result', result);
        return acc + result;
    },0);

    console.log('total', total);
}


function blink(it: number): number[] {
    if (it === 0) {
        return [1];
    }
    if (it.toString().length % 2 === 0) {
        const str = it.toString();
        const half = str.length / 2;
        const aStr = str.slice(0, half);
        const bStr = str.slice(half);
        return [Number(aStr), Number(bStr)];
    }
    return [it * 2024];
}
function countTimeForNumber(number: number, times: number): number {
    const cacheKey = `${number}-${times}`;
    if (frequencies.has(cacheKey)) {
        return frequencies.get(cacheKey);
    }
    if (times === 0) {
        return 1;
    }

    let count = 0;
    const blinked = blink(number);
    for (const it of blinked) {
        count += countTimeForNumber(it, times - 1);
    }
    frequencies.set(cacheKey, count);

    return count;
}